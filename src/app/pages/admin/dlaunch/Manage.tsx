import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import { LaunchsState } from "../../../../store/ducks/dlaunch/types";
import { loadMyLaunchsRequest } from "../../../../store/ducks/dlaunch/actions";
import Loading from "../../../loading";
import { ManageLaunchWidget } from "./ManageLaunchWidget";

type Props = {
  launch: LaunchsState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ launch }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {launch.error && (
        <Alert variant="danger">{JSON.stringify(launch.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageLaunchWidget
            launch={launch}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
    </Content>
  </div>
);

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const launch = useSelector((state: ApplicationState) => state.launch);

  useEffect(() => {
    dispatch(loadMyLaunchsRequest(me.me.id!)); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("launch", launch);
  if (launch.loading) return <Loading />;

  return (
    <div className="">
      <PageTitle
        breadcrumbs={[
          {
            title: "MEUS LANÇAMENTOS",
            path: "/launchs",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      <ManagePage launch={launch} />
    </div>
  );
};
export default Manage;
