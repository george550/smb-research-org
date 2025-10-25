# Bay Area Small Business Money Flow Study - Design Guidelines

## Design Approach
**SF 49ers Inspired Theme**: Drawing inspiration from the San Francisco 49ers' iconic scarlet and gold color scheme, this design brings a bold, energetic Bay Area identity to the research study landing page while maintaining professionalism and accessibility.

## Core Design Elements

### A. Color Palette

**49ers-Inspired Color Scheme**
- Primary Red: `#AA0000` (49ers Scarlet Red)
- Secondary Gold: `#B3995D` (49ers Metallic Gold)
- Background: `#ffffff` (Pure White)
- Alternate Background: `#fef3f2` (Light red tint) and `#fefce8` (Light gold tint)
- Text Primary: `#1e1e1e` (Near Black)
- Text Secondary: `#525252` (Neutral Gray)
- Text on Red: `#ffffff` (White)
- Borders: `#e5e5e5` (Light Gray)

**Accent Colors**
- Primary Gradient: Red to gold (`from-red-600 via-red-500 to-amber-500`)
- Hero Background: Subtle red/gold gradient (`from-red-50 via-amber-50 to-yellow-50`)
- Interactive Elements: Scarlet red (`#AA0000`) for CTAs with white text
- Hover States: Darker red (`#8B0000`) or gold highlights
- Success/Active: Gold (`#B3995D`)

### B. Typography

**Font Stack**: System fonts (default Tailwind sans-serif)
- Hero Heading: `text-3xl md:text-5xl font-extrabold leading-tight text-neutral-900`
- Section Headings: `text-2xl md:text-3xl font-bold text-neutral-900`
- Body Text: `md:text-lg text-neutral-700` for hero, `text-neutral-600` for sections
- Small Text: `text-sm text-neutral-500`
- Navigation: `text-sm text-neutral-600` hover to `text-red-600`

### C. Layout System

**Spacing Primitives**: Tailwind units of `3`, `4`, `6`, `8`, `10`, `14`, `16`
- Section Padding: `py-14` (vertical), `px-4` (horizontal)
- Container Max-Width: `max-w-6xl mx-auto`
- Card Spacing: `gap-6` for grids, `space-y-4` for lists
- Component Padding: `p-6` for cards, `px-6 py-3` for buttons

**Grid Layouts**
- Two-column: `md:grid-cols-2` for Why section
- Three-column: `sm:grid-cols-3` for feature cards, category tags
- Responsive stacking: Mobile-first single column, scales up

### D. Component Library

**Navigation**
- Sticky header with `backdrop-blur` and `bg-white/95`
- Border bottom: `border-neutral-200`
- Logo/brand left, nav center (hidden on mobile), CTA right
- Links hover to red-600

**Buttons**
- Primary CTA: Scarlet red background (`bg-[#AA0000]`), white text, `rounded-2xl`, `shadow-lg`, `px-6 py-3`, `hover:bg-[#8B0000]`
- Secondary CTA: Border `border-neutral-300`, gold text (`text-[#B3995D]`), `rounded-2xl`, `hover:bg-red-50`
- Gold Accent Button: Gold background (`bg-[#B3995D]`), white text, `hover:bg-[#9B8050]`

**Cards**
- Background: `bg-white` with `border border-neutral-200`
- Accent cards: Light red tint `bg-red-50` or light gold `bg-amber-50`
- Border Radius: `rounded-2xl` or `rounded-xl`
- Shadow: `shadow-sm` for subtle depth, `shadow-md` for elevated cards
- Internal spacing: `p-6`

**Content Sections**
- Alternating backgrounds: White, light red tint (`bg-red-50`), and light gold tint (`bg-amber-50`)
- Dividers: `border-t border-neutral-200` between sections
- Text containers: `max-w-3xl` for readability

**Visual Elements**
- Icons: Use lucide-react icons in `text-red-600` (primary) or `text-[#B3995D]` (gold accent)
- Bullet points: `h-2.5 w-2.5 rounded-full bg-red-600` or `bg-[#B3995D]`
- List items: Flex layout with `gap-3`
- Gradient overlay: Red to gold gradient in hero section

### E. Responsive Behavior

**Breakpoints**
- Mobile: Base styles (single column, stacked navigation)
- Tablet: `md:` prefix (two-column grids, visible nav)
- Desktop: Full multi-column layouts, larger typography

**Mobile Optimizations**
- Hide desktop navigation: `hidden md:flex`
- Stack buttons: `flex-col sm:flex-row`
- Reduce hero text: `text-3xl` to `md:text-5xl`
- Single column grids convert to multi-column at breakpoints

### F. Interaction States

**Hover Effects** (49ers themed)
- Text links: `text-neutral-600` to `text-red-600`
- Buttons: Red darkens to `#8B0000`, gold to `#9B8050`
- Cards: Optional `hover:shadow-md` or `hover:border-red-200`
- Navigation: Color shift to scarlet red

**Focus States**
- Ring color: `ring-red-500` for form inputs
- Outline: Red accent for accessibility

## Key Design Principles

1. **Bay Area Pride**: Bold 49ers colors create instant local recognition and connection
2. **Energy & Trust**: Red conveys passion and urgency while gold adds prestige
3. **High Contrast**: Maintains accessibility with dark text on light backgrounds
4. **Consistency**: Repeated red/gold accents throughout all components
5. **Mobile-First**: All layouts gracefully collapse to single column
6. **Professional**: Sports-inspired but still suitable for research context

## Color Usage Guidelines

- **Red (#AA0000)**: Primary CTAs, important headings, icons, links, active states
- **Gold (#B3995D)**: Accents, secondary elements, success states, highlights
- **White**: Main background, card surfaces
- **Light tints**: Alternating section backgrounds (red-50, amber-50)
- **Neutral grays**: Body text, borders, subtle elements

## Images

**Hero Background** - The Golden Gate Bridge image serves as a dramatic hero background, reinforcing the Bay Area local identity. The image uses a dark gradient overlay (from-black/70 via-black/60 to-black/50) to ensure white text remains highly readable while showcasing the iconic SF landmark.
