# Stage 1: Base image for all stages
FROM node:20-alpine AS base

# Stage 2: Dependencies
# We use 'npm ci' for clean, reproducible installs
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec9ee063c5aa4460e#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set Environment to production during build
ENV NODE_ENV=production
# Disable Next.js telemetry to speed up build and improve privacy
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Stage 4: Runner (The final production image)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Cloud Run defaults to port 8080, but Next.js defaults to 3000. 
# It's best to use an ENV variable that Cloud Run can override.
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Only copy what is strictly necessary for the 'standalone' build
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 8080

# Next.js standalone mode creates a server.js file automatically
CMD ["node", "server.js"]