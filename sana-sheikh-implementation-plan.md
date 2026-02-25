# SANA SHEIKH — FRONTEND ENGINEERING IMPLEMENTATION PLAN
### Website Revamp with Claude claude-opus-4-6 Integration
**Author:** Senior Frontend Engineer  
**Model:** `claude-opus-4-6`  
**Stack:** Next.js 15 · TypeScript · Framer Motion · Tailwind CSS · Anthropic SDK

---

## TABLE OF CONTENTS

1. [Architecture Overview](#architecture)
2. [Tech Stack Decisions](#tech-stack)
3. [Project Structure](#project-structure)
4. [Claude claude-opus-4-6 Integration Points](#claude-integration)
5. [Phase-by-Phase Build Plan](#phases)
6. [Section-by-Section Component Spec](#components)
7. [Animation Architecture](#animations)
8. [Performance Strategy](#performance)
9. [API Route Design](#api-routes)
10. [Deployment & Environment](#deployment)
11. [Effort Estimates](#estimates)

---

## 1. ARCHITECTURE OVERVIEW {#architecture}

```
┌─────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 APP ROUTER                │
├──────────────┬──────────────────────┬───────────────────┤
│   FRONTEND   │     API ROUTES       │   CLAUDE API      │
│              │                      │                   │
│  React 19    │  /api/contact        │  claude-opus-4-6  │
│  Framer      │  /api/generate-bio   │                   │
│  Motion      │  /api/project-brief  │  Used for:        │
│  Tailwind    │  /api/chat           │  - Contact qualify│
│  CSS         │                      │  - Bio generator  │
│              │                      │  - Project match  │
└──────────────┴──────────────────────┴───────────────────┘
         │                    │
         ▼                    ▼
   Vimeo Player API     Resend (email)
   (custom player)      (contact form)
```

The site is a **content-first, animation-enhanced** Next.js application. Claude claude-opus-4-6 powers three specific intelligent features — it's not an AI chatbot bolted on. It's woven into the UX to make it genuinely smarter than a static portfolio.

---

## 2. TECH STACK DECISIONS {#tech-stack}

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | RSC for static sections, edge routes for API, built-in image/video optimization |
| Language | **TypeScript strict** | Non-negotiable on any serious project |
| Styling | **Tailwind CSS v4 + CSS custom properties** | Utility-first for layout, CSS vars for design tokens (colours, fonts) |
| Animation | **Framer Motion 12** | Scroll-triggered animations, layout animations, gesture support |
| AI SDK | **Anthropic SDK `@anthropic-ai/sdk`** | Official SDK, streaming support, typed responses |
| Video | **Vimeo Player JS** | Custom player UI, no platform branding, HLS streaming |
| Email | **Resend** | Best-in-class deliverability, React Email templates |
| Fonts | **next/font** (self-hosted) | Zero layout shift, no external requests |
| Deployment | **Vercel** | Edge functions for API routes, ISR, automatic preview deploys |
| CMS | **Sanity v3** | Headless CMS for projects, no redeploys to add work |

### Why NOT Framer / Webflow
The current site is clearly a template-based tool (likely Framer). We're moving to a **custom-coded site** because:
- Full control over animation timing and sequencing
- Custom Vimeo player (impossible in Framer without iframe)
- Claude API integration in API routes (requires server-side code)
- Horizontal scroll section (unreliable in Framer)
- Custom cursor with lerp interpolation

---

## 3. PROJECT STRUCTURE {#project-structure}

```
sana-sheikh-portfolio/
├── app/
│   ├── layout.tsx              # Root layout, fonts, cursor, nav
│   ├── page.tsx                # Home (all sections assembled)
│   ├── globals.css             # Design tokens, base styles
│   └── api/
│       ├── contact/route.ts    # Contact form + Claude qualification
│       ├── generate/route.ts   # Claude-powered project brief gen
│       └── chat/route.ts       # Streaming chat (optional feature)
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # Sticky nav with active indicator
│   │   ├── CustomCursor.tsx    # Lerp cursor with states
│   │   └── PageTransition.tsx  # Film-splice scroll transitions
│   │
│   ├── sections/
│   │   ├── Hero.tsx            # Video bg + text reveal
│   │   ├── About.tsx           # Split layout + scroll text
│   │   ├── Showreel.tsx        # Custom Vimeo player
│   │   ├── FilmArchive.tsx     # Hover-video list
│   │   ├── Services.tsx        # Accordion expand
│   │   ├── Process.tsx         # Horizontal scroll
│   │   └── Contact.tsx         # Form + Claude lead qualify
│   │
│   ├── ui/
│   │   ├── VideoPlayer.tsx     # Custom Vimeo wrapper
│   │   ├── ProjectLightbox.tsx # Full-screen project modal
│   │   ├── FilmstripRule.tsx   # Decorative HR with sprockets
│   │   ├── GrainOverlay.tsx    # CSS film grain texture
│   │   ├── SectionLabel.tsx    # "001 / ABOUT" breadcrumb
│   │   └── DrawUnderline.tsx   # SVG stroke-dashoffset link
│   │
│   └── claude/
│       ├── ContactQualifier.tsx  # AI-powered form enhancement
│       └── StreamingResponse.tsx # Streaming text component
│
├── lib/
│   ├── anthropic.ts            # Anthropic client singleton
│   ├── vimeo.ts                # Vimeo player utilities
│   ├── animations.ts           # Shared Framer variants
│   └── sanity.ts               # CMS client + queries
│
├── hooks/
│   ├── useLerpCursor.ts        # Custom cursor with lag
│   ├── useScrollProgress.ts    # Section scroll tracking
│   ├── useVideoHover.ts        # Hover-to-play video logic
│   └── useHorizontalScroll.ts  # Pin + translate for Process
│
├── types/
│   ├── project.ts              # Project type from Sanity
│   └── contact.ts              # Contact form types
│
└── sanity/
    ├── schemas/
    │   ├── project.ts          # Project schema
    │   └── service.ts          # Services schema
    └── studio/                 # Sanity Studio (embedded)
```

---

## 4. CLAUDE claude-opus-4-6 INTEGRATION POINTS {#claude-integration}

This is what separates this portfolio from every other static site. Three specific places where `claude-opus-4-6` makes the site genuinely intelligent:

---

### 4.1 — Smart Contact Qualification

**What it does:** When a visitor fills in the contact form, before the message is sent to Sana, Claude analyzes the project description and enriches it — suggesting the right service category, estimating complexity, and drafting a preliminary reply for Sana to review.

**Why claude-opus-4-6:** This requires nuanced understanding of creative briefs, budget language, and project scope. claude-opus-4-6's reasoning is materially better than Sonnet for this kind of professional judgment.

```typescript
// app/api/contact/route.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(req: Request) {
  const { name, projectType, budget, vision } = await req.json();

  // Step 1: Claude qualifies and enriches the lead
  const qualification = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `You are helping AI filmmaker Sana Sheikh qualify a new project inquiry.
      
      Analyze this inquiry and return a JSON object with:
      - "serviceMatch": best matching service from [cinematic_ai_ad, music_video, short_film, concept_trailer, virtual_production, branded_content]
      - "complexityScore": 1-5 (1=simple, 5=complex multi-week production)
      - "budgetAssessment": "under_budget" | "good_fit" | "premium"
      - "suggestedTimeline": estimated production timeline in days
      - "keyQuestions": array of 2-3 clarifying questions Sana should ask
      - "draftReply": a warm, professional initial reply from Sana's voice
      
      Inquiry:
      Name: ${name}
      Project Type: ${projectType}
      Budget: ${budget}
      Vision: ${vision}
      
      Return ONLY valid JSON.`
    }]
  });

  const analysis = JSON.parse(
    (qualification.content[0] as { type: 'text', text: string }).text
  );

  // Step 2: Send enriched email to Sana via Resend
  await sendEnrichedEmailToSana({ name, vision, analysis });

  // Step 3: Send confirmation to client
  await sendConfirmationToClient({ name, draftReply: analysis.draftReply });

  return Response.json({ success: true, message: analysis.draftReply });
}
```

**User Experience:**
- Visitor fills the form and hits send
- Instant streaming response: *"Received. Based on your brief, this sounds like a cinematic AI ad project. Sana will be in touch within 48 hours."*
- Sana receives a pre-analyzed email with: project category, complexity score, suggested questions, and a draft reply she can send with one click

---

### 4.2 — AI-Powered Project Brief Generator

**What it does:** In the contact form, there's an optional "Generate a brief with AI" button. The visitor answers 3 quick questions about their brand/vision, and Claude generates a professional creative brief they can submit.

**Why this matters:** Many potential clients are brands or small business owners who *know* what they want visually but don't know how to articulate it in film terms. This removes a huge friction point.

```typescript
// app/api/generate/route.ts — streaming response
export async function POST(req: Request) {
  const { brandName, mood, references, audience } = await req.json();

  const stream = client.messages.stream({
    model: 'claude-opus-4-6',
    max_tokens: 800,
    messages: [{
      role: 'user',
      content: `Generate a concise, evocative creative brief for an AI filmmaker.
      
      Brand: ${brandName}
      Mood/feeling: ${mood}
      Visual references: ${references}
      Target audience: ${audience}
      
      Write in the style of a professional creative brief:
      2-3 sentences on concept, 1-2 on visual direction, 1 sentence on desired outcome.
      Avoid clichés. Be specific and cinematic.`
    }]
  });

  // Stream the response back to the client
  return new Response(stream.toReadableStream());
}
```

**Frontend Component:**
```typescript
// components/claude/BriefGenerator.tsx
'use client';
import { useState } from 'react';

export function BriefGenerator({ onBriefGenerated }: Props) {
  const [streaming, setStreaming] = useState('');

  const generate = async (formData: BriefFormData) => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setStreaming(prev => prev + decoder.decode(value));
    }
  };

  return (
    <div className="brief-generator">
      {/* Streaming text renders token-by-token — like watching AI write */}
      <p className="streaming-text">{streaming}</p>
    </div>
  );
}
```

---

### 4.3 — Intelligent Project Descriptions (Build-Time)

**What it does:** At build time (not runtime), a script uses Claude to generate rich, cinematic project descriptions for each film in the archive — based on metadata Sana provides in the CMS (title, tools, role, raw notes).

```typescript
// scripts/generate-descriptions.ts — run at build time
// npm run generate-descriptions → updates Sanity CMS

const projects = await sanityClient.fetch('*[_type == "project"]');

for (const project of projects) {
  if (project.aiDescription) continue; // skip if already generated

  const description = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 200,
    messages: [{
      role: 'user',
      content: `Write a 2-sentence cinematic project description for an AI filmmaker's portfolio.
      
      Project: ${project.title}
      Role: ${project.role}
      Tools: ${project.tools.join(', ')}
      Raw notes: ${project.rawNotes}
      Year: ${project.year}
      
      Tone: editorial, specific, confident. No AI clichés.
      First sentence: what it is. Second sentence: what makes it distinct.`
    }]
  });

  // Save back to Sanity
  await sanityClient.patch(project._id)
    .set({ aiDescription: description.content[0].text })
    .commit();
}
```

This means every project card has rich, professional copy without Sana having to write it herself — but it's generated offline at build time, so there's zero API latency at runtime.

---

## 5. PHASE-BY-PHASE BUILD PLAN {#phases}

### PHASE 0 — Foundation (Week 1)
**Goal:** Repo, tooling, design system, nothing visible yet.

- [ ] Init Next.js 15 with TypeScript strict mode
- [ ] Configure Tailwind v4 with design token CSS vars
- [ ] Set up `next/font` with Cormorant Garamond + Neue Montreal + JetBrains Mono
- [ ] Implement CSS custom properties for full design token system
- [ ] Set up Sanity v3 studio and define `project` + `service` schemas
- [ ] Configure Anthropic SDK client singleton with proper error handling
- [ ] Set up Resend for transactional email
- [ ] Environment variables: `.env.local` template committed, values in Vercel
- [ ] Deploy skeleton to Vercel — CI/CD pipeline active from day 1

```typescript
// lib/anthropic.ts — singleton pattern, never instantiate in components
import Anthropic from '@anthropic-ai/sdk';

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!client) {
    client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY, // server-side only, never expose
    });
  }
  return client;
}
```

**Critical rule:** `ANTHROPIC_API_KEY` is **never** in `NEXT_PUBLIC_` variables. All Claude calls go through Next.js API routes. The client side never touches the Anthropic SDK directly.

---

### PHASE 1 — Core Layout + Navigation (Week 1)
**Goal:** Shell of the site, nav functional, scroll tracking working.

- [ ] `Nav.tsx` — sticky, backdrop blur on scroll, active section indicator
- [ ] `CustomCursor.tsx` — lerp cursor with PLAY/hover states
- [ ] `SectionLabel.tsx` — "001 / ABOUT" breadcrumb component
- [ ] `GrainOverlay.tsx` — CSS noise texture overlay (performance: `will-change: none`, pointer-events: none)
- [ ] `useScrollProgress.ts` — IntersectionObserver-based section tracking
- [ ] `useActiveSectionContext.tsx` — React context for nav active state
- [ ] Page transition (film splice) — Framer AnimatePresence at route level

```typescript
// hooks/useScrollProgress.ts
export function useActiveSection(sections: string[]) {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach(obs => obs?.disconnect());
  }, [sections]);

  return active;
}
```

---

### PHASE 2 — Hero Section (Week 2)
**Goal:** The most important 3 seconds of the entire site.

- [ ] Full-viewport video background (Vimeo HLS, muted, loop, lazy-preload)
- [ ] Framer Motion staggered text reveal (blur → sharp per letter)
- [ ] Film grain overlay on video
- [ ] "SCROLL ↓" indicator with animated line
- [ ] CTA links with SVG underline draw animation
- [ ] Responsive: on mobile, use a still frame fallback (video is expensive on mobile data)
- [ ] `prefers-reduced-motion` media query: disable all animations, show static version

```typescript
// components/sections/Hero.tsx (simplified)
const letterVariants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: (i: number) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { delay: 1.0 + i * 0.06, duration: 0.5, ease: 'easeOut' }
  })
};

export function Hero() {
  const name = "SANA SHEIKH".split('');

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <HeroVideo src="your-vimeo-id" />
      <GrainOverlay />

      <div className="absolute inset-0 flex flex-col justify-center px-12">
        <h1 className="font-cormorant text-[clamp(4rem,12vw,10rem)] leading-none">
          {name.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              className={letter === ' ' ? 'mr-8' : ''}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0em' }}
          animate={{ opacity: 0.6, letterSpacing: '0.15em' }}
          transition={{ delay: 2.2, duration: 1.0 }}
          className="font-neue text-sm uppercase mt-6"
        >
          AI Filmmaker · Visual Story Architect
        </motion.p>
        <CTALinks />
      </div>

      <ScrollIndicator />
    </section>
  );
}
```

---

### PHASE 3 — Film Archive (Week 2–3)
**Goal:** The site's most important credibility section. Kill the YouTube grid.

- [ ] Sanity query for all projects, sorted by year DESC
- [ ] List layout: full-width rows with project number, title, role, year, tags
- [ ] `useVideoHover.ts` — replaces thumbnail with Vimeo clip on hover
- [ ] `ProjectLightbox.tsx` — full-screen modal with custom player + description
- [ ] Scroll-triggered row entry (slide right + fade)
- [ ] Horizontal rule with clip-path draw animation
- [ ] Mobile: tap to open lightbox directly (no hover state)

```typescript
// hooks/useVideoHover.ts
export function useVideoHover(vimeoId: string) {
  const [isHovering, setIsHovering] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<VimeoPlayer | null>(null);

  const onMouseEnter = async () => {
    setIsHovering(true);
    if (!playerRef.current) {
      playerRef.current = new VimeoPlayer(containerRef.current!, {
        id: vimeoId,
        muted: true,
        loop: true,
        background: true,
      });
      await playerRef.current.ready();
      setPlayerReady(true);
    }
    playerRef.current.play();
  };

  const onMouseLeave = () => {
    setIsHovering(false);
    playerRef.current?.pause();
  };

  return { isHovering, playerReady, onMouseEnter, onMouseLeave };
}
```

---

### PHASE 4 — About + Showreel (Week 3)

**About:**
- [ ] Split layout: editorial portrait (left) + bio text (right)
- [ ] Scroll-triggered line-by-line text reveal (Framer useInView)
- [ ] Portrait parallax — moves at 0.8× scroll speed using Framer useScroll + useTransform
- [ ] Faint prompt-text background element (CSS animation, 60s loop, 3% opacity)

**Showreel:**
- [ ] Oversized section heading (clips off edges intentionally)
- [ ] Full-width custom Vimeo player, 2.35:1 letterbox ratio
- [ ] Custom player controls: scrubber, play/pause word-button, time in mono font
- [ ] CSS filmstrip sprocket holes on sides (decorative, CSS-only)
- [ ] On video end: freeze-frame → fade to black → "SELECTED WORKS ↓" transition

---

### PHASE 5 — Services + Process (Week 4)

**Services:**
- [ ] Accordion component: each service is a full-width expandable row
- [ ] Expand reveals: description, still image from related project, brief spec table
- [ ] Hover state: title translates 8px right, divider line turns green

**Process (Horizontal Scroll):**
- [ ] `useHorizontalScroll.ts` — pins the section, converts vertical scroll to horizontal translate
- [ ] 5 full-viewport "slides": Concept, Prompting, Generation, Editing, Delivery
- [ ] Rewritten copy per step (3–4 sentences, specific)
- [ ] Visual artifacts: mood board collage, terminal prompt box (typewriter), grade slider
- [ ] Thin progress bar along bottom of pinned section

```typescript
// hooks/useHorizontalScroll.ts
export function useHorizontalScroll(totalSlides: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Convert vertical scroll progress to horizontal translate
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(totalSlides - 1) * 100}vw`]
  );

  return { containerRef, x };
}
```

---

### PHASE 6 — Contact + Claude Integration (Week 4–5)

- [ ] Contact form component (no `<form>` tag — controlled React state)
- [ ] Underline-style inputs with floating labels
- [ ] BriefGenerator component with streaming Claude response
- [ ] `/api/contact` route — Claude qualification + Resend dispatch
- [ ] `/api/generate` route — streaming brief generation
- [ ] Success state animation: form fades out, confirmation message fades in
- [ ] Professional email: `hello@ivysana.xyz` via Resend custom domain

---

### PHASE 7 — Polish + Performance (Week 5)

- [ ] Lighthouse audit: target 90+ Performance, 100 Accessibility
- [ ] All images: Next.js `<Image>` with correct sizes, WebP format
- [ ] All video: lazy-load below fold, `preload="none"`
- [ ] Font subsetting: Latin only, `font-display: swap`
- [ ] `prefers-reduced-motion` — test all animations disabled
- [ ] Keyboard navigation: all interactive elements focusable, skip links
- [ ] ARIA labels on all video players and lightboxes
- [ ] OG image: custom dynamic OG with `@vercel/og`
- [ ] Sitemap + robots.txt

---

## 6. SECTION-BY-SECTION COMPONENT SPEC {#components}

### Design Token Reference
```css
/* app/globals.css */
:root {
  /* Colours */
  --bg:           #080C0A;
  --bg-surface:   #0F1612;
  --text:         #F0EDE6;
  --text-muted:   #8A8880;
  --accent:       #00E87A;
  --accent-warm:  #C8B89A;
  --border:       rgba(240, 237, 230, 0.08);

  /* Typography */
  --font-display: 'Cormorant Garamond', serif;
  --font-ui:      'Neue Montreal', sans-serif;
  --font-mono:    'JetBrains Mono', monospace;

  /* Spacing */
  --section-px:   clamp(1.5rem, 6vw, 7rem);
  --section-py:   clamp(4rem, 10vh, 8rem);
}
```

---

## 7. ANIMATION ARCHITECTURE {#animations}

All shared animation variants live in `lib/animations.ts`:

```typescript
// lib/animations.ts
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
  })
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
  })
};

export const blurClearVariants = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: { opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: 'easeOut' }
  }
};

// Reusable scroll trigger wrapper
export function ScrollReveal({ children, variants, custom }: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      custom={custom}
    >
      {children}
    </motion.div>
  );
}
```

### Custom Cursor (lerp interpolation)
```typescript
// hooks/useLerpCursor.ts
export function useLerpCursor() {
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp: current + (target - current) * factor
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;

      // Update CSS custom properties (no React re-render)
      document.documentElement.style.setProperty('--cursor-x', `${pos.current.x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${pos.current.y}px`);

      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current!);
    };
  }, []);
}
```

Using CSS custom properties updated by `requestAnimationFrame` instead of React state is critical for cursor performance — React re-renders are too slow for 60fps cursor movement.

---

## 8. PERFORMANCE STRATEGY {#performance}

### Video Strategy
| Location | Source | Format | Size Target |
|---|---|---|---|
| Hero background | Vimeo (HLS) | H.264 | <8MB for 720p loop |
| Project hover clips | Vimeo (background API) | H.264 | <5MB per clip |
| Showreel | Vimeo (custom player) | H.264 | Full quality |
| About portrait | Self-hosted or Vimeo | WebM/H.264 | <3MB for loop |

**Rule:** No YouTube embeds anywhere. No raw `<video>` tags for anything over 2MB — everything goes through Vimeo or a CDN.

### Critical Rendering Path
- Fonts: `next/font` — zero FOUT
- Hero video: `preload="metadata"` for the hero, `preload="none"` everywhere else
- Images: `next/image` with `priority` on above-the-fold images only
- Code splitting: each section is a dynamic import with `{ ssr: false }` for animation-heavy components
- Claude API calls: all server-side, never blocking the render

### Bundle Budget
| Asset Type | Target |
|---|---|
| Total JS (compressed) | < 150KB |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.05 |

---

## 9. API ROUTE DESIGN {#api-routes}

```
POST /api/contact
  Body: { name, email, projectType, budget, vision }
  → Claude claude-opus-4-6: qualify lead, generate reply
  → Resend: send enriched email to Sana
  → Resend: send confirmation to visitor
  Returns: { success: boolean, message: string }

POST /api/generate  [STREAMING]
  Body: { brandName, mood, references, audience }
  → Claude claude-opus-4-6: generate creative brief
  Returns: ReadableStream (SSE)

GET /api/projects
  → Sanity GROQ query
  Returns: Project[]
  Cache: ISR, revalidate every 60s
```

### Error Handling Pattern
```typescript
// All API routes follow this pattern
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid input' }, { status: 400 });
    }

    // Rate limiting (Vercel KV or Upstash)
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
    const rateLimited = await checkRateLimit(ip, 'contact', 5, 3600); // 5/hr
    if (rateLimited) {
      return Response.json({ error: 'Too many requests' }, { status: 429 });
    }

    // Claude call with timeout
    const result = await Promise.race([
      callClaude(parsed.data),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), 15000)
      )
    ]);

    return Response.json({ success: true, ...result });

  } catch (error) {
    console.error('[contact/route]', error);
    // Graceful degradation: still send email, just without AI enrichment
    await sendBasicEmail(body);
    return Response.json({ success: true, message: 'Message received.' });
  }
}
```

**Graceful degradation is non-negotiable:** if the Claude API is down or slow, the contact form still works and the email still sends.

---

## 10. DEPLOYMENT & ENVIRONMENT {#deployment}

### Environment Variables
```bash
# .env.local (never commit — use Vercel dashboard for production)

# Anthropic
ANTHROPIC_API_KEY=sk-ant-...

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=...   # server-side only, for write operations

# Resend
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=hello@ivysana.xyz

# Rate limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

### Vercel Config
```json
// vercel.json
{
  "functions": {
    "app/api/contact/route.ts": { "maxDuration": 30 },
    "app/api/generate/route.ts": { "maxDuration": 60 }
  }
}
```

The generate route gets 60s because streaming a full Claude response can take 10–15s.

### Preview Deploys
Every PR gets a preview deploy. Sanity uses a `staging` dataset for preview, `production` for main. Zero risk of breaking the live site during development.

---

## 11. EFFORT ESTIMATES {#estimates}

| Phase | Task | Estimate |
|---|---|---|
| 0 | Foundation, tooling, CMS setup | 2 days |
| 1 | Layout shell, nav, cursor | 2 days |
| 2 | Hero section | 2 days |
| 3 | Film Archive (highest complexity) | 3 days |
| 4 | About + Showreel | 2 days |
| 5 | Services + Process (horizontal scroll) | 3 days |
| 6 | Contact + Claude API integration | 2 days |
| 7 | Polish, performance, accessibility | 2 days |
| **Total** | | **~18 working days** |

Realistic timeline with one senior frontend engineer: **4–5 weeks**.

With a second engineer splitting Phase 3 + Phase 5 in parallel: **3 weeks**.

---

## FINAL TECHNICAL NOTES

**On `claude-opus-4-6` specifically:** Use it only for the contact qualification where its reasoning depth is genuinely needed. For the brief generator (Phase 6) you could swap to `claude-sonnet-4-6` to reduce latency and cost — Sonnet is faster for streaming and the brief generation doesn't require Opus-level reasoning. The contact qualification stays on Opus because analyzing creative briefs, estimating complexity, and generating professional copy in Sana's voice benefits materially from the better model.

**Pricing awareness:** claude-opus-4-6 is $5/$25 per million tokens input/output. A contact form submission with qualification + reply generation uses roughly 800–1000 tokens. At typical portfolio traffic (10–30 serious inquiries/month), the monthly AI cost is under $0.50. Non-issue.

**On the Sanity CMS:** This is the right call for a filmmaker portfolio. Without a CMS, adding a new project means editing code. With Sanity, Sana can add a project in 5 minutes from her phone. The AI description generation script runs on-demand (`npm run generate-descriptions`) after she adds a project.

---

*Implementation plan authored for Sana Sheikh / ivysana.xyz revamp — February 2026*
*Stack: Next.js 15 · TypeScript · Framer Motion · Tailwind CSS · claude-opus-4-6 · Sanity · Vercel*
