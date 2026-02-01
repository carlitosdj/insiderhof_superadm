import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../../store";
import { KTIcon } from "../../../../helpers";
import { SidebarMenuItemWithSub } from "./SidebarMenuItemWithSub";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();
  const user = useSelector((state: ApplicationState) => state.me.data);

  return (
    <>
      {/* <SidebarMenuItem
        to="/dashboard"
        icon="element-11"
        title={intl.formatMessage({ id: "MENU.DASHBOARD" })}
        fontIcon="bi-app-indicator"
      /> */}
      {/* <SidebarMenuItem
        to="/ideaction"
        icon="sun"
        title="Ideação"
        fontIcon="bi-app-indicator"
      /> */}
      {/* <SidebarMenuItem
        to="/roasplanner"
        icon="sun"
        title="ROAS planner"
        fontIcon="bi-app-indicator"
      /> */}
      
      {/* <SidebarMenuItem
        to="/builder"
        icon="switch"
        title="Layout Builder"
        fontIcon="bi-layers"
      /> */}

     
      <SidebarMenuItem
        to="/projects/manage"
        icon="note-2"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.PROJECTS" })}
      />
      
      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            PRODUTOS
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to="/products"
        icon="note-2"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.PRODUCTS" })}
      />

      <SidebarMenuItem
        to="/offers"
        icon="package"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.OFFERS" })}
      />

      <SidebarMenuItem
        to="/launch"
        icon="rocket"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.LAUNCHES" })}
      />

      <SidebarMenuItem
        to="/events"
        icon="calendar-8"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.EVENTS" })}
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            GESTÃO
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/sells"
        icon="dollar"
        fontIcon="bi-app-indicator"
        //title={intl.formatMessage({ id: "MENU.SELLS" })}
        title="Vendas"
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            USUÁRIOS
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/users/1/100/true"
        icon="profile-user"
        fontIcon="bi-app-indicator"
        //title={intl.formatMessage({ id: "MENU.USERS" })}
        title="Alunos"
      />

      <SidebarMenuItem
        to="/users/1/100/false"
        icon="profile-user"
        fontIcon="bi-app-indicator"
        //title={intl.formatMessage({ id: "MENU.USERS" })}\
        title="Prospectos"
      />

      <SidebarMenuItem
        to="/leads/1/100"
        icon="people"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.LEADS" })}
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            COMUNICAÇÃO
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to="/annotations"
        icon="message-edit"
        fontIcon="bi-app-indicator"
        // title={intl.formatMessage({id: 'MENU.LEADS'})}
        title={"Anotações"}
      />
      <SidebarMenuItem
        to="/comments"
        icon="message-text"
        fontIcon="bi-app-indicator"
        // title={intl.formatMessage({id: 'MENU.LEADS'})}
        title={"Comentários"}
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            COMUNICAÇÃO
          </span>
        </div>
      </div>

      {/* <SidebarMenuItem
        //to='/manage/510'
        to="/launch"
        icon="double-right"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.MYLAUNCHES" })}
      /> */}

      

      {/* <SidebarMenuItem
        to="/manage/5"
        icon="sms"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.PREEMAILS" })}
      /> */}
      <SidebarMenuItem
        to="/massmails"
        icon="notification-on"
        fontIcon="bi-app-indicator"
        //title={intl.formatMessage({ id: "MENU.EMAILS" })}
        title="Emails p/ lista"
      />
      <SidebarMenuItem
        to="/singlemails"
        icon="notification-on"
        fontIcon="bi-app-indicator"
        //title={intl.formatMessage({ id: "MENU.EMAILS" })}
        title="Emails p/ alunos"
      />

      <SidebarMenuItem
        to="/wppcamp"
        icon="whatsapp"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.WHATSAPPGROUPS" })}
      />

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            SUPORTE
          </span>
        </div>
      </div>
      <SidebarMenuItem
        to="/support"
        icon="chart-simple-2"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.SUPPORT" })}
      />
      {/* <SidebarMenuItem
        to="/contact"
        icon="notification-status"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.CONTACT" })}
      /> */}

      <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            FERRAMENTAS
          </span>
        </div>
      </div>

      <SidebarMenuItem
        to="/ideaction"
        icon="sun"
        title="Ideação"
        fontIcon="bi-app-indicator"
      />
      <SidebarMenuItem
        to="/roasplanner"
        icon="sun"
        title="ROAS planner"
        fontIcon="bi-app-indicator"
      />

      {/* SUPER ADMIN - Apenas para super-admins */}
      {user?.systemRole === 'super-admin' && (
        <>
          <div className="menu-item">
            <div className="menu-content pt-8 pb-2">
              <span className="menu-section text-muted text-uppercase fs-8 ls-1">
                SUPER ADMIN
              </span>
            </div>
          </div>

          <SidebarMenuItem
            to="/tenants"
            icon="office-bag"
            fontIcon="bi-app-indicator"
            title="Tenants"
          />
        </>
      )}

      {/* <SidebarMenuItem
        to="/manage/4"
        icon="notification-circle"
        fontIcon="bi-app-indicator"
        title={intl.formatMessage({ id: "MENU.BUGREPORTS" })}
      /> */}

      {/* <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Crafted
          </span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to="/crafted/pages"
        title="Pages"
        fontIcon="bi-archive"
        icon="element-plus"
      >
        <SidebarMenuItemWithSub
          to="/crafted/pages/profile"
          title="Profile"
          hasBullet={true}
        >
          <SidebarMenuItem
            to="/crafted/pages/profile/overview"
            title="Overview"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/projects"
            title="Projects"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/campaigns"
            title="Campaigns"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/documents"
            title="Documents"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/profile/connections"
            title="Connections"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub
          to="/crafted/pages/wizards"
          title="Wizards"
          hasBullet={true}
        >
          <SidebarMenuItem
            to="/crafted/pages/wizards/horizontal"
            title="Horizontal"
            hasBullet={true}
          />
          <SidebarMenuItem
            to="/crafted/pages/wizards/vertical"
            title="Vertical"
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to="/crafted/accounts"
        title="Accounts"
        icon="profile-circle"
        fontIcon="bi-person"
      >
        <SidebarMenuItem
          to="/crafted/account/overview"
          title="Overview"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/account/settings"
          title="Settings"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to="/error"
        title="Errors"
        fontIcon="bi-sticky"
        icon="cross-circle"
      >
        <SidebarMenuItem to="/error/404" title="Error 404" hasBullet={true} />
        <SidebarMenuItem to="/error/500" title="Error 500" hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to="/crafted/widgets"
        title="Widgets"
        icon="element-7"
        fontIcon="bi-layers"
      >
        <SidebarMenuItem
          to="/crafted/widgets/lists"
          title="Lists"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/statistics"
          title="Statistics"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/charts"
          title="Charts"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/mixed"
          title="Mixed"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/tables"
          title="Tables"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/crafted/widgets/feeds"
          title="Feeds"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      {/* <div className="menu-item">
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            Apps
          </span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to="/apps/chat"
        title="Chat"
        fontIcon="bi-chat-left"
        icon="message-text-2"
      >
        <SidebarMenuItem
          to="/apps/chat/private-chat"
          title="Private Chat"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/group-chat"
          title="Group Chart"
          hasBullet={true}
        />
        <SidebarMenuItem
          to="/apps/chat/drawer-chat"
          title="Drawer Chart"
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItem
        to="/apps/user-management/users"
        icon="abstract-28"
        title="User management"
        fontIcon="bi-layers"
      /> */}
      {/* <div className="menu-item">
        <a
          target="_blank"
          className="menu-link"
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + "/changelog"}
        >
          <span className="menu-icon">
            <KTIcon iconName="code" className="fs-2" />
          </span>
          <span className="menu-title">
            Changelog {import.meta.env.VITE_APP_VERSION}
          </span>
        </a>
      </div> */}
    </>
  );
};

export { SidebarMenuMain };
