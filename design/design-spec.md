# Fairy-tale botanical rose — Anima

Preserve the existing cream background, warm-heart pink panel, Cormorant typography,
layout and copy. Replace only the decorative flower beside “Une porte vers vous-même”.

Art direction follows the user-provided personnage_original.jpg identity illustration:
watercolor texture, delicate warm sepia contours, pearl pink petals, ivory highlights,
and elongated seafoam/sage leaves. Keep convincing petal volume, with a poetic illustrated
finish. The user explicitly preferred this direction after the first photographic draft.
Source: OpenAI built-in Imagegen, generated 2026-09-11 using the supplied identity image
as style reference. The final white-background source is optimized to a 640 × 960 WebP. CSS multiply
blends its white surround into the existing light watercolor background. This asset
is designed for the current light section; it is not an alpha-transparent cutout.

Use a slow, small breeze anchored at the bottom of the stem. Pause outside the viewport;
show a still flower when reduced motion is requested. Keep the asset decorative and
reserve its dimensions before loading. Component-specific size and motion tokens live
in AnimatedRose.module.css; existing site colors remain in app/theme.ts.

## Generation prompt

Standalone enchanted blush rose, tall graceful curved stem, elongated seafoam sage leaves.
Match the reference illustration's softly textured watercolor, fine muted sepia pencil
outlines, pale rose pink, pearl ivory and peach. Gently opening rose, organic curled
petals with graceful tips, natural volume, translucent edges, softly modeled washes,
understated pearl shimmer and very sparse ivory pollen. Final finishing edit: clean white background without checkerboard or background texture.
No woman, moon, scenery, paper background, text, watermark or photographic rendering.

## Validation

- Production build and TypeScript: passed.
- ESLint for the new component and git diff whitespace check: passed.
- Browser review at 390, 768 and 1440 pixels: no horizontal overflow; rose and copy visible.
- First visual pass revealed a white rectangle caused by an ancestor stacking context.
  Removing that wrapper's unnecessary z-index restored blending with the watercolor background.
- Final visual pass: botanical edges blend into the cream section; live transform matrices
  confirm the breeze advances. Offscreen animation is paused using IntersectionObserver.
- Reduced motion is handled by a CSS media rule that removes the animation entirely.
