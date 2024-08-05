FROM node:20.10.0-alpine as base

# Install LibreOffice and its dependencies
RUN apk update && \
    apk add --no-cache \
    libreoffice \
    ttf-dejavu \
    fontconfig \
    && rm -rf /var/cache/apk/*

# All deps stage
FROM base as deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

# Production only deps stage
FROM base as production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci --omit=dev

# Build stage
FROM base as build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE $PORT
CMD ["node", "./bin/server.js"]

