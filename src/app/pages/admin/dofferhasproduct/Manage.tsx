import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";

import { Alert } from "react-bootstrap";

import { Offer, OffersState } from "../../../../store/ducks/doffer/types";

import Loading from "../../../loading";
import { OfferHasProductsState } from "../../../../store/ducks/dofferhasproduct/types";
import { ManageOfferHasProductsWidget } from "./ManageProductHasPodsWidget";
import { loadOfferHasProductsRequest } from "../../../../store/ducks/dofferhasproduct/actions";


type Props = {
  offerhasproducts: OfferHasProductsState;
  child: Offer;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({
  offerhasproducts,
  child,
}) => (
  <div className="">
    {offerhasproducts.error && (
      <Alert variant="danger">{JSON.stringify(offerhasproducts.error)};</Alert>
    )}

    <ManageOfferHasProductsWidget
      child={child}
      offerhasproducts={offerhasproducts}
      className="card-xxl-stretch mb-5 mb-xxl-8"
    />
  </div>
);
type ManageProps = {
  handleClose: () => void;
  child: Offer;
};
const Manage = ({ handleClose, child }: ManageProps) => {
  const dispatch = useDispatch();

  const offerhasproducts = useSelector(
    (state: ApplicationState) => state.offerhasproducts
  );

  useEffect(() => {
    dispatch(loadOfferHasProductsRequest(Number(child.id))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("offerhasproducts", offerhasproducts);

  if (offerhasproducts.loading) return <Loading />;

  return <ManagePage offerhasproducts={offerhasproducts} child={child} />;
};
export default Manage;
