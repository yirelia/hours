import { Router, Request, Response } from "express";
import { query } from "../config/database";

const router = Router();

// 获取所有项目
router.get("/list", async (req: Request, res: Response) => {
  try {
    const sql = `SELECT
  id,
  name,
  code,
  status,
  begin,
  end,
  openedBy,
  openedDate
FROM zt_project
WHERE deleted = '0'
  AND type = 'project'
ORDER BY id DESC;`;
    const projects = await query(sql);
    res.json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "获取项目列表失败",
      error: error.message,
    });
  }
});

// 获取单个项目
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const projects = await query("SELECT * FROM projects WHERE id = ?", [id]);

    if (Array.isArray(projects) && projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "项目不存在",
      });
    }

    res.json({
      success: true,
      data: Array.isArray(projects) ? projects[0] : projects,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "获取项目详情失败",
      error: error.message,
    });
  }
});

export default router;
