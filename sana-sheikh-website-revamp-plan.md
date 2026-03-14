# SANA SHEIKH — WEBSITE REVAMP PLAN
### A Section-by-Section Creative Direction Document

---

## OVERARCHING CONCEPT: "THE DREAMING MACHINE"

The site should feel like you've stepped inside an AI's creative consciousness — not cold and robotic, but **warm, cinematic, and slightly surreal**. Like a film that knows it's a film. The experience should blur the line between the tool and the artist, because that's exactly what Sana's work does.

**Core feeling:** *A Criterion Collection Blu-ray met a generative AI model and had a very beautiful, slightly uncanny child.*

---

## TYPOGRAPHY SYSTEM

### Display Font — `Cormorant Garamond` or `Playfair Display`
Use for all hero headings and section titles. These are high-contrast serif fonts with dramatic thin-to-thick stroke variation — they feel cinematic, editorial, and timeless. Cormorant in particular has an almost engraved quality that pairs beautifully with AI-generated imagery.

**Why:** Every major film festival poster, arthouse cinema brand, and fashion film uses high-contrast serifs. It signals *serious filmmaker*, not *tech bro with a GPU*.

### Secondary Display — `Neue Montreal` or `Cabinet Grotesk`
Use for nav, labels, role tags, and UI text. A geometric grotesque that feels modern without being cold. Clean enough to contrast with the serif, personality-rich enough to not feel corporate.

### Body — `Instrument Serif` (italic variant) or `Lora`
Use for bio copy, project descriptions, and longer paragraphs. Slightly editorial, warm, and highly readable on dark backgrounds.

### Accent / Mono — `JetBrains Mono` or `Space Mono`
Use sparingly for tool tags (RUNWAY / MIDJOURNEY), process labels, and technical metadata. The contrast between the elegant serif headlines and monospace code-style tags visually communicates *artistry + technology* without saying a word.

### Type Scale
```
Hero Display:     120–160px  /  Cormorant Garamond  /  Light or Regular
Section Title:    64–80px    /  Cormorant Garamond  /  Regular
Sub-heading:      24–32px    /  Neue Montreal       /  Medium, tracked wide
Body:             16–18px    /  Instrument Serif    /  Regular, 1.7 line-height
Label/Tag:        11–13px    /  JetBrains Mono      /  Regular, 0.15em tracking
```

### Colour Refinement
Keep the dark base but evolve the palette:
- **Background:** `#080C0A` — near-black with a green undertone, feels like a darkroom
- **Primary Text:** `#F0EDE6` — warm off-white, not harsh pure white
- **Accent Green:** `#00E87A` — keep the current green but use it even more sparingly
- **Secondary Accent:** `#C8B89A` — a warm champagne/gold for editorial moments
- **Surface Cards:** `#0F1612` — barely-there dark green for card backgrounds

---

## SECTION 1 — HERO / LANDING

### Current Problem
Static text on a textured background. Zero footage. The site opens with words about a filmmaker instead of the filmmaker's actual work.

### The Vision: "Generative Entrance"

**Full-viewport experience.** On load, the screen is black. Then, as if being rendered in real time, a **looping AI-generated film clip** fades in — one of her strongest pieces, colour-graded and cropped to fill the entire viewport. No UI visible yet.

After 1.5 seconds, the name **SANA SHEIKH** appears in Cormorant Garamond, extremely large (spanning the full width), letters assembling from a slight blur — as if being generated, not typed. Think text materialising out of noise.

Below the name, in tracked-out Neue Montreal: `AI FILMMAKER  ·  VISUAL STORY ARCHITECT` — fades in slowly at about 0.3 opacity, barely visible, like a metadata watermark on a film frame.

Two CTAs appear last — but not buttons. Just two lines of text with a thin underline that draws itself: `→ WATCH SHOWREEL` and `→ EXPLORE WORK`. No boxy buttons. This is a filmmaker, not a SaaS product.

**The background video loops silently** with a very subtle film grain overlay — just enough grain to feel like film, not enough to feel like a filter.

### Animation Specs
| Element | Animation | Timing |
|---|---|---|
| Background video | Fade in from black | 0s → 0.8s, ease-in |
| Grain overlay | Static CSS noise texture, always present | — |
| "SANA SHEIKH" | Letters blur-to-sharp, staggered per letter | 1.0s → 2.2s |
| Subtitle line | Fade in, tracking expands from 0 to 0.15em | 2.0s → 2.8s |
| CTA lines | Slide up 12px + fade in | 2.6s → 3.2s |
| Underline draw | SVG stroke-dashoffset animation | 3.0s → 3.6s |

### Extra Detail
A barely-visible **"SCROLL"** label in JetBrains Mono appears at the bottom centre, with a thin vertical line slowly animating downward — like a film countdown strip.

---

## SECTION 2 — ABOUT: "CRAFTING THE FUTURE FRAME"

### Current Problem
Good copy, casual outdoor photo, the word "SECTION" plastered above the title.

### The Vision: "The Director in the Frame"

Split-screen layout. Left half is the **portrait** — but not a static image. It should be a short, looping, AI-directed self-portrait clip — her, in controlled lighting, slowly turning her head, or a subtle hair-movement loop. 3–4 seconds, seamless loop. Shot specifically for this purpose. It makes the "AI filmmaker" claim viscerally real — she directed her own portrait.

If a video portrait isn't feasible immediately, use a **high-contrast editorial still** — dramatic lighting, dark background, direct gaze. Treated with the same colour grade as her films.

The right side has the bio copy in Instrument Serif. But instead of the current text appearing all at once, it uses a **scroll-triggered line-by-line reveal** — each sentence fades and slides up as you scroll. Slow. Deliberate. Like a film's opening title cards.

A small detail: behind the text, very subtly, are **faint lines of generative prompt text** — actual prompts she uses — at near-zero opacity. The kind of thing you half-see and wonder if it's really there. It communicates her craft without explaining it.

### New Copy Direction
Replace the "SECTION" label with a small breadcrumb in JetBrains Mono: `001 / ABOUT`

Rewrite the headline:
> **Not generating.**
> **Directing.**

This single line immediately answers the sceptic's question about AI art.

### Animation Specs
| Element | Animation | Trigger |
|---|---|---|
| Portrait | Parallax — moves 20px slower than scroll | Scroll |
| Bio lines | Fade + 16px translate-Y, staggered 0.1s per line | Scroll into view |
| Prompt text BG | Extremely slow drift (CSS animation, 60s loop) | Always |
| Headline words | Each word animates separately, slight blur-clear | Scroll into view |

---

## SECTION 3 — SHOWREEL

### Current Problem
One YouTube embed floating on a black page.

### The Vision: "The Projection Room"

The section opens with the words `SHOWREEL 2025` in an extreme-scale Cormorant heading — so large the text clips off both sides of the screen. Intentionally oversized. Like a drive-in cinema sign.

Below it, instead of an embed, a **custom video player** — self-hosted or Vimeo with all branding stripped. The player is full-width but **not full-height** — it sits in a cinematic 2.35:1 letterbox ratio. The player controls are custom-designed: minimal scrubber, a single play/pause icon in Neue Montreal, a time counter in JetBrains Mono.

On hover, the player expands slightly (subtle scale transform). The play button is not a triangle icon — it's the word `PLAY` in tracked-out mono text with a thin circle drawn around it.

On the sides of the video, very faintly: vertical strips of filmstrip sprocket holes — CSS-generated, decorative, communicating *this is cinema*.

When the video ends, a **freeze-frame of the final shot** lingers, then slowly fades to black with the text `SELECTED WORKS ↓` appearing — transitioning into the Film Archive.

---

## SECTION 4 — FILM ARCHIVE: "SELECTED WORKS"

### Current Problem
YouTube embeds, no descriptions, no context, looks like a playlist.

### The Vision: "The Vault"

**Kill the grid. Use a cinematic list.**

Each project is a full-width row. On the left: the project number (`001`, `002`) in large, faded Cormorant. Then the title in bold Cormorant. Then year and role in small Neue Montreal. Then tool tags in JetBrains Mono pill tags.

On the right of the row: a **thumbnail still** (not a YouTube embed). When you hover on the row, the still **animates** — it becomes a short silent clip, 3–5 seconds, looping. Like a film reel coming alive. The row background subtly illuminates.

Click the row and a **lightbox** opens: full-screen, dark overlay, custom video player with no platform branding, project title, and a 2–3 sentence brief on the side. No YouTube. No red logo. Just the film.

This format is used by virtually every elite filmmaker and cinematographer portfolio — Fabrik, Cargo, Format all use this pattern because it works.

### Project Entry Format
```
001                PARTY AESTHETICS
                   Director & Editor  ·  2025
                   RUNWAY  PREMIERE PRO
                   
                   [hover → clip plays]
```

### Section Header
Replace "SECTION / FILM ARCHIVE" with:
```
002 / SELECTED WORKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
A full-width horizontal rule with the section number. Feels like a film slate.

### Animation Specs
| Element | Animation | Trigger |
|---|---|---|
| Row entry | Slide right 24px + fade in, staggered | Scroll |
| Project number | Scale from 1.2 to 1.0 + fade | Scroll |
| Thumbnail | Cross-fade from still to video clip | Hover |
| Row background | Opacity 0 → 0.06 (barely visible green) | Hover |
| Lightbox | Scale from 0.95 + fade in | Click |
| Horizontal rule | Draw left to right (clip-path animation) | Scroll |

---

## SECTION 5 — SERVICES: "CORE EXPERTISE"

### Current Problem
Generic icon cards, vague copy, template layout.

### The Vision: "The Offering"

Drop the card grid. Use a **full-width accordion / expandable list**.

Each service is one horizontal line. Service name on the left in large Cormorant. A thin horizontal rule. On hover, the line **expands downward**, revealing the description, a representative still from her work that uses that service, and a specific "Starting from / Typical timeline" line.

This feels high-end. It's how luxury agencies, editorial studios, and fashion houses present services. It also forces her to write better, more specific copy because each expansion has breathing room.

```
CINEMATIC AI ADS  ─────────────────────────────── ↓
  [expanded]
  High-concept brand films generated with Runway Gen-3,
  colour-graded in DaVinci, cut in Premiere Pro.
  Ideal for: product launches, fashion campaigns, luxury brands.
  
  [still image from Swiss Beauty project]
```

### Animation Specs
| Element | Animation | Trigger |
|---|---|---|
| Service row | Height 0 → auto, smooth ease | Click/Hover |
| Divider line | Colour shift white → green | Hover |
| Service name | Translate-X 8px right | Hover |
| Still image | Fade in with slight scale (1.02 → 1.0) | Expand |
| Number indicator | Increment counter animation (1→2→3) | Scroll |

---

## SECTION 6 — PROCESS: "PRODUCTION PIPELINE"

### Current Problem
A four-item numbered list with six words per step. Massive missed opportunity.

### The Vision: "Inside the Machine"

This section should be the most technically impressive part of the site. It's Sana's biggest differentiator — her process is genuinely unique and fascinating.

**Horizontal scroll section.** While the page scrolls vertically, this section pins itself and the content moves horizontally — each step of the pipeline is a full-viewport "slide" you scroll through. Like advancing through film frames.

Each step has:
- A large step number in faded Cormorant (background element, enormous, like `01`)
- The step name in headline type
- A 3–4 sentence description — real, specific, interesting
- A **visual artifact**: for CONCEPT, a mood board collage. For PROMPTING, actual prompt text in a terminal-style box. For GENERATION, a before/after of raw generation vs. refined output. For EDITING, a colour grade comparison slider.

This transforms a bullet list into an **immersive behind-the-scenes experience**. No other AI filmmaker does this. It becomes the most memorable section on the site.

### Step Content Rewrite
```
01 / CONCEPT
━━━━━━━━━━━━━━━━
Every film begins as a feeling. I build mood boards
that mix visual references, emotional notes, and 
colour stories — then translate that feeling into 
a generative brief the AI can actually understand.

[Mood board collage visual]

02 / PROMPTING
━━━━━━━━━━━━━━━━
The prompt is the script. Each word is a camera 
instruction, a lighting choice, a performance note.
I've developed a proprietary prompting framework
that produces consistent, directable results.

[Terminal box showing actual prompt text, typewriter animation]

03 / GENERATION
━━━━━━━━━━━━━━━━
Using Runway Gen-3, Midjourney, and Kling, I iterate
50–200 variations per scene — selecting, refining,
and re-prompting until each frame meets the vision.

[Side-by-side: raw generation vs. final output]

04 / EDITING
━━━━━━━━━━━━━━━━
The AI gives me the raw material. In Premiere Pro
and DaVinci Resolve, I compose, colour, and score —
bringing human editorial judgment to AI-generated imagery.

[Colour grade before/after slider]

05 / DELIVERY
━━━━━━━━━━━━━━━━
Final deliverables in 4K, colour-graded and mixed,
with full rights transfer and source file packages.
Typical turnaround: 7–14 days from brief to final cut.
```

### Animation Specs
| Element | Animation | Trigger |
|---|---|---|
| Section pin | CSS position:sticky, horizontal translate | Scroll |
| Step number BG | Parallax, moves slower than foreground | Scroll |
| Step content | Fade in as step enters viewport | Scroll |
| Prompt text | Typewriter effect, cursor blinks | Step enter |
| Grade slider | Drag interaction, reveals before/after | User drag |
| Progress bar | Thin line fills across bottom of section | Scroll |

---

## SECTION 7 — CONTACT: "LET'S WORK TOGETHER"

### Current Problem
A raw Gmail address and four social links. The highest-friction possible conversion path.

### The Vision: "The Pitch Room"

The section opens with the two-line headline (keep it — it's good), but the copy beneath it gets rewritten to be more specific and action-driving.

Then: a **custom contact form** with four fields:
1. Name
2. Project type (dropdown: Cinematic Ad / Music Video / Short Film / Concept Trailer / Other)
3. Budget range (dropdown: Under ₹50K / ₹50K–2L / ₹2L–10L / International Budget)
4. Tell me about your vision (textarea)

The form design matches the site aesthetic — no boxy white inputs. Instead, each field is just an **underline**. Label in JetBrains Mono floats above. Clean, minimal, editorial.

Submit button: not a button. The word `SEND →` in Cormorant italic, with an underline that draws itself on hover.

Below the form: the professional email `hello@ivysana.xyz` (not Gmail), and social links — but styled as horizontal text, not blue hyperlinks.

Add a **"Currently available for projects starting [Month]"** one-liner in JetBrains Mono. This creates scarcity and professionalism simultaneously.

### Animation Specs
| Element | Animation | Trigger |
|---|---|---|
| Form fields | Slide up + fade in, staggered 0.1s | Scroll |
| Input focus | Underline colour changes white → green | Focus |
| Label | Float up above the input | Focus/filled |
| Submit text | Underline draws on hover | Hover |
| Success state | "Received. I'll be in touch soon." fades in | Submit |

---

## NAVIGATION

### Current Problem
Standard top nav, no personality, nothing that reflects the brand.

### The Vision: "The Film Slate"

Keep the sticky top nav but restyle it:
- Logo stays left — but consider adding a small `●` record indicator before it that pulses slowly red (a camera recording light). Tiny detail. Instantly memorable.
- Nav links in Neue Montreal, tracked out, lowercase. `home  about  showreel  work  services  process  contact`
- On scroll past hero: the nav background becomes a very subtle dark glass (backdrop-filter: blur), not solid black.
- Active section indicator: a thin green underline that **slides** between nav items as you scroll through sections (not jumps — it slides like a filmstrip advancing).
- On mobile: nav collapses to a hamburger that, when opened, reveals a full-screen nav overlay with the nav links in enormous Cormorant, one per line, with a looping video background.

---

## CURSOR

Replace the default cursor with a **custom cursor**:
- Default state: a small circle outline (20px) that follows the mouse with a slight lag (lerp interpolation)
- Hover on video/project: the circle expands to 60px and the word `PLAY` appears inside it in JetBrains Mono
- Hover on links: the circle fills solid green
- Hover on text: the circle shrinks to a thin line (like a text cursor but circular)

This is a small detail that makes the entire site feel premium and intentional.

---

## PAGE TRANSITIONS

Between sections, use **film-cut transitions** triggered by scroll:
- A thin horizontal white line that sweeps across the screen (like a film splice) as you enter a new section
- Takes 0.15 seconds. Completely non-intrusive. But communicates *filmmaker* in the most subliminal way possible.

On initial page load, the entire site does a **projection warmup** — a brief (0.4s) flicker of white, then the site snaps in. Like a projector clicking on.

---

## PERFORMANCE NOTES

All video should be:
- Self-hosted or Vimeo (no YouTube embeds anywhere)
- Compressed with FFmpeg for web (H.264, CRF 23, faststart)
- Lazy-loaded below the fold
- `preload="none"` on all non-hero video
- The hero loop should be under 8MB, 720p is sufficient for a background clip

Fonts: load via Google Fonts or self-host. Subset to Latin characters only. Use `font-display: swap`.

---

## IMPLEMENTATION PRIORITY ORDER

| Priority | Section | Impact | Effort |
|---|---|---|---|
| 🔴 1 | Hero — video background + text animation | Highest | Medium |
| 🔴 2 | Film Archive — list format + hover video | Highest | High |
| 🔴 3 | Contact — form + professional email | High | Low |
| 🟡 4 | About — editorial photo + scroll animation | High | Medium |
| 🟡 5 | Showreel — custom player + letterbox | High | Medium |
| 🟡 6 | Typography system — apply globally | High | Low |
| 🟢 7 | Process — horizontal scroll + visuals | Medium | High |
| 🟢 8 | Services — accordion format | Medium | Medium |
| 🟢 9 | Custom cursor | Low | Low |
| 🟢 10 | Navigation — active indicator + mobile | Medium | Medium |

---

## THE ONE-LINE BRIEF FOR ANY DEVELOPER

> *Build a site that feels like you're watching a film about the person who makes films — where every scroll is an edit, every section is a scene, and leaving feels like the credits rolling.*

---

*Revamp plan by Claude for Sana Sheikh / ivysana.xyz — February 2026*
