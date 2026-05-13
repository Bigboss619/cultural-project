## Portfolio.jsx Executives Carousel - Implementation Plan

### Information Gathered
- `frontend/src/components/AboutUs/Portfolio.jsx` is currently an empty component.
- Existing AboutUs components use Tailwind classes and a consistent palette:
  - Accent: `#D4A574`
  - Dark text: `#1A1A1A`
  - Secondary accent: `#B85C3C`
  - Layout backgrounds: `bg-white`, `bg-[#F5F1E8]`, gradients to `white`.
- No existing carousel library usage found in `frontend/src`.

### Plan
1. Implement `Portfolio` as an executivies carousel using plain React + Tailwind (no new dependencies).
2. Define an `executives` array with objects: `{ name, role?, imageSrc }`.
   - Image paths default to `/images/<name>.jpg` (placeholders) in `frontend/public/images/`.
3. Use a horizontally scrollable container with CSS scroll-snap and controlled navigation:
   - Left/Right buttons
   - Dot indicators (active index)
4. Ensure styles reuse the existing color palette (no new color values).
5. Verify component renders without runtime errors.

### Dependent Files to be edited
- `frontend/src/components/AboutUs/Portfolio.jsx`

### Followup steps
- Run frontend lint/build if available.
- If you provide real executive names/photos, update the `executives` array accordingly.


