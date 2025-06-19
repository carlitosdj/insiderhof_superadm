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
import { ManageLaunchPhaseWidget } from "./ManageLaunchPhaseWidget";
import { loadMyLaunchPhasesRequest } from "../../../../store/ducks/dlaunchphase/actions";
import { useParams } from "react-router-dom";
import { LaunchPhasesState } from "../../../../store/ducks/dlaunchphase/types";

type Props = {
  launchphases: LaunchPhasesState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ launchphases }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {launchphases.error && (
        <Alert variant="danger">{JSON.stringify(launchphases.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageLaunchPhaseWidget
            launchphases={launchphases}
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

  const launchphases = useSelector((state: ApplicationState) => state.launchphase);

  const {launchId} = useParams()

  useEffect(() => {
    dispatch(loadMyLaunchPhasesRequest(Number(launchId))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("launchphases", launchphases);
  if (launchphases.loading) return <Loading />;

  return (
    <div className="">
      <PageTitle
        breadcrumbs={[
          {
            title: "MEUS LANÇAMENTOS",
            path: "/launches",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      <ManagePage launchphases={launchphases} />
    </div>
  );
};
export default Manage;
