import { action } from 'typesafe-actions';
import { ProjectsTypes, Project, ProjectUser } from './types';

// Load projects
export const loadProjectsRequest = () => action(ProjectsTypes.LOAD_PROJECTS_REQUEST);
export const loadProjectsSuccess = (data: Project[]) => action(ProjectsTypes.LOAD_PROJECTS_SUCCESS, data);
export const loadProjectsFailure = (err: any[]) => action(ProjectsTypes.LOAD_PROJECTS_FAILURE, err);

// Load all projects for management
export const loadAllProjectsRequest = (page: number = 1, take: number = 10) => action(ProjectsTypes.LOAD_ALL_PROJECTS_REQUEST, { page, take });
export const loadAllProjectsSuccess = (data: { data: Project[], total: number, page: number, take: number }) => action(ProjectsTypes.LOAD_ALL_PROJECTS_SUCCESS, data);
export const loadAllProjectsFailure = (err: any[]) => action(ProjectsTypes.LOAD_ALL_PROJECTS_FAILURE, err);

// Project CRUD
export const createProjectRequest = (data: Project) => action(ProjectsTypes.CREATE_PROJECT_REQUEST, data);
export const createProjectSuccess = (data: Project) => action(ProjectsTypes.CREATE_PROJECT_SUCCESS, data);
export const createProjectFailure = (err: any[]) => action(ProjectsTypes.CREATE_PROJECT_FAILURE, err);

export const updateProjectRequest = (data: Project) => action(ProjectsTypes.UPDATE_PROJECT_REQUEST, data);
export const updateProjectSuccess = (data: Project) => action(ProjectsTypes.UPDATE_PROJECT_SUCCESS, data);
export const updateProjectFailure = (err: any[]) => action(ProjectsTypes.UPDATE_PROJECT_FAILURE, err);

export const deleteProjectRequest = (id: number) => action(ProjectsTypes.DELETE_PROJECT_REQUEST, id);
export const deleteProjectSuccess = (data: Project) => action(ProjectsTypes.DELETE_PROJECT_SUCCESS, data);
export const deleteProjectFailure = (err: any[]) => action(ProjectsTypes.DELETE_PROJECT_FAILURE, err);

// Project users management
export const loadProjectUsersRequest = (projectId: number) => action(ProjectsTypes.LOAD_PROJECT_USERS_REQUEST, projectId);
export const loadProjectUsersSuccess = (data: ProjectUser[]) => action(ProjectsTypes.LOAD_PROJECT_USERS_SUCCESS, data);
export const loadProjectUsersFailure = (err: any[]) => action(ProjectsTypes.LOAD_PROJECT_USERS_FAILURE, err);

export const addProjectUserRequest = (projectId: number, data: { userId: number, role: string }) => action(ProjectsTypes.ADD_PROJECT_USER_REQUEST, { projectId, data });
export const addProjectUserSuccess = (data: ProjectUser) => action(ProjectsTypes.ADD_PROJECT_USER_SUCCESS, data);
export const addProjectUserFailure = (err: any[]) => action(ProjectsTypes.ADD_PROJECT_USER_FAILURE, err);

export const updateProjectUserRequest = (projectId: number, userId: number, data: { role: string }) => action(ProjectsTypes.UPDATE_PROJECT_USER_REQUEST, { projectId, userId, data });
export const updateProjectUserSuccess = (data: ProjectUser) => action(ProjectsTypes.UPDATE_PROJECT_USER_SUCCESS, data);
export const updateProjectUserFailure = (err: any[]) => action(ProjectsTypes.UPDATE_PROJECT_USER_FAILURE, err);

export const removeProjectUserRequest = (projectId: number, userId: number) => action(ProjectsTypes.REMOVE_PROJECT_USER_REQUEST, { projectId, userId });
export const removeProjectUserSuccess = (data: { userId: number }) => action(ProjectsTypes.REMOVE_PROJECT_USER_SUCCESS, data);
export const removeProjectUserFailure = (err: any[]) => action(ProjectsTypes.REMOVE_PROJECT_USER_FAILURE, err);

// User search
export const searchUsersRequest = (query: string) => action(ProjectsTypes.SEARCH_USERS_REQUEST, query);
export const searchUsersSuccess = (data: any[]) => action(ProjectsTypes.SEARCH_USERS_SUCCESS, data);
export const searchUsersFailure = (err: any[]) => action(ProjectsTypes.SEARCH_USERS_FAILURE, err);

// Project selection
export const selectProjectRequest = (id: number) => action(ProjectsTypes.SELECT_PROJECT, id);
export const selectProjectSuccess = (data: Project) => action(ProjectsTypes.SELECT_PROJECT_SUCCESS, data);
export const selectProjectFailure = (err: any[]) => action(ProjectsTypes.SELECT_PROJECT_FAILURE, err);

export const clearProjectContext = () => action(ProjectsTypes.CLEAR_PROJECT_CONTEXT);