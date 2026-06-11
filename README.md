# Mithun Arun Portfolio

Personal portfolio website for Mithun Arun, presenting his work across AI and computer science research, healthcare signal processing, software products, and student leadership.

## Tech Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion for lightweight entrance animations
- SVG and CSS for the neural signal visual

## Local Setup

Prerequisites:

- Node.js 20.9 or newer
- npm

Install dependencies from the project root:

```bash
npm install
```

No environment variables are currently required.

## Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Portfolio content is maintained in `src/data/profile.ts`. The homepage entry point is `app/page.tsx`.

## Validation

Run linting:

```bash
npm run lint
```

Create an optimized production build:

```bash
npm run build
```

Optionally run the completed production build locally:

```bash
npm run start
```

## Deploying to Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in [Vercel](https://vercel.com/new).
3. Keep the detected framework preset as **Next.js**.
4. Use the repository root as the root directory.
5. Use `npm run build` as the build command if Vercel does not detect it automatically.
6. Deploy. No environment variables or custom output directory are currently needed.

Vercel will create preview deployments for branches and production deployments from the configured production branch. After deployment, verify the homepage, project filters, theme toggle, responsive layouts, and social metadata on the generated URL.
