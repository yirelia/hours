import { Router, Request, Response } from "express";
import { pool, query } from "../config/database";

const router = Router();

// 健康检查
router.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "服务运行正常",
    timestamp: new Date().toISOString(),
  });
});

// 数据库连接检查
router.get("/db-check", async (req: Request, res: Response) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      success: true,
      message: "数据库连接正常",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "数据库连接失败",
      error: error.message,
    });
  }
});

export default router;
