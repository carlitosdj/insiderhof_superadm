import { lazy, FC, Suspense, useMemo } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import TopBarProgress from "react-topbar-progress-indicator";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
import { MenuTestPage } from "../pages/MenuTestPage";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import BuilderPageWrapper from "../pages/layout-builder/BuilderPageWrapper";

import Modules from "../pages/admin/dmodules/Manage";
import Classes from "../pages/admin/dclass/Manage";
import ClassExtras from "../pages/admin/dclassextra/Manage";
//import Manage from "../pages/admin/component/Manage";
// import Wppcamp from "../pages/admin/wppcamp";
// import Wppgroup from "../pages/admin/wppgroup";
// import Leads from "../pages/admin/leads";
// import Users from "../pages/admin/users";
// import EmailsEnviados from "../pages/admin/emailsenviados";
// import Support from "../pages/admin/supports";
// import Annotations from "../pages/admin/annotations";
// import Launch from "../pages/admin/launch/Launch";
// import Fases from "../pages/admin/launch/fases/Fases";
// import LaunchExtra from "../pages/admin/launch/launchextra/LaunchExtra";
// import Contact from "../pages/admin/contact";
// import Comments from "../pages/admin/comments";

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import("../modules/profile/ProfilePage"));
  const WizardsPage = lazy(() => import("../modules/wizards/WizardsPage"));
  const AccountPage = lazy(() => import("../modules/accounts/AccountPage"));
  const WidgetsPage = lazy(() => import("../modules/widgets/WidgetsPage"));
  const ChatPage = lazy(() => import("../modules/apps/chat/ChatPage"));
  const UsersPage = lazy(
    () => import("../modules/apps/user-management/UsersPage")
  );

  const Wppcamp = useMemo(
    () => lazy(() => import("../pages/admin/wppcamp")),
    []
  );
  const Wppgroup = useMemo(
    () => lazy(() => import("../pages/admin/wppgroup")),
    []
  );
  const Leads = useMemo(() => lazy(() => import("../pages/admin/leads")), []);
  const Users = useMemo(() => lazy(() => import("../pages/admin/users")), []);
  
  const EmailsEnviados = useMemo(
    () => lazy(() => import("../pages/admin/emailsenviados")),
    []
  );
  const Support = useMemo(
    () => lazy(() => import("../pages/admin/supports")),
    []
  );
  const Annotations = useMemo(
    () => lazy(() => import("../pages/admin/annotations")),
    []
  );
  const Launch = useMemo(
    () => lazy(() => import("../pages/admin/launch/Launch")),
    []
  );
  const Fases = useMemo(
    () => lazy(() => import("../pages/admin/launch/fases/Fases")),
    []
  );
  const LaunchExtra = useMemo(
    () => lazy(() => import("../pages/admin/launch/launchextra/LaunchExtra")),
    []
  );
  const Contact = useMemo(
    () => lazy(() => import("../pages/admin/contact")),
    []
  );
  const Comments = useMemo(
    () => lazy(() => import("../pages/admin/comments")),
    []
  );

  const Offers = useMemo(
    () => lazy(() => import("../pages/admin/doffers/Manage")),
    []
  );

  const Launchs = useMemo(
    () => lazy(() => import("../pages/admin/dlaunch/Manage")),
    []
  );

  const Products = useMemo(
    () => lazy(() => import("../pages/admin/dproducts/Manage")),
    []
  );

  const LaunchPhases = useMemo(
    () => lazy(() => import("../pages/admin/dlaunchphase/Manage")),
    []
  );

  const LaunchPhaseExtras = useMemo(
    () => lazy(() => import("../pages/admin/dlaunchphaseextra/Manage")),
    []
  );

  const Sells = useMemo(
    () => lazy(() => import("../pages/admin/sells/Manage")),
    []
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />

        <Route
          path="sells"
          element={
            <SuspensedView>
              <Sells />
            </SuspensedView>
          }
        ></Route>

        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} />

      

        <Route
          path="launches"
          element={
            <SuspensedView>
              <Launchs />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="launchphase/:launchId"
          element={
            <SuspensedView>
              <LaunchPhases />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="launchphaseextra/:launchPhaseId"
          element={
            <SuspensedView>
              <LaunchPhaseExtras />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="offers"
          element={
            <SuspensedView>
              <Offers />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="products"
          element={
            <SuspensedView>
              <Products />
            </SuspensedView>
          }
        />

        <Route
          path="modules/:productId"
          element={
            <SuspensedView>
              <Modules />
            </SuspensedView>
          }
        />

        <Route
          path="classes/:productId/:moduleId"
          element={
            <SuspensedView>
              <Classes />
            </SuspensedView>
          }
        />

        <Route
          path="extras/:productId/:moduleId/:classId"
          element={
            <SuspensedView>
              <ClassExtras />
            </SuspensedView>
          }
        />

        <Route
          path="launch"
          element={
            <SuspensedView>
              <Launch />
            </SuspensedView>
          }
        />
        <Route path="fases">
          <Route
            path=":id"
            element={
              <SuspensedView>
                <Fases />
              </SuspensedView>
            }
          />
        </Route>
        <Route path="launchextra">
          <Route
            path=":id"
            element={
              <SuspensedView>
                <LaunchExtra />
              </SuspensedView>
            }
          />
        </Route>

        <Route
          path="/wppcamp"
          element={
            <SuspensedView>
              <Wppcamp />
            </SuspensedView>
          }
        />

        <Route path="wppgroup">
          <Route
            path=":id"
            element={
              <SuspensedView>
                <Wppgroup />
              </SuspensedView>
            }
          />
        </Route>

        <Route
          path="leads/:page/:take"
          element={
            <SuspensedView>
              <Leads />
            </SuspensedView>
          }
        />

        <Route
          path="users/:page/:take/:hasCart/:startDate?/:endDate?"
          element={
            <SuspensedView>
              <Users />
            </SuspensedView>
          }
        />
       
        <Route
          path="emailsenviados"
          element={
            <SuspensedView>
              <EmailsEnviados />
            </SuspensedView>
          }
        />
        <Route
          path="support"
          element={
            <SuspensedView>
              <Support />
            </SuspensedView>
          }
        />
        <Route
          path="annotations"
          element={
            <SuspensedView>
              <Annotations />
            </SuspensedView>
          }
        />
        <Route
          path="comments"
          element={
            <SuspensedView>
              <Comments />
            </SuspensedView>
          }
        />
        <Route
          path="contact"
          element={
            <SuspensedView>
              <Contact />
            </SuspensedView>
          }
        />

        {/* Lazy Modules */}
        <Route
          path="crafted/pages/profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/chat/*"
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path="apps/user-management/*"
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
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
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
