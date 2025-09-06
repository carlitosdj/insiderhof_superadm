import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import { Project } from '../../store/ducks/projects/types'
import * as projectActions from '../../store/ducks/projects/actions'
import { KTIcon } from '../../_metronic/helpers'
import { useNavigate } from 'react-router-dom'

const ProjectSelector: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { projects, currentProject, loading, error } = useSelector(
    (state: ApplicationState) => state.projects
  )

  useEffect(() => {
    // Load projects on component mount
    if (projects.length === 0) {
      dispatch(projectActions.loadProjectsRequest())
    }
  }, [dispatch, projects.length])

  // Debug: Log the current state
  console.log('=== ProjectSelector state ===');
  console.log('Projetos disponíveis:', projects);
  console.log('Projeto atual selecionado:', currentProject);
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('=== Fim ProjectSelector state ===');

  const handleProjectSelect = (project: Project) => {
    console.log('Project selected:', project);
    dispatch(projectActions.selectProjectRequest(project.id))
    
    // Fechar a dropdown após seleção
    const dropdown = document.querySelector('.dropdown-toggle') as HTMLElement;
    if (dropdown) {
      const bsDropdown = (dropdown as any).bsDropdown;
      if (bsDropdown) {
        bsDropdown.hide();
      } else {
        // Fallback para Bootstrap 5
        dropdown.click();
      }
    }
  }

  const handleManageProjects = () => {
    navigate('/projects/manage')
  }

  return (
    // <div className='menu-item'>
    <div className=''>
      <div className='menu-content d-flex align-items-center justify-content-center' >
        {/* <div className='symbol symbol-50px me-5'>}}>
        {/* <div className='symbol symbol-50px me-5'>
          <KTIcon iconName='abstract-28' className='fs-2x text-gray-500' />
        </div> */}
        <div className='d-flex flex-column w-100' >
          {/* <div className='fw-semibold d-flex align-items-center fs-5'>
            Projeto Atual
          </div> */}
          <div className='dropdown'>
            <button
              className='btn btn-sm btn-light-primary dropdown-toggle w-100 text-start'
              type='button'
              data-bs-toggle='dropdown'
              aria-expanded='false'
              disabled={loading}
            >
              {loading ? (
                <span className='spinner-border spinner-border-sm me-2'></span>
              ) : (
                <KTIcon iconName='abstract-28' className='fs-6 me-2' />
              )}
              {currentProject?.name || 'Selecione um projeto'}
            </button>
            <ul className='dropdown-menu w-100'>
              {Array.isArray(projects) && projects.map((project: any) => (
                <li key={project.id}>
                  <button
                    className={`dropdown-item d-flex align-items-center ${
                      currentProject?.id === project.id ? 'active' : ''
                    }`}
                    onClick={() => handleProjectSelect(project)}
                  >
                    <div className='symbol symbol-30px me-3'>
                      {project.logo ? (
                        <img
                          src={project.logo}
                          alt={project.name}
                          className='symbol-label'
                        />
                      ) : (
                        <div className='symbol-label bg-light-primary text-primary fw-bold'>
                          {project.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className='fw-semibold'>{project.name}</div>
                      <div className='text-muted fs-7'>{project.description}</div>
                    </div>
                  </button>
                </li>
              ))}
              {Array.isArray(projects) && projects.length === 0 && !loading && (
                <li>
                  <span className='dropdown-item-text text-muted'>
                    {error ? 'Erro ao carregar projetos' : 'Nenhum projeto encontrado'}
                  </span>
                </li>
              )}
              {Array.isArray(projects) && projects.length > 0 && (
                <>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={handleManageProjects}
                    >
                      <div className="symbol symbol-30px me-3">
                        <div className="symbol-label bg-light-info text-info">
                          <KTIcon iconName="setting-2" className="fs-6" />
                        </div>
                      </div>
                      <div>
                        <div className="fw-semibold">Gerenciar Projetos</div>
                        <div className="text-muted fs-7">Criar, editar e gerenciar projetos</div>
                      </div>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSelector