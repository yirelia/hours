# 使用官方 Node.js 18 镜像作为基础镜像
FROM node:18.19.1-alpine3.19 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制 tsconfig.json 和源代码
COPY tsconfig.json ./
COPY src ./src

# 安装开发依赖并编译 TypeScript
RUN npm install typescript @types/node --save-dev && \
    npm run build && \
    npm prune --production

# 生产镜像
FROM node:18.19.1-alpine3.19

# 设置工作目录
WORKDIR /app

# 从 builder 阶段复制编译后的代码和生产依赖
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# 切换到非 root 用户
USER nodejs

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
