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

  const MassMails = useMemo(
    () => lazy(() => import("../pages/admin/massmails")),
    []
  );
  const SingleMails = useMemo(
    () => lazy(() => import("../pages/admin/singlemails")),
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
  const ManageProjects = useMemo(
    () => lazy(() => import("../pages/admin/projects/Manage")),
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

  const Launches = useMemo(
    () => lazy(() => import("../pages/admin/dlaunch/Manage")),
    []
  );

  const Products = useMemo(
    () => lazy(() => import("../pages/admin/dproducts/Manage")),
    []
  );

  const Launch = useMemo(
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

  const InfoUser = useMemo(
    () => lazy(() => import("../pages/admin/users/InfoUser")),
    []
  );

  const LPs = useMemo(
    () => lazy(() => import("../pages/admin/dlps/Manage")),
    []
  );

  const LPSessions = useMemo(
    () => lazy(() => import("../pages/admin/dlpsessions/Manage")),
    []
  );

  const LPFeatures = useMemo(
    () => lazy(() => import("../pages/admin/dlpfeatures/Manage")),
    []
  );

  const Ideaction = useMemo(
    () => lazy(() => import("../pages/admin/ideaction")),
    []
  );

  const CreateLaunch = useMemo(
    () => lazy(() => import("../pages/admin/dlaunch/CreateLaunch")),
    []
  );

  const Roasplanner = useMemo(
    () => lazy(() => import("../pages/admin/roasplanner")),
    []
  );

  const Events = useMemo(
    () => lazy(() => import("../pages/admin/events")),
    []
  );

  const EventDashboardPage = useMemo(
    () => lazy(() => import("../pages/admin/events/dashboard")),
    []
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/products" />} />

        <Route
          path="events/:eventId"
          element={
            <SuspensedView>
              <EventDashboardPage />
            </SuspensedView>
          }
        />

        <Route
          path="sells/:startDate?/:endDate?/:launchId?"
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
          path="launch"
          element={
            <SuspensedView>
              <Launches />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="launch/:launchId"
          element={
            <SuspensedView>
              <Launch />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="launch/:launchId/:launchPhaseId"
          element={
            <SuspensedView>
              <Launch />
            </SuspensedView>
          }
        ></Route>

        {/* Create Launch: step1 */}
        <Route
          path="createlaunch"
          element={
            <SuspensedView>
              <CreateLaunch />
            </SuspensedView>
          }
        ></Route>

        {/* Create Launch: step2 */}
        <Route
          path="createlaunch/step2"
          element={
            <SuspensedView>
              <CreateLaunch />
            </SuspensedView>
          }
        ></Route>

        {/* Create Launch: step3 */}
        <Route
          path="createlaunch/step3"
          element={
            <SuspensedView>
              <CreateLaunch />
            </SuspensedView>
          }
        ></Route>

        {/* Create Launch: step4 */}
        <Route
          path="createlaunch/step4"
          element={
            <SuspensedView>
              <CreateLaunch />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="info/:userId"
          element={
            <SuspensedView>
              <InfoUser />
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
          path="lps/:launchPhaseId"
          element={
            <SuspensedView>
              <LPs />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="lpsessions/:launchPhaseId/:lpId"
          element={
            <SuspensedView>
              <LPSessions />
            </SuspensedView>
          }
        ></Route>

        <Route
          path="lpfeatures/:launchPhaseId/:lpId/:lpSessionId"
          element={
            <SuspensedView>
              <LPFeatures />
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
          path="massmails"
          element={
            <SuspensedView>
              <MassMails />
            </SuspensedView>
          }
        />

        <Route
          path="singlemails"
          element={
            <SuspensedView>
              <SingleMails />
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

        <Route
          path="projects/manage"
          element={
            <SuspensedView>
              <ManageProjects />
            </SuspensedView>
          }
        />

        <Route
          path="ideaction"
          element={
            <SuspensedView>
              <Ideaction />
            </SuspensedView>
          }
        />

        <Route
          path="roasplanner"
          element={
            <SuspensedView>
              <Roasplanner />
            </SuspensedView>
          }
        />

        <Route
          path="events"
          element={
            <SuspensedView>
              <Events />
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
    barThickness: 3,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
