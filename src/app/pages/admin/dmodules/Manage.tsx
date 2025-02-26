import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { ManageModuleWidget } from "./ManageModuleWidget";
import { Module } from "../../../../store/ducks/dmodule/types";
import { loadModulesRequest } from "../../../../store/ducks/dmodule/actions";
import Loading from "../../../loading";

type Props = {
  modules: Module[];
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ modules }) => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageModuleWidget
            modules={modules}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
    </Content>
  </>
);

const Modules: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const products = useSelector((state: ApplicationState) => state.product);
  const modules = useSelector((state: ApplicationState) => state.module);

  const selectedProduct = products.myProducts.filter((p) => p.id === Number(productId))[0];
  

  console.log("selectedProduct", selectedProduct);
  
  
  useEffect(() => {
    dispatch(loadModulesRequest(Number(productId)));
  }, [dispatch, productId]);

  console.log("modules", modules);
  if (modules.loading) return <Loading />;

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "TODOS PRODUTOS",
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
        ]}
      />

      {modules.error && (
        <Alert variant="danger">{JSON.stringify(modules.error)};</Alert>
      )}
      <ManagePage modules={modules.data} />
    </>
  );
};
export default Modules;
