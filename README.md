# Zentik Documentation

This documentation site is built with [Fumadocs](https://fumadocs.dev) and Next.js.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Starts the dev server at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

## Docker

```bash
docker build -t zentik-docs .
docker run -p 8080:8080 zentik-docs
```

Open [http://localhost:8080](http://localhost:8080).

## Deployment (Railway)

Deploys via GitHub Actions on push to `main` or tags `v*.*.*`. Railway builds the Docker image and runs the Next.js server.

**Setup:** Add secrets `RAILWAY_TOKEN` and `RAILWAY_SERVICE_ID` in GitHub. Railway sets `PORT` automatically.
