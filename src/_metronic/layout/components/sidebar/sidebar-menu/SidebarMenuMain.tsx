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
    </>
  );
};

export { SidebarMenuMain };
