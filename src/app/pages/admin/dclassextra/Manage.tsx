import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Alert } from "react-bootstrap";
import { Content } from "../../../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar";
import { ManageClassExtrasWidget } from "./ManageClassExtrasWidget";
import { Class } from "../../../../store/ducks/dclass/types";
import Loading from "../../../loading";
import { loadModuleRequest, loadModulesRequest } from "../../../../store/ducks/dmodule/actions";
import { loadClassesRequest } from "../../../../store/ducks/dclass/actions";
import { loadClassExtrasRequest } from "../../../../store/ducks/dclassextra/actions";
import { ClassExtra } from "../../../../store/ducks/dclassextra/types";
import { loadMyProductsRequest } from "../../../../store/ducks/dproduct/actions";

type Props = {
  classextras: ClassExtra[];
};

const ManagePage: React.FC<React.PropsWithChildren<Props>> = ({
  classextras,
}) => (
  <>
    <ToolbarWrapper />
    <Content>
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <ManageClassExtrasWidget
            classextras={classextras}
            className="card-xxl-stretch mb-5 mb-xxl-8"
          />
        </div>
      </div>
    </Content>
  </>
);

const ClassExtras: FC<React.PropsWithChildren<unknown>> = () => {
  const dispatch = useDispatch();
  const { productId, moduleId, classId } = useParams();

  const me = useSelector((state: ApplicationState) => state.me);
  const products = useSelector((state: ApplicationState) => state.product);
  const modules = useSelector((state: ApplicationState) => state.module);
  const classes = useSelector((state: ApplicationState) => state.dclass);
  const classextras = useSelector(
    (state: ApplicationState) => state.dextraclass
  );

  const selectedProduct = products.myProducts.filter((p) => p.id === Number(productId))[0];
  const selectedModule = modules.data.filter(
    (m) => m.id === Number(moduleId)
  )[0];
  const selectedClass = classes.data.filter((c) => c.id === Number(classId))[0];

  console.log("modukles", modules);
  console.log("classes", classes);
  console.log("classId", classId);

  console.log("Selected Product", selectedProduct);
  console.log("Selected Module", selectedModule);
  console.log("Selected Class", selectedClass);

  useEffect(() => {
    dispatch(loadClassExtrasRequest(Number(classId))); //Puxa componentes com seus filhos primários
    if(products.myProducts.length === 0) dispatch(loadMyProductsRequest(Number(me.me.id)));
    if(modules.data.length === 0) dispatch(loadModulesRequest(Number(productId)));
    if(classes.data.length === 0) dispatch(loadClassesRequest(Number(moduleId)));

  }, [dispatch, classId]);

  console.log("classextras", classextras);
  if (classextras.loading || products.loading || modules.loading || classes.loading) return <Loading />;

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
            title: selectedModule.name!,
            path: "/classes/" + productId + "/" + moduleId,
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
            title: selectedClass.name!.substring(0, 20)+"...",
            path: "",
            isSeparator: false,
            isActive: true,
          },
        ]}
      />
      {classes.error && (
        <Alert variant="danger">{JSON.stringify(classes.error)};</Alert>
      )}
      <ManagePage classextras={classextras.data} />
    </>
  );
};
export default ClassExtras;
