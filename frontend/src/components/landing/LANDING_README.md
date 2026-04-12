# AgriManage Landing Page

## Overview
Premium SaaS landing page for Agriculture Management System built with React, TypeScript, and Tailwind CSS.

## Components Created

### Core Components
1. **Navbar.tsx** - Sticky navigation with mobile menu
2. **HeroSection.tsx** - Full-screen hero with background image
3. **TrustSection.tsx** - Partner logos and trust indicators
4. **ProblemSection.tsx** - Highlights farming challenges
5. **SolutionSection.tsx** - Digital solutions overview
6. **StatsSection.tsx** - Key metrics and statistics
7. **FeaturesSection.tsx** - 8 feature cards
8. **UseCasesSection.tsx** - Target audience segments
9. **DashboardPreview.tsx** - Analytics with Recharts
10. **HowItWorks.tsx** - 4-step process
11. **WhyChooseUs.tsx** - Value propositions
12. **ComparisonSection.tsx** - Traditional vs Digital
13. **Testimonials.tsx** - User reviews
14. **FAQ.tsx** - Accordion-style FAQs
15. **CTASection.tsx** - Final call-to-action
16. **Footer.tsx** - Links and developer info

### Main Page
- **LandingPage.tsx** - Orchestrates all components

## Design System

### Colors
- Primary: Emerald (green) - `emerald-500`, `emerald-600`
- Accent: Amber - `amber-400`, `amber-500`
- Background: White / Gray-50
- Text: Gray-900 / Gray-600

### Typography
- Headings: **Sora** (Google Fonts)
- Body: **Inter** (Google Fonts)

### Spacing
- Sections: `py-20` or `py-24`
- Cards: `p-6` or `p-8`
- Gaps: `gap-6` or `gap-8`

### Components
- Rounded corners: `rounded-xl`
- Shadows: `shadow-md`, `shadow-xl`
- Hover effects: `hover:scale-105`, `hover:shadow-xl`
- Transitions: `transition-all`

## Features

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`
- Mobile hamburger menu
- Responsive grids

### Interactions
- Smooth scrolling
- Hover animations
- Accordion FAQ
- Sticky navbar with backdrop blur

### Analytics
- Recharts integration
- Pie chart for crop distribution
- Line chart for yield trends
- Interactive tooltips

## Usage

### Routing
The landing page shows by default at `/`. 
- Click "Get Started" or "Login" to access the app
- App routes: `/app`, `/login`, `/register`

### Navigation
All sections have IDs for anchor links:
- `#home`
- `#features`
- `#analytics`
- `#use-cases`
- `#faq`
- `#contact`

## Customization

### Update Content
Edit individual component files to change:
- Text content
- Statistics
- Features list
- Testimonials
- FAQ questions

### Update Colors
Modify Tailwind classes:
- Replace `emerald` with your brand color
- Update gradient combinations
- Adjust opacity values

### Update Images
Replace hero background image URL in `HeroSection.tsx`:
```typescript
src="YOUR_IMAGE_URL"
```

## Dependencies
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)
- Recharts (analytics)

## Performance
- Optimized images
- Lazy loading ready
- Minimal dependencies
- Clean component structure

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Credits
Developed by Satyapal Janghela
