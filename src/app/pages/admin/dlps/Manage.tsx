import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import Loading from "../../../loading";
import { ManageLPWidget } from "./ManageLPWidget";
import { useParams } from "react-router-dom";
import { loadMyLPsRequest } from "../../../../store/ducks/dlps/actions";
import { LPState } from "../../../../store/ducks/dlps/types";

type Props = {
  lps: LPState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ lps }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {lps.error && (
        <Alert variant="danger">{JSON.stringify(lps.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageLPWidget
            lps={lps}
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

  const lps = useSelector((state: ApplicationState) => state.lps);

  const {launchPhaseId} = useParams()

  useEffect(() => {
    console.log("launchPhaseId", launchPhaseId);
    dispatch(loadMyLPsRequest(Number(launchPhaseId))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("lps", lps);
  if (lps.loading) return <Loading />;

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
      <ManagePage lps={lps} />
    </div>
  );
};
export default Manage;
