import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { Alert } from "react-bootstrap";

import { loadLaunchHasOffersRequest } from "../../../../store/ducks/dlaunchhasoffers/actions";
import { LaunchHasOffersState } from "../../../../store/ducks/dlaunchhasoffers/types";
import { Launch } from "../../../../store/ducks/dlaunch/types";
import Loading from "../../../loading";
import { ManageLaunchHasOffersWidget } from "./ManageTurmaHasProductsWidget";
type Props = {
  launchhasoffers: LaunchHasOffersState;
  child: Launch;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({
  launchhasoffers,
  child,
}) => (
  <div className="">
    {launchhasoffers.error && (
      <Alert variant="danger">{JSON.stringify(launchhasoffers.error)};</Alert>
    )}

    <ManageLaunchHasOffersWidget
      child={child}
      launchhasoffers={launchhasoffers}
      className="card-xxl-stretch mb-5 mb-xxl-8"
    />
  </div>
);

type ManageProps = {
  handleClose: () => void;
  child: Launch;
};

const Manage = ({ handleClose, child }: ManageProps) => {
  const dispatch = useDispatch();
  
  const launchhasoffers = useSelector(
    (state: ApplicationState) => state.launchhasoffers
  );

  useEffect(() => {
    dispatch(loadLaunchHasOffersRequest(Number(child.id))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("launchhasoffers", launchhasoffers);

  // if (launchhasoffers.loading) return <Loading />;

  return <ManagePage launchhasoffers={launchhasoffers} child={child} />;
};
export default Manage;
