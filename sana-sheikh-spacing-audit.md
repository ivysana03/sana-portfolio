# SPACING & PADDING AUDIT — ivysana.xyz Revamp
### Minute Analysis of Every Section
**Status:** localhost:3001 build  
**Focus:** Spacing, padding, rhythm, and proportion issues killing the professional touch

---

## OVERALL DIAGNOSIS FIRST

Before section-by-section — there are two systemic problems causing most of the spacing issues:

**Problem 1: Inconsistent horizontal padding system.**
The site doesn't appear to have a single `--section-px` variable applied consistently. Some sections hug the left edge, some have generous padding, some are full-bleed. This inconsistency is the #1 reason it doesn't feel finished. A professional site has one horizontal margin value (e.g. `clamp(2rem, 7vw, 8rem)`) applied to every section, like a page margin in a book.

**Problem 2: Vertical rhythm is broken.**
Section-to-section spacing is not consistent. Some sections bleed into the next with almost no breathing room (Showreel → Archive is the worst offender). Others have too much empty space at the bottom. A professional site has a consistent vertical section gap — typically `clamp(6rem, 14vh, 12rem)` — that gives every section its own breathing room.

Fix these two systemic issues and 60% of the spacing problems resolve automatically.

---

## SECTION 1 — HERO

### Issue 1.1 — Name starts too close to the left edge
**What's happening:** "SANA SHEIKH" appears to start at roughly 80–90px from the left edge. For a display element at this scale (the name is enormous), 80–90px of left padding is visually nothing. The name looks like it's about to fall off the left side.

**The fix:**
```css
/* The name needs the same left padding as the rest of the site's content */
.hero-name {
  padding-left: clamp(2rem, 7vw, 8rem);
  /* This aligns it with the content margin of every other section */
}
```

**Professional standard:** At this type size, the left margin should feel like a deliberate compositional choice — not like default alignment. Look at the current position: the "S" in SANA starts at what appears to be the same x-position as the left edge of the navbar logo. That's correct. But visually, at 140–160px font size, it reads as cramped. The solution is to actually let it overflow — set the name to be wider than the viewport and let it crop on the right (not the left). The left edge should have the standard site margin. The right edge clips. This was in the original plan — the name should crop on the RIGHT, not feel pinched on the LEFT.

### Issue 1.2 — Vertical gap between name and subtitle is wrong
**What's happening:** The subtitle "AI FILMMAKER · VISUAL STORY ARCHITECT" sits too close to the name above it. The vertical gap between the bottom of the name and the top of the subtitle appears to be around 8–12px. At this scale, that needs to be 24–32px minimum.

**The fix:**
```css
.hero-subtitle {
  margin-top: 1.5rem; /* ~24px, feels like breathing room */
}
```

### Issue 1.3 — Gap between subtitle and CTAs is too large
**What's happening:** While the name-to-subtitle gap is too small, the subtitle-to-CTA gap seems disproportionately large — roughly 60–80px of empty space between "AI FILMMAKER · VISUAL STORY ARCHITECT" and the "→ watch showreel" links. This creates an awkward vertical rhythm: too tight above, too loose below.

**The fix:**
```css
.hero-ctas {
  margin-top: 3rem; /* ~48px — generous but not excessive */
}
```

**The correct vertical proportion for hero text stack:**
```
Name
[24px gap]
Subtitle
[48px gap]
CTAs
```

### Issue 1.4 — The Vimeo watermark is visible
**What's happening:** The large Vimeo logo/branding is visible as a translucent overlay in the centre of the video. This completely undermines the custom cinematic experience. The entire point of moving away from YouTube embeds was to eliminate platform branding.

**The fix:** This is a Vimeo player setting, not a CSS fix.
```javascript
const player = new Vimeo.Player(iframe, {
  background: true,     // removes all controls AND branding
  muted: true,
  loop: true,
  autopause: false,
});
```
Using `background: true` mode in the Vimeo Player API eliminates all UI including the logo. If using the iframe embed URL directly, append `?background=1&muted=1&loop=1` to the URL. The Vimeo watermark appearing means neither of these is currently set.

### Issue 1.5 — SCROLL indicator positioning
**What's happening:** The SCROLL text and the vertical line below it are both centred on the page, which is fine. But the vertical line appears to start immediately beneath the text with no gap — they're touching. Also, the SCROLL label and line sit too close to the bottom of the viewport. There should be roughly `2rem` between the bottom of the viewport and the bottom of the line.

**The fix:**
```css
.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem; /* gap between "SCROLL" text and the line */
}

.scroll-indicator-line {
  width: 1px;
  height: 3rem;
  background: currentColor;
  opacity: 0.4;
}
```

---

## SECTION 2 — ABOUT

### Issue 2.1 — Right column content starts too high / no top padding
**What's happening:** The "001 / ABOUT" breadcrumb and the headline "Not generating. / Directing." appear to start almost at the very top of the section — there's insufficient top padding before the content begins. The left image panel starts at the very top too, but that's intentional (full-height image). The right text column needs to be vertically centred or have enough top padding to feel anchored.

**The fix:**
```css
.about-text-column {
  padding-top: clamp(4rem, 10vh, 8rem);
  padding-right: clamp(2rem, 7vw, 8rem);
  padding-bottom: clamp(4rem, 10vh, 8rem);
}
```

### Issue 2.2 — Gap between breadcrumb and headline is inconsistent
**What's happening:** "001 / ABOUT" sits directly above the headline with very little space. This label is metadata — it should feel separated from the headline it precedes. The current gap looks like approximately 8px. It needs to be 20–28px to feel like the label is *above* the section, not attached to the headline.

**The fix:**
```css
.section-breadcrumb {
  margin-bottom: 1.5rem; /* space between "001 / ABOUT" and the headline */
  display: block;
}
```

### Issue 2.3 — Paragraph spacing in the body copy is inconsistent
**What's happening:** Looking at the three paragraphs of bio text on the right:
- "I don't generate content. I direct it." 
- "Every frame is intentional..."
- "My background spans..."
- "I work with brands..."

The spacing between the first sentence (standalone) and the first full paragraph appears larger than the spacing between subsequent paragraphs. This inconsistency breaks the reading rhythm. All paragraph gaps should be identical.

**The fix:**
```css
.about-body p {
  margin-bottom: 1.5rem; /* consistent gap between ALL paragraphs */
}

.about-body p:last-child {
  margin-bottom: 0;
}
```

### Issue 2.4 — Right column has no right padding
**What's happening:** The text in the right column appears to run very close to the right edge of the viewport. There's no right padding creating a right margin. At the current viewport width, the last word of each line sits uncomfortably close to the browser edge.

**The fix:**
```css
.about-text-column {
  padding-right: clamp(3rem, 8vw, 10rem);
}
```

### Issue 2.5 — The portrait placeholder box has no internal proportion
**What's happening:** The "[DIRECTED SELF-PORTRAIT]" placeholder text is centred both horizontally and vertically within a very large dark box. The text is so small relative to the box that the box just looks empty. This is a placeholder issue, but even as a placeholder it needs to communicate proportion. The actual photo, when it arrives, should fill this box edge-to-edge — `object-fit: cover` — with no internal padding.

**The fix for the placeholder state:**
```css
.portrait-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 70vh; /* or match right column height */
}
```

---

## SECTION 3 — SHOWREEL

### Issue 3.1 — Zero gap between "SHOWREEL 2025" heading and the video player
**What's happening:** The oversized "SHOWREEL 2025" heading bleeds directly into the top edge of the video player with essentially zero gap. The heading's descenders (the bottom of "L" in SHOWREEL) almost touch the video frame. This makes the section feel like two elements accidentally placed next to each other rather than a composed section.

**The fix:**
```css
.showreel-heading {
  margin-bottom: -1rem; /* slight negative margin is intentional for the overlap effect */
  /* BUT the video should have padding-top to push it below the overlap zone */
}

.showreel-video-container {
  margin-top: 1.5rem; /* minimum breathing room between heading and video */
}
```

**Better approach:** The oversized heading should sit behind the video slightly — z-index layering. The heading at very low opacity bleeds behind the top of the video frame (like the text bleeds behind/into the video), and the video sits on top. This creates depth rather than a collision.

### Issue 3.2 — Video player width vs section padding
**What's happening:** The video player appears to start and end exactly at the same horizontal position as the left and right edges of other section content. But it should be slightly inset — the video player should not be full-bleed to the viewport edge. It needs `margin: 0 auto` with a `max-width` and the standard site horizontal padding.

**Currently it appears to be:** `width: 100%` with no horizontal margin, making it feel like it's breaking out of the page layout rather than sitting within it.

**The fix:**
```css
.showreel-player-wrapper {
  margin: 0 clamp(1rem, 3vw, 4rem); /* slight inset from viewport edge */
  /* This gives it breathing room on sides while still being large */
}
```

### Issue 3.3 — No bottom padding before Archive section begins
**What's happening:** "002 / ARCHIVE" and "Selected Works" appear to begin immediately after the video player bottom. There's no section break, no breathing room. The showreel section ends and the archive section starts with perhaps 24px of gap — nowhere near enough for two major sections.

**The fix:**
```css
.showreel-section {
  padding-bottom: clamp(5rem, 12vh, 10rem);
}

.archive-section {
  padding-top: clamp(5rem, 12vh, 10rem);
}
```

---

## SECTION 4 — FILM ARCHIVE (SELECTED WORKS)

### Issue 4.1 — Heading and filter tabs are on the same line — but there's no vertical gap between them and the cards
**What's happening:** "Selected Works" is a large heading (appears to be around 80–96px) and the filter tabs (ALL, MUSIC VIDEOS, FASHION FILM, NARRATIVE SHORT) sit to the right of it at label size. This is a good compositional choice. BUT there is almost no vertical gap between this heading row and the project cards below. The cards seem to start approximately 16–24px below the heading. At this heading scale, that gap needs to be at least 48–64px.

**The fix:**
```css
.archive-header {
  margin-bottom: clamp(3rem, 6vh, 5rem);
  /* Creates breathing room between the heading/filters row and the first card row */
}
```

### Issue 4.2 — Card gutters are too tight
**What's happening:** The three project cards have very little horizontal gap between them — approximately 12–16px. This makes the grid feel dense and compressed. Professional portfolio grids at this card size (roughly 30% viewport width each) need 24–32px gutters minimum.

**The fix:**
```css
.archive-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem; /* 32px — comfortable gutter */
  /* Currently appears to be gap: 0.75rem or similar */
}
```

### Issue 4.3 — Card internal metadata spacing is inconsistent
**What's happening:** Inside each card, the metadata below the video thumbnail follows this pattern:
```
[THUMBNAIL]
Party              2025
SPEC · DIRECTOR & EDITOR
RUNWAY GEN-2  PREMIERE PRO
```

The vertical spacing between each line of metadata is inconsistent. The year (2025) appears to be on the same line as the title, which is good. But the gap between the title row and the role label below it looks about 4–6px — far too tight. And the gap between the role label and the tool tags is similarly collapsed.

**The fix:**
```css
.project-title-row {
  margin-top: 1.25rem; /* gap between thumbnail and title */
  margin-bottom: 0.375rem; /* gap between title and role */
}

.project-role {
  margin-bottom: 0.75rem; /* gap between role and tool tags */
  letter-spacing: 0.08em;
}

.project-tools {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
```

### Issue 4.4 — Large empty space below the cards (only one row of projects)
**What's happening:** After the single row of three projects, there is an enormous empty space at the bottom of the archive section before the next section starts. This appears to be because there's only one row of data (three projects) but the section has generous padding set for multiple rows.

**Short-term fix (while more projects are added):**
```css
.archive-section {
  padding-bottom: clamp(4rem, 8vh, 7rem);
  /* Don't let the empty space compound with bottom padding */
}
```

**Real fix:** Add more projects to the archive. Three projects is too few for a "Selected Works" section header. Even six fills the visual space and justifies the section heading.

---

## SECTION 5 — SERVICES

### Issue 5.1 — Accordion spacing between collapsed items is too tight
**What's happening:** Services 02 (AI Music Videos), 03 (Brand Identity Films), and 04 (Creative Direction) are collapsed and stacked. The vertical gap between each collapsed service row appears to be approximately 8–12px. This makes them look like a list of menu items, not individual services. Each collapsed row should have more breathing room.

**The fix:**
```css
.service-item {
  padding: 1.25rem 0; /* 20px top and bottom per item */
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Issue 5.2 — Expanded content left and right columns feel disconnected
**What's happening:** When "Cinematic AI Ads" is expanded, the description appears on the left and the "IDEAL FOR" / "TYPICAL TIMELINE" metadata appears on the right. But there appears to be too much horizontal distance between the left description end and the right metadata start. The right metadata column feels like it's floating independently rather than being paired with the left content.

**The fix:** Give both columns a defined width so they're clearly related:
```css
.service-expanded-layout {
  display: grid;
  grid-template-columns: 1fr 280px; /* description gets most space, metadata is fixed width */
  gap: 4rem; /* controlled gap between description and metadata */
  padding: 2rem 0 2.5rem;
}
```

### Issue 5.3 — The "004 / PROCESS" label appears immediately below the services list
**What's happening:** The process section label "004 / PROCESS" appears almost immediately below the last collapsed service item. There's no visible section break — no padding, no horizontal rule, nothing. The service section ends and the process section starts with perhaps 16px of space. This makes the page feel like it's running out of room.

**The fix:**
```css
.services-section {
  padding-bottom: clamp(5rem, 10vh, 8rem);
}

.process-section {
  padding-top: clamp(5rem, 10vh, 8rem);
}
```

### Issue 5.4 — Section heading to first service item gap
**What's happening:** "Core Expertise" is a large heading and the first service item "01 Cinematic AI Ads" starts very close below it — approximately 20–28px. At this heading scale (appears to be ~72–80px), there should be at least 48–56px of breathing room between the heading and the first accordion item.

**The fix:**
```css
.services-heading {
  margin-bottom: 3rem; /* 48px minimum below the section heading */
}
```

---

## SECTION 6 — CONTACT

### Issue 6.1 — The right half of the section is completely empty
**What's happening:** This is the most significant layout problem in the contact section. The entire form — heading, copy, and all form fields — occupies only the left ~50% of the viewport. The right half is completely black, empty space. At this viewport width, this reads as an incomplete layout, not a deliberate compositional choice.

**Two options to fix this:**

**Option A — Two-column layout (recommended):**
```
LEFT HALF                           RIGHT HALF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Let's make                          ● AVAILABLE FROM APRIL 2026
something beautiful.
                                    hello@ivysana.xyz
[form fields]
                                    Instagram
                                    YouTube
                                    LinkedIn
                                    Twitter

                                    "I respond within 48 hours
                                    to all project inquiries."
```

**Option B — Full-width form:**
The form expands to use the full page width, with the heading taking the full width above it and form fields arranged in a two-column grid (Name + Project Type on one row, Budget + Vision on the next).

Option A is the professional choice — it fills the space meaningfully and adds the availability signal and contact details that are currently missing from the design.

### Issue 6.2 — Form field vertical spacing is too compressed
**What's happening:** Looking at the form fields — NAME, PROJECT TYPE, BUDGET RANGE, TELL ME ABOUT YOUR VISION — they are stacked with very little vertical gap between each field group. The label sits immediately above its input with no breathing room, and the fields themselves are nearly touching each other vertically.

**The fix:**
```css
.form-field-group {
  margin-bottom: 2.5rem; /* 40px between each field group */
}

.form-field-label {
  display: block;
  margin-bottom: 0.625rem; /* 10px between label and input */
  font-size: 0.6875rem; /* 11px */
  letter-spacing: 0.15em;
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.875rem 0; /* generous vertical padding within the input */
  /* The input should feel spacious, not cramped */
}
```

### Issue 6.3 — Dropdown selects look like generic browser UI
**What's happening:** "Select a project type" and "Select a budget range" appear as standard browser dropdown elements. The chevron (↓) on the right is the browser default. This breaks the custom design language of the entire site.

**The fix:** Replace native `<select>` elements with custom dropdown components:
```jsx
// Custom select that matches the site aesthetic
<div className="custom-select" onClick={toggleOpen}>
  <span className="select-value font-lora italic">
    {value || placeholder}
  </span>
  <span className="select-chevron font-mono text-xs">↓</span>
  {isOpen && (
    <div className="select-dropdown">
      {options.map(option => (
        <div key={option} className="select-option font-lora">
          {option}
        </div>
      ))}
    </div>
  )}
</div>
```

### Issue 6.4 — Gap between heading and form is inconsistent with other sections
**What's happening:** The "Let's make something beautiful." heading ends and the form begins approximately 32–40px below. For a heading this large (the italic lines are enormous — roughly 64–80px each), 32–40px of gap before the form feels abrupt. The heading needs more room to breathe before the form begins.

**The fix:**
```css
.contact-heading {
  margin-bottom: clamp(3rem, 7vh, 5rem);
}
```

---

## THE SYSTEMIC FIX — CSS VARIABLES TO ADD

The fastest way to fix all of these at once is to add a consistent spacing system to `globals.css` and apply it everywhere:

```css
:root {
  /* Section padding — apply to every section */
  --section-px: clamp(2rem, 7vw, 8rem);
  --section-py: clamp(5rem, 12vh, 9rem);

  /* Content rhythm */
  --gap-xs:  0.5rem;   /* 8px  — between label and input */
  --gap-sm:  1rem;     /* 16px — between tight elements */
  --gap-md:  1.5rem;   /* 24px — between related elements */
  --gap-lg:  2.5rem;   /* 40px — between sections within a section */
  --gap-xl:  4rem;     /* 64px — between major section elements */

  /* Grid */
  --grid-gutter: 2rem; /* 32px — consistent card/column gap */
}

/* Apply to every section — no exceptions */
section {
  padding: var(--section-py) var(--section-px);
}
```

Then every section uses these variables instead of arbitrary pixel values.

---

## PRIORITY ORDER TO FIX

**Fix today (takes 2 hours, maximum visual impact):**

1. Remove the Vimeo watermark — `background: true` in the player options
2. Add `padding: var(--section-py) var(--section-px)` to every section
3. Fix the contact section right-half emptiness — add the availability + social column
4. Fix the archive card gutters (`gap: 2rem`)
5. Fix the form field spacing (`margin-bottom: 2.5rem` per field group)

**Fix this week (takes a day, finishes the professional feel):**

6. Increase the gap between hero name and subtitle (currently too tight)
7. Increase the gap between Showreel heading and video player
8. Add proper section-to-section breathing room throughout
9. Replace native browser select dropdowns with custom components
10. Fix accordion item spacing in Services

**The honest truth about what these fixes do:**
Right now the site looks like someone who got 90% of the way through a design and stopped. The bones are genuinely excellent — the typography is exactly right, the colour palette is right, the section concepts are right. What's missing is the last 10%: consistent spatial rhythm that makes every element feel like it was placed deliberately, not dropped in. These spacing fixes are that 10%.

---

*Spacing audit for ivysana.xyz — localhost:3001 build — February 2026*
