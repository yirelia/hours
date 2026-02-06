import { request } from "@/shared/api/request";
import {
  projectListResponseToModel,
  projectDTOToModel,
  projectUserDtoToModel,
  projectUserRespToModel,
} from "../lib/mappers";
import type {
  List,
  Project,
  ProjectListResult,
  ProjectUser,
} from "../model/types";
import type {
  ProjectListResponseDTO,
  ProjectUserRequestDTO,
  ProjectUserRespDTO,
  UserDto,
} from "./dto";

// 重新导出 DTO 类型供外部使用（如需要）
export type {
  ProjectDTO,
  ProjectListRequestDTO,
  ProjectListResponseDTO,
} from "./dto";

/**
 * 获取所有项目（通过循环分页接口）
 * @param pageSize 每页数量，默认 100
 * @returns 所有项目列表
 */
export const getAllProjects = async (): Promise<ProjectListResult> => {
  const response = await request.get<ProjectListResponseDTO>("/projects/list");
  return projectListResponseToModel(response);
};

export const getProjectUsers = async (
  data: ProjectUserRequestDTO,
): Promise<List<ProjectUser>> => {
  const response = await request.get<ProjectUserRespDTO>("hours/list-user", {
    params: data,
  });
  return projectUserRespToModel(response);
};
