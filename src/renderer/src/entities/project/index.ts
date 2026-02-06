// UI Model 类型
export type {
  Project,
  ProjectListResult,
  ProjectModel,
  ProjectStatus,
  ProjectType,
  PaginatedList,
} from "./model";

// Composable Hooks
export { useProjects, useAllProjects } from "./model";

// API 函数
export { getAllProjects } from "./api";

// DTO 类型（如需直接使用）
export type {
  ProjectDTO,
  ProjectListRequestDTO,
  ProjectListResponseDTO,
} from "./api";

// Mapper 函数（如需直接使用）
export { projectDTOToModel, projectListResponseToModel } from "./lib";
