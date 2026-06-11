#!/bin/bash

set -e

mkdir -p tasks

cat > tasks/003-hero-and-positioning.md <<'EOF'
# Task 003: Hero and Positioning

## Goal
Create a polished, recruiter-facing hero section that clearly positions Mithun Arun as an AI/CS researcher, product builder, startup-oriented founder, and student leader.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- `src/data/profile.ts`

## Requirements
- Improve the homepage hero section using existing data from `src/data/profile.ts`.
- Include a strong headline, short subheading, and clear calls to action.
- Add visual hierarchy and responsive spacing.
- Include quick credibility signals such as research, app building, leadership, or awards.
- Keep claims accurate and not exaggerated.
- Do not add complex animations yet.
- Do not redesign unrelated sections.

## Acceptance Criteria
- Hero section looks polished on mobile and desktop.
- Hero copy is specific to Mithun.
- Buttons or links work if destinations exist.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/004-featured-project-cards.md <<'EOF'
# Task 004: Featured Project Cards

## Goal
Build polished, interactive featured project cards for Mithun’s most important projects.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- `src/data/profile.ts`

## Requirements
- Update the Featured Projects section to use project data from `src/data/profile.ts`.
- Create reusable project card components if appropriate.
- Each card should include:
  - Project name
  - Short description
  - Category or tags
  - Technologies used
  - Impact or outcome when available
  - Optional links if available
- Add subtle hover/focus states.
- Keep the layout responsive.
- Do not add filtering yet.
- Do not add complex animations yet.

## Acceptance Criteria
- Featured project cards render from structured data.
- Cards are responsive and accessible.
- Hover/focus states are polished but not distracting.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/005-research-accomplishments-experience.md <<'EOF'
# Task 005: Research, Accomplishments, and Experience Sections

## Goal
Improve the research, accomplishments, and experience sections so the site feels credible to recruiters, professors, founders, and technical mentors.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- `src/data/profile.ts`

## Requirements
- Update Research section using structured data.
- Update Accomplishments section using structured data.
- Update Experience section if it exists, or create it if it is already specified in the homepage structure.
- Keep wording concise, accurate, and recruiter-friendly.
- Avoid exaggeration.
- Make the sections scannable with cards, timelines, or grouped lists.
- Do not add advanced animation yet.

## Acceptance Criteria
- Research, accomplishments, and experience content displays clearly.
- Sections are visually distinct and easy to scan.
- Content comes from `src/data/profile.ts` where possible.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/006-design-system-and-visual-polish.md <<'EOF'
# Task 006: Design System and Visual Polish

## Goal
Create a more polished visual system for the portfolio website while keeping the codebase maintainable.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- Existing component structure

## Requirements
- Improve typography, spacing, colors, borders, backgrounds, and layout consistency.
- Create reusable UI patterns where useful.
- Make the design feel modern, technical, premium, and credible.
- Ensure mobile responsiveness.
- Keep accessibility in mind.
- Do not add heavy animations yet.
- Do not rewrite the entire app.

## Acceptance Criteria
- Site looks visually cohesive.
- Components share consistent styling.
- Mobile and desktop layouts are clean.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/007-animations-and-interactions.md <<'EOF'
# Task 007: Animations and Interactions

## Goal
Add tasteful animations and interactions that make the site feel technically impressive without hurting performance or accessibility.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- Existing components

## Requirements
- Add subtle section entrance animations.
- Add polished hover/focus interactions.
- Use Framer Motion if already installed; otherwise install it only if appropriate.
- Respect reduced-motion accessibility preferences where possible.
- Keep animations tasteful and fast.
- Do not add the EEG/neural visual yet unless already simple to integrate.
- Do not break layout or performance.

## Acceptance Criteria
- Animations improve polish without distracting.
- Interactions work on desktop and remain usable on mobile.
- Reduced-motion users are considered.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/008-project-filtering.md <<'EOF'
# Task 008: Project Filtering

## Goal
Add project filtering so visitors can explore Mithun’s work by category.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- `src/data/profile.ts`

## Requirements
- Add filters for project categories such as AI/ML, Healthcare, Product, Research, Security, and Leadership if supported by the data.
- Filtering should be client-side and simple.
- Keep UI clean and accessible.
- Use existing project data.
- Do not add backend logic.
- Do not overcomplicate state management.

## Acceptance Criteria
- Users can filter visible projects by category.
- Filter controls are accessible and responsive.
- Project cards still render correctly.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/009-eeg-neural-visual.md <<'EOF'
# Task 009: EEG / Neural Network Inspired Visual

## Goal
Add a visually impressive EEG or neural-network-inspired visual that fits Mithun’s AI healthcare research identity.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- Existing hero and design system

## Requirements
- Create a lightweight animated visual inspired by EEG signals, neural networks, or signal processing.
- Prefer CSS/SVG/canvas only if maintainable.
- Keep performance strong.
- Make it responsive.
- Respect reduced-motion preferences where possible.
- The visual should enhance the hero or research section without overwhelming content.
- Do not add unnecessary heavy dependencies.

## Acceptance Criteria
- Visual is technically impressive and relevant.
- It does not hurt readability.
- It works on mobile and desktop.
- It does not cause lint/type errors.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/010-dark-light-mode.md <<'EOF'
# Task 010: Dark and Light Mode

## Goal
Add polished dark/light mode support to the portfolio website.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- Existing styling and layout

## Requirements
- Add dark/light mode support.
- Include a visible theme toggle.
- Persist user preference if reasonable.
- Respect system preference if reasonable.
- Ensure all sections remain readable in both modes.
- Keep colors polished and accessible.
- Avoid large unrelated rewrites.

## Acceptance Criteria
- Theme toggle works.
- Dark and light modes both look polished.
- Text contrast is readable.
- Preference behavior is reasonable.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/011-seo-accessibility-performance.md <<'EOF'
# Task 011: SEO, Accessibility, and Performance

## Goal
Improve the portfolio website’s SEO, accessibility, and performance readiness before deployment.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- Existing app structure

## Requirements
- Improve metadata, title, description, and Open Graph basics.
- Check semantic HTML structure.
- Improve alt text or aria labels where needed.
- Ensure keyboard navigation works.
- Check responsive behavior.
- Remove obvious performance issues.
- Do not redesign the whole site.
- Do not add new major features.

## Acceptance Criteria
- Metadata is appropriate for Mithun Arun’s portfolio.
- Main interactive elements are keyboard accessible.
- Layout works on mobile and desktop.
- No obvious accessibility issues are introduced.
- No unrelated files are changed.
- `npm run lint` passes.
EOF

cat > tasks/012-deployment-readiness.md <<'EOF'
# Task 012: Deployment Readiness

## Goal
Prepare the portfolio website for deployment to Vercel or a similar hosting platform.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`
- Existing project configuration

## Requirements
- Check build configuration.
- Ensure README has clear setup and run instructions.
- Ensure environment variables are documented if any exist.
- Ensure project can run with:
  - `npm install`
  - `npm run dev`
  - `npm run lint`
  - `npm run build`
- Fix build issues if they exist.
- Do not add new features.

## Acceptance Criteria
- `npm run lint` passes.
- `npm run build` passes.
- README includes useful local development instructions.
- Project is ready for deployment.
- No unrelated files are changed.
EOF

echo "Created tasks 003 through 012."