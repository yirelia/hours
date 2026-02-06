import { Request, Response, NextFunction } from "express";

// 错误处理中间件
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("Error:", err);
  const status = err.status || 500;
  const message = err.message || "服务器内部错误";

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : undefined,
  });
}

// 404处理中间件
export function notFound(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: "请求的资源不存在",
  });
}
