/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { Project, ProjectUser } from "../../../../store/ducks/projects/types";
import * as projectActions from "../../../../store/ducks/projects/actions";
import { ApplicationState } from "../../../../store";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

type Props = {
  className: string;
  projects: Project[];
};

interface ProjectFormData {
  name: string;
  description?: string;
  slug: string;
  domain?: string;
  status: 'active' | 'inactive';
}

interface CreateProjectData {
  name: string;
  description?: string;
  slug: string;
  domain?: string;
  status: 'active' | 'inactive';
  ownerId: number;
}

interface UpdateProjectData {
  id: number;
  ownerId: number;
  name: string;
  description?: string;
  slug: string;
  domain?: string;
  logo?: string;
  settings?: any;
  userRole?: string;
  status: string;
}

interface AddUserFormData {
  userId: number;
  role: string;
}

const ManageProjectsWidget: React.FC<Props> = ({ className, projects }) => {
  const dispatch = useDispatch();
  const { projectUsers, searchUsers, managementLoading, error } = useSelector(
    (state: ApplicationState) => state.projects
  );
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [isUsersModalLoading, setIsUsersModalLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateProject = () => {
    setEditingProject(null);
    setShowProjectModal(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleDeleteProject = (project: Project) => {
    if (window.confirm(`Tem certeza que deseja excluir o projeto "${project.name}"?`)) {
      dispatch(projectActions.deleteProjectRequest(project.id));
    }
  };

  const handleManageUsers = (project: Project) => {
    console.log('handleManageUsers called with project:', project);
    setSelectedProject(project);
    setShowUsersModal(true); // Abre a modal imediatamente
    dispatch(projectActions.loadProjectUsersRequest(project.id)); // Carrega os usuários
  };

  const handleAddUser = () => {
    setShowAddUserModal(true);
  };

  const handleUpdateUserRole = (userId: number, currentRole: string) => {
    if (!selectedProject) return;
    
    const newRole = prompt(`Alterar papel do usuário (atual: ${currentRole}):`, currentRole);
    if (newRole && newRole !== currentRole) {
      dispatch(projectActions.updateProjectUserRequest(selectedProject.id, userId, { role: newRole }));
    }
  };

  const handleRemoveUser = (userId: number) => {
    if (!selectedProject) return;
    
    if (window.confirm('Tem certeza que deseja remover este usuário do projeto?')) {
      dispatch(projectActions.removeProjectUserRequest(selectedProject.id, userId));
    }
  };

  const handleSearchUsers = (query: string) => {
    if (query.length > 2) {
      dispatch(projectActions.searchUsersRequest(query));
    }
  };

  const projectValidationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    slug: Yup.string().required('Slug é obrigatório'),
    status: Yup.string().required('Status é obrigatório')
  });

  const addUserValidationSchema = Yup.object({
    userId: Yup.number().required('Usuário é obrigatório'),
    role: Yup.string().required('Papel é obrigatório')
  });


  // Resetar loading quando os usuários forem carregados
  useEffect(() => {
    if (projectUsers.length > 0 && isUsersModalLoading) {
      setIsUsersModalLoading(false);
    }
  }, [projectUsers, isUsersModalLoading]);

  useEffect(() => {
    if (error && typeof error === 'string') {
      setErrorMessage(error);
      // Limpar o erro após 5 segundos
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    } else if (error && Array.isArray(error) && error.length > 0) {
      setErrorMessage(error[0]);
      // Limpar o erro após 5 segundos
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={`card ${className}`}>
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Gerenciar Projetos</span>
          <span className="text-muted mt-1 fw-semibold fs-7">{projects.length} projeto(s)</span>
        </h3>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            onClick={handleCreateProject}
            disabled={managementLoading}
          >
            <KTIcon iconName="plus" className="fs-2" />
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {managementLoading && (
          <div className="d-flex justify-content-center py-4">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="w-25px">
                  <div className="form-check form-check-sm form-check-custom form-check-solid">
                    <input className="form-check-input" type="checkbox" value="" />
                  </div>
                </th>
                <th className="min-w-150px">Projeto</th>
                <th className="min-w-140px">Status</th>
                <th className="min-w-120px">Slug</th>
                <th className="min-w-120px">Criado em</th>
                <th className="min-w-100px text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="form-check form-check-sm form-check-custom form-check-solid">
                      <input className="form-check-input widget-9-check" type="checkbox" value="" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-45px me-5">
                        {project.logo ? (
                          <img src={project.logo} alt="" />
                        ) : (
                          <div className="symbol-label bg-light-primary text-primary fw-bold">
                            {project.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <a href="#" className="text-dark fw-bold text-hover-primary fs-6">
                          {project.name}
                        </a>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          {project.description || 'Sem descrição'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className={`badge badge-light-${project.status === 'active' ? 'success' : 'secondary'} fs-7 fw-bold`}>
                        {project.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                        {project.slug}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="text-dark fw-bold text-hover-primary d-block mb-1 fs-6">
                        {project.createdAt ? new Date(project.createdAt).toLocaleDateString('pt-BR') : 'Data não disponível'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end flex-shrink-0">
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => handleManageUsers(project)}
                        title="Gerenciar Usuários"
                      >
                        <KTIcon iconName="people" className="fs-3" />
                      </button>
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                        onClick={() => handleEditProject(project)}
                        title="Editar"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                        onClick={() => handleDeleteProject(project)}
                        title="Excluir"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {projects.length === 0 && !managementLoading && (
          <div className="d-flex flex-column flex-center">
            <img
              src="/media/illustrations/sketchy-1/5.png"
              alt=""
              className="mw-400px"
            />
            <div className="fs-3 fw-bolder text-dark mb-4">Nenhum projeto encontrado.</div>
            <div className="fs-6">
              Comece criando seu primeiro projeto
              <br />
              clicando no botão "+" acima.
            </div>
          </div>
        )}
      </div>
     
      {/* Project Create/Edit Modal */}
      <Modal
        id={'a'}
        show={showProjectModal}
        onHide={() => setShowProjectModal(false)}
        backdrop={true}
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
      >
        <div className="modal-header">
          <h2>
            {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
          </h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={() => setShowProjectModal(false)}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          <Formik
            initialValues={{
              name: editingProject?.name || '',
              description: editingProject?.description || '',
              slug: editingProject?.slug || '',
              domain: editingProject?.domain || '',
              status: editingProject?.status || 'active'
            } as ProjectFormData}
            validationSchema={projectValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Converter status para o formato esperado pelo backend
              const statusMap = {
                'active': '1',
                'inactive': '0'
              };
              const payload = {
                ...values,
                status: statusMap[values.status]
              };
              
              if (editingProject) {
                // Para atualização, precisamos garantir que temos o ID correto
                const updatePayload: any = {
                  id: editingProject.id,
                  ownerId: editingProject.ownerId,
                  // createdAt: editingProject.createdAt,
                  // updatedAt: editingProject.updatedAt,
                  ...payload
                };
                console.log('Sending update payload:', updatePayload);
                dispatch(projectActions.updateProjectRequest(updatePayload));
              } else {
                dispatch(projectActions.createProjectRequest({
                  ...payload,
                  ownerId: 1
                } as any));
              }
              setSubmitting(false);
              setShowProjectModal(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Nome *</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <Field name="description" as="textarea" className="form-control" rows={3} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Slug *</label>
                  <Field name="slug" type="text" className="form-control" />
                  <ErrorMessage name="slug" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Domínio</label>
                  <Field name="domain" type="text" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Status *</label>
                  <Field name="status" as="select" className="form-control">
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="text-danger" />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowProjectModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      
      {/* Users Management Modal */}
      <Modal
        show={showUsersModal}
        onHide={() => setShowUsersModal(false)}
        backdrop={true}
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
      >
        <div className="modal-header">
          <h2>
            Gerenciar Usuários - {selectedProject?.name}
          </h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={() => setShowUsersModal(false)}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          {isUsersModalLoading && (
            <div className="d-flex justify-content-center py-4">
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Usuários do Projeto</h5>
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddUser}
            >
              <KTIcon iconName="plus" className="fs-3 me-2" />
              Adicionar Usuário
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Papel</th>
                  <th>Adicionado em</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {projectUsers.map((projectUser: any, index: number) => (
                  <tr key={`${projectUser.userId}-${projectUser.projectId}-${index}`}>
                    <td>{projectUser.user.name}</td>
                    <td>{projectUser.user.email}</td>
                    <td>
                      <span className={`badge ${
                        projectUser.role === 'owner' ? 'badge-light-danger' :
                        projectUser.role === 'admin' ? 'badge-light-warning' :
                        projectUser.role === 'editor' ? 'badge-light-info' : 'badge-light-secondary'
                      }`}>
                        {projectUser.role}
                      </span>
                    </td>
                    <td>{new Date(projectUser.createdAt).toLocaleDateString('pt-BR')}</td>
                    <td>
                      {projectUser.role !== 'owner' && (
                        <div className="btn-group">
                          <button
                            className="btn btn-sm btn-light-primary"
                            onClick={() => handleUpdateUserRole(projectUser.userId, projectUser.role)}
                            title="Alterar Papel"
                          >
                            <KTIcon iconName="pencil" className="fs-3" />
                          </button>
                          <button
                            className="btn btn-sm btn-light-danger"
                            onClick={() => handleRemoveUser(projectUser.userId)}
                            title="Remover"
                          >
                            <KTIcon iconName="trash" className="fs-3" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projectUsers.length === 0 && (
            <div className="text-center py-4">
              <p className="text-muted">Nenhum usuário encontrado neste projeto</p>
            </div>
          )}
        </div>
      </Modal>

      {/* Add User Modal */}
      <Modal
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        backdrop={true}
        dialogClassName="modal-dialog modal-dialog-centered mw-700px"
      >
        <div className="modal-header">
          <h2>Adicionar Usuário ao Projeto</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={() => setShowAddUserModal(false)}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          <Formik
            initialValues={{
              userId: 0,
              role: 'viewer'
            } as AddUserFormData}
            validationSchema={addUserValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (selectedProject) {
                dispatch(projectActions.addProjectUserRequest(selectedProject.id, values));
              }
              setSubmitting(false);
              setShowAddUserModal(false);
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label">Buscar Usuário *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Digite o email do usuário..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      handleSearchUsers(e.target.value);
                    }}
                  />
                  
                  {searchUsers.length > 0 && (
                    <div className="mt-2 border rounded p-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {searchUsers.map((user: any) => (
                        <div
                          key={user.id}
                          className="d-flex justify-content-between align-items-center p-2 hover-bg-light cursor-pointer"
                          onClick={() => {
                            setFieldValue('userId', user.id);
                            setSearchQuery(user.email);
                          }}
                        >
                          <div>
                            <strong>{user.name}</strong>
                            <div className="text-muted small">{user.email}</div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              setFieldValue('userId', user.id);
                              setSearchQuery(user.email);
                            }}
                          >
                            Selecionar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <ErrorMessage name="userId" component="div" className="text-danger" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Papel *</label>
                  <Field name="role" as="select" className="form-control">
                    <option value="viewer">Visualizador</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Administrador</option>
                  </Field>
                  <ErrorMessage name="role" component="div" className="text-danger" />
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddUserModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Adicionando...' : 'Adicionar'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}

export { ManageProjectsWidget };