# Task 002: Content Data Layer

## Goal
Create a structured content/data layer for Mithun Arun’s personal portfolio website so projects, research, accomplishments, values, and experiences can be reused across components.

## Context
Before making changes, read:
- `AGENTS.md`
- `portfolio-spec.md`

## Requirements
Create a new file:

- `src/data/profile.ts`

This file should export structured TypeScript data for:

1. Personal identity
2. Hero positioning
3. Featured projects
4. Research/publications
5. Accomplishments
6. Experiences
7. Core values
8. Contact/social links

## Content Guidelines
- Keep claims accurate and credible.
- Do not exaggerate accomplishments.
- Use concise recruiter-friendly language.
- Make the content easy to edit later.
- Use TypeScript types/interfaces.
- Do not redesign the homepage yet.
- Do not add animations yet.
- Do not create project filtering yet.

## Suggested Data Structure
Include exports such as:

- `profile`
- `hero`
- `projects`
- `research`
- `accomplishments`
- `experiences`
- `coreValues`
- `contactLinks`

## Acceptance Criteria
- `src/data/profile.ts` exists.
- Data is strongly typed with TypeScript.
- Homepage sections import and display basic content from this file.
- Existing layout still works.
- No unrelated files are changed.
- `npm run lint` passes.