# Anima — botanical wind and guestbook

## Art direction

Match the supplied personnage_original.jpg identity illustration: soft watercolor texture,
fine warm copper contours, pearl pink petals, ivory highlights and seafoam/sage leaves.
Preserve the site's Cormorant Garamond and Dancing Script typography and existing palette.

Source: OpenAI built-in Imagegen, 2026-09-11, with the supplied identity illustration as
style reference. The final white-background artwork is a 640 × 960 WebP (41 KB). CSS
multiply blends it into the light watercolor section; it is not an alpha-transparent asset.
The flower, stem and leaves retain the generated drawing rather than hand-drawn vectors.

Generation direction: a single enchanted blush rose on a graceful curved stem with
elongated sage leaves, softly modeled watercolor petals, fine sepia outlines and pearl
highlights. No person, moon, scenery, text or watermark. Final background: clean white.

## Wind

A textured WebGL mesh bends the artwork continuously. A damped spring responds to varying
gusts: the stem stays rooted, upper curvature increases, the corolla lags, and local fields
flutter the leaf tips and outer petals. There is no whole-image rotation animation.

The original image remains as a fallback until the mesh renders. Reduced-motion preference,
unavailable WebGL and context loss retain the still image. Offscreen components release the
renderer and hidden documents suspend animation frames. Device pixel ratio is capped at two.

## Guestbook

Open ivory spread, blush cover, layered page edges, recessed gutter, botanical frontispiece
and a ribbon bookmark. Pages have fixed content and a physical recto/verso order:
frontispiece / Ksenia, Jenny / Laura, Leslie / Karine, Cindy / Julian. Turning a sheet
reveals two new pages; the previous right-hand testimonial never becomes the next left page.
For example, the first moving sheet has Ksenia on its recto and Jenny on its verso,
with Laura beneath it. Backward turns reverse that same sheet.

Twenty connected strips bend the moving sheet in 3D. Their integrated tangents keep
the binding fixed, the outer edge leads the paper, and local shading follows the bend.
Each face retains the full page layout, clipped to its strip; moving copies are hidden
from assistive technology and removed when the turn finishes. No animation loop remains
between turns. Direct non-adjacent jumps settle immediately. Mobile reads each physical
page individually, including the frontispiece, without skipping left-hand testimonials.
Reduced motion changes pages immediately. Resizing during a turn settles its destination.

The seven existing testimonials remain verbatim in testimonials.ts. Hidden sizing copies
reserve the tallest entry without truncation or nested scrolling. Navigation uses previous /
next buttons, keyboard arrows, horizontal touch swipes and named direct links. Visible focus,
page count announcements and boundary states support navigation. The private submission route
remains unlinked. These are the existing published entries, not a new live backend.

## Verification

- Production build, TypeScript, changed-component ESLint and whitespace check passed.
- Source comparison confirms all seven testimonials were preserved verbatim.
- Visual reviews at 390, 768 and 1440 pixels: clean background blending, no horizontal overflow,
  full testimonial text; article scrollHeight equals clientHeight even for the longest entry.
- Production browser: mesh ready and visible, changing flower poses, renderer removed offscreen.
- Corrected guestbook browser checks: all four spreads forward, reverse turns and keyboard
  return to the frontispiece; last-page next is disabled. Mid-turn screenshots confirm the
  curved sheet and distinct recto/verso content. No console errors or warnings.
- At 768 pixels both pages fit without internal overflow. At 390 pixels the frontispiece
  and all seven testimonials are reachable in order, with no clipped text or horizontal overflow.
- Reduced-motion and WebGL fallback paths reviewed in code; OS media preference was not changed.
