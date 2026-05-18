# ---------- build ----------
FROM node:20-bookworm AS builder
WORKDIR /app

RUN npm config set registry https://package-mirror.liara.ir/repository/npm/

COPY package*.json ./
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
# INTERNAL_API_URL has to be available at BUILD time, not just runtime:
# next.config.js's rewrites() is evaluated once during `next build` and
# the result is baked into .next/routes-manifest.json — changing the env
# var later has no effect on the proxy target. CapRover passes this as
# a build-arg; without these two lines Docker dropped it with a
# "build-args not consumed" warning and the /api/* proxy kept hitting
# the public hostname.
ARG INTERNAL_API_URL
ENV INTERNAL_API_URL=$INTERNAL_API_URL
ENV NODE_ENV=production

RUN npm run build

# ---------- runtime ----------
FROM node:20-bookworm-slim AS runner
WORKDIR /app

RUN npm config set registry https://package-mirror.liara.ir/repository/npm/

ENV NODE_ENV=production
ENV PORT=3000

# فقط خروجی‌ها + node_modules مرحلهٔ build را کپی می‌کنیم
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["npm", "start"]