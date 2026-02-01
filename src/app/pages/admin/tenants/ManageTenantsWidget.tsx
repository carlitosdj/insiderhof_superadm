/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import { useDispatch } from "react-redux";
import { TenantsState, Tenant } from "../../../../store/ducks/tenants/types";
import { deleteTenantRequest } from "../../../../store/ducks/tenants/actions";
import Create from "./create";
import Update from "./update";

type Props = {
  className: string;
  tenants: TenantsState;
};

const ManageTenantsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  tenants,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Tenant | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const createTenant = () => {
    setAction("createTenant");
    setShow(true);
  };

  const updateTenant = (tenant: Tenant) => {
    setAction("editTenant");
    setShow(true);
    setChild(tenant);
  };

  const deleteTenant = (tenant: Tenant) => {
    if (tenant.id === 1) {
      alert("Não é possível deletar o tenant InsiderHOF (ID=1)");
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar o tenant "${tenant.name}"? Esta ação é irreversível!`)) {
      dispatch(deleteTenantRequest(tenant.id!));
    }
  };

  const viewTenantDetails = (tenant: Tenant) => {
    navigate(`/tenants/${tenant.id}`);
  };

  const filteredTenants = tenants.data.filter((tenant) => {
    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        tenant.name?.toLowerCase().includes(searchLower) ||
        tenant.slug?.toLowerCase().includes(searchLower) ||
        tenant.domain?.toLowerCase().includes(searchLower) ||
        tenant.contactEmail?.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Status filter
    if (statusFilter && tenant.status !== statusFilter) {
      return false;
    }

    // Plan filter
    if (planFilter && tenant.plan !== planFilter) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="badge badge-success">Ativo</span>;
      case 'trial':
        return <span className="badge badge-info">Trial</span>;
      case 'suspended':
        return <span className="badge badge-warning">Suspenso</span>;
      case 'cancelled':
        return <span className="badge badge-danger">Cancelado</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'starter':
        return <span className="badge badge-light-primary">Starter</span>;
      case 'pro':
        return <span className="badge badge-light-success">Pro</span>;
      case 'enterprise':
        return <span className="badge badge-light-warning">Enterprise</span>;
      default:
        return <span className="badge badge-light">{plan}</span>;
    }
  };

  return (
    <div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <div className="modal-header">
          <h2>
            {action === "editTenant" ? "Editar Tenant" : ""}
            {action === "createTenant" ? "Criar Novo Tenant" : ""}
          </h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          {action === "editTenant" && child && (
            <Update handleClose={handleClose} child={child} />
          )}
          {action === "createTenant" && <Create handleClose={handleClose} />}
        </div>
      </Modal>

      {tenants.error && (
        <div className="alert alert-danger">
          {JSON.stringify(tenants.error.message || tenants.error)}
        </div>
      )}

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold fs-3 mb-1">
              Tenants
            </span>
            <span className="text-muted mt-1 fw-semibold fs-7">
              {filteredTenants.length} de {tenants.total} tenants
            </span>
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-light-primary"
              onClick={createTenant}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Novo Tenant
            </button>
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Filters */}
          <div className="row mb-5">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-solid"
                placeholder="Buscar por nome, slug, domínio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-select-solid"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos os Status</option>
                <option value="trial">Trial</option>
                <option value="active">Ativo</option>
                <option value="suspended">Suspenso</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-select-solid"
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
              >
                <option value="">Todos os Planos</option>
                <option value="starter">Starter</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-light-primary w-100"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("");
                  setPlanFilter("");
                }}
              >
                Limpar
              </button>
            </div>
          </div>
          {/* end::Filters */}

          {/* begin::Table */}
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="min-w-150px">Tenant</th>
                  <th className="min-w-140px">Domínio</th>
                  <th className="min-w-100px">Plano</th>
                  <th className="min-w-100px">Status</th>
                  <th className="min-w-120px">Projetos</th>
                  <th className="min-w-100px text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-10">
                      <div className="text-muted">Nenhum tenant encontrado</div>
                    </td>
                  </tr>
                ) : (
                  filteredTenants.map((tenant) => (
                    <tr key={tenant.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          {tenant.logo && (
                            <div className="symbol symbol-45px me-5">
                              <img src={tenant.logo} alt={tenant.name} />
                            </div>
                          )}
                          <div className="d-flex justify-content-start flex-column">
                            <a
                              href="#"
                              className="text-gray-900 fw-bold text-hover-primary fs-6"
                              onClick={(e) => {
                                e.preventDefault();
                                viewTenantDetails(tenant);
                              }}
                            >
                              {tenant.name}
                            </a>
                            <span className="text-muted fw-semibold text-muted d-block fs-7">
                              {tenant.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="text-gray-900 fw-bold d-block fs-7">
                          {tenant.customDomain || tenant.domain || '-'}
                        </span>
                        <span className="text-muted fw-semibold text-muted d-block fs-8">
                          {tenant.contactEmail}
                        </span>
                      </td>
                      <td>{getPlanBadge(tenant.plan)}</td>
                      <td>{getStatusBadge(tenant.status)}</td>
                      <td>
                        <span className="badge badge-light fs-7">
                          {tenant.totalProjects || 0} projetos
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <button
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            onClick={() => viewTenantDetails(tenant)}
                            title="Ver Detalhes"
                          >
                            <KTIcon iconName="eye" className="fs-3" />
                          </button>
                          <button
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                            onClick={() => updateTenant(tenant)}
                            title="Editar"
                          >
                            <KTIcon iconName="pencil" className="fs-3" />
                          </button>
                          {tenant.id !== 1 && (
                            <button
                              className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                              onClick={() => deleteTenant(tenant)}
                              title="Deletar"
                            >
                              <KTIcon iconName="trash" className="fs-3" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* end::Table */}
        </div>
        {/* end::Body */}
      </div>
    </div>
  );
};

export { ManageTenantsWidget };
