import { call, put } from 'redux-saga/effects';
import api from '../../../services/api';

import {
  loadProjectsRequest,
  loadProjectsSuccess,
  loadProjectsFailure,
  
  loadAllProjectsRequest,
  loadAllProjectsSuccess,
  loadAllProjectsFailure,
  
  createProjectRequest,
  createProjectSuccess,
  createProjectFailure,
  
  updateProjectRequest,
  updateProjectSuccess,
  updateProjectFailure,
  
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectFailure,
  
  loadProjectUsersRequest,
  loadProjectUsersSuccess,
  loadProjectUsersFailure,
  
  addProjectUserRequest,
  addProjectUserSuccess,
  addProjectUserFailure,
  
  updateProjectUserRequest,
  updateProjectUserSuccess,
  updateProjectUserFailure,
  
  removeProjectUserRequest,
  removeProjectUserSuccess,
  removeProjectUserFailure,
  
  searchUsersRequest,
  searchUsersSuccess,
  searchUsersFailure,
  
  selectProjectRequest,
  selectProjectSuccess,
  selectProjectFailure,
} from './actions';

import { Project, ProjectUser } from './types';

// Load projects
export function* loadProjects(action: ReturnType<typeof loadProjectsRequest>): Generator<any, void, unknown> {
  try {
    console.log('=== loadProjects saga iniciado ===');
    const response = yield call(api.get, '/projects/all/1/10');
    console.log('API Response:', response);
    // Handle different response formats
    const projects = (response as any).data?.data || (response as any).data || [];
    console.log('Projetos extraídos da API:', projects);
    console.log('=== loadProjects saga finalizado, disparando LOAD_PROJECTS_SUCCESS ===');
    yield put(loadProjectsSuccess(projects));
  } catch (error) {
    console.error('Error loading projects:', error);
    yield put(loadProjectsFailure([error instanceof Error ? error.message : String(error)]));
  }
}

// Load all projects for management
export function* loadAllProjects(action: ReturnType<typeof loadAllProjectsRequest>): Generator<any, void, unknown> {
  try {
    const { page, take } = action.payload;
    const response = yield call(api.get, `/projects/all/${page}/${take}`);
    console.log('API Response - loadAllProjects:', response);
    // Handle different response formats
    const projects = (response as any).data?.data || (response as any).data || [];
    yield put(loadAllProjectsSuccess({ data: projects, total: projects.length, page, take }));
  } catch (error) {
    console.error('Error loading all projects:', error);
    yield put(loadAllProjectsFailure([error instanceof Error ? error.message : String(error)]));
  }
}

// Create project
export function* createProject(action: ReturnType<typeof createProjectRequest>) {
  try {
    // Remove campos que não devem ser enviados na criação
    const { id, createdAt, updatedAt, ...projectData } = action.payload;
    
    const response: { data: Project } = yield call(api.post, '/projects', projectData);
    yield put(createProjectSuccess(response.data));
  } catch (error: any) {
    yield put(createProjectFailure(error.response?.data || error.message));
  }
}

// Update project
export function* updateProject(action: ReturnType<typeof updateProjectRequest>) {
  try {
    console.log('Updating project with payload:', action.payload);
    const response: { data: Project } = yield call(api.patch, `/projects/${action.payload.id}`, action.payload);
    console.log('Update project response:', response);
    yield put(updateProjectSuccess(response.data));
  } catch (error: any) {
    console.error('Update project error:', error);
    console.error('Error response:', error.response);
    console.error('Error response data:', error.response?.data);
    yield put(updateProjectFailure(error.response?.data || error.message));
  }
}

// Delete project
export function* deleteProject(action: ReturnType<typeof deleteProjectRequest>) {
  try {
    const response: { data: Project } = yield call(api.delete, `/projects/${action.payload}`);
    // Enviar apenas o ID para o reducer, não o objeto completo
    yield put(deleteProjectSuccess({ id: action.payload } as any));
  } catch (error: any) {
    yield put(deleteProjectFailure(error.response?.data || error.message));
  }
}

// Load project users
export function* loadProjectUsers(action: ReturnType<typeof loadProjectUsersRequest>) {
  try {
    console.log('Loading project users for project ID:', action.payload);
    const response: { data: ProjectUser[] } = yield call(api.get, `/projects/${action.payload}/users`);
    console.log('Project users response:', response);
    yield put(loadProjectUsersSuccess(response.data));
  } catch (error: any) {
    console.error('Error loading project users:', error);
    yield put(loadProjectUsersFailure(error.response?.data || error.message));
  }
}

// Add project user
export function* addProjectUser(action: ReturnType<typeof addProjectUserRequest>) {
  try {
    const response: { data: ProjectUser } = yield call(api.post, `/projects/${action.payload.projectId}/users`, action.payload.data);
    yield put(addProjectUserSuccess(response.data));
  } catch (error: any) {
    yield put(addProjectUserFailure(error.response?.data || error.message));
  }
}

// Update project user
export function* updateProjectUser(action: ReturnType<typeof updateProjectUserRequest>) {
  try {
    const response: { data: ProjectUser } = yield call(api.patch, `/projects/${action.payload.projectId}/users/${action.payload.userId}`, action.payload.data);
    yield put(updateProjectUserSuccess(response.data));
  } catch (error: any) {
    yield put(updateProjectUserFailure(error.response?.data || error.message));
  }
}

// Remove project user
export function* removeProjectUser(action: ReturnType<typeof removeProjectUserRequest>) {
  try {
    const response: { data: ProjectUser } = yield call(api.delete, `/projects/${action.payload.projectId}/users/${action.payload.userId}`);
    yield put(removeProjectUserSuccess({ userId: action.payload.userId }));
  } catch (error: any) {
    yield put(removeProjectUserFailure(error.response?.data || error.message));
  }
}

// Search users
export function* searchUsers(action: ReturnType<typeof searchUsersRequest>) {
  try {
    // Verificar se o payload é uma string válida
    if (!action.payload || typeof action.payload !== 'string' || action.payload.trim() === '') {
      yield put(searchUsersSuccess([]));
      return;
    }
    
    const response: { data: any[] } = yield call(api.get, `/projects/search/users/${encodeURIComponent(action.payload.trim())}`);
    yield put(searchUsersSuccess(response.data));
  } catch (error: any) {
    yield put(searchUsersFailure(error.response?.data || error.message));
  }
}

// Select project
export function* selectProject(action: ReturnType<typeof selectProjectRequest>) {
  try {
    console.log('Selecting project with ID:', action.payload);
    const response: { data: Project } = yield call(api.get, `/projects/${action.payload}`);
    console.log('Project selection response:', response);
    yield put(selectProjectSuccess(response.data));
  } catch (error: any) {
    console.error('Error selecting project:', error);
    yield put(selectProjectFailure(error.response?.data || error.message));
  }
}