import React, { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { ApplicationState } from "../../../../store";
import Loading from "../../../loading";
import { loadTenantByIdRequest } from "../../../../store/ducks/tenants/actions";
import TenantDashboard from "./TenantDashboard";
import SuperAdminGuard from "../../../guards/SuperAdminGuard";

const TenantDashboardPage: FC = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tenants = useSelector((state: ApplicationState) => state.tenants);

  useEffect(() => {
    if (tenantId) {
      dispatch(loadTenantByIdRequest(Number(tenantId)));
    }
  }, [dispatch, tenantId]);

  if (tenants.loading) {
    return <Loading />;
  }

  if (!tenants.selectedTenant) {
    return (
      <>
        <PageTitle breadcrumbs={[]}>Tenant não encontrado</PageTitle>
        <Content>
          <div className="alert alert-danger">
            Tenant não encontrado ou você não tem permissão para acessá-lo.
          </div>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/tenants')}
          >
            Voltar para lista de tenants
          </button>
        </Content>
      </>
    );
  }

  const breadcrumbs = [
    {
      title: 'Tenants',
      path: '/tenants',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
    {
      title: tenants.selectedTenant.name,
      path: '',
      isSeparator: false,
      isActive: true,
    },
  ];

  return (
    <SuperAdminGuard>
      <PageTitle breadcrumbs={breadcrumbs}>{tenants.selectedTenant.name}</PageTitle>
      <ToolbarWrapper />
      <Content>
        <TenantDashboard tenant={tenants.selectedTenant} />
      </Content>
    </SuperAdminGuard>
  );
};

export default TenantDashboardPage;
