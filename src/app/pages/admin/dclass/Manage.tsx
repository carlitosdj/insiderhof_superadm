import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { ManageClassWidget } from "./ManageClassWidget";
import { Class } from "../../../../store/ducks/dclass/types";
import Loading from "../../../loading";
import { loadModuleRequest } from "../../../../store/ducks/dmodule/actions";
import { loadClassesRequest } from "../../../../store/ducks/dclass/actions";

type Props = {
  classes: Class[];
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ classes }) => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageClassWidget
            classes={classes}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
    </Content>
  </>
);

const Classes: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const { productId, moduleId } = useParams();

  const product = useSelector((state: ApplicationState) => state.product);
  const modules = useSelector((state: ApplicationState) => state.module);
  const classes = useSelector((state: ApplicationState) => state.dclass);

  const selectedProduct = product.myProducts.filter((p) => p.id === Number(productId))[0];
  const selectedModule = modules.data.filter((m) => m.id === Number(moduleId))[0];

  console.log("Selected Product", selectedProduct);
  console.log("Selected Module", selectedModule);

  useEffect(() => {
    dispatch(loadClassesRequest(Number(moduleId))); //Puxa componentes com seus filhos primários
  }, [dispatch, moduleId]);

  console.log("classes", classes);
  if (classes.loading) return <Loading />;

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "MEUS PRODUTOS",
            path: "/products",
            isSeparator: false,
            isActive: false,
          },
          {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
          },
          {
            title: selectedProduct.name!,
            path: "/modules/" + productId,
            isSeparator: false,
            isActive: false,
          },
          {
            title: "",
            path: "",
            isSeparator: true,
            isActive: false,
          },
          {
            title: selectedModule.name!.substring(0, 20)+"...",
            path: "/classes/" + productId + "/" + moduleId,
            isSeparator: false,
            isActive: false,
          },
        ]}
      />

      {classes.error && (
        <Alert variant="danger">{JSON.stringify(classes.error)};</Alert>
      )}
      <ManagePage classes={classes.data} />
    </>
  );
};
export default Classes;
