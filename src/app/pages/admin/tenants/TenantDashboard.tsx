import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Nav } from "react-bootstrap";
import { ApplicationState } from "../../../../store";
import {
  loadTenantMetricsRequest,
  loadTenantUsersRequest,
  loadTenantSettingsRequest,
} from "../../../../store/ducks/tenants/actions";
import { Tenant } from "../../../../store/ducks/tenants/types";
import { KTIcon } from "../../../../_metronic/helpers";
import TenantMetricsCard from "./TenantMetricsCard";
import TenantUsersList from "./TenantUsersList";
import TenantSettingsForm from "./TenantSettingsForm";
import AddTenantUserModal from "./AddTenantUserModal";
import TenantProjectsList from "./TenantProjectsList";

interface TenantDashboardProps {
  tenant: Tenant;
}

const TenantDashboard: React.FC<TenantDashboardProps> = ({ tenant }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  const tenants = useSelector((state: ApplicationState) => state.tenants);
  const metrics = tenants.metrics;
  const tenantUsers = tenants.tenantUsers || [];
  const settings = tenants.settings;

  useEffect(() => {
    if (tenant.id) {
      dispatch(loadTenantMetricsRequest(tenant.id));
      dispatch(loadTenantUsersRequest(tenant.id));
      dispatch(loadTenantSettingsRequest(tenant.id));
    }
  }, [dispatch, tenant.id]);

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

  const handleImpersonate = () => {
    // Store impersonation context
    // IMPORTANT: 'currentTenantId' is used by the API interceptor to add x-tenant-id header
    localStorage.setItem('currentTenantId', String(tenant.id));
    localStorage.setItem('impersonatedTenantName', tenant.name);
    localStorage.setItem('isImpersonating', 'true');

    // Show success notification
    alert(`Agora você está visualizando como: ${tenant.name}\n\nTodos os dados serão filtrados por este tenant.`);

    // Refresh to apply tenant context
    window.location.reload();
  };

  const handleStopImpersonation = () => {
    // Remove impersonation context
    localStorage.removeItem('currentTenantId');
    localStorage.removeItem('impersonatedTenantName');
    localStorage.removeItem('isImpersonating');

    // Show notification
    alert('Impersonation encerrado. Voltando ao modo super-admin.');

    // Refresh to remove tenant context
    window.location.reload();
  };

  // Check if currently impersonating
  const isImpersonatingMode = localStorage.getItem('isImpersonating') === 'true';
  const currentImpersonationId = localStorage.getItem('currentTenantId');
  const isImpersonating = isImpersonatingMode && currentImpersonationId === String(tenant.id);

  return (
    <>
      <AddTenantUserModal
        tenantId={tenant.id!}
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
      />

      {/* Header do Tenant */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="d-flex align-items-center">
            {tenant.logo ? (
              <div className="symbol symbol-100px me-7">
                <img src={tenant.logo} alt={tenant.name} />
              </div>
            ) : (
              <div
                className="symbol symbol-100px me-7"
                style={{
                  backgroundColor: tenant.primaryColor || '#3699FF',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '48px',
                  fontWeight: 'bold'
                }}
              >
                {tenant.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <h1 className="text-gray-900 fw-bold me-3 mb-0">{tenant.name}</h1>
                    {getStatusBadge(tenant.status)}
                    {isImpersonating && (
                      <span className="badge badge-light-warning ms-2">
                        <KTIcon iconName="eye" className="fs-5 me-1" />
                        Visualizando como este tenant
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-wrap fw-semibold fs-6 mb-4 pe-2">
                    <span className="d-flex align-items-center text-gray-400 me-5 mb-2">
                      <KTIcon iconName="abstract-21" className="fs-4 me-1" />
                      {tenant.slug}
                    </span>
                    <span className="d-flex align-items-center text-gray-400 me-5 mb-2">
                      <KTIcon iconName="category" className="fs-4 me-1" />
                      {getPlanBadge(tenant.plan)}
                    </span>
                    <span className="d-flex align-items-center text-gray-400 me-5 mb-2">
                      <KTIcon iconName="sms" className="fs-4 me-1" />
                      {tenant.contactEmail}
                    </span>
                  </div>
                </div>

                {/* Impersonation Buttons */}
                <div className="d-flex my-4">
                  {!isImpersonating ? (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleImpersonate}
                    >
                      <KTIcon iconName="entrance-right" className="fs-3 me-1" />
                      Acessar como Tenant
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-light-warning"
                      onClick={handleStopImpersonation}
                    >
                      <KTIcon iconName="exit-right" className="fs-3 me-1" />
                      Sair do Modo Impersonation
                    </button>
                  )}
                </div>
              </div>

              {(tenant.customDomain || tenant.domain) && (
                <div className="d-flex flex-wrap">
                  <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                    <div className="d-flex align-items-center">
                      <KTIcon iconName="abstract-41" className="fs-3 text-primary me-2" />
                      <div className="fs-6 fw-bold text-gray-800">
                        {tenant.customDomain || tenant.domain}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "overview")}>
        <div className="card">
          <div className="card-header card-header-stretch">
            <Nav variant="tabs" className="nav-line-tabs nav-stretch fs-6 border-0">
              <Nav.Item>
                <Nav.Link eventKey="overview" className="cursor-pointer">
                  <KTIcon iconName="chart-simple" className="fs-2 me-2" />
                  Visão Geral
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="users" className="cursor-pointer">
                  <KTIcon iconName="profile-user" className="fs-2 me-2" />
                  Usuários ({tenantUsers.length})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="projects" className="cursor-pointer">
                  <KTIcon iconName="element-11" className="fs-2 me-2" />
                  Projetos ({tenant.totalProjects || 0})
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings" className="cursor-pointer">
                  <KTIcon iconName="setting-2" className="fs-2 me-2" />
                  Configurações
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="card-body">
            <Tab.Content>
              {/* Visão Geral */}
              <Tab.Pane eventKey="overview">
                <div className="row g-5 g-xl-8 mb-5">
                  <div className="col-xl-3">
                    <TenantMetricsCard
                      title="Projetos"
                      value={metrics?.totalProjects || tenant.totalProjects || 0}
                      icon="element-11"
                      color="primary"
                      subtitle="Total de projetos"
                    />
                  </div>
                  <div className="col-xl-3">
                    <TenantMetricsCard
                      title="Usuários"
                      value={metrics?.totalUsers || tenant.totalUsers || 0}
                      icon="profile-user"
                      color="success"
                      subtitle="Total de usuários"
                    />
                  </div>
                  <div className="col-xl-3">
                    <TenantMetricsCard
                      title="Produtos"
                      value={metrics?.totalProducts || tenant.totalProducts || 0}
                      icon="category"
                      color="warning"
                      subtitle="Total de produtos"
                    />
                  </div>
                  <div className="col-xl-3">
                    <TenantMetricsCard
                      title="Vendas"
                      value={metrics?.totalSales || 0}
                      icon="dollar"
                      color="info"
                      subtitle="Total de vendas"
                    />
                  </div>
                </div>

                <div className="row g-5 g-xl-8">
                  <div className="col-xl-6">
                    <div className="card card-flush h-100">
                      <div className="card-header pt-5">
                        <h3 className="card-title align-items-start flex-column">
                          <span className="card-label fw-bold text-gray-900">
                            Informações do Tenant
                          </span>
                        </h3>
                      </div>
                      <div className="card-body pt-5">
                        <div className="mb-7">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold text-gray-600 flex-grow-1">
                              Descrição:
                            </span>
                            <span className="text-gray-800">
                              {tenant.description || '-'}
                            </span>
                          </div>
                        </div>
                        <div className="mb-7">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold text-gray-600 flex-grow-1">
                              Telefone:
                            </span>
                            <span className="text-gray-800">
                              {tenant.contactPhone || '-'}
                            </span>
                          </div>
                        </div>
                        <div className="mb-7">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold text-gray-600 flex-grow-1">
                              Criado em:
                            </span>
                            <span className="text-gray-800">
                              {tenant.createdAt
                                ? new Date(tenant.createdAt).toLocaleDateString('pt-BR')
                                : '-'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-6">
                    <div className="card card-flush h-100">
                      <div className="card-header pt-5">
                        <h3 className="card-title align-items-start flex-column">
                          <span className="card-label fw-bold text-gray-900">
                            Limites e Uso
                          </span>
                        </h3>
                      </div>
                      <div className="card-body pt-5">
                        <div className="mb-7">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold text-gray-600 flex-grow-1">
                              Limite de Projetos:
                            </span>
                            <span className="text-gray-800">
                              {tenant.maxProjects || 'Ilimitado'}
                            </span>
                          </div>
                        </div>
                        <div className="mb-7">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold text-gray-600 flex-grow-1">
                              Limite de Usuários:
                            </span>
                            <span className="text-gray-800">
                              {tenant.maxUsers || 'Ilimitado'}
                            </span>
                          </div>
                        </div>
                        <div className="mb-7">
                          <div className="d-flex align-items-center mb-2">
                            <span className="fw-bold text-gray-600 flex-grow-1">
                              Storage Usado:
                            </span>
                            <span className="text-gray-800">
                              {metrics?.storageUsed
                                ? `${(metrics.storageUsed / 1024 / 1024).toFixed(2)} MB`
                                : '0 MB'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              {/* Usuários */}
              <Tab.Pane eventKey="users">
                <TenantUsersList
                  tenantId={tenant.id!}
                  users={tenantUsers}
                  onAddUser={() => setShowAddUserModal(true)}
                />
              </Tab.Pane>

              {/* Projetos */}
              <Tab.Pane eventKey="projects">
                <TenantProjectsList tenantId={tenant.id!} />
              </Tab.Pane>

              {/* Configurações */}
              <Tab.Pane eventKey="settings">
                <TenantSettingsForm
                  tenantId={tenant.id!}
                  settings={settings}
                />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
    </>
  );
};

export default TenantDashboard;
