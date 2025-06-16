import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";

import Loading from "../../../loading";
import { ManageLPFeatureWidget } from "./ManageLPFeatureWidget";
import { useParams } from "react-router-dom";
import { loadMyLPFeaturesRequest } from "../../../../store/ducks/dlpfeatures/actions";
import { LPFeatureState } from "../../../../store/ducks/dlpfeatures/types";

type Props = {
  lpfeatures: LPFeatureState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({
  lpfeatures,
}) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {lpfeatures.error && (
        <Alert variant="danger">{JSON.stringify(lpfeatures.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageLPFeatureWidget
            lpfeatures={lpfeatures}
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

  const lpfeatures = useSelector((state: ApplicationState) => state.lpfeatures);

  const { lpId, launchPhaseId, lpSessionId } = useParams();

  useEffect(() => {
    console.log("lpSessionId", lpSessionId);
    dispatch(loadMyLPFeaturesRequest(Number(lpSessionId))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("lpfeatures", lpfeatures);
  if (lpfeatures.loading) return <Loading />;

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
      <ManagePage lpfeatures={lpfeatures} />
    </div>
  );
};
export default Manage;
