import type {
  List,
  Project,
  ProjectListResult,
  ProjectModel,
  ProjectStatus,
  ProjectType,
  ProjectUser,
} from "../model/types";
import type {
  ProjectDTO,
  ProjectListResponseDTO,
  ProjectUserRespDTO,
  UserDto,
} from "../api/dto";

/**
 * API DTO → UI Model
 * 将单个项目 DTO 转换为 UI 层模型
 */
export const projectDTOToModel = (dto: ProjectDTO): Project => ({
  id: dto.id,
  name: dto.name,
  code: dto.code,
  model: dto.model as ProjectModel,
  type: dto.type as ProjectType,
  budget: dto.budget,
  budgetUnit: dto.budgetUnit,
  parent: dto.parent,
  beginDate: dto.begin,
  endDate: dto.end,
  status: dto.status as ProjectStatus,
  openedBy: dto.openedBy,
  openedDate: dto.openedDate,
  projectManager: dto.PM,
  progress: dto.progress,
});
/**
 * API DTO → UI Model
 * 将项目列表响应 DTO 转换为 UI 层分页模型
 */
export const projectListResponseToModel = (
  dto: ProjectListResponseDTO,
): ProjectListResult => ({
  data: dto.data.map(projectDTOToModel),
  success: true,
});

export const projectUserDtoToModel = (dto: UserDto): ProjectUser => ({
  projectId: dto.project_id,
  projectName: dto.project_name,
  account: dto.account,
  realname: dto.realname,
  hours: dto.hours,
});
export const projectUserRespToModel = (
  dto: ProjectUserRespDTO,
): List<ProjectUser> => ({
  data: dto.data.map(projectUserDtoToModel),
  success: true,
});
