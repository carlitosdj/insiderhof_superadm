import React, { useEffect, useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import api from "../../../../services/api";

interface Project {
  id: number;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  totalUsers?: number;
  totalProducts?: number;
}

interface TenantProjectsListProps {
  tenantId: number;
}

const TenantProjectsList: React.FC<TenantProjectsListProps> = ({ tenantId }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, [tenantId]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      // Buscar projetos do tenant
      // Temporariamente usando o endpoint de projetos com header x-tenant-id
      const response = await api.get(`/projects/all/1/100`, {
        headers: {
          'x-tenant-id': String(tenantId),
        },
      });

      setProjects(response.data.data || []);
    } catch (err: any) {
      console.error('Error loading tenant projects:', err);
      setError(err.message || 'Erro ao carregar projetos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="spinner-border spinner-border-lg text-primary"></span>
        <p className="mt-3 text-gray-600">Carregando projetos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        <KTIcon iconName="information-5" className="fs-2 me-2" />
        <strong>Erro:</strong> {error}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="card card-flush">
        <div className="card-body text-center py-20">
          <KTIcon iconName="folder" className="fs-3x text-gray-400 mb-5" />
          <h3 className="text-gray-800 mb-2">Nenhum projeto encontrado</h3>
          <p className="text-gray-600">
            Este tenant ainda não possui projetos cadastrados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-flush">
      <div className="card-header pt-7">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold text-gray-800">
            Projetos do Tenant
          </span>
          <span className="text-gray-400 mt-1 fw-semibold fs-6">
            {projects.length} {projects.length === 1 ? 'projeto' : 'projetos'}
          </span>
        </h3>
      </div>

      <div className="card-body pt-5">
        <div className="table-responsive">
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted">
                <th className="min-w-200px">Nome</th>
                <th className="min-w-150px">Descrição</th>
                <th className="min-w-100px">Status</th>
                <th className="min-w-100px">Criado em</th>
                <th className="min-w-100px text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-45px me-5">
                        <div className="symbol-label bg-light-primary">
                          <KTIcon iconName="element-11" className="fs-2x text-primary" />
                        </div>
                      </div>
                      <div className="d-flex justify-content-start flex-column">
                        <span className="text-dark fw-bold text-hover-primary fs-6">
                          {project.name}
                        </span>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          ID: {project.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-800 fw-normal">
                      {project.description || '-'}
                    </span>
                  </td>
                  <td>
                    {project.status === '1' || project.status === 'active' ? (
                      <span className="badge badge-light-success">Ativo</span>
                    ) : (
                      <span className="badge badge-light-danger">Inativo</span>
                    )}
                  </td>
                  <td>
                    <span className="text-gray-800 fw-normal">
                      {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      title="Ver detalhes"
                    >
                      <KTIcon iconName="eye" className="fs-3" />
                    </button>
                    <button
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      title="Editar projeto"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantProjectsList;
