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
import { loadModuleRequest, loadModulesRequest } from "../../../../store/ducks/dmodule/actions";
import { loadClassesRequest } from "../../../../store/ducks/dclass/actions";
import { loadMyProductsRequest } from "../../../../store/ducks/dproduct/actions";

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

  const me = useSelector((state: ApplicationState) => state.me);
  const products = useSelector((state: ApplicationState) => state.product);
  const modules = useSelector((state: ApplicationState) => state.module);
  const classes = useSelector((state: ApplicationState) => state.dclass);

  

  useEffect(() => {
    
    dispatch(loadClassesRequest(Number(moduleId))); //Puxa componentes com seus filhos primários
    if(products.myProducts.length === 0) dispatch(loadMyProductsRequest(Number(me.me.id)));
    if(modules.data.length === 0) dispatch(loadModulesRequest(Number(productId)));
    
  }, [dispatch, moduleId]);

  const selectedProduct = products.myProducts.filter((p) => p.id === Number(productId))[0];
  const selectedModule = modules.data.filter((m) => m.id === Number(moduleId))[0];

  console.log("productId", productId);
  console.log("products", products);
  console.log("modules", modules);
  
  console.log("classes", classes);
  console.log("Selected Product", selectedProduct);
  console.log("Selected Module", selectedModule);
  if (classes.loading || products.loading || modules.loading) return <Loading />;


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
