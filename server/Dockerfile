# ---- Stage 1: 构建前端 SPA ----
FROM node:18.19.1-alpine3.19 AS frontend

WORKDIR /app

COPY package.json vite.config.ts ./
COPY src/renderer/ ./src/renderer/

RUN npm install --ignore-scripts && npx vite build

# ---- Stage 2: 构建 Server ----
FROM node:18.19.1-alpine3.19 AS backend

WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server/tsconfig.json ./
COPY server/src/ ./src/

RUN npx tsc && npm prune --production

# ---- Stage 3: 生产镜像 ----
FROM node:18.19.1-alpine3.19

WORKDIR /app

COPY --from=backend /app/dist ./dist
COPY --from=backend /app/node_modules ./node_modules
COPY --from=backend /app/package.json ./

# 前端产物 -> public/expression
COPY --from=frontend /app/src/renderer/dist ./public/expression

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server.js"]
