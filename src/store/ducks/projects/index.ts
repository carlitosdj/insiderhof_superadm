import { Reducer } from 'redux';
import { ProjectsTypes, ProjectState, Project, ProjectUser } from './types';

const INITIAL_STATE: ProjectState = {
  loading: true,
  projects: [],
  currentProject: null,
  projectUsers: [],
  searchUsers: [],
  error: false,
  managementLoading: false,
  allProjects: null
};

const reducer: Reducer<ProjectState> = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    // Load projects
    case ProjectsTypes.LOAD_PROJECTS_REQUEST:
      return { ...state, loading: true, error: false }
    case ProjectsTypes.LOAD_PROJECTS_SUCCESS:
      console.log('=== LOAD_PROJECTS_SUCCESS ===');
      console.log('Projetos carregados:', action.payload);
      console.log('Estado atual currentProject:', state.currentProject);
      
      const storedProjectId = localStorage.getItem('currentProjectId');
      console.log('Projeto salvo no localStorage:', storedProjectId);
      
      let selectedProject = state.currentProject;
      
      // Se há projeto salvo no localStorage, verificar se ele existe na lista atual
      if (storedProjectId) {
        const foundProject = (action.payload as Project[]).find((p: Project) =>
          p.id.toString() === storedProjectId
        );
        console.log('Projeto encontrado no localStorage:', foundProject);
        
        if (foundProject) {
          selectedProject = foundProject;
        } else {
          // Se o projeto salvo não existe mais, limpar o localStorage
          console.log('Projeto salvo não encontrado na lista atual, limpando localStorage');
          localStorage.removeItem('currentProjectId');
        }
      }
      
      // Se não houver projeto selecionado (ou o salvo não foi encontrado), usar o primeiro
      if (!selectedProject && (action.payload as Project[]).length > 0) {
        selectedProject = (action.payload as Project[])[0];
        console.log('Selecionando primeiro projeto:', selectedProject);
      }
      
      console.log('Projeto final selecionado:', selectedProject);
      console.log('Salvando projeto no localStorage:', selectedProject?.id);
      localStorage.setItem('currentProjectId', selectedProject?.id.toString() || '');
      console.log('=== FIM LOAD_PROJECTS_SUCCESS ===');
      
      return {
        ...state,
        loading: false,
        error: false,
        projects: action.payload as Project[],
        currentProject: selectedProject
      }
    case ProjectsTypes.LOAD_PROJECTS_FAILURE:
      return { ...state, loading: false, error: action.payload }

    // Load all projects for management
    case ProjectsTypes.LOAD_ALL_PROJECTS_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.LOAD_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        managementLoading: false,
        error: false,
        allProjects: action.payload as {
          data: Project[]
          total: number
          page: number
          take: number
        } | null
      }
    case ProjectsTypes.LOAD_ALL_PROJECTS_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Create project
    case ProjectsTypes.CREATE_PROJECT_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.CREATE_PROJECT_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projects: [...state.projects, action.payload]
      }
    case ProjectsTypes.CREATE_PROJECT_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Update project
    case ProjectsTypes.UPDATE_PROJECT_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.UPDATE_PROJECT_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projects: state.projects.map(p => 
          p.id === (action.payload as Project).id ? (action.payload as Project) : p
        ),
        allProjects: state.allProjects ? {
          ...state.allProjects,
          data: state.allProjects.data.map(p => 
            p.id === (action.payload as Project).id ? (action.payload as Project) : p
          )
        } : null
      }
    case ProjectsTypes.UPDATE_PROJECT_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Delete project
    case ProjectsTypes.DELETE_PROJECT_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.DELETE_PROJECT_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projects: state.projects.filter(p => p.id !== (action.payload as Project).id),
        allProjects: state.allProjects ? {
          ...state.allProjects,
          data: state.allProjects.data.filter(p => p.id !== (action.payload as Project).id)
        } : null
      }
    case ProjectsTypes.DELETE_PROJECT_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Load project users
    case ProjectsTypes.LOAD_PROJECT_USERS_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.LOAD_PROJECT_USERS_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projectUsers: action.payload
      }
    case ProjectsTypes.LOAD_PROJECT_USERS_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Add project user
    case ProjectsTypes.ADD_PROJECT_USER_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.ADD_PROJECT_USER_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projectUsers: [...state.projectUsers, action.payload]
      }
    case ProjectsTypes.ADD_PROJECT_USER_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Update project user
    case ProjectsTypes.UPDATE_PROJECT_USER_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.UPDATE_PROJECT_USER_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projectUsers: state.projectUsers.map(pu => 
          pu.id === (action.payload as ProjectUser).id ? (action.payload as ProjectUser) : pu
        )
      }
    case ProjectsTypes.UPDATE_PROJECT_USER_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Remove project user
    case ProjectsTypes.REMOVE_PROJECT_USER_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.REMOVE_PROJECT_USER_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        projectUsers: state.projectUsers.filter(pu => pu.userId !== (action.payload as {userId: number}).userId)
      }
    case ProjectsTypes.REMOVE_PROJECT_USER_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Search users
    case ProjectsTypes.SEARCH_USERS_REQUEST:
      return { ...state, managementLoading: true, error: false }
    case ProjectsTypes.SEARCH_USERS_SUCCESS:
      return { 
        ...state, 
        managementLoading: false, 
        error: false, 
        searchUsers: action.payload
      }
    case ProjectsTypes.SEARCH_USERS_FAILURE:
      return { ...state, managementLoading: false, error: action.payload }

    // Select project
    case ProjectsTypes.SELECT_PROJECT:
      return { ...state, loading: true, error: false }
    case ProjectsTypes.SELECT_PROJECT_SUCCESS:
      localStorage.setItem('currentProjectId', (action.payload as Project).id.toString())
      return { ...state, loading: false, error: false, currentProject: action.payload }
    case ProjectsTypes.SELECT_PROJECT_FAILURE:
      return { ...state, loading: false, error: action.payload }

    // Clear project context
    case ProjectsTypes.CLEAR_PROJECT_CONTEXT:
      localStorage.removeItem('currentProjectId')
      return { ...state, currentProject: null }

    default:
      return state
  }
}

export type { ProjectState }
export default reducer