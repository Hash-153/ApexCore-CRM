# Multi-stage production build for MediCore HealthOS
FROM node:24-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json tsconfig*.json ./
COPY client/package*.json ./client/
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# Copy source trees
COPY server ./server
COPY client ./client

# Compile TypeScript and Vite bundles
RUN npm run build || true

# Production Runtime Stage
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY package*.json ./
COPY --from=builder /app/server ./server
COPY --from=builder /app/client ./client
COPY config.template.json ./

EXPOSE 5000 3000

USER node

CMD ["node", "--experimental-strip-types", "server/src/server.ts"]
