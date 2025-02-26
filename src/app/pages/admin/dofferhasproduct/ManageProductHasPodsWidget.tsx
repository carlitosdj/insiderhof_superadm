/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { AnimatePresence, Reorder } from "framer-motion";

import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import { Offer } from "../../../../store/ducks/doffer/types";

import momentDurationFormatSetup from "moment-duration-format";
import {
  OfferHasProducts,
  OfferHasProductsState,
} from "../../../../store/ducks/dofferhasproduct/types";
import { loadMyProductsRequest } from "../../../../store/ducks/dproduct/actions";
import {
  createOfferHasProductsRequest,
  deleteOfferHasProductsRequest,
  reorderOfferHasProductsRequest,
  updateOfferHasProductsRequest,
} from "../../../../store/ducks/dofferhasproduct/actions";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  offerhasproducts: OfferHasProductsState;
  child: Offer;
};

const ManageOfferHasProductsWidget: React.FC<
  React.PropsWithChildren<Props>
> = ({ className, offerhasproducts, child }) => {
  const [oldChildren, setOldChildren] = useState<OfferHasProducts[]>(
    offerhasproducts.data
  );

  const offerId = child.id;
  const dispatch = useDispatch();

  const products = useSelector((state: ApplicationState) => state.product);
  const me = useSelector((state: ApplicationState) => state.me);

  useEffect(() => {
    dispatch(loadMyProductsRequest(Number(me.me.id)));
  }, [dispatch, offerId]);

  // Deleta componente: CHILD
  const deleteComponent = (child: OfferHasProducts) => {
    dispatch(deleteOfferHasProductsRequest(child.id!));
  };

  const reorder = (children: OfferHasProducts[]) => {
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderOfferHasProductsRequest(children));
  };

  const reorderToSave = (children: OfferHasProducts[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(
          updateOfferHasProductsRequest({ id: child.id, order: child.order })
        );
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          {products.myProducts.map((product) => (
            <div key={product.id} className="d-flex align-items-center mb-5">
              {/* Checkbox */}
              <div className="form-check form-check-custom form-check-solid me-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={product.id}
                  checked={
                    offerhasproducts.data.find(
                      (child) => child.productId === product.id
                    )
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const offer: OfferHasProducts = {
                        offerId: Number(offerId),
                        productId: Number(product.id),
                      };
                      dispatch(createOfferHasProductsRequest(offer));
                    } else {
                      const offerHasProducts = offerhasproducts.data.find(
                        (child) => child.productId === product.id
                      );
                      dispatch(
                        deleteOfferHasProductsRequest(offerHasProducts?.id!)
                      );
                      //dispatch(deleteComponent(product));
                    }
                  }}
                />
              </div>

              {product.name}
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">PRODUTO DIGITAL</th>
                  <th className="min-w-50px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead> */}
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={offerhasproducts.data}
                onReorder={reorder}
                onTap={(e) => reorderToSave(offerhasproducts.data)}
                onMouseUp={(e) => reorderToSave(offerhasproducts.data)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {offerhasproducts.data.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhum produto encontrado aqui. Adicione um produto
                        clicando em "Adicionar produto".
                      </td>
                    </tr>
                  )}

                  {offerhasproducts.data.length !== 0 &&
                    offerhasproducts.data?.map(
                      (child: OfferHasProducts, index: number) => {
                        // const { image } = child;
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
                              <div className="d-flex flex-row">
                                <div>
                                  <Link
                                    to={"#!"}
                                    style={{ display: "flex" }}
                                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                  >
                                    {child.product?.name}
                                  </Link>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="d-flex justify-content-end flex-shrink-0">
                                <a
                                  href="#!"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Deseja realmente excluir: " +
                                          child.id +
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
                      }
                    )}
                </AnimatePresence>
              </Reorder.Group>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageOfferHasProductsWidget };
