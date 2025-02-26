import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";


import Loading from "../../../loading";
import { Product } from "../../../../store/ducks/dproduct/types";
import { ManageProductsWidget } from "./ManageProductsWidget";
import { loadMyProductsRequest } from "../../../../store/ducks/dproduct/actions";



type Props = {
  products: Product[];
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({ products }) => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          {products && <ManageProductsWidget
            products={products}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />}
        </div>
      </div>
    </Content>
  </>
);

const Manage: FC<React.PropsWithChildren<unknown>> = () => {

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const products = useSelector((state: ApplicationState) => state.product);


  useEffect(() => {
    dispatch(loadMyProductsRequest(Number(me.me.id))); //Puxa componentes com seus filhos primários
  }, [dispatch]);

  console.log("products", products);
  if (products.loading) return <Loading />;

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: 'MEUS PRODUTOS',
            path: "/products",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
        
    
      {products.error && (
        <Alert variant="danger">{JSON.stringify(products.error)};</Alert>
      )}
      <ManagePage products={products.myProducts} />
      
    </>
  );
};
export default Manage;
