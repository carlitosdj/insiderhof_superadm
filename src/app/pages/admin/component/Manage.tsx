import React, { FC, useEffect } from "react";
//import {PageTitle} from '../../../_metronic/layout/core'
// import {useIntl} from 'react-intl'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { loadComponentRequest } from "../../../../store/ducks/component/actions";
import { ComponentState } from "../../../../store/ducks/component/types";
// import Loading from '../../../loading'

import { ManageItemWidget } from "./ManageItemWidget";
import { ManageItemExtraWidget } from "./ManageItemExtraWidget";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import Loading from "../../../loading";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
//import {Alert} from 'react-bootstrap'

type ParamTypes = {
  id: string;
};

type Props = {
  comp: ComponentState;
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ comp }) => (
  <>
    <ToolbarWrapper />

    <Content>
      {/* begin::Row */}
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageItemWidget
            comp={comp}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
        {/* <div className="col-xxl-4">
          <ManageItemExtraWidget
            comp={comp.data}
            className="card-xxl-stretch mb-5 mb-xxl-5"
          />
        </div> */}
      </div>
      {/* end::Row */}
    </Content>
  </>
);

const Manage: FC<React.PropsWithChildren<unknown>> = () => {
  // const intl = useIntl()
  console.log("Manage");
  const dispatch = useDispatch();
  const component = useSelector((state: ApplicationState) => state.component);
  let { id } = useParams<ParamTypes>();

  useEffect(() => {
    dispatch(loadComponentRequest(id!, "asc")); //Puxa componentes com seus filhos primários
  }, [id, dispatch]);
  console.log("component", component);
  if (component.loading) return <Loading />;

  return (
    <>
      <PageTitle
        breadcrumbs={
          [
            // {
            //   title: "Componentes",
            //   path: "/manage/1",
            //   isSeparator: false,
            //   isActive: false,
            // },
            // {
            //   title: "",
            //   path: "",
            //   isSeparator: true,
            //   isActive: false,
            // },
          ]
        }
      >
        {component.data.name}
      </PageTitle>
      {component.error && (
        <Alert variant="danger">{JSON.stringify(component.error)};</Alert>
      )}
      <ManagePage comp={component} />
    </>
  );
};
export default Manage;
