import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import Loading from "../../../loading";
import { ManageIdeactionWidget } from "./ManageIdeactionWidget";
import { Ideaction } from "../../../../store/ducks/ideaction/types";
import {
  loadMyIdeactionsRequest,
} from "../../../../store/ducks/ideaction/actions";

type Props = {
  ideactions: Ideaction[];
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ ideactions }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          {ideactions && <ManageIdeactionWidget
            ideactions={ideactions}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />}
        </div>
      </div>
    </Content>
  </div>
);

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const ideaction = useSelector((state: ApplicationState) => state.ideaction);
  
  console.log("Manage component - me state:", me);
  console.log("Manage component - ideaction state:", ideaction);

  useEffect(() => {
    console.log("Manage useEffect - me.me?.id:", me.me?.id);
    if (me.me?.id) {
      console.log("Dispatching loadMyIdeactionsRequest with ID:", me.me.id);
      dispatch(loadMyIdeactionsRequest(me.me.id));
    }
  }, [dispatch, me.me?.id]);
  console.log("ideaction state:", ideaction);
  if (ideaction.loading) return <Loading />;

  return (
    <div className="">
      <PageTitle
        breadcrumbs={[
          {
            title: "IDEAÇÃO",
            path: "/ideaction",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      {ideaction.error && (
        <Alert variant="danger">
          <h5>Erro ao carregar ideações:</h5>
          <pre>{JSON.stringify(ideaction.error, null, 2)}</pre>
        </Alert>
      )}
      <ManagePage ideactions={ideaction.myIdeactions} />
    </div>
  );
};

export default Manage; 