import { ref, onMounted } from "vue";
import type { Project, ProjectUser } from "./types";
import { getAllProjects, getProjectUsers } from "../api/projectApi";
import { ProjectUserRequestDTO } from "../api/dto";

/**
 * 项目列表业务钩子
 * 提供获取所有项目、分页查询等功能
 */
export function useProjects() {
  const projects = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);

  /**
   * 加载所有项目
   * @param autoLoad 是否在 mount 时自动加载，默认 false
   */
  const loadAllProjects = async () => {
    loading.value = true;
    error.value = null;
    try {
      projects.value = (await getAllProjects()).data;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e));
      projects.value = [];
    } finally {
      loading.value = false;
    }
  };

  const users = ref<ProjectUser[]>([]);

  const loadProjectAllUser = async (data: ProjectUserRequestDTO) => {
    try {
      users.value = (await getProjectUsers(data)).data;
      debugger;
    } catch {}
  };

  /**
   * 生成项目选项（用于下拉框）
   */
  const projectOptions = () => {
    return projects.value.map((p) => ({
      label: p.name,
      value: p.id,
    }));
  };

  return {
    projects,
    loading,
    error,
    users,
    loadAllProjects,
    projectOptions,
    loadProjectAllUser,
  };
}

/**
 * 带自动加载的项目列表钩子
 * 在组件挂载时自动加载所有项目
 */
export function useAllProjects() {
  const {
    projects,
    loading,
    error,
    loadAllProjects,
    projectOptions,
    loadProjectAllUser,
    users,
  } = useProjects();

  onMounted(() => {
    loadAllProjects();
  });

  return {
    projects,
    users,
    loading,
    error,
    reload: loadAllProjects,
    projectOptions,
    loadProjectAllUser,
  };
}
