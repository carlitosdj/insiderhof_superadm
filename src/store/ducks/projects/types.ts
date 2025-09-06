/**
 * Action types
 */
export enum ProjectsTypes {
  // Basic project loading
  LOAD_PROJECTS_REQUEST = '@projects/LOAD_PROJECTS_REQUEST',
  LOAD_PROJECTS_SUCCESS = '@projects/LOAD_PROJECTS_SUCCESS',
  LOAD_PROJECTS_FAILURE = '@projects/LOAD_PROJECTS_FAILURE',
  
  // Project selection
  SELECT_PROJECT = '@projects/SELECT_PROJECT',
  SELECT_PROJECT_SUCCESS = '@projects/SELECT_PROJECT_SUCCESS',
  SELECT_PROJECT_FAILURE = '@projects/SELECT_PROJECT_FAILURE',
  CLEAR_PROJECT_CONTEXT = '@projects/CLEAR_PROJECT_CONTEXT',
  
  // Project CRUD
  CREATE_PROJECT_REQUEST = '@projects/CREATE_PROJECT_REQUEST',
  CREATE_PROJECT_SUCCESS = '@projects/CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAILURE = '@projects/CREATE_PROJECT_FAILURE',
  
  UPDATE_PROJECT_REQUEST = '@projects/UPDATE_PROJECT_REQUEST',
  UPDATE_PROJECT_SUCCESS = '@projects/UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_FAILURE = '@projects/UPDATE_PROJECT_FAILURE',
  
  DELETE_PROJECT_REQUEST = '@projects/DELETE_PROJECT_REQUEST',
  DELETE_PROJECT_SUCCESS = '@projects/DELETE_PROJECT_SUCCESS',
  DELETE_PROJECT_FAILURE = '@projects/DELETE_PROJECT_FAILURE',
  
  // Load all projects for management
  LOAD_ALL_PROJECTS_REQUEST = '@projects/LOAD_ALL_PROJECTS_REQUEST',
  LOAD_ALL_PROJECTS_SUCCESS = '@projects/LOAD_ALL_PROJECTS_SUCCESS',
  LOAD_ALL_PROJECTS_FAILURE = '@projects/LOAD_ALL_PROJECTS_FAILURE',
  
  // Project users management
  LOAD_PROJECT_USERS_REQUEST = '@projects/LOAD_PROJECT_USERS_REQUEST',
  LOAD_PROJECT_USERS_SUCCESS = '@projects/LOAD_PROJECT_USERS_SUCCESS',
  LOAD_PROJECT_USERS_FAILURE = '@projects/LOAD_PROJECT_USERS_FAILURE',
  
  ADD_PROJECT_USER_REQUEST = '@projects/ADD_PROJECT_USER_REQUEST',
  ADD_PROJECT_USER_SUCCESS = '@projects/ADD_PROJECT_USER_SUCCESS',
  ADD_PROJECT_USER_FAILURE = '@projects/ADD_PROJECT_USER_FAILURE',
  
  UPDATE_PROJECT_USER_REQUEST = '@projects/UPDATE_PROJECT_USER_REQUEST',
  UPDATE_PROJECT_USER_SUCCESS = '@projects/UPDATE_PROJECT_USER_SUCCESS',
  UPDATE_PROJECT_USER_FAILURE = '@projects/UPDATE_PROJECT_USER_FAILURE',
  
  REMOVE_PROJECT_USER_REQUEST = '@projects/REMOVE_PROJECT_USER_REQUEST',
  REMOVE_PROJECT_USER_SUCCESS = '@projects/REMOVE_PROJECT_USER_SUCCESS',
  REMOVE_PROJECT_USER_FAILURE = '@projects/REMOVE_PROJECT_USER_FAILURE',
  
  // User search
  SEARCH_USERS_REQUEST = '@projects/SEARCH_USERS_REQUEST',
  SEARCH_USERS_SUCCESS = '@projects/SEARCH_USERS_SUCCESS',
  SEARCH_USERS_FAILURE = '@projects/SEARCH_USERS_FAILURE',
}

/**
 * Data types
 */
export interface Project {
  id: number
  name: string
  description?: string
  slug: string
  logo?: string
  domain?: string
  settings?: any
  status: string
  ownerId: number
  userRole?: string
  createdAt?: string
  updatedAt?: string
}

export interface ProjectUser {
  id: number
  userId: number
  projectId: number
  role: string
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string
    email: string
  }
}

export type { ProjectState };

interface ProjectState {
  readonly loading: boolean
  readonly projects: Project[]
  readonly currentProject: Project | null
  readonly projectUsers: ProjectUser[]
  readonly searchUsers: any[]
  readonly error: boolean
  readonly managementLoading: boolean
  readonly allProjects: {
    data: Project[]
    total: number
    page: number
    take: number
  } | null
}