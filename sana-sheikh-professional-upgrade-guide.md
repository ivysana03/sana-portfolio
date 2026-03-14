# HOW TO MAKE IVYSANA.XYZ GENUINELY PROFESSIONAL
### The Complete Detail Guide — Beyond the Revamp Plan
**For:** Sana Sheikh / ivysana.xyz  
**Purpose:** Transform a competent portfolio into an undeniable professional statement  
**Principle:** Specificity over polish. Emotion over information. Proof over claims.

---

## THE FOUNDATIONAL PHILOSOPHY

Before a single line of code is written, everyone involved needs to internalise one idea:

> **Professional websites don't tell you someone is talented. They make you feel it before you've read a word.**

Every decision — colour, type size, animation timing, copy, image crop, section order — should be made through this lens: *does this make a visitor feel something, or does it just inform them of something?*

Sana's current site informs. The revamp needs to make people feel.

The model for this is not other filmmaker portfolios. The model is the films themselves. How does "Woman in the Fields" make you feel? Warm, slightly melancholic, intimate, unhurried. Every design decision should be held against that feeling. If it doesn't reinforce it, it shouldn't be there.

---

## PART 1: IDENTITY & VISUAL LANGUAGE

### 1.1 — The Colour Palette Problem (Critical Fix)

The current neon green on black says: tech startup, crypto project, developer portfolio. It is the visual language of the AI industry, not the visual language of cinema. Sana needs to look like a filmmaker who uses AI — not an AI product that makes films.

**The fix is not to abandon the dark palette — it's to warm it.**

Pull the palette directly from her films. Watch "Woman in the Fields," pause on the warmest frame, and sample those colours. The result should be something like this:

```
Background base:     #0A0806    — near-black with a warm brown undertone
                                  (not green-black like current)

Background surface:  #120F0B    — slightly warmer dark for cards/panels

Primary text:        #F2EDE4    — warm off-white, like aged paper
                                  (not pure white — pure white is harsh and digital)

Primary accent:      #C8A97A    — warm amber/gold
                                  (replaces the neon green as the DOMINANT accent)
                                  used for: hero subtitle, section numbers, hover states

Secondary accent:    #3D6B4F    — deep forest green
                                  (the green becomes secondary, used sparingly)
                                  used for: interactive elements, CTAs, underlines

Tertiary:            #8C7355    — warm mid-tone
                                  used for: muted text, tags, metadata
```

**Why amber/gold instead of neon green:**
The amber reads as cinematic. It evokes film projection light, golden hour cinematography, the warm whites of analogue film. Neon green reads as terminal output. One says Terrence Malick. The other says Matrix screensaver. For an AI filmmaker making intimate, human-centered work — amber is the right call.

**The green doesn't disappear** — it becomes the interactive layer. Buttons, hover states, active nav indicators. This creates a system: gold = editorial/identity, green = interactive/technical. The contrast between them communicates exactly who Sana is: a warm creative who uses cold technology.

---

### 1.2 — Typography: A Complete Rethink

The revamp plan specified Cormorant Garamond. It's a good font but it's the Helvetica of editorial serif fonts — everyone uses it. Here's a more specific, more cinematic system:

**Display / Hero headings: `Canela` by Commercial Type**
This is the font used by The New Yorker, numerous A24 film campaigns, and Bottega Veneta. It has an unusual quality — it looks simultaneously modern and ancient. It's readable at enormous sizes. It has personality without being decorative. It says *serious creative*, not *graphic designer discovered serif fonts*.

If budget is a constraint: `Playfair Display` from Google Fonts as a fallback — it has similar high-contrast drama.

**Section headings: `Freight Display Pro`**
Heavy, warm, slightly old-fashioned in the best way. It pairs with Canela without competing. At 64–80px it reads like a film title card.

**Body text: `Lora` (italic variant)**
Lora in italic is one of the most readable body fonts for dark backgrounds. It has a slight handwritten quality that keeps long copy from feeling clinical. Used at 17px, 1.75 line-height, on dark backgrounds, it reads like the liner notes of a Criterion disc.

**UI / Labels / Metadata: `IBM Plex Mono`**
Not JetBrains Mono (that's a developer font). IBM Plex Mono has a slightly more designed quality — it was created for IBM's brand system and has more personality than pure utility monospace fonts. Used for: tool tags (RUNWAY, MIDJOURNEY), section numbers (001 / ABOUT), timestamps, technical metadata. The contrast between the cinematic serif headlines and the mono labels is the typographic representation of *art meets technology*.

**Type scale (exact):**
```
Hero name:           clamp(80px, 14vw, 160px)  — Canela Light
                     Intentionally crops off right edge at most viewport sizes

Hero subtitle:       13px  — IBM Plex Mono, 0.25em tracking, 0.5 opacity

Section number:      11px  — IBM Plex Mono, 0.3em tracking
                     e.g. "001 / ABOUT"

Section headline:    clamp(48px, 7vw, 96px)  — Canela Regular
                     Mix of white and amber/gold across the two lines

Sub-headings:        28–36px  — Freight Display

Body text:           17px  — Lora Italic, 1.75 line-height

Tags/Labels:         11px  — IBM Plex Mono, pill-shaped borders, 0.15em tracking

Nav links:           12px  — IBM Plex Mono or Neue Montreal, 0.2em tracking, lowercase
```

**One non-negotiable typographic rule:**
Every section headline should be **split across two lines with two colours**. First line in warm off-white, second line in amber. This is the visual signature of the site — the one typographic pattern repeated across every section. Once you see it in the hero (SANA SHEIKH in white / AI FILMMAKER in gold), your brain registers it as the brand's visual language. Every time it repeats — CRAFTING THE / FUTURE FRAME, FILM / ARCHIVE, LET'S WORK / TOGETHER — it reinforces that signature.

---

### 1.3 — The Grain Overlay (This One Detail Changes Everything)

The current site has a subtle texture that reads as a Framer pattern. What it should have is a genuine film grain overlay that makes every frame feel like it was shot on Kodak stock.

This is implemented as a single fixed `<canvas>` element positioned over the entire page at very low opacity. The grain is procedurally generated via JavaScript — random noise that changes at 24fps, simulating real grain movement.

The opacity should be around 4–6% — invisible to people who don't notice it, but removing it would make the site feel noticeably flatter. This is a professional-grade detail used by Cargo-hosted filmmaker portfolios and high-end creative agency sites.

```javascript
// Animated film grain — runs once, covers the entire viewport
function initGrain() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none; z-index: 9999;
    opacity: 0.045; mix-blend-mode: overlay;
  `;
  document.body.appendChild(canvas);

  function render() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255;
      imageData.data[i] = value;
      imageData.data[i+1] = value;
      imageData.data[i+2] = value;
      imageData.data[i+3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    setTimeout(() => requestAnimationFrame(render), 1000/24); // 24fps
  }
  render();
}
```

---

### 1.4 — The Custom Cursor

A filmmaker's portfolio has a custom cursor. Full stop. It is the single detail that most clearly signals "this site was designed, not templated."

The cursor design:
- Default state: a 16px circle outline in off-white, `2px` border, follows with lerp lag (`0.12` factor — enough to feel intentional, not sluggish)
- On video hover: circle expands to 72px, the word `PLAY` appears inside in IBM Plex Mono at 10px, tracked wide. The expansion is spring-animated (stiffness: 400, damping: 28)
- On project row hover: circle fills with amber at 20% opacity, border turns amber
- On link hover: circle shrinks to 8px filled dot
- On the contact form: cursor becomes a thin `I-beam` style indicator

The lerp is implemented via `requestAnimationFrame` updating CSS custom properties directly on `:root` — never through React state. This keeps it at a true 60fps regardless of React render cycles.

---

## PART 2: SECTION-BY-SECTION PROFESSIONAL UPGRADES

### 2.1 — Hero: "The Projection Moment"

**The current plan:** Video background, name assembles with blur animation, subtitle fades in, CTAs appear.

**The professional version adds these specific details:**

**The opening sequence needs a projector boot-up moment.** When the page loads, the screen is completely black for 0.3 seconds. Then a single bright white frame flashes (0.08 seconds — just fast enough to register subliminally, not fast enough to cause photosensitivity issues). Then the video fades in. This is exactly what happens when a cinema projector starts. Anyone who has sat in a film theatre will feel it in their body before they consciously recognise it. It takes 0.08 seconds and makes the entire experience cinematic from the first frame.

**The video selection is a creative decision, not a technical one.** It cannot be any video — it must be the single most emotionally arresting shot from her entire body of work. Not the most technically impressive. Not the most recent. The one that makes you feel something before you understand what you're looking at. For Sana's work, something like the extreme close-up of eyes from "Woman in the Fields" — you don't know what you're watching, but you feel it. That's the right choice.

**The name crop is intentional and important.** The name "SANA SHEIKH" should be set at a size where the last two or three letters of "SHEIKH" extend beyond the right edge of the viewport and are cut off by the screen edge. This is not a mistake — it's a deliberate typographic choice. It communicates: *this person is bigger than the frame they're in*. It's a visual metaphor that works subliminally. You see this on Dior campaigns, Criterion covers, and Wim Wenders posters. It signals high visual literacy.

**The CTA design needs to abandon buttons entirely.** The two CTAs should be plain text lines:

```
→ watch showreel          explore work →
```

Left-aligned and right-aligned respectively, sitting at the bottom of the viewport. In lowercase Lora italic at 16px. Thin amber underlines that draw themselves from left to right over 0.8 seconds. No borders, no fill, no button shape. A button says "product." A text link says "editorial."

**The scroll indicator should feel like a film countdown strip.** Not just "SCROLL" with a line — a thin vertical strip on the right edge of the viewport with small circles at regular intervals (like film sprocket holes) and a slow-moving amber dot that travels down the strip at the rate you scroll. Invisible until you start scrolling. When you've reached the bottom of the hero, the strip disappears.

---

### 2.2 — About Section: "The Director's Profile"

**The current plan:** Good copy, editorial photo, scroll-triggered text reveal.

**What makes it genuinely professional:**

**The photo is the most important thing to fix on the entire site.** Everything else is a design decision. The photo is a representation of who Sana is as a professional. The current casual balcony photo communicates: emerging creator. What's needed:

A deliberately directed self-portrait. Not a studio headshot (that's corporate) — a *directed portrait*. Meaning: Sana uses everything she has — her understanding of light, her AI tools, her acting background — to create a portrait that itself demonstrates her skills. Ideas:

- Shot in controlled low light, one warm practical lamp, slightly underexposed face with the light catching one side. The kind of lighting you see in Barry Jenkins films. Colour grade it with the same LUT she uses on her commercial work.
- Or: an AI-assisted composite portrait where her real face is combined with one of her generated environments — she's literally inside one of her own films. This would be the most striking possible choice and is entirely within her technical capability.
- Or: a dramatic directional light portrait shot specifically to match the amber colour palette of the site. Deep shadow, warm highlight, direct gaze.

Whatever it is, it should look like a still from one of her films. The photo and the films should feel like they exist in the same world.

**The copy needs one more specific, unexpected line.** The current bio is good but it's complete — it tells you everything you need to know and nothing you didn't expect. A professional bio has one line that stops you. Something like:

> *"I've directed over sixty AI films and I've learned that the hardest part is never the technology — it's knowing what you want to feel."*

That line does several things: it gives a specific number (social proof), it demonstrates expertise, and it reveals a philosophy. It's specific to Sana in a way that no other person could claim. Add one line like this.

**The background prompt text needs to be real.** In the revamp plan we specified faint prompt text behind the bio copy. Here's the professional detail: it should be actual prompts from her actual projects, formatted as she actually writes them. Not generic AI prompt syntax. Not "a beautiful woman in a field, cinematic lighting." Her real creative vocabulary:

```
"close-up portrait, warm skin tones, natural scattered light,
subtle breath movement, film grain, soft background defocus,
emotional presence, Kodak Vision3 5219 look, golden hour,
intimate framing — generated for Swiss Beauty 4K campaign,
director: sana sheikh, tool: runway gen-3, prompt version 47"
```

This is a behind-the-scenes detail for people who look closely. It rewards attention. It teaches her craft passively. It's something no template could ever have.

**The section counter in the bottom left.** Small detail: as you read the bio, a counter ticks up — the number of AI frames she's generated. "47,000+ frames generated." It starts at a realistic number and ticks up slowly in real time (just CSS counter animation, not actually counting anything). This is the kind of specific claim that establishes scale and experience. It should be set in IBM Plex Mono at 11px, very faded, almost not there.

---

### 2.3 — Showreel: "The Projection Room"

**The single most important change: kill the YouTube embed.**

Not reduce it. Not style it. Remove it entirely and replace it with a self-hosted or Vimeo-based custom player.

**The custom player design:**

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                  [VIDEO — 2.35:1 RATIO]                    │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  PAUSE    ████████████░░░░░░░░░░░░░░░  01:23 / 02:47    FS │
└─────────────────────────────────────────────────────────────┘
```

- The play/pause control is the word `PAUSE` / `PLAY` in IBM Plex Mono — not an icon
- The scrubber is a thin amber line with a small dot indicator
- The time display is in IBM Plex Mono
- The fullscreen button is a simple `[ ]` character
- No Vimeo logo, no YouTube logo, no platform watermarks, no suggested videos
- The entire player is dark — controls appear on hover only, fade out after 2 seconds

**The letterbox treatment.** The video sits in a 2.35:1 container with thin amber horizontal lines above and below — like true cinema letterboxing. This is a detail that cinematographers and directors will notice immediately. It says: this person knows aspect ratios, because aspect ratios matter.

**The section heading typography.** "SHOWREEL 2025" in Canela at 96px, set so large it overflows the left margin slightly. Below it in IBM Plex Mono at 11px: "A FAST-PACED JOURNEY THROUGH SELECTED WORKS — RUNNING TIME 02:47" — duration and the word "selected" implying curation. This is how a Criterion Collection chapter header looks.

**Before the video plays:** a static frame — the single best still from the reel — sits in the player, colour-graded, as if the film is waiting to be projected. The only element on top of it is the `PLAY` cursor when you hover. Nothing else. No controls visible until hover.

---

### 2.4 — Film Archive: "The Vault"

This section has the highest potential of any section on the site and the furthest to go from current.

**The professional treatment: Full-width cinematic list**

Every project is a horizontal row spanning the full viewport width. The layout of each row:

```
LEFT                                    CENTRE                          RIGHT
───────────────────────────────────────────────────────────────────────────────
001   PARTY AESTHETICS                  DIRECTOR & EDITOR               2025
      ─────────────────────────────────────────────────────     RUNWAY  PPRO
      [HOVER: clip plays here as a horizontal strip]
```

The **project number** (001, 002, 003) is set in Canela at 80px, 8% opacity, positioned slightly into the left margin — it's a background element, part of the texture of the page, not functional text.

The **project title** is set in Canela at 48px in warm off-white. On hover it transitions to amber over 0.3 seconds.

The **role label** (DIRECTOR & EDITOR, CREATIVE DIRECTOR, DIRECTOR) is in IBM Plex Mono at 11px, tracked wide, in amber.

The **year** is right-aligned in IBM Plex Mono, slightly faded.

The **tool tags** are right-aligned below the year: small pill shapes in 1px amber border, IBM Plex Mono at 10px.

**The hover state is where professionalism lives.** When you hover a row:
- A thin horizontal film strip appears between the title and the metadata — this is a cropped, silent, looping clip from the actual project
- The strip is approximately 120px tall, full width
- It appears with a fade-in over 0.2 seconds
- The clip is already preloaded (using IntersectionObserver to load when the row enters viewport, before hover)
- The entire row background goes from transparent to a very faint warm amber — barely perceptible, like a lamp turning on in a dark room

**The lightbox is the professional moment.** When you click a row:
- The page goes dark (overlay fades in at 95% opacity)
- The project panel scales up from the row position (not from centre — from where the row was, using Framer shared layout animation)
- Left side: custom video player with the full project film
- Right side: project metadata

The right-side metadata layout:
```
PARTY AESTHETICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━

DIRECTOR & EDITOR              2025

TOOLS
Runway Gen-3 · Adobe Premiere Pro

CLIENT
[Client name if applicable]

BRIEF
A high-concept party atmosphere film for a social
campaign, exploring the intersection of human
celebration and AI-generated visual excess. Shot
across 340 generated frames, colour-graded in
DaVinci Resolve to a warm pushed-print look.

CONCEPT
The brief asked for "celebration without cliché."
The answer was to remove human faces entirely and
build the emotion from light, movement, and texture.

[← PREV PROJECT]                     [NEXT PROJECT →]
```

The brief and concept copy is generated by Claude claude-opus-4-6 at build time from Sana's raw notes — specific, cinematic, and professional. This is the section that answers the question every potential client has: *what does she actually do and why is it good?*

**One more detail: a total count in the section header.**
```
003 / SELECTED WORKS                            007 FILMS →
```
The "007 FILMS" in IBM Plex Mono on the far right, with an arrow. It establishes volume. It signals curation. It's the kind of small detail that only appears on sites made by people who care about craft.

---

### 2.5 — Clients / Social Proof: "The Trust Strip"

**This section is not in the original revamp plan and it needs to be.**

Between the Showreel and Film Archive sections, there should be a narrow full-width strip — not a section, just a strip — that contains:

```
AS SEEN IN / WORKED WITH

[Swiss Beauty logo]   [Brand 2 logo]   [Brand 3 logo]   [Brand 4 logo]
```

Set against the background colour, logos in white at 60% opacity. On hover, a logo goes to 100% opacity. The strip scrolls horizontally on an infinite CSS animation loop if there are enough logos.

This strip takes 2 hours to implement and it changes the entire perception of the site. Anyone who has ever hired a creative professional for a campaign looks for this strip. Its absence is noticed. Its presence immediately elevates the perceived professional tier.

If there aren't enough client logos yet: publications, mentions, or platforms work too. "As seen in" followed by any notable outlets where her work has appeared. If none exist yet: this strip becomes a near-term goal — get a placement or collaboration that earns the right to a logo in this strip.

---

### 2.6 — Services: "The Offering"

**The current plan:** Accordion rows. Good direction. Here's how to make it genuinely professional:

Each service row, when expanded, should contain four specific things that most service sections never include:

**1. A specific deliverable list.** Not "I make music videos." Instead:
```
WHAT YOU RECEIVE
• Master file: 4K ProRes 4444 or H.264 web-optimised
• Colour-graded in DaVinci Resolve with custom LUT
• All generated source files and prompt documentation
• Unlimited revisions during generation phase (3 rounds post-edit)
• Full rights transfer on delivery
• Delivery: 10–14 business days from approved brief
```

**2. A representative still from her work.** One image, cropped to 16:9, from a project that used this service. Not a thumbnail — a carefully selected frame that represents the aesthetic of this category.

**3. A starting-from price or budget indicator.** This is the most avoided thing in creative portfolios and the most important. Clients hate not knowing if they can afford someone. It creates friction before a single conversation happens. Even a range — "Investment from ₹75,000" or "International projects from $2,500" — removes that friction and pre-qualifies inquiries. Sana should decide if she wants to be transparent about pricing. The professional choice is yes — it saves time for everyone.

**4. A "Recent work in this category" micro-link.** One line: "Recent: Swiss Beauty 4K (2025) →" that jumps to that project in the archive. It connects the services to the proof.

---

### 2.7 — Process Section: "Inside the Machine"

**The current plan:** Horizontal scroll with 5 steps. This is the right direction but it needs to be treated as the site's most unique section — because it genuinely is. No traditional filmmaker has a "PROMPTING" step in their process. This is where the AI filmmaker identity is most specifically expressed.

**What makes it professional:**

**Real prompt syntax in the terminal.** The PROMPTING step has a terminal-style box. It should contain an actual, functional prompt from one of her real projects — with all the specificity of her actual process:

```
$ runway gen-3 --model alpha-turbo

> prompt: "extreme close-up portrait of young south asian woman,
  warm golden hour backlight, hair movement in gentle wind,
  cinematic depth of field, emotional stillness, film grain,
  kodak 5219 emulation, 24fps, 3 seconds"

> negative: "artificial looking, CGI, sharp, harsh, blue tones"
> seed: 4829103
> duration: 3s
> fps: 24
> aspect: 16:9

Generating... ████████████░░░ 78%

[Output frame 1 appears]
[Output frame 2 appears]
[Output frame 3 appears]

> Accepted frame 3 of 8 iterations
> Revision: "add more atmospheric haze, reduce sharpness 15%"
```

The generation animation should be real — the progress bar fills, frames appear one by one. This is theatre, but it's honest theatre. It accurately represents her actual workflow.

**The GENERATION step needs a before/after comparison.** Two versions of the same shot:
- Left: Raw runway output, slightly flat, slight uncanny quality
- Right: Post-processed, colour-graded, final version

A draggable centre line separates them. Drag left to see raw. Drag right to see final. This single interactive element demonstrates more about her value-add than any amount of copy. It answers the question: *"Couldn't I just use Runway myself?"* The answer is visible in the 30-pixel gap between the left and right versions.

**The section progress indicator.** At the very bottom of the pinned section, a thin line spans the full width. It fills in amber as you scroll through the steps. Next to the right end of the line: "STEP 3 OF 5" in IBM Plex Mono at 10px. This keeps users oriented in the horizontal scroll and gives the section a sense of completion.

---

### 2.8 — Contact Section: "The Pitch Room"

**The current plan:** Form with Claude integration. Here's the professional layer:

**Availability status at the top — always visible.** Set in IBM Plex Mono at 11px, with a small pulsing green dot (a camera recording indicator):

```
● AVAILABLE FOR PROJECTS FROM APRIL 2026
```

This does two things: creates soft scarcity (book before April fills up) and communicates that she's in demand (not immediately available starting now). Update it manually every month. It takes 30 seconds to update and it constantly signals she's working.

**The form fields need a cinematic touch.** Instead of standard labels and inputs, each field uses the *film slate* visual metaphor:

```
NAME
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[typed value appears here in Canela italic]


PROJECT TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Cinematic AI Ad ↓]
```

The label is above the line in IBM Plex Mono at 10px tracked wide. The value is below in Lora italic at 18px. The line between them is the input. On focus, the line turns amber.

**The Claude brief generator is the key differentiator.** This is what no other filmmaker portfolio has. Below the "tell me about your vision" textarea:

```
[✦ GENERATE A CREATIVE BRIEF WITH AI]
```

A small amber text link with a subtle shimmer animation. When clicked:
- The textarea clears
- A short form appears: 3 quick questions (brand/project name, mood/feeling, visual references)
- User answers in 60 seconds
- Claude generates a 4-sentence professional creative brief, typed out character by character in the textarea
- User can edit it before submitting

This feature serves two purposes: it removes friction for clients who don't know how to articulate a brief, and it demonstrates Sana's own AI expertise in the very act of contacting her.

**The submit animation.** When the form is submitted:
- The form elements fade out one by one (staggered, like a film ending)
- The page goes slightly darker
- The text appears, Canela italic, 32px, centred:
  
  *"Received. I'll be in touch within 48 hours."*

- Below it, much smaller in IBM Plex Mono: the date and time of submission, formatted like a film slate: `FEB 25, 2026 — 21:47`

This is the last impression the visitor gets. It should feel like the end of a film — complete, considered, and memorable.

---

## PART 3: THE DETAILS THAT SEPARATE GOOD FROM UNFORGETTABLE

These are the details that don't belong to any single section. They're global. They're invisible to most visitors. And they're exactly what senior creative directors and art directors at brands notice.

### 3.1 — The Section Transitions

Between every section there is a moment — the seam where one section ends and the next begins. Most sites ignore this. Professional sites treat it as part of the experience.

Every section transition on this site should have a single horizontal line that sweeps across the full viewport width over 0.3 seconds — thin (1px), in amber, moving left to right. Like a film splice. Like a cut.

Implemented as a fixed-position element that activates via IntersectionObserver when the boundary between sections enters the viewport. Takes half a day to implement. Adds a depth of craft that is immediately felt, never consciously noticed.

### 3.2 — The Loading State

Before the site loads, there should be a branded loading state — not a spinner, not a progress bar, not a blank page.

A completely black screen. After 0.2 seconds, the text "S.S." appears in Canela at 14px, centred, in amber — her initials, like a film production logo. After 1.5 seconds (or when the site is ready, whichever is later), the projector boot sequence begins and the site loads.

If the site loads in under 0.5 seconds (which it should on fast connections), this loading screen never shows. It only appears on slow connections. But when it does appear, it's an experience, not an apology.

### 3.3 — The OG Image (Social Share Card)

When someone shares the site URL on LinkedIn, Twitter, or WhatsApp, the preview card appears. Almost every portfolio has a generic auto-generated preview.

The professional version: a custom OG image that is itself a piece of design. The same dark amber background, "SANA SHEIKH / AI FILMMAKER" in the site's exact typography, with a still frame from her best project in the background at 15% opacity. Generated dynamically with `@vercel/og` — takes 2 hours to implement, improves every share of the site URL forever.

### 3.4 — The 404 Page

Most portfolios have a default framework 404 page. It's a missed opportunity.

Sana's 404 page should be: a looping clip (one of her films, muted, no controls), centred text that reads:

```
THIS FRAME DOESN'T EXIST.

MAYBE IT SHOULD.

[← BACK TO THE REAL ONES]
```

In the site's exact typography. The copy is a filmmaker's joke about generative AI — "this frame doesn't exist" is what you say about AI-generated imagery that never existed in physical reality. It's funny, it's on-brand, and it's memorable. People screenshot 404 pages that make them laugh.

### 3.5 — The Page Title and Meta Tags

Currently the browser tab probably says "ai_filmmaker_portfolio" — the file name of the Framer project. This needs to be:

```html
<title>Sana Sheikh — AI Filmmaker & Visual Story Architect</title>
<meta name="description" content="Portfolio of Sana Sheikh — multidisciplinary 
filmmaker working at the intersection of cinematic storytelling and generative 
intelligence. AI ads, music videos, short films, and virtual production." />
```

And for every project page (if individual pages are added later):
```html
<title>Party Aesthetics — Sana Sheikh</title>
```

This costs nothing. It takes 15 minutes. It affects every bookmark, every browser tab, every search result snippet, and every social share. It currently reads as an accident.

### 3.6 — The Right-Click Experience

When a visitor right-clicks anywhere on the site, instead of the default browser context menu appearing, a custom minimal menu appears:

```
SANA SHEIKH — AI FILMMAKER
─────────────────────────
Copy site URL
View showreel
Contact
```

This is a JavaScript `contextmenu` event override. It's a tiny detail that communicates total ownership of the experience — the site has opinions about itself down to the operating system level. This is the kind of thing that makes a developer or a creative director say "did you see that?" to the person next to them.

---

## PART 4: THE COPY LAYER

Design without copy is decoration. Sana's site needs both.

### 4.1 — The One-Line Positioning Statement

Right now the subtitle is: "Multidisciplinary Creative | AI Filmmaker | Visual Story Architect"

This is a job description. It's correct but it's not compelling. The professional version is a positioning statement — a line that communicates why she specifically, not just what category she's in:

Options to consider:
- *"Where human intuition meets generative intelligence."*
- *"AI that doesn't look like AI."*
- *"Cinema for the post-photographic world."*
- *"I direct. The machine executes."*

The last option is probably the strongest — it's provocative, immediately clear, and establishes her as the author of the work (not a prompt monkey). It also directly addresses the scepticism that AI-generated work faces. It's a thesis statement, not a job title.

### 4.2 — The Bio Rewrite

Current opening: "I am Sana Sheikh, a multidisciplinary filmmaker working at the intersection of performance, cinematic storytelling, and generative intelligence."

This is fine. Here's a version with more professional edge:

> *"I started as an actor. I learned that presence — the thing a camera either captures or it doesn't — is the hardest thing to generate artificially. So I spent three years figuring out how."*
> 
> *"Now I make films that audiences can't tell are AI-generated, for brands who need to tell stories that couldn't be shot conventionally. I work in Runway, Midjourney, DaVinci Resolve, and Premiere Pro — and I know that none of them are the creative. I am."*
> 
> *"Based in [city]. Currently available for projects starting April 2026."*

This bio does several things the current one doesn't: it tells a story (actor → AI filmmaker), it states a specific claim (films audiences can't identify as AI), it names a specific client type (brands who need unconventional stories), it lists tools without making tools the main point, and it ends with a direct availability signal.

### 4.3 — Project Descriptions

Every project needs two things the current site completely lacks:

**The brief** — one sentence on what was asked for. "Swiss Beauty needed a 4K hero film for their foundation launch with a budget that couldn't support a traditional shoot."

**The approach** — one or two sentences on the creative solution. "Generated 200+ frames using Runway Gen-3 with a custom skin-tone prompt framework, colour-graded in DaVinci to a high-fashion print emulation."

These two sentences, repeated across every project, build a picture of Sana as a creative problem-solver — not just someone with access to AI tools. That distinction is the entire professional argument.

---

## PART 5: WHAT TO BUILD FIRST

If the entire plan feels overwhelming, here is the ruthless priority order. Do these five things and the site goes from generic to professional overnight:

**1. Kill the YouTube embeds.** Upload every project to Vimeo. Install a custom player. This single change improves every section it touches. (Half a day)

**2. Replace the about photo.** Get one properly directed portrait. Everything else on the about section stays the same. (One afternoon)

**3. Fix the colour palette.** Shift from neon green dominant to amber/gold dominant. Update the CSS variables. This affects the entire site immediately. (Two hours)

**4. Add the clients/brand strip.** Even with two logos it's worth having. (Two hours)

**5. Add project descriptions to every Film Archive item.** Brief + approach, 2 sentences each. Run it through Claude claude-opus-4-6 from her raw notes. (One afternoon + 30 minutes of prompting)

Do these five things before anything else. They cost almost no development time, require no new features, and they address the five most visually damaging problems on the current site.

Everything else in this document is the long game — building the site that's genuinely impossible to mistake for anyone else's.

---

## THE MEASURE OF SUCCESS

The revamp is complete when a potential client — a brand marketing director, an agency creative director, a film festival programmer — lands on the site and within 30 seconds:

1. **Feels something** from the work on screen before they've read anything
2. **Understands specifically** who Sana is and what she does differently
3. **Believes she's been hired by brands before** (social proof)
4. **Knows exactly how to work with her** (process section)
5. **Contacts her with a qualified brief** (Claude-powered form)

That's the test. Not Lighthouse scores, not animation frame rates, not how many fonts are used. Five things a real human being feels and does in the first two minutes. Build everything in service of those five outcomes.

---

*Professional upgrade guide for ivysana.xyz — authored February 2026*  
*Every recommendation above is specific, implementable, and grounded in what separates working professional portfolios from aspirational ones.*
