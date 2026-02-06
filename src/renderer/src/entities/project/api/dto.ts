/**
 * API 层 DTO 类型定义
 * 与后端接口字段保持一致
 */

/**
 * 项目列表请求 DTO
 */
export interface ProjectListRequestDTO {
  page: number;
  limit: number;
}

/**
 * 项目 DTO (后端返回格式)
 */
export interface ProjectDTO {
  id: number;
  name: string;
  code: string;
  model: string;
  type: string;
  budget: string;
  budgetUnit: string;
  parent: number;
  begin: string;
  end: string;
  status: string;
  openedBy: string;
  openedDate: string;
  PM: string;
  progress: number;
}

export interface UserDto {
  project_id: number;
  project_name: string;
  account: string;
  realname: string;
  hours: number;
}

/**
 * 项目列表响应 DTO
 */
export interface ProjectListResponseDTO {
  success: boolean;
  data: ProjectDTO[];
}

export interface ProjectUserRespDTO {
  success: boolean;
  data: UserDto[];
}

export interface ProjectUserRequestDTO {
  projectId: number;
  dateFrom: string;
  dateTo: string;
}
