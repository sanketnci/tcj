# The Car Journal - Premium Automobile Blog

## 1. Concept & Vision

The Car Journal is a premium automotive editorial platform that bridges the gravitas of classic car journalism with the sleek sophistication of modern luxury brand experiences. The site feels like stepping into a high-end showroom — dark, dramatic, with moments of metallic brilliance. Every scroll reveals automotive photography in its finest light, backed by typography that commands respect.

## 2. Design Language

### Aesthetic Direction
**"Darkroom Elegance"** — Think the lighting of a luxury car reveal: deep blacks, controlled highlights, metallic accents catching ambient light. The design draws from the editorial sophistication of magazines like Octane and the digital refinement of Porsche's configurator.

### Color Palette
```
--bg-primary: #0a0a0a        /* Near-black base */
--bg-secondary: #141414      /* Elevated surfaces */
--bg-tertiary: #1a1a1a       /* Cards, panels */
--bg-light: #fafafa          /* Light mode primary */
--bg-light-secondary: #f5f5f5 /* Light mode surfaces */

--text-primary: #ffffff      /* Primary text on dark */
--text-secondary: #a1a1a1   /* Muted text */
--text-dark: #1a1a1a         /* Text on light backgrounds */
--text-dark-secondary: #6b6b6b /* Muted text on light */

--accent-gold: #c9a962       /* Primary accent - muted gold */
--accent-silver: #b8b8b8     /* Secondary accent - metallic silver */
--accent-copper: #b87333     /* Tertiary accent - copper warmth */

--gradient-dark: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 100%)
--gradient-gold: linear-gradient(135deg, #c9a962 0%, #e8d5a3 50%, #c9a962 100%)
--gradient-metallic: linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 50%, #2a2a2a 100%)

--glass-bg: rgba(20, 20, 20, 0.7)
--glass-border: rgba(255, 255, 255, 0.08)
```

### Typography

**Headings (Blackletter / Old London Style)**:
- Font: `IM Fell English SC` (primary) — A classic blackletter-style font reminiscent of Old London typography
- Weight: 400
- Letter-spacing: 0.05em
- Use for: Hero titles, section headers, logo, featured content

**Logo**: Features a car icon with the "The Car Journal" title in blackletter font for a classic editorial feel

**Subheadings (Elegant Serif)**:
- Font: `Cormorant Garamond`, serif
- Weight: 500-600
- Use for: Card titles, subsection headers

**Body (Modern Sans)**:
- Font: `Manrope`, system-ui, sans-serif
- Weight: 400-500
- Use for: All body text, navigation, buttons

**Mono/Technical**:
- Font: `JetBrains Mono`, monospace
- Use for: Specs, prices, technical data

### Spatial System
```
--space-xs: 0.25rem    /* 4px */
--space-sm: 0.5rem     /* 8px */
--space-md: 1rem       /* 16px */
--space-lg: 2rem       /* 32px */
--space-xl: 4rem       /* 64px */
--space-2xl: 8rem      /* 128px */

--section-padding: clamp(4rem, 10vw, 8rem)
--container-max: 1400px
--content-max: 800px
```

### Motion Philosophy
All animations serve to create depth and guide attention. Never decorative for its own sake.

- **Entrance**: Fade up (y: 30px → 0), opacity 0 → 1, duration 600ms, ease-out
- **Stagger**: 100ms between sibling elements
- **Hover states**: Scale 1.02, shadow elevation, duration 300ms
- **Page transitions**: Crossfade with subtle vertical shift
- **Parallax**: Subtle (0.3-0.5 multiplier), never disorienting
- **Scroll reveals**: Trigger at 20% visibility, fade + slide

### Visual Assets
- **Icons**: Lucide React — thin stroke weight, consistent 24px
- **Images**: High-quality automotive photography from Unsplash (cars, driving)
- **Decorative**: Subtle grain texture overlay, thin gold lines as dividers
- **Patterns**: Very subtle diagonal lines for texture areas

## 3. Layout & Structure

### Page Architecture
```
┌─────────────────────────────────────────────┐
│  NAVBAR (sticky, blur on scroll)           │
├─────────────────────────────────────────────┤
│  HERO (100vh, cinematic, parallax bg)       │
├─────────────────────────────────────────────┤
│  FEATURED REVIEWS (light section break)     │
├─────────────────────────────────────────────┤
│  GARAGE GEMS (dark, metallic accents)       │
├─────────────────────────────────────────────┤
│  LATEST NEWS (editorial list layout)        │
├─────────────────────────────────────────────┤
│  GALLERY (masonry, dark)                    │
├─────────────────────────────────────────────┤
│  SOCIALS (minimal, icons)                    │
├─────────────────────────────────────────────┤
│  CONTACT (centered, elegant form)           │
├─────────────────────────────────────────────┤
│  FOOTER (minimal)                           │
└─────────────────────────────────────────────┘
```

### Visual Pacing
- Hero: Full bleed, dramatic, high impact
- Featured Reviews: Breathing room, cards with generous whitespace
- Garage Gems: Dark and moody, tighter composition
- News: Clean, editorial rhythm
- Gallery: Immersive, grid dominates
- Contact: Minimal, focused

### Responsive Strategy
- Mobile-first base styles
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
- Navigation collapses to hamburger at md
- Card grids: 1 col mobile, 2 col tablet, 3 col desktop
- Hero typography scales fluidly with clamp()

## 4. Features & Interactions

### Navbar
- **Default state**: Transparent background, white text, visible logo
- **Scrolled state**: Glass effect (blur 12px, bg opacity 70%), subtle shadow
- **Mobile**: Full-screen overlay menu with staggered link reveals
- **Dropdown**: Reviews dropdown with smooth height animation

### Hero Section
- **Background**: High-res car image with parallax scroll
- **Overlay**: Bottom-heavy gradient for text readability
- **Content**: Animated title reveal (word-by-word), subtitle fade, CTA pulse
- **Interaction**: Scroll indicator with bounce animation

### Featured Reviews
- **Layout**: 3-column grid (responsive)
- **Card hover**: 
  - Image scales 1.05
  - Card lifts 8px with shadow increase
  - Category tag slides in
- **Data shown**: Image, category, title, excerpt (2 lines)

### Garage Gems
- **Layout**: Horizontal scroll carousel with snap points
- **Card design**: Dark glass background, gold accent border on hover
- **Data shown**: Image, car name, price range, brief description
- **Controls**: Drag to scroll, subtle scroll indicators

### Latest News
- **Layout**: 2-column grid with featured item spanning full width
- **Style**: Minimal cards with thin borders, no images
- **Interaction**: Hover reveals read time and category

### Gallery
- **Layout**: Masonry grid (3-4 columns desktop)
- **Lightbox**: 
  - Opens with scale animation from thumbnail
  - Dark overlay fades in
  - Close on X, escape, or overlay click
  - Arrow navigation between images
- **Hover**: Subtle zoom and overlay with "expand" icon

### Socials
- **Layout**: Centered row of icon buttons
- **Hover**: Icon scales up, color shifts to accent gold
- **Platforms**: Instagram, YouTube, Twitter/X, Facebook

### Contact Form
- **Fields**: Name, Email, Message (textarea)
- **Validation**: Real-time with subtle error states
- **Submit**: Loading state, success message
- **Design**: Minimal inputs with bottom border only

### Dark Mode Toggle
- **Location**: Navbar, right side
- **Animation**: Smooth icon rotation, 300ms transition
- **Persistence**: localStorage

## 5. Component Inventory

### Button
- **Variants**: Primary (gold bg), Secondary (outline), Ghost (text only)
- **Sizes**: sm, md, lg
- **States**: default, hover (brightness), active (scale down), disabled (opacity 50%)
- **Animation**: Subtle lift on hover

### Card (Review)
- **Structure**: Image container, content area (category, title, excerpt)
- **States**: default, hover (elevated), loading (skeleton)
- **Variants**: Featured (larger), Standard, Compact

### Card (Garage Gem)
- **Structure**: Image, price badge, content overlay
- **States**: default, hover (border highlight)
- **Design**: Dark glass effect

### NavLink
- **States**: default, hover (underline slide), active (gold accent)
- **Animation**: Underline grows from center

### Input / Textarea
- **States**: default, focus (gold border), error (red border), disabled
- **Design**: Minimal, bottom border style

### Lightbox
- **States**: closed, opening (scale 0.9→1), open, closing
- **Controls**: Close button, prev/next arrows, image counter

### Section
- **Props**: title, subtitle, dark/light variant
- **Animation**: Fade in on scroll

### Tag/Chip
- **Variants**: Category (gold), Meta (silver)
- **Size**: Small, consistent

## 6. Technical Approach

### Framework & Build
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations

### Project Structure
```
src/
├── app/
│   ├── layout.tsx         # Root layout with fonts, providers
│   ├── page.tsx           # Homepage
│   └── globals.css         # Global styles, Tailwind
├── components/
│   ├── ui/                 # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Section.tsx
│   │   └── Lightbox.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── FeaturedReviews.tsx
│       ├── GarageGems.tsx
│       ├── LatestNews.tsx
│       ├── Gallery.tsx
│       ├── Socials.tsx
│       └── Contact.tsx
├── lib/
│   ├── data.ts             # Mock data
│   └── utils.ts            # Helper functions
├── providers/
│   └── MotionProvider.tsx  # Framer Motion wrapper
└── types/
    └── index.ts            # TypeScript interfaces
```

### Key Implementation Details
- Use `next/font` for Google Fonts optimization
- `useScroll` and `useTransform` for parallax effects
- `useInView` for scroll-triggered animations
- `AnimatePresence` for page transitions and modals
- CSS custom properties for theme colors
- `localStorage` for dark mode persistence

### Image Handling
- Use `next/image` for optimization
- Placeholder blur for loading states
- Priority loading for above-fold images

### Accessibility
- Semantic HTML throughout
- ARIA labels on interactive elements
- Focus visible states
- Color contrast AA compliant
- Reduced motion media query support
