import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../store'
import { ProjectActions, Project } from '../../store/ducks/projects'
import { KTIcon } from '../../_metronic/helpers'

const ProjectSelector: React.FC = () => {
  const dispatch = useDispatch()
  const { projects, currentProject, loading } = useSelector(
    (state: ApplicationState) => state.projects
  )

  useEffect(() => {
    // Load projects on component mount
    if (projects.length === 0) {
      dispatch(ProjectActions.loadProjectsRequest())
    }
  }, [dispatch, projects.length])

  const handleProjectSelect = (project: Project) => {
    dispatch(ProjectActions.selectProject(project))
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
              {projects.map((project) => (
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
              {projects.length === 0 && !loading && (
                <li>
                  <span className='dropdown-item-text text-muted'>
                    Nenhum projeto encontrado
                  </span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectSelector