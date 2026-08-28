# Grok Bot for Datadog GTM

Passworded site. Grok Bot from SpaceXAI, for Datadog GTM.

## What it is

Three GTM jobs on one page. Each job has a short problem statement, an interactive Grok Bot demo, and the matching Krista Letz clips under that demo. Below that: a light index of the clips and the public Grok Bot quote wall.

## Run locally

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Default password is `land2expand` (override with `SITE_PASSWORD`).

## Krista clips

Download into `private/media/krista-clips/` from the GitHub release (served only through the passworded `/api/media/...` route):

```bash
gh release download krista-gtm-clips-720p-2026-08-26 \
  --repo Speediing/grok-bot-quotes \
  --dir private/media/krista-clips
```

## Deploy

Preview only under the `jasonwiker` Vercel team, project name `datadog-cro`. Set `SITE_PASSWORD=land2expand`. Do not promote to a public production domain until Jason says so.
