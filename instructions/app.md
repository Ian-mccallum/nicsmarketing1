Single-Page App Design Document for Nic’s Marketing

This design document breaks down the build into atomic steps for an AI-driven implementation. Follow each step sequentially to construct a minimal black-and-white React SPA that pre-qualifies brand clients.

Client Details

Name: Nic’s Marketing

Founder: Nic, age 17

Description: A marketing agency run by a digital-native teen who helps brands run ads, sharpen brand positioning, drive sales, and scale operations.

Main Goal: Convert website visitors into qualified leads who apply to work with Nic.

Target Audience: Primarily clothing brands, with flexibility to serve beauty, tech, and other product/service-based businesses.

Brand Voice & Tone: Bold, confident, youthful, data-driven, focused on transformation.

Key Messaging Pillars:

Clear Positioning: Communicate unique value in under 5 seconds.

Conversion-Driven Content: Turn posts and ads into sales funnels.

Transformation Focus: Showcase before→after results.

Digital-Native Advantage: Leverage Gen‑Z insights and real-time trend mastery.

Social Proof: Incorporate early case studies or testimonials, e.g., clothing brand revenue growth metrics.

Primary CTAs:

“See If You Qualify” (opens prequalify form)

Instagram DM “READY”

Follow on social for weekly brand-scaling insights




4. Styling Guidelines

Color Palette: Only black (#000) for core backgrounds or text; white (#fff) for contrasting accents and visuals.

Background Design: Implement a subtle floating bubble motif:

Translucent white circles of varying size drifting upward.

Looping CSS keyframe animations with randomized duration and delay for organic motion.

Bubbles appear behind content, low opacity (~10%) to avoid distraction.

Typography:

Clean, sans-serif font (system default or Arial).

Headings: bold; h1 at 2.5rem, h2 at 2rem, h3 at 1.5rem.

Body text: 16px base size, line-height 1.5.

Spacing & Layout:

Mobile-first, centered content with max-width: 640px.

Consistent 8px spacing scale (e.g., margins and paddings of 16px, 24px).

Iconography:

Simple white line icons, uniform stroke width.

Buttons & Inputs:

1px solid white borders, transparent background by default.

Hover state: white background, black text, gentle scale-up (1.05×).

Padding: 12px × 24px; border-radius: 4px.

Animations & Motion:

Bubble Background: continuous upward float, slight horizontal drift, scale variations via CSS keyframes.

Element Entrances: fade-in and slide-up (300ms ease-out) on mount or scroll, staggered for lists/cards.

Interactive Micro-Animations: button press ripple, input focus glow, hover scale with smooth transitions (200ms).

Smooth Scroll: ease scrolling for internal links.

Dynamic Effects:

Form transitions: slide-in from bottom combined with fade when reveal.

Card hover: subtle shadow elevation and color inversion.

Accessibility:

Maintain at least 4.5:1 contrast ratio for text and interactive elements.

Offer prefers-reduced-motion fallback: disable non-essential animations and looped backgrounds.

5. Single-Page Section Breakdown & Atomic Tasks

All functionality will live within a single App.tsx file, organized into logical sections rather than separate component files. CSS modules or plain .css files remain in /src/styles.

5.1 App.tsx Structure

Import Assets & Styles

Import React, React Hook Form, Yup, Axios

Import global index.css and individual style sheets from /src/styles.

Define Main Sections as Functions or JSX Blocks:

Hero Section

Render <section id="hero"> containing:

<h1>: “Stop Chasing Clients. Become the Brand They Chase.”

<p> sub-headline: “At 17, I live and breathe today’s digital trends—so your brand speaks the language of tomorrow.”

<button>: “See If You Qualify” with onClick to scroll to form.

Digital-Native Callout

Render <section> with translucent white background banner:

Bold label: “Digital‑Native Advantage”

<ul> of three list items describing youth edge.

Pain Snapshot

Render <section> mapping over a local array of three pain objects:

Each item: a <div> card with title and description.

Apply fade-in animation on scroll.

Service Blurb

Render <section> containing a <ul> of three benefit bullets (positioning, conversion, transformation).

Pre-Qualification Form

Render <section id="form"> with a <form> managed by React Hook Form:

Fields: niche dropdown, brand URL, ad spend, pain radio group, contact inputs.

On submit: post to API via Axios and replace form JSX with inline thank-you message.

Display validation errors inline.

Animate form entrance and inline swap.

Social CTAs

Render <section> with two <a> buttons:

DM “READY” link to Instagram direct message.

Follow link to Nic’s profile.

Footer

Render <footer> with minimal contact info and copyright line.

5.2 CSS Organization

Global (index.css): reset, body styling.

Section Styles (/src/styles/*.css): one file per section (e.g., hero.css, form.css), imported at top of App.tsx or conditionally via CSS modules.

5.3 Hook & Utility Placement

useScrollTo Hook: defined in /src/hooks/useScrollTo.ts and used in Hero button.

api.ts: Axios instance in /src/utils/api.ts.

5.4 Rendering & Behavior

All sections rendered in order within App.tsx return statement.

Smooth-scroll, animations, and state transitions handled via React state/hooks and CSS.

6. Utilities & Hooks Analytics & Tracking (optional)

Event Logging: Console or endpoint logs for:

Hero CTA clicks

Form submissions





Code Comments: Document props, hooks, and CSS module usage.

End of Design Document.

