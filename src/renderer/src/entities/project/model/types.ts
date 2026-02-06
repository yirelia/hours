/**
 * 项目状态枚举
 */
export type ProjectStatus = "wait" | "doing" | "suspended" | "closed";

/**
 * 项目模型枚举
 */
export type ProjectModel = "scrum" | "waterfall" | "kanban";

/**
 * 项目类型枚举
 */
export type ProjectType = "project" | "product" | "sprint";

/**
 * UI 层项目模型
 */
export interface Project {
  id: number;
  name: string;
  code: string;
  model: ProjectModel;
  type: ProjectType;
  budget: string;
  budgetUnit: string;
  parent: number;
  beginDate: string;
  endDate: string;
  status: ProjectStatus;
  openedBy: string;
  openedDate: string;
  projectManager: string;
  progress: number;
}

export interface ProjectUser {
  projectId: number;
  projectName: string;
  account: string;
  realname: string;
  hours: number;
}

/**
 * UI 层分页响应模型
 */
export interface PaginatedList<T> {
  page: number;
  total: number;
  limit: number;
  data: T[];
}

export interface List<T> {
  data: T[];
  success: boolean;
}

/**
 * UI 层项目列表响应
 */
export type ProjectListResult = List<Project>;
