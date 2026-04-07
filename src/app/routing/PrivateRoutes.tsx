import { lazy, FC, Suspense, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";

const PrivateRoutes = () => {
  const Tenants = useMemo(
    () => lazy(() => import("../pages/admin/tenants")),
    []
  );

  const TenantDashboardPage = useMemo(
    () => lazy(() => import("../pages/admin/tenants/TenantDashboardPage")),
    []
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Tenants after success login */}
        <Route path="auth/*" element={<Navigate to="/tenants" />} />

        <Route
          path="tenants"
          element={
            <SuspensedView>
              <Tenants />
            </SuspensedView>
          }
        />

        <Route
          path="tenants/:tenantId"
          element={
            <SuspensedView>
              <TenantDashboardPage />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/tenants" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 3,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
