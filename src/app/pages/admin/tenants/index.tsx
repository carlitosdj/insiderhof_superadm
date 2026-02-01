import React, { FC, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import Loading from "../../../loading";
import { ManageTenantsWidget } from "./ManageTenantsWidget";
import { TenantsState } from "../../../../store/ducks/tenants/types";
import { loadTenantsRequest } from "../../../../store/ducks/tenants/actions";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import SuperAdminGuard from "../../../guards/SuperAdminGuard";

type Props = {
  tenants: TenantsState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ tenants }) => (
  <>
    <ToolbarWrapper />
    <Content>
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageTenantsWidget
            tenants={tenants}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
      {/* end::Row */}
    </Content>
  </>
);

const ManageTenants: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const tenants = useSelector((state: ApplicationState) => state.tenants);
  const user = useSelector((state: ApplicationState) => state.me.data);

  useEffect(() => {
    // Carregar todos os tenants (apenas super-admins podem ver)
    if (user && user.systemRole === 'super-admin') {
      dispatch(loadTenantsRequest({}));
    }
  }, [dispatch, user?.systemRole]);

  if (tenants.loading) return <Loading />;

  return (
    <SuperAdminGuard>
      <PageTitle breadcrumbs={[]}>Gerenciar Tenants</PageTitle>
      <ManagePage tenants={tenants} />
    </SuperAdminGuard>
  );
};

export default ManageTenants;
