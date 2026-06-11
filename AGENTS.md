# AGENTS.md

## Project Overview

This repository contains the personal website for **Mithun Arun**. The site should present Mithun as an **AI/CS researcher, product builder, startup-oriented founder, and student leader** with strong appeal to recruiters in **software engineering, AI/ML, and quantitative technology** roles.

The website must showcase:

- AI healthcare research and published work
- Technical projects and product builds
- Startup/product thinking
- Hackathon leadership and community building
- Debate, Model UN, teaching, and student leadership
- Writing, values, accomplishments, and contact information
- Modern technical polish through animations, interactive project cards, filtering, dark/light mode, and EEG/neural-network-inspired visuals

The site should feel like a polished technical product, not a static resume.

---

## Required Source of Truth

Before making any changes, every AI agent must read:

```txt
portfolio-spec.md
```

The `portfolio-spec.md` file is the primary product specification. It defines the website narrative, sitemap, audience, recruiter positioning, interactive features, design expectations, and development priorities.

Agents must not make major architectural, content, or design decisions that conflict with `portfolio-spec.md`. If the spec is missing information, make the smallest reasonable decision and explain the assumption clearly.

---

## Global Rules for All Agents

1. **Always read `portfolio-spec.md` before editing.**
   - Use it as the source of truth for positioning, site structure, features, and quality expectations.

2. **Make small, focused edits.**
   - Prefer one clear improvement per task.
   - Avoid large rewrites unless explicitly requested.
   - Keep diffs easy to review.

3. **Do not change unrelated files.**
   - Only edit files directly related to the requested task.
   - Do not reformat unrelated files.
   - Do not rename or restructure folders unless the task requires it.

4. **Explain what changed after every task.**
   - Summarize edited files.
   - Explain the purpose of the change.
   - Mention any tests or checks run.
   - Mention any checks that were skipped and why.

5. **Preserve recruiter appeal.**
   - Optimize for recruiters and hiring managers in:
     - Software Engineering
     - AI/ML Engineering
     - Quantitative Technology
     - Research Engineering
     - Startup/product roles

6. **Keep claims accurate and credible.**
   - Do not exaggerate awards, publications, metrics, titles, or project impact.
   - Do not invent links, numbers, collaborators, institutions, or outcomes.
   - If a claim is uncertain, mark it as needing verification.

7. **Prioritize clarity over cleverness.**
   - The site may have impressive visuals, but the user should quickly understand who Mithun is and why he is credible.

8. **Keep the site fast and accessible.**
   - Animations and interactive visuals must not hurt performance, readability, or accessibility.

9. **Use modern engineering practices.**
   - Prefer reusable components, typed data, clean content schemas, and maintainable file structure.

10. **Run quality checks when available.**
    - Run linting, formatting, type checks, and tests when scripts exist.
    - Use `npm` unless another package manager is clearly configured.

---

## Technical Assumptions

Unless the repository clearly indicates otherwise, assume:

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Content:** Markdown or MDX where appropriate
- **Deployment:** Vercel
- **Package Manager:** npm

Do not migrate frameworks, styling systems, or package managers unless explicitly instructed.

---

## Recruiter Positioning Standards

The website must be optimized for three overlapping recruiter audiences.

### SWE Recruiters

Emphasize:

- Full-stack/product engineering ability
- Clean React and TypeScript implementation
- Real shipped projects
- App development experience
- GitHub/code quality
- Testing, maintainability, and deployment readiness
- Product sense and user-focused design

Relevant proof points:

- Worldview app
- Web apps and dashboards
- Firebase/Flask/React/Next.js work
- Security assessment agent
- Hackathon/product leadership

### AI/ML Recruiters

Emphasize:

- AI healthcare research
- Signal processing
- Model development and evaluation
- EEG/ECG work
- Published papers and conference presentations
- Clear explanation of metrics and limitations
- Ability to translate research into usable tools

Relevant proof points:

- NeuroHero
- EEG/ECG prognosis research
- Sleep phenomics papers
- IEEE MIT URTC presentation
- SLEEP and World Sleep presentations
- Research visualizations

### Quantitative Technology Recruiters

Emphasize:

- Mathematical thinking
- Statistics and model evaluation
- Time-series/signal-processing experience
- Optimization mindset
- Probability, metrics, and careful validation
- Ability to reason under uncertainty
- Strong CS fundamentals

Relevant proof points:

- EEG/ECG signal processing
- ROC-AUC, PR-AUC, sensitivity/specificity analysis
- Feature extraction pipelines
- Quant/math-inspired visual layer
- Debate and research rigor
- AI/data-heavy technical projects

---

## Coding Standards

### TypeScript

- Use TypeScript for all application code.
- Avoid `any` unless there is a clear reason.
- Define explicit types for:
  - Project data
  - Research entries
  - Timeline items
  - Writing metadata
  - Navigation items
  - Component props
- Prefer discriminated unions for category/type-driven content.
- Keep type definitions close to the domain they describe or in a shared `types` directory.

### React / Next.js

- Use the Next.js App Router if the project is set up for it.
- Prefer server components by default when interactivity is not required.
- Use client components only for state, effects, browser APIs, animations, or interactive UI.
- Keep components modular and reusable.
- Avoid deeply nested components inside page files.
- Use semantic HTML.
- Use Next.js metadata APIs for SEO where applicable.

### File Organization

Prefer a structure similar to:

```txt
app/
  page.tsx
  about/
  projects/
  research/
  writing/
components/
  ui/
  layout/
  sections/
  projects/
  research/
  animation/
content/
  projects/
  research/
  writing/
  timeline/
lib/
  utils.ts
  metadata.ts
types/
public/
```

Do not force this structure if the existing repo already uses a coherent alternative.

### Styling

- Use Tailwind CSS utility classes.
- Prefer reusable design tokens and shared component variants.
- Do not scatter magic values across many files.
- Keep responsive behavior intentional.
- Avoid unnecessary custom CSS when Tailwind can handle the requirement.

### Data and Content

- Keep portfolio content data-driven where possible.
- Avoid hardcoding repeated project cards directly into pages.
- Prefer Markdown/MDX for writing and longer project case studies.
- Keep project metadata structured for filtering and SEO.

---

## Design Standards

The website should feel:

- Modern
- Technical
- Polished
- Credible
- Ambitious
- Human
- Recruiter-friendly

### Visual Direction

Use a visual system inspired by:

- AI systems
- EEG/ECG signals
- Neural networks
- Time-series data
- Research dashboards
- Startup/product interfaces
- Clean quant-tech interfaces

Avoid:

- Generic resume templates
- Overly playful visuals
- Excessive gradients
- Distracting animations
- Unreadable glassmorphism
- Visual effects that hide the content

### Required UI Features

The site should include:

- Responsive navigation
- Dark/light mode
- Polished hero section
- Interactive project cards
- Project filtering
- Animated EEG, ECG, or neural-network-inspired visual
- Timeline or accomplishment explorer
- Research/project detail pages
- Writing/blog section
- Contact section
- Resume/download link

### Motion and Animation

Use Framer Motion for:

- Hero entrance animations
- Section reveals
- Card hover effects
- Timeline transitions
- Modal or drawer transitions
- Filtered project layout transitions

Animation rules:

- Motion must be tasteful and fast.
- Animations should support the narrative, not distract from it.
- Respect `prefers-reduced-motion`.
- Avoid expensive animations that hurt performance.
- Lazy-load heavy animated components when appropriate.

### Interactive Rendering Standards

At least two of the following should be implemented or planned:

1. **Animated EEG/ECG Signal Visual**
   - Represents AI healthcare and signal-processing work.
   - Can be SVG, Canvas, or lightweight React animation.

2. **Neural Network Background**
   - Subtle animated node-edge graph in the hero or research section.
   - Must remain readable and non-distracting.

3. **Research Pipeline Diagram**
   - Shows data input, preprocessing, features, model, and output.
   - Useful for AI/ML and quant-tech recruiters.

4. **Metrics Visualizer**
   - Shows ROC-AUC, PR-AUC, sensitivity, specificity, or model evaluation concepts.
   - Must present limitations honestly.

5. **Interactive Project Explorer**
   - Filtering by SWE, AI/ML, Quant, Healthcare, Product, Leadership, and Startup.

---

## Accessibility Standards

Accessibility is mandatory, not optional.

Agents must check for:

- Semantic HTML elements
- Proper heading order
- Keyboard-accessible navigation
- Visible focus states
- Sufficient color contrast
- Alt text for meaningful images
- Empty alt text for decorative images
- Accessible labels for buttons, icons, and form fields
- Reduced-motion support
- No information conveyed by color alone
- Mobile readability
- Screen-reader-friendly timeline and cards

Interactive components must be usable with keyboard input.

Avoid:

- Div-only buttons
- Click handlers without keyboard support
- Low-contrast text
- Tiny tap targets
- Motion that cannot be reduced
- Unlabeled icons

---

## SEO Standards

The site should be discoverable and professionally indexed.

Each major page should include:

- Unique title
- Clear meta description
- Open Graph metadata
- Canonical URL where appropriate
- Clean route names
- Descriptive headings
- Optimized images

Recommended SEO targets:

- `Mithun Arun`
- `Mithun Arun AI researcher`
- `Mithun Arun computer science`
- `AI healthcare researcher`
- `student founder`
- `software engineer portfolio`
- `AI ML portfolio`
- `quantitative technology portfolio`

Do not keyword-stuff. SEO language must remain natural and credible.

### Structured Data

Add structured data when appropriate for:

- Person
- Article/blog posts
- Software projects
- Research/publications

---

## Content Credibility Standards

The website must strengthen credibility without exaggeration.

### Claims

Every major claim should be accurate, specific, and verifiable.

Good examples:

- “Published first-author AI healthcare research presented at IEEE MIT URTC.”
- “Built a mobile social app using React Native, Expo, and Firebase.”
- “Led Fremd Hacks, a student hackathon focused on building technology for social impact.”

Avoid vague or exaggerated claims:

- “World-class AI scientist”
- “Revolutionized healthcare AI”
- “Guaranteed clinical impact”
- “Best student founder in the country”

### Research Claims

For research projects:

- Include problem, method, dataset, metrics, and limitations.
- Distinguish between prototype, research result, and deployed clinical tool.
- Do not imply clinical deployment unless true.
- Mention uncertainty where relevant.
- Keep metrics contextualized.

### Project Claims

For projects:

- State Mithun’s role clearly.
- State what was built.
- State the technical stack.
- State evidence of usage or impact only if known.
- Link to GitHub, demos, App Store, papers, posters, or screenshots where available.

### Recruiter-Facing Copy

Copy should be:

- Specific
- Concise
- Outcome-oriented
- Technical enough to be credible
- Clear enough for non-specialists

Prefer:

```txt
Built an EEG/ECG feature extraction and deep learning pipeline for neurological outcome prediction after cardiac arrest.
```

Instead of:

```txt
Used AI to solve healthcare.
```

---

## Agent Roles

## Strategy Agent

### Purpose

The Strategy Agent improves the website’s narrative, positioning, sitemap, information architecture, and recruiter alignment.

### Responsibilities

- Read `portfolio-spec.md` before making recommendations.
- Clarify Mithun’s positioning as an AI/CS researcher, product builder, startup-oriented founder, and student leader.
- Improve site structure and navigation.
- Make the homepage narrative stronger.
- Ensure the site serves SWE, AI/ML, and quant-tech recruiters.
- Identify gaps in credibility or proof.
- Recommend which accomplishments deserve top placement.

### Must Prioritize

- Clear first impression
- Recruiter scanning speed
- Strong proof hierarchy
- Differentiation from generic student portfolios
- Research-to-product narrative

### Must Avoid

- Turning the site into a long resume
- Adding vague branding language
- Overloading the homepage
- Recommending features that do not support the portfolio goal

### Output Format

When completing a task, include:

```txt
Summary:
- What changed or was recommended

Reasoning:
- Why this improves the portfolio

Files changed:
- List files changed, if any

Checks:
- List checks run or explain why none were run
```

---

## Design Agent

### Purpose

The Design Agent improves visual direction, layout, motion, interaction design, brand feel, and overall product polish.

### Responsibilities

- Create a modern, technical, recruiter-friendly visual experience.
- Improve page layout and hierarchy.
- Design interactive project cards and filtered views.
- Improve animation quality and motion consistency.
- Ensure dark/light mode feels intentional.
- Design EEG/neural-network-inspired visuals without hurting readability.
- Improve mobile responsiveness.

### Must Prioritize

- Clear visual hierarchy
- Fast recruiter comprehension
- Premium technical feel
- Accessible contrast
- Smooth but subtle animation
- Strong mobile experience

### Must Avoid

- Excessive animation
- Low-contrast text
- Generic templates
- Decorative effects that reduce clarity
- Heavy 3D unless performance remains strong

### Design Requirements

- Hero section must clearly state who Mithun is.
- Project cards must communicate title, category, role, tech stack, and impact quickly.
- Research sections must feel credible and data-oriented.
- Quant-tech appeal should be supported through clean data, metrics, and time-series visuals.

---

## Frontend Agent

### Purpose

The Frontend Agent implements the website using Next.js, TypeScript, Tailwind CSS, reusable React components, and Framer Motion.

### Responsibilities

- Build pages and components from `portfolio-spec.md`.
- Implement responsive layouts.
- Implement dark/light mode.
- Implement project filtering.
- Implement animated project cards.
- Implement EEG/neural-network-inspired visual components.
- Implement MDX or Markdown content rendering where appropriate.
- Keep code typed, reusable, and maintainable.

### Required Practices

- Use TypeScript.
- Use Tailwind CSS for styling.
- Use Framer Motion for animation.
- Keep components small and focused.
- Use semantic HTML.
- Prefer data-driven rendering.
- Keep interactivity in client components only when needed.
- Ensure components are accessible by default.

### Before Editing

Run or inspect:

```bash
ls
cat portfolio-spec.md
cat package.json
```

Then determine available scripts.

### Common Commands

Use available scripts from `package.json`. Common examples:

```bash
npm run dev
npm run lint
npm run format
npm run typecheck
npm run test
npm run build
```

Do not assume all scripts exist. Check first.

### Must Avoid

- Creating huge single-file components
- Duplicating content across pages
- Breaking existing routes
- Introducing untyped data
- Adding dependencies without clear need
- Creating inaccessible custom controls
- Making animations mandatory for understanding content

---

## Content Agent

### Purpose

The Content Agent improves copy, project descriptions, research summaries, accomplishments, writing, values, and recruiter-facing language.

### Responsibilities

- Improve homepage copy.
- Improve project descriptions.
- Improve research summaries.
- Improve accomplishment bullets.
- Improve values and personal narrative.
- Make content clear for SWE, AI/ML, and quant-tech recruiters.
- Keep all claims accurate and non-exaggerated.

### Voice and Tone

The voice should be:

- Clear
- Confident
- Specific
- Mature
- Technically credible
- Ambitious but grounded

Avoid:

- Buzzword-heavy writing
- Inflated claims
- Overly casual language
- College-application-style overdramatization
- Long paragraphs that recruiters will not read

### Content Structure

For projects, prefer:

```txt
Problem
What I built
Technical approach
Impact / outcome
What I learned
Links / evidence
```

For research, prefer:

```txt
Research question
Dataset / methods
Modeling approach
Results
Limitations
Why it matters
Publication / presentation links
```

---

## Review Agent

### Purpose

The Review Agent critiques the website for clarity, credibility, design quality, user experience, recruiter appeal, and technical polish.

### Responsibilities

- Review the site as a recruiter would.
- Identify unclear sections.
- Identify weak claims.
- Identify missing proof.
- Identify design inconsistencies.
- Identify interaction issues.
- Identify technical polish gaps.
- Recommend prioritized fixes.

### Review Dimensions

Evaluate:

- First impression
- Recruiter clarity
- SWE appeal
- AI/ML appeal
- Quant-tech appeal
- Research credibility
- Product credibility
- Leadership clarity
- Visual polish
- Mobile experience
- Accessibility
- Performance
- SEO

### Output Format

Use this format:

```txt
Top Issues:
1. ...
2. ...
3. ...

Recommended Fixes:
1. ...
2. ...
3. ...

Highest-Impact Next Step:
...
```

---

## QA Agent

### Purpose

The QA Agent checks accessibility, responsiveness, broken links, SEO, performance, Lighthouse issues, browser compatibility, and deployment readiness.

### Responsibilities

- Run available checks.
- Test major pages.
- Check responsive layouts.
- Check dark/light mode.
- Check keyboard navigation.
- Check project filters.
- Check animated components.
- Check links and downloads.
- Check SEO metadata.
- Check Lighthouse results when possible.
- Check build output.

### Required Checks When Available

```bash
npm run lint
npm run format
npm run typecheck
npm run test
npm run build
```

If a command does not exist, report that it was unavailable.

### Manual QA Checklist

- Homepage loads correctly.
- Navigation works on desktop and mobile.
- Dark/light mode works.
- Project filtering works.
- Project cards are readable and clickable.
- Animations do not block content.
- Reduced motion is respected.
- Research pages are readable and credible.
- Writing pages render correctly.
- Contact links work.
- Resume link works.
- No broken internal links.
- No obvious console errors.
- Site is usable with keyboard only.
- Mobile layout is polished.

---

## Testing Expectations

Agents should run the strongest relevant checks available in the repository.

Minimum expected checks before completing code tasks:

```bash
npm run lint
npm run typecheck
npm run build
```

If tests exist:

```bash
npm run test
```

If formatting scripts exist:

```bash
npm run format
```

For UI-heavy tasks, also manually inspect:

- Desktop layout
- Mobile layout
- Dark mode
- Light mode
- Hover/focus states
- Reduced-motion behavior

Do not claim checks passed unless they were actually run.

---

## Git and PR Workflow

Agents should assume work will be reviewed through GitHub pull requests.

### Branching

Use focused branches when possible:

```txt
feature/project-filtering
feature/research-visualizer
fix/mobile-nav
content/research-copy
polish/hero-animation
```

### Commit Style

Use clear, specific commit messages:

```txt
feat: add filterable project explorer
fix: improve mobile navigation spacing
content: revise NeuroHero project summary
polish: add hero EEG animation
chore: add metadata helpers
```

### Pull Request Expectations

Every PR should include:

- Summary of changes
- Screenshots or screen recordings for visual changes
- Checks run
- Known limitations
- Follow-up tasks if needed

### PR Size

Prefer small PRs.

Good PR examples:

- Add project card component
- Add project filtering
- Add research page metadata
- Improve homepage hero copy
- Add dark/light mode toggle

Bad PR examples:

- Redesign entire website and rewrite all content at once
- Change styling system and content model in one PR
- Add multiple unrelated features together

---

## Performance Standards

The site should feel fast and lightweight.

Agents must:

- Optimize images.
- Lazy-load heavy visuals.
- Avoid unnecessary client-side JavaScript.
- Avoid large animation libraries beyond approved stack.
- Keep 3D/canvas effects lightweight.
- Use static rendering where possible.
- Avoid layout shift.
- Keep Lighthouse performance strong.

Performance-sensitive features:

- Animated neural-network background
- EEG/ECG waveform animation
- Project filters
- Research visualizers
- MDX rendering

If an effect hurts performance, simplify it.

---

## Security and Privacy Standards

- Do not expose private information.
- Do not include secrets, API keys, tokens, or private credentials.
- Use environment variables for sensitive config.
- Do not commit `.env` files.
- Do not expose unpublished personal details unless explicitly included in approved content.
- Contact forms should avoid leaking user information.
- AI chatbot features must be grounded in approved site content.

---

## AI Feature Standards

If implementing an AI Portfolio Guide or chatbot:

- It must only answer based on approved portfolio content.
- It must not invent accomplishments, metrics, links, publications, or affiliations.
- It should cite or link to relevant site sections when possible.
- It should handle recruiter-oriented queries.
- It should politely say when information is not available.
- It should not expose private implementation details or secrets.

Example allowed queries:

- “What projects show Mithun’s SWE ability?”
- “Summarize Mithun’s AI healthcare research.”
- “What would make Mithun a strong quant-tech candidate?”
- “Show me his strongest product-building examples.”

---

## Definition of Done

A task is done only when:

1. The change aligns with `portfolio-spec.md`.
2. The edit is focused and does not modify unrelated files.
3. The implementation is typed and maintainable.
4. The UI works on desktop and mobile.
5. Accessibility has been considered.
6. Content is accurate and credible.
7. Recruiter appeal is preserved or improved.
8. Animations are smooth and non-distracting.
9. Dark/light mode still works if applicable.
10. Relevant checks have been run, or unavailable checks are clearly reported.
11. The agent explains what changed.
12. Any remaining limitations are documented.

---

## Required Completion Response

After every task, agents must respond with:

```txt
Summary:
- Briefly explain what changed.

Files changed:
- List edited files.

Checks run:
- List commands run and results.

Notes:
- Mention assumptions, limitations, or follow-up recommendations.
```

Do not omit this completion response.

---

## Final Reminder

This website is not just a personal homepage. It is a technical proof-of-work artifact for recruiters, researchers, startup mentors, and collaborators.

Every change should help answer at least one of these questions:

1. Is Mithun technically strong enough for SWE, AI/ML, or quant-tech roles?
2. Can Mithun communicate complex work clearly?
3. Has Mithun built real things beyond coursework?
4. Does Mithun show credible research ability?
5. Does Mithun have product taste and leadership potential?
6. Does the website itself demonstrate strong engineering and design judgment?
