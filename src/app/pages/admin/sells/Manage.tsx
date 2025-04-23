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
import { ManageCartsWidget } from "./ManageCartsWidget";
import { loadCartRequest, loadCartsRequest } from "../../../../store/ducks/carts/actions";
import { CartsState } from "../../../../store/ducks/carts/types";
import { useParams } from "react-router-dom";

type Props = {
  carts: CartsState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ carts }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {carts.error && (
        <Alert variant="danger">{JSON.stringify(carts.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageCartsWidget
            carts={carts}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
    </Content>
  </div>
);

type ParamTypes = {

  startDate?: string;
  endDate?: string;
};


const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const carts = useSelector((state: ApplicationState) => state.carts);

   const { startDate, endDate } = useParams<ParamTypes>();

  useEffect(() => {
    if(startDate && endDate){
      dispatch(loadCartsRequest(startDate, endDate));
    }else{
      dispatch(loadCartsRequest());
    }
     //Puxa componentes com seus filhos primários
  }, [dispatch, startDate, endDate]);

  console.log("carts", carts);
  if (carts.loading) return <Loading />;

  return (
    <div className="">
      <PageTitle
        breadcrumbs={[
          {
            title: "VENDAS",
            path: "/launchs",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      <ManagePage carts={carts} />
    </div>
  );
};
export default Manage;
