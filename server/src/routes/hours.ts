import { Router, Request, Response } from "express";
import { query } from "../config/database";

const router = Router();

// 获取所有任务
router.get("/list-user", async (req: Request, res: Response) => {
  try {
    const { projectId, dateFrom, dateTo } = req.query;
    let sql = `SELECT
  e.project AS project_id,
  p.name    AS project_name,
  e.account AS account,
  u.realname AS realname,
  SUM(e.consumed) AS hours
FROM zt_effort e
JOIN zt_project p ON p.id = e.project
LEFT JOIN zt_user u ON u.account = e.account
WHERE e.deleted = '0'
  AND e.project = ?
  AND e.date >= ?
  AND e.date <  ?
GROUP BY e.project, p.name, e.account, u.realname
ORDER BY  hours DESC;`;

    const tasks = await query(sql, [projectId, dateFrom, dateTo]);
    res.json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "获取用户工时列表失败",
      error: error.message,
    });
  }
});

export default router;
