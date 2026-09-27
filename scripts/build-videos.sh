#!/usr/bin/env bash
# ============================================================
# Anima — vidéos web à partir des exports Grok
#
#   bash scripts/build-videos.sh            # tout reconstruire
#   bash scripts/build-videos.sh accueil    # une seule scène / reel
#
# Scènes (bannières de pages) : boucle sans couture par fondu
# fin → début, piste audio retirée, H.264 « faststart » + une
# déclinaison verticale 9:16 recadrée sur Anima pour mobile.
# Reels (mur réseaux sociaux) : format 9:16, citation incrustée
# dans le style des reels Instagram/TikTok + écran de fin.
# Chaque vidéo livre aussi son poster WebP (1re image).
#
# Prérequis : ffmpeg ≥ 7 (drawtext/libfreetype), cwebp, curl, uvx.
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="${SRC:-$ROOT/output/anima-videos-2026-09/videos}"
OUT="$ROOT/public/videos"
ASSETS="$ROOT/scripts/video-assets"
CACHE="$ROOT/.cache/anima-video"
FONT="$CACHE/CormorantGaramond-MediumItalic.ttf"
ONLY="${1:-}"

mkdir -p "$OUT" "$CACHE"

# --- Police des reels : Cormorant Garamond Medium Italic (OFL) ---
if [[ ! -f "$FONT" ]]; then
  curl -sSL -o "$CACHE/cg-italic-var.ttf" \
    "https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond-Italic%5Bwght%5D.ttf"
  uvx --from fonttools fonttools varLib.instancer "$CACHE/cg-italic-var.ttf" wght=500 -o "$FONT" -q
fi

X264=(-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an -tag:v avc1)

duration() { ffprobe -v error -show_entries format=duration -of csv=p=0 "$1"; }

poster() { # $1 vidéo, $2 sortie .webp, $3 instant
  ffmpeg -v error -y -ss "${3:-0}" -i "$1" -frames:v 1 "$CACHE/poster.png"
  cwebp -quiet -q 78 "$CACHE/poster.png" -o "$2"
}

# Filtre de boucle : [1 s → fin] fondu vers [0 → 1 s]. La dernière image
# rejoint ainsi exactement la première, sans saut au redémarrage.
loop_graph() { # $1 durée source, $2 chaîne de mise à l'échelle
  local off; off=$(awk -v d="$1" 'BEGIN { printf "%.3f", d - 2 }')
  echo "[0:v]split=2[a][b];[a]trim=start=1,setpts=PTS-STARTPTS[main];[b]trim=end=1,setpts=PTS-STARTPTS[head];[main][head]xfade=transition=fade:duration=1:offset=$off,$2,setsar=1[v]"
}

# Scène de bannière : desktop 16:9 + mobile 9:16 centré sur Anima.
#   $1 slug   $2 fichier source   $3 position horizontale d'Anima (0–1)
#   $4 largeur desktop (1600 par défaut, 1920 pour l'accueil plein écran,
#      1280 pour les sources 720p)   $5 débit max desktop
# hqdn3d atténue le scintillement du grain généré : à débit égal, l'aquarelle
# reste nette au lieu de se couvrir de blocs.
DENOISE="hqdn3d=2:2:8:8"
scene() {
  local slug=$1 file=$SRC/$2 focus=$3 w=${4:-1600} rate=${5:-1.8M}
  [[ -n "$ONLY" && "$ONLY" != "$slug" ]] && return 0
  local h=$(( w * 9 / 16 )) d; d=$(duration "$file")
  local mw=720 mh=1280; (( w < 1600 )) && { mw=540; mh=960; }
  echo "→ $slug"
  ffmpeg -v error -y -i "$file" -filter_complex \
    "$(loop_graph "$d" "scale=$w:$h:force_original_aspect_ratio=increase,crop=$w:$h,$DENOISE")" \
    -map "[v]" "${X264[@]}" -crf 28 -maxrate "$rate" -bufsize 6M -g 48 "$OUT/$slug.mp4"
  ffmpeg -v error -y -i "$file" -filter_complex \
    "$(loop_graph "$d" "crop=w=trunc(ih*9/16/2)*2:h=ih:x=max(0\,min(iw-ow\,iw*$focus-ow/2)):y=0,scale=$mw:$mh,$DENOISE")" \
    -map "[v]" "${X264[@]}" -crf 29 -maxrate 1M -bufsize 2M -g 48 "$OUT/$slug-mobile.mp4"
  poster "$OUT/$slug.mp4" "$OUT/$slug.webp"
  poster "$OUT/$slug-mobile.mp4" "$OUT/$slug-mobile.webp"
}

# Média intégré au fil d'une page (un seul format, ratio conservé).
#   $1 slug   $2 source   $3 largeur   $4 hauteur
inline() {
  local slug=$1 file=$SRC/$2 w=$3 h=$4
  [[ -n "$ONLY" && "$ONLY" != "$slug" ]] && return 0
  local d; d=$(duration "$file")
  echo "→ $slug"
  ffmpeg -v error -y -i "$file" -filter_complex \
    "$(loop_graph "$d" "scale=$w:$h:force_original_aspect_ratio=increase,crop=$w:$h,$DENOISE")" \
    -map "[v]" "${X264[@]}" -crf 28 -maxrate 1.5M -bufsize 3M -g 48 "$OUT/$slug.mp4"
  poster "$OUT/$slug.mp4" "$OUT/$slug.webp"
}

# Reel 9:16 : scène recadrée, citation (halo blanc + texte encre, fondus)
# puis fondu vers l'écran de fin de la marque, comme sur Instagram.
#   $1 slug   $2 source   $3 position horizontale d'Anima
#   $4 ordonnée de la 1re ligne (px sur 960, choisie pour ne pas couvrir le visage)
#   $5… lignes de la citation
reel() {
  local slug=$1 file=$SRC/$2 focus=$3 TOP=$4; shift 4
  [[ -n "$ONLY" && "$ONLY" != "$slug" ]] && return 0
  echo "→ $slug"
  local W=540 H=960 SIZE=31 LEAD=42 T=12.4 i=0
  local alpha="if(lt(t,0.6),0,if(lt(t,1.8),(t-0.6)/1.2,if(lt(t,11.4),1,if(lt(t,$T),$T-t,0))))"
  local halo="" ink=""
  for line in "$@"; do
    printf '%s' "$line" > "$CACHE/$slug-$i.txt"
    local y=$(( TOP + i * LEAD ))
    halo+=",drawtext=fontfile=$FONT:textfile=$CACHE/$slug-$i.txt:fontsize=$SIZE:fontcolor=white:borderw=9:bordercolor=white:x=(w-text_w)/2:y=$y"
    ink+=",drawtext=fontfile=$FONT:textfile=$CACHE/$slug-$i.txt:fontsize=$SIZE:fontcolor=0x3A2E28:x=(w-text_w)/2:y=$y:alpha='$alpha'"
    i=$(( i + 1 ))
  done
  cat > "$CACHE/$slug.graph" <<EOF
[0:v]trim=end=13.2,setpts=PTS-STARTPTS,crop=w=trunc(ih*9/16/2)*2:h=ih:x=max(0\,min(iw-ow\,iw*$focus-ow/2)):y=0,scale=$W:$H,setsar=1,fps=24,format=yuv420p[scene];
color=c=white@0:s=${W}x${H}:r=24:d=13.2,format=rgba${halo},gblur=sigma=16,fade=t=in:st=0.6:d=1.2:alpha=1,fade=t=out:st=11.4:d=1:alpha=1[halo];
[scene][halo]overlay=format=auto${ink},format=yuv420p[txt];
[1:v]scale=$W:$H,setsar=1,fps=24,format=yuv420p[end];
[txt][end]xfade=transition=fade:duration=0.8:offset=$T[v]
EOF
  ffmpeg -v error -y -i "$file" -loop 1 -t 3 -i "$ASSETS/ecran-fin.jpg" \
    -/filter_complex "$CACHE/$slug.graph" -map "[v]" "${X264[@]}" -crf 27 -maxrate 1.1M -bufsize 2.2M -g 48 \
    "$OUT/$slug.mp4"
  poster "$OUT/$slug.mp4" "$OUT/$slug.webp" 2.4
}

# ---------------- Bannières de pages ----------------
scene accueil          grok-video-99eb4de6-fa3a-456a-ba30-d9a95693e34f.mp4 0.49 1920 2.4M
scene lecture-ame      grok-video-402dfe16-cc89-4880-bed2-c9d021a8daa2.mp4 0.66
scene accompagnements  grok-video-69a9a271-5c98-46d7-aec0-011fc44983a5.mp4 0.66
scene feng-shui        grok-video-2deab4d1-432a-4692-9853-e403badda9e6.mp4 0.57
scene mon-chemin       grok-video-fc986bb9-50ab-4301-a9ec-6c5f46050791-2.mp4 0.50 1280
scene embleme          grok-video-c39fb459-93ae-4e9f-b09b-94dbaf6a9c0f.mp4 0.50

# ---------------- Médias intégrés ----------------
# anima.jpg et feng-shui/1.png animés par Grok (même cadrage que les images).
inline anima-lune      grok-video-4f856afa-1b50-4d8e-9cd9-d8c0f968bc6b.mp4 720 960
inline terrasse        grok-video-dafafcb1-c8ce-45cc-8f0b-a378b2d93c93.mp4 1200 800

# ---------------- Reels (citations reprises des reels publiés) ----------------
reel reel-silence  grok-video-402dfe16-cc89-4880-bed2-c9d021a8daa2.mp4 0.68 612 \
  "“Le silence n’est pas vide.”" "Il laisse enfin de la place" "à ta voix."
reel reel-intuition grok-video-fc986bb9-50ab-4301-a9ec-6c5f46050791.mp4 0.50 770 \
  "Ton intuition parle doucement." "C’est le bruit autour de toi" "qui parle fort."
reel reel-ciel     grok-video-4f856afa-1b50-4d8e-9cd9-d8c0f968bc6b.mp4 0.50 800 \
  "Avant de lever les yeux vers le ciel," "il faut savoir regarder en soi."

ls -la "$OUT"
