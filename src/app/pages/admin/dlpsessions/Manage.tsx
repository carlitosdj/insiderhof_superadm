import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import Loading from "../../../loading";
import { ManageLPSessionWidget } from "./ManageLPSessionWidget";
import { useParams } from "react-router-dom";
import { loadMyLPSessionsRequest } from "../../../../store/ducks/dlpsessions/actions";
import { LPSessionState } from "../../../../store/ducks/dlpsessions/types";

type Props = {
  lpsessions: LPSessionState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ lpsessions }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {lpsessions.error && (
        <Alert variant="danger">{JSON.stringify(lpsessions.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageLPSessionWidget
            lpsessions={lpsessions}
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

  const lpsessions = useSelector((state: ApplicationState) => state.lpsessions);

  const {launchPhaseId, lpId} = useParams()

  useEffect(() => {
    console.log("lpId", lpId);
    dispatch(loadMyLPSessionsRequest(Number(lpId))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("lpsessions", lpsessions);
  if (lpsessions.loading) return <Loading />;

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
      <ManagePage lpsessions={lpsessions} />
    </div>
  );
};
export default Manage;
