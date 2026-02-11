import express, { Application } from "express";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { config } from "./config";
import { testConnection } from "./config/database";
import { errorHandler, notFound } from "./middleware/error";

// 导入路由
import indexRouter from "./routes/index";
import projectsRouter from "./routes/projects";
import hoursRouter from "./routes/hours";

const app: Application = express();

// expression SPA 静态资源（放在 helmet 之前，避免 CSP 限制）
const expressionPath = path.join(__dirname, "../public/expression");
app.use("/expression", express.static(expressionPath));
app.get("/expression/*", (req, res) => {
  res.sendFile(path.join(expressionPath, "index.html"));
});

// 中间件
app.use(helmet()); // 安全头
app.use(cors({ origin: config.corsOrigin })); // CORS
app.use(compression()); // 压缩
app.use(express.json()); // JSON解析
app.use(express.urlencoded({ extended: true })); // URL解析

// 设置默认 Content-Type 为 JSON（仅对 API 路由生效）
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
  }
  next();
});

// 日志中间件 - JSON 格式
app.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: tokens["response-time"](req, res) + "ms",
        contentLength: tokens.res(req, res, "content-length"),
        timestamp: new Date().toISOString(),
      });
    },
    {
      stream: {
        write: (message) => {
          const log = JSON.parse(message);
          console.log(JSON.stringify(log));
        },
      },
    },
  ),
);

// 路由
app.use("/api", indexRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/hours", hoursRouter);

// 错误处理
app.use(notFound);
app.use(errorHandler);

// 启动服务器
async function startServer() {
  try {
    // 测试数据库连接
    await testConnection();
    app.listen(config.port, () => {
      console.log(`
╔════════════════════════════════════════╗
║   Hours Server 启动成功               ║
╠════════════════════════════════════════╣
║   环境: ${config.nodeEnv.padEnd(30)}║
║   端口: ${config.port.toString().padEnd(30)}║
║   URL: http://localhost:${config.port.toString().padEnd(18)}║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error("服务器启动失败:", error);
    process.exit(1);
  }
}

startServer();

export default app;
