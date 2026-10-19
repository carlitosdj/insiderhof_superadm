import { useIntl } from "react-intl";
import { SidebarMenuItem } from "./SidebarMenuItem";

const SidebarMenuMain = () => {
  const intl = useIntl();

  return (
    <>
      <SidebarMenuItem
        to="/tenants"
        icon="office-bag"
        fontIcon="bi-app-indicator"
        title="Tenants"
      />
      {/* Quem instalou o app do aluno (PWA), por tenant */}
      <SidebarMenuItem
        to="/installations"
        icon="phone"
        fontIcon="bi-phone"
        title="Apps instalados"
      />
    </>
  );
};

export { SidebarMenuMain };
