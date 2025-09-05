import { delay, put, call, takeLatest, all } from 'redux-saga/effects'
import api from '../../../services/api'

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
      // Store selected project in localStorage for persistence
      localStorage.setItem('currentProjectId', action.payload.id.toString())
      return { ...state, currentProject: action.payload }
      
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
  ])
}

// Initialize on app start
export const initializeProjects = () => ProjectActions.loadProjectsRequest()