import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { Content } from "../../_metronic/layout/components/content";
import { PageTitle } from "../../_metronic/layout/core";

interface SuperAdminGuardProps {
  children: React.ReactNode;
}

/**
 * SuperAdminGuard Component
 *
 * Protects routes/components that should only be accessible to super-admins.
 * Checks if the current user has systemRole === 'super-admin'.
 *
 * Usage:
 * ```tsx
 * <SuperAdminGuard>
 *   <YourProtectedComponent />
 * </SuperAdminGuard>
 * ```
 */
const SuperAdminGuard: FC<SuperAdminGuardProps> = ({ children }) => {
  const user = useSelector((state: ApplicationState) => state.me.data);

  // Check if user has super-admin system role
  if (user?.systemRole !== "super-admin") {
    return (
      <>
        <PageTitle breadcrumbs={[]}>Acesso Negado</PageTitle>
        <Content>
          <div className="alert alert-danger d-flex align-items-center p-5">
            <i className="ki-duotone ki-shield-cross fs-2hx text-danger me-4">
              <span className="path1"></span>
              <span className="path2"></span>
              <span className="path3"></span>
            </i>
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Acesso Restrito</h4>
              <span>
                Apenas super-admins podem acessar esta área. Se você acredita
                que deveria ter acesso, entre em contato com o administrador do
                sistema.
              </span>
            </div>
          </div>
        </Content>
      </>
    );
  }

  // User is super-admin, render children
  return <>{children}</>;
};

export default SuperAdminGuard;
