# Task 001: Project Foundation

## Goal
Set up the initial personal portfolio website foundation for Mithun Arun using Next.js, TypeScript, Tailwind CSS, and a clean component structure.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`

## Requirements
- Keep the default Next.js app working.
- Remove unnecessary starter content.
- Create a clean homepage layout.
- Add a basic responsive page structure.
- Add placeholder sections for:
  - Hero
  - About
  - Featured Projects
  - Research
  - Accomplishments
  - Core Values
  - Contact
- Create reusable component files where appropriate.
- Do not add complex animations yet.
- Do not overdesign the site yet.
- Keep this as a clean foundation for future tasks.

## Suggested Structure
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/FeaturedProjects.tsx`
- `src/components/sections/Research.tsx`
- `src/components/sections/Accomplishments.tsx`
- `src/components/sections/CoreValues.tsx`
- `src/components/sections/Contact.tsx`

## Acceptance Criteria
- The app runs with `npm run dev`.
- The homepage shows all placeholder sections.
- The layout is responsive.
- Code uses TypeScript and Tailwind.
- No unrelated files are changed.
- `npm run lint` passes.