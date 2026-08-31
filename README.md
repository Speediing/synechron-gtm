# Synechron x SpaceXAI

A passworded customer leave-behind for Synechron. It shows three sample workflows as short scenes. Each last scene is the work product an agent leaves ready for review.

## Run locally

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The local password is `land2expand`. Set `SITE_PASSWORD` to override it.

## Visual checks

Start the site, then capture the login, hero, and first use case at desktop and mobile sizes.

```bash
SITE_PASSWORD=land2expand npm run visual:capture -- local
```

The script writes screenshots to `.visual/local/`.

## Target

The account slug is `synechron`. The intended Vercel hostname is `synechron-grokbot.vercel.app`.
