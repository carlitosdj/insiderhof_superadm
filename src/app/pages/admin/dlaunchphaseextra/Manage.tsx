import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import Loading from "../../../loading";
import { ManageLaunchPhaseExtraWidget } from "./ManageLaunchPhaseExtraWidget";
import { useParams } from "react-router-dom";
import { loadMyLaunchPhaseExtrasRequest } from "../../../../store/ducks/dlaunchphaseextras/actions";
import { LaunchPhaseExtrasState } from "../../../../store/ducks/dlaunchphaseextras/types";

type Props = {
  launchphaseextras: LaunchPhaseExtrasState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ launchphaseextras }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {launchphaseextras.error && (
        <Alert variant="danger">{JSON.stringify(launchphaseextras.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageLaunchPhaseExtraWidget
            launchphaseextras={launchphaseextras}
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

  const launchphaseextras = useSelector((state: ApplicationState) => state.launchphaseextra);

  const {launchPhaseId} = useParams()

  useEffect(() => {
    dispatch(loadMyLaunchPhaseExtrasRequest(Number(launchPhaseId))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("launchphaseextras", launchphaseextras);
  if (launchphaseextras.loading) return <Loading />;

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
      <ManagePage launchphaseextras={launchphaseextras} />
    </div>
  );
};
export default Manage;
