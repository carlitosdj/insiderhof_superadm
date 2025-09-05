import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { loadMyOffersRequest } from "../../../../store/ducks/doffer/actions";
import { OffersState } from "../../../../store/ducks/doffer/types";

import Loading from "../../../loading";
import { ManageOfferWidget } from "./ManageOfferWidget";


type Props = {
  offer: OffersState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ offer }) => (
  <div className="">
    <ToolbarWrapper />
    <Content>
      {offer.error && (
        <Alert variant="danger">{JSON.stringify(offer.error)};</Alert>
      )}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageOfferWidget
            offer={offer}
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
  const offer = useSelector((state: ApplicationState) => state.offer);
  const currentProject = useSelector((state: ApplicationState) => state.projects.currentProject);

  useEffect(() => {
    if (me.me && me.me.id) {
      dispatch(loadMyOffersRequest(me.me.id)); //Puxa componentes com seus filhos primários
    }
  }, [dispatch, me.me?.id, currentProject?.id]); // Agora também escuta mudanças no projeto atual

  console.log("offerxx", offer);

  if (offer.loading) return <Loading />;

  return (
    <div className="">
      <PageTitle
        breadcrumbs={[
          {
            title: "MINHAS OFERTAS",
            path: "/offers",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      <ManagePage offer={offer} />
    </div>
  );
};
export default Manage;
