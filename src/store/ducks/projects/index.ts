import { delay, put, call, takeLatest, all, select, fork } from 'redux-saga/effects'
import api from '../../../services/api'
import { ApplicationState } from '../../index'

// Types
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
  userRole: string
  createdAt: string
  updatedAt: string
}

export interface ProjectState {
  loading: boolean
  projects: Project[]
  currentProject: Project | null
  error: string | null
}

// Action Types
export enum ProjectActionTypes {
  LOAD_PROJECTS_REQUEST = '@projects/LOAD_PROJECTS_REQUEST',
  LOAD_PROJECTS_SUCCESS = '@projects/LOAD_PROJECTS_SUCCESS',
  LOAD_PROJECTS_FAILURE = '@projects/LOAD_PROJECTS_FAILURE',
  
  SELECT_PROJECT = '@projects/SELECT_PROJECT',
  SELECT_PROJECT_SUCCESS = '@projects/SELECT_PROJECT_SUCCESS',
  SELECT_PROJECT_FAILURE = '@projects/SELECT_PROJECT_FAILURE',
  CLEAR_PROJECT_CONTEXT = '@projects/CLEAR_PROJECT_CONTEXT',
  
  CREATE_PROJECT_REQUEST = '@projects/CREATE_PROJECT_REQUEST',
  CREATE_PROJECT_SUCCESS = '@projects/CREATE_PROJECT_SUCCESS',
  CREATE_PROJECT_FAILURE = '@projects/CREATE_PROJECT_FAILURE',
}

// Initial State
const INITIAL_STATE: ProjectState = {
  loading: false,
  projects: [],
  currentProject: null,
  error: null
}

// Reducer
export default function reducer(state = INITIAL_STATE, action: any): ProjectState {
  switch (action.type) {
    case ProjectActionTypes.LOAD_PROJECTS_REQUEST:
    case ProjectActionTypes.CREATE_PROJECT_REQUEST:
      return { ...state, loading: true, error: null }
      
    case ProjectActionTypes.LOAD_PROJECTS_SUCCESS:
      const storedProjectId = localStorage.getItem('currentProjectId')
      let selectedProject = state.currentProject
      
      if (!selectedProject && storedProjectId) {
        // Try to restore from localStorage
        selectedProject = action.payload.find((p: Project) => p.id.toString() === storedProjectId) || null
      }
      
      if (!selectedProject && action.payload.length > 0) {
        // Auto-select first project if none selected
        selectedProject = action.payload[0]
      }
      
      return { 
        ...state, 
        loading: false, 
        projects: action.payload,
        currentProject: selectedProject
      }
      
    case ProjectActionTypes.CREATE_PROJECT_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        projects: [...state.projects, action.payload]
      }
      
    case ProjectActionTypes.LOAD_PROJECTS_FAILURE:
    case ProjectActionTypes.CREATE_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }
      
    case ProjectActionTypes.SELECT_PROJECT:
      return { ...state, loading: true }
      
    case ProjectActionTypes.SELECT_PROJECT_SUCCESS:
      // Store selected project in localStorage for persistence
      localStorage.setItem('currentProjectId', action.payload.id.toString())
      return { ...state, loading: false, currentProject: action.payload }
      
    case ProjectActionTypes.SELECT_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }
      
    case ProjectActionTypes.CLEAR_PROJECT_CONTEXT:
      localStorage.removeItem('currentProjectId')
      return { ...state, currentProject: null }
      
    default:
      return state
  }
}

// Action Creators
export const ProjectActions = {
  loadProjectsRequest: () => ({
    type: ProjectActionTypes.LOAD_PROJECTS_REQUEST as const
  }),
  
  loadProjectsSuccess: (projects: Project[]) => ({
    type: ProjectActionTypes.LOAD_PROJECTS_SUCCESS as const,
    payload: projects
  }),
  
  loadProjectsFailure: (error: string) => ({
    type: ProjectActionTypes.LOAD_PROJECTS_FAILURE as const,
    payload: error
  }),
  
  selectProject: (project: Project) => ({
    type: ProjectActionTypes.SELECT_PROJECT as const,
    payload: project
  }),
  
  selectProjectSuccess: (project: Project) => ({
    type: ProjectActionTypes.SELECT_PROJECT_SUCCESS as const,
    payload: project
  }),
  
  selectProjectFailure: (error: string) => ({
    type: ProjectActionTypes.SELECT_PROJECT_FAILURE as const,
    payload: error
  }),
  
  clearProjectContext: () => ({
    type: ProjectActionTypes.CLEAR_PROJECT_CONTEXT as const
  }),
  
  createProjectRequest: (projectData: Partial<Project>) => ({
    type: ProjectActionTypes.CREATE_PROJECT_REQUEST as const,
    payload: projectData
  }),
  
  createProjectSuccess: (project: Project) => ({
    type: ProjectActionTypes.CREATE_PROJECT_SUCCESS as const,
    payload: project
  }),
  
  createProjectFailure: (error: string) => ({
    type: ProjectActionTypes.CREATE_PROJECT_FAILURE as const,
    payload: error
  })
}

// Sagas
function* loadProjects(): Generator<any, void, any> {
  try {
    const response = yield call(api.get, '/user/projects')
    yield put(ProjectActions.loadProjectsSuccess(response.data))
  } catch (error: any) {
    const message = error.response?.data?.message || 'Erro ao carregar projetos'
    yield put(ProjectActions.loadProjectsFailure(message))
    console.error(message)
  }
}

function* createProject(action: ReturnType<typeof ProjectActions.createProjectRequest>): Generator<any, void, any> {
  try {
    const response = yield call(api.post, '/projects', action.payload)
    yield put(ProjectActions.createProjectSuccess(response.data))
    console.log('Projeto criado com sucesso!')
    
    // Reload projects to get updated list
    yield put(ProjectActions.loadProjectsRequest())
  } catch (error: any) {
    const message = error.response?.data?.message || 'Erro ao criar projeto'
    yield put(ProjectActions.createProjectFailure(message))
    console.error(message)
  }
}

function* selectProject(action: ReturnType<typeof ProjectActions.selectProject>): Generator<any, void, any> {
  try {
    const project = action.payload
    
    // Store in localStorage for persistence
    localStorage.setItem('currentProjectId', project.id.toString())
    localStorage.setItem('currentProject', JSON.stringify(project))
    
    yield put(ProjectActions.selectProjectSuccess(project))
    
    // Automatically refresh data for all modules when project changes
    yield fork(refreshAllModuleData)
    
  } catch (error: any) {
    yield put(ProjectActions.selectProjectFailure(error.response?.data || error.message))
  }
}

function* refreshAllModuleData(): Generator<any, void, any> {
  try {
    // Import actions dynamically to avoid circular dependencies
    const { loadMyProductsRequest } = yield import('../dproduct/actions')
    const { loadMyLaunchsRequest } = yield import('../dlaunch/actions') 
    const { loadLeadsRequest } = yield import('../leads/actions')
    const { loadMyCartsRequest } = yield import('../carts/actions')
    const { loadMyOffersRequest } = yield import('../doffer/actions')
    
    // Get current user info
    const currentUser = yield select((state: ApplicationState) => state.me.data)
    
    if (currentUser && currentUser.id) {
      console.log('Refreshing data for all modules after project change...')
      
      // Refresh products
      yield put(loadMyProductsRequest(currentUser.id))
      
      // Refresh launches  
      yield put(loadMyLaunchsRequest(currentUser.id))
      
      // Refresh leads - using page 1, take 10 as default
      yield put(loadLeadsRequest(1, 10))
      
      // Refresh carts
      yield put(loadCartsRequest())
      
      // Refresh offers
      yield put(loadMyOffersRequest(currentUser.id))
      
      console.log('Data refresh triggered for all modules')
    }
  } catch (error) {
    console.error('Error refreshing module data:', error)
  }
}

// Initialize project context from localStorage
function* initializeProjectContext(): Generator<any, void, any> {
  try {
    // First load projects
    yield call(loadProjects)
    
    // Then try to restore selected project
    const storedProjectId = localStorage.getItem('currentProjectId')
    if (storedProjectId) {
      // This will be handled by the reducer when projects are loaded
      console.log('Restoring project context:', storedProjectId)
    }
  } catch (error) {
    console.error('Error initializing project context:', error)
  }
}

export function* projectSaga() {
  yield all([
    takeLatest(ProjectActionTypes.LOAD_PROJECTS_REQUEST, loadProjects),
    takeLatest(ProjectActionTypes.CREATE_PROJECT_REQUEST, createProject),
    takeLatest(ProjectActionTypes.SELECT_PROJECT, selectProject),
  ])
}

// Initialize on app start
export const initializeProjects = () => ProjectActions.loadProjectsRequest()