# Mithun Arun Portfolio

Personal portfolio website for Mithun Arun, presenting his work across AI and computer science research, healthcare signal processing, software products, and student leadership.

## Tech Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- Framer Motion for lightweight entrance animations
- SVG and CSS for the neural signal visual
- Google Gemini API for the portfolio-grounded Ask Mithun assistant

## Local Setup

Prerequisites:

- Node.js 20.9 or newer
- npm

Install dependencies from the project root:

```bash
npm install
```

Copy the environment variable template for local chatbot use:

```bash
cp .env.example .env.local
```

Add a Gemini API key to `.env.local`. The rest of the portfolio runs without
this key, but `/ask` will return a friendly unavailable message until it is
configured.

## Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Portfolio content is maintained in `src/data/profile.ts`. The homepage entry point is `app/page.tsx`.

## Ask Mithun Chatbot

The `/ask` page sends questions to the server-only `/api/chat` route. The route
grounds Gemini responses in the structured portfolio data from
`src/data/profile.ts`; the API key is never sent to the browser.

Environment variables:

- `LLM_PROVIDER`: Optional. Defaults to `gemini` and currently supports Gemini only.
- `GEMINI_API_KEY`: Required to enable chatbot responses.
- `GEMINI_MODEL`: Optional. Defaults to `gemini-2.5-flash`.

Gemini offers a free tier subject to Google's current model availability and
rate limits. Review the current limits before deployment, and never commit a
real API key.

The chat route validates message and history sizes, rejects oversized request
bodies, and applies a dependency-free per-IP limit of 10 requests per minute.
This in-memory limit is best-effort on serverless platforms because each
function instance has separate, temporary memory. A hosted rate-limit store is
the appropriate follow-up if sustained abuse becomes a concern.

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
6. Add `LLM_PROVIDER`, `GEMINI_API_KEY`, and optionally `GEMINI_MODEL` in the Vercel project environment settings.
7. Deploy. No custom output directory is needed.

Vercel will create preview deployments for branches and production deployments from the configured production branch. After deployment, verify the homepage, project filters, responsive layouts, social metadata, and several grounded `/ask` responses on the generated URL.
