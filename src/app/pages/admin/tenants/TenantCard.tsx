import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Tenant } from "../../../../store/ducks/tenants/types";

interface TenantCardProps {
  tenant: Tenant;
}

const TenantCard: React.FC<TenantCardProps> = ({ tenant }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trial':
        return 'info';
      case 'suspended':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter':
        return 'primary';
      case 'pro':
        return 'success';
      case 'enterprise':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const handleClick = () => {
    navigate(`/tenants/${tenant.id}`);
  };

  return (
    <Card
      className="h-100 hover-elevate-up cursor-pointer"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Card.Body className="d-flex flex-column p-8">
        {/* Logo e Header */}
        <div className="d-flex align-items-center mb-5">
          {tenant.logo ? (
            <div className="symbol symbol-60px me-5">
              <img src={tenant.logo} alt={tenant.name} />
            </div>
          ) : (
            <div
              className="symbol symbol-60px me-5"
              style={{
                backgroundColor: tenant.primaryColor || '#3699FF',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold'
              }}
            >
              {tenant.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-grow-1">
            <h3 className="fw-bold text-gray-900 mb-1">{tenant.name}</h3>
            <div className="text-muted fw-semibold fs-7">{tenant.slug}</div>
          </div>
        </div>

        {/* Status e Plano */}
        <div className="d-flex justify-content-between mb-5">
          <span className={`badge badge-light-${getStatusColor(tenant.status)} fs-7`}>
            {tenant.status === 'active' && 'Ativo'}
            {tenant.status === 'trial' && 'Trial'}
            {tenant.status === 'suspended' && 'Suspenso'}
            {tenant.status === 'cancelled' && 'Cancelado'}
          </span>
          <span className={`badge badge-light-${getPlanColor(tenant.plan)} fs-7`}>
            {tenant.plan === 'starter' && 'Starter'}
            {tenant.plan === 'pro' && 'Pro'}
            {tenant.plan === 'enterprise' && 'Enterprise'}
          </span>
        </div>

        {/* Métricas Resumidas */}
        <div className="mt-auto">
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted fs-7">Projetos:</span>
            <span className="fw-bold fs-7">{tenant.totalProjects || 0}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span className="text-muted fs-7">Usuários:</span>
            <span className="fw-bold fs-7">{tenant.totalUsers || 0}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="text-muted fs-7">Produtos:</span>
            <span className="fw-bold fs-7">{tenant.totalProducts || 0}</span>
          </div>
        </div>

        {/* Domínio */}
        {(tenant.customDomain || tenant.domain) && (
          <div className="mt-4 pt-4 border-top">
            <div className="text-muted fs-8">
              {tenant.customDomain || tenant.domain}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default TenantCard;
