/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { getAppFileUrl } from "../../../../utils/getApiUrl";

import Create from "./create";
import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";

import { AnimatePresence, Reorder } from "framer-motion";
import { Product } from "../../../../store/ducks/dproduct/types";
import {
  deleteProductRequest,
  reorderProductsRequest,
  updateProductRequest,
} from "../../../../store/ducks/dproduct/actions";
import AvailableProduct from "./AvailableProduct";

import moment from "moment";
momentDurationFormatSetup(moment);

type Props = {
  className: string;
  products: Product[];
};

const ManageProductsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  products,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Product>({});
  const { productId } = useParams();
  const [oldChildren, setOldChildren] = useState<Product[]>(products);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const updateComponent = (child: Product) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (product: Product) => {
    dispatch(deleteProductRequest(product.id!));
  };

  const reorder = (children: Product[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderProductsRequest(children));
  };

  const manageAvailable = (child: Product) => {
    setAction("manageAvailable");
    setShow(true);
    setChild(child);
  };

  const reorderToSave = (children: Product[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateProductRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  return (
    <>
      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={show}
        onHide={handleClose}
        backdrop={true}
      >
        <div className="modal-header">
          <h2>
            {action === "updateComponent" ? "Editar produto" : ""}
            {action === "createComponent" ? "Adicionar produto" : ""}
            {action === "manageAvailable" ? child.name : ""}
          </h2>

          {/* begin::Close */}
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
          {/* end::Close */}
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {action === "updateComponent" ? (
            <Update handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
          {action === "createComponent" ? (
            <Create handleClose={handleClose} />
          ) : (
            ""
          )}
          {action === "manageAvailable" ? (
            <AvailableProduct handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Produtos</span>
            <span className="text-muted mt-1 fw-bold fs-7">Meus produtos</span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <a
              href="#!"
              className="btn btn-primary"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Adicionar Produto
            </a>
          </div>
        </div>

        <div className="card-body py-3 ">
          <div className="table-responsive ">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px">PRODUTO</th>
                  <th className="min-w-120px">DESCRIÇÃO</th>
                  <th className="min-w-30px">PREÇO</th>
                  <th className="min-w-50px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={products}
                onReorder={reorder}
                onTap={(e) => reorderToSave(products)}
                onMouseUp={(e) => reorderToSave(products)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {products.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhum curso encontrado aqui. Adicione um curso clicando
                        em "Adicionar curso".
                      </td>
                    </tr>
                  )}

                  {products.length !== 0 &&
                    products?.map((child: Product, index: number) => {
                      const { image } = child;
                      return (
                        <Reorder.Item
                          key={child.id}
                          value={child}
                          as="tr"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td
                            onPointerDownCapture={(e) => e.stopPropagation()}
                            className="d-flex align-items-center border-0"
                          >
                            {image && (
                              <div className="me-3">
                                <img
                                  className="embed-responsive-item rounded"
                                  height={75}
                                  src={
                                    image?.includes("https://")
                                      ? image
                                      : getAppFileUrl(image)
                                  }
                                  // style={{ width: "100%" }}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = getAppFileUrl("notfound.jpg");
                                  }}
                                />
                              </div>
                            )}

                            <div className="d-flex flex-row">
                              <div>
                                <Link
                                  to={"/modules/" + child.id}
                                  style={{ display: "flex" }}
                                  className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                >
                                  {child.name}
                                </Link>
                                <span className="text-muted fw-semibold text-muted d-block fs-7">
                                  {child.type}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {child.description?.length! > 50
                              ? child.description?.substring(0, 50) + "..."
                              : child.description}
                          </td>
                          <td>
                            {child.price?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>

                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            <div className="d-flex justify-content-end flex-shrink-0">
                              <a
                                href="#!"
                                onClick={() => manageAvailable(child)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="check" iconType="outline" />
                                <span className="text-muted text-sm">
                                  <small>
                                    &nbsp;{child.availableProduct?.length}
                                  </small>
                                </span>
                              </a>

                              {/* <a
                                href="#!"
                                onClick={() => navigate("/modules/" + child.id)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="switch" iconType="outline" />
                              </a> */}
                              <a
                                href="#!"
                                onClick={() => updateComponent(child)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="pencil" iconType="outline" />
                              </a>
                              <a
                                href="#!"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Deseja realmente excluir: " +
                                        child.name +
                                        "?"
                                    )
                                  )
                                    deleteComponent(child);
                                }}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                              >
                                <KTIcon iconName="trash" iconType="outline" />
                              </a>
                            </div>
                          </td>

                          <td style={{ touchAction: "none" }}>
                            <div style={{ cursor: "grab" }}>
                              <KTIcon
                                iconName="arrow-up-down"
                                iconType="outline"
                              />
                            </div>
                          </td>
                        </Reorder.Item>
                      );
                    })}
                </AnimatePresence>
              </Reorder.Group>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageProductsWidget };
