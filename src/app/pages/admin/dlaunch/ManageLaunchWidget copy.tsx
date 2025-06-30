/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";
import { Launch, LaunchsState } from "../../../../store/ducks/dlaunch/types";
import {
  deleteLaunchRequest,
  reorderLaunchsRequest,
  updateLaunchRequest,
} from "../../../../store/ducks/dlaunch/actions";
import Manage from "../dlaunchhasoffers/Manage";
import Create from "./create";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  launch: LaunchsState;
};

const ManageLaunchWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  launch,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Launch>({});
  const [oldChildren, setOldChildren] = useState<Launch[]>(launch.myLaunchs);

  const [openProduct, setOpenProduct] = useState<boolean>(false);
  const [openedId, setOpenedId] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    //setAction("createComponent");
    //setShow(true);
    navigate("/createlaunch");
  };

  const updateComponent = (child: Launch) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: Launch) => {
    dispatch(deleteLaunchRequest(child.id!));
  };

  const reorder = (children: Launch[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLaunchsRequest(children));
  };

  const reorderToSave = (children: Launch[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateLaunchRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openHasLaunchs = (child: Launch) => {
    setAction("manageLaunchs");
    setShow(true);
    setChild(child);
  };

  const open = (open: boolean, id: number) => {
    setOpenedId(id);
    setOpenProduct(open);
    if (id !== openedId) {
      setOpenProduct(true);
    }
  };

  return (
    <>
      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered "
        show={show}
        onHide={handleClose}
        backdrop={true}
        size="xl"
      >
        <div className="modal-header">
          <h2>
            {action === "updateComponent" ? "Editar lançamento" : ""}
            {action === "createComponent" ? "Adicionar lançamento" : ""}
            {action === "manageLaunchs" ? "Gerenciar ofertas" : ""}
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
          {action === "manageLaunchs" ? (
            <Manage handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Lançamentos</span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerenciador de lançamentos
            </span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <a
              //href="#!"
              className="btn btn-primary"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Novo lançamento
            </a>
          </div>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px">LANÇAMENTO</th>
                  <th className="min-w-100px">OFERTA</th>
                  {/* <th className="min-w-100px">FASES</th> */}
                  <th className="min-w-20px">PREÇO</th>
                  <th className="min-w-20px">TIPO</th>
                  <th className="min-w-20px">LEADS</th>
                  <th className="min-w-20px">VENDAS</th>
                  <th className="min-w-20px">TAXA</th>
                  <th className="min-w-20px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={launch.myLaunchs}
                onReorder={reorder}
                onTap={(e) => reorderToSave(launch.myLaunchs)}
                onMouseUp={(e) => reorderToSave(launch.myLaunchs)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {launch.myLaunchs.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhuma launch encontrada aqui. Adicione uma launch
                        clicando em "Nova launch".
                      </td>
                    </tr>
                  )}

                  {launch.myLaunchs.length !== 0 &&
                    launch.myLaunchs?.map((child: Launch, index: number) => {
                      return (
                        <Reorder.Item
                          key={child.id}
                          value={child}
                          as="tr"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <Link
                                  to={"/launch/" + child.id}
                                  style={{ display: "flex" }}
                                  className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                >
                                  {child.name}
                                </Link>

                                <span className="text-muted fw-semibold text-muted d-block fs-7">
                                  {child.description?.length! > 50
                                    ? child.description?.substring(0, 50) +
                                      "..."
                                    : child.description}
                                </span>
                                {/* <Button
                                  className="btn btn-sm btn-light-primary"
                                  onClick={() =>
                                    navigate("/launchphase/" + child.id)
                                  }
                                >
                                  Gerenciar fases
                                </Button> */}
                              </div>
                            </div>
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {/* {child.launchhasoffers?.length} */}
                            <Button
                              className="btn btn-sm btn-light-primary"
                              onClick={() => openHasLaunchs(child)}
                            >
                              Gerenciar ofertas neste lançamento (
                              {child.launchhasoffers?.length})
                            </Button>
                            {child.launchhasoffers?.map((hasoffer) => {
                              return (
                                <div
                                  key={hasoffer.id}
                                  className="d-flex flex-row "
                                >
                                  <div className="my-2">
                                    <div className="text-gray-900 fw-bold d-block fs-6 d-flex align-items-center">
                                      {hasoffer.offer?.image && (
                                        <div className="me-1">
                                          <img
                                            className="embed-responsive-item rounded-1"
                                            height={35}
                                            src={
                                              hasoffer.offer?.image.includes(
                                                "https://"
                                              )
                                                ? hasoffer.offer?.image
                                                : "https://app.insiderhof.com.br/files/" +
                                                  hasoffer.offer?.image
                                            }
                                            onError={({ currentTarget }) => {
                                              currentTarget.onerror = null; // prevents looping
                                              currentTarget.src =
                                                "https://app.insiderhof.com.br/files/notfound.jpg";
                                            }}
                                          />
                                        </div>
                                      )}
                                      {hasoffer.offer?.name} {"->"} R${" "}
                                      {hasoffer.offer?.price?.toLocaleString(
                                        "pt-BR",
                                        { style: "currency", currency: "BRL" }
                                      )}
                                      <button
                                        className="btn btn-sm"
                                        onClick={() =>
                                          open(!openProduct, child.id!)
                                        }
                                      >
                                        {openProduct &&
                                        openedId === child.id ? (
                                          <KTIcon
                                            iconName="up"
                                            iconType="solid"
                                          />
                                        ) : (
                                          <KTIcon
                                            iconName="down"
                                            iconType="solid"
                                          />
                                        )}
                                      </button>
                                    </div>

                                    {openProduct && openedId === child.id && (
                                      <div>
                                        {hasoffer.offer?.dOfferHasProducts?.map(
                                          (product: any) => {
                                            return (
                                              <div className="d-flex flex-row align-items-center">
                                                {product.product?.image && (
                                                  <div className="me-1 mx-2 my-1">
                                                    <img
                                                      className="embed-responsive-item rounded-1"
                                                      height={22}
                                                      src={
                                                        product.product?.image.includes(
                                                          "https://"
                                                        )
                                                          ? product.product
                                                              ?.image
                                                          : "https://app.insiderhof.com.br/files/" +
                                                            product.product
                                                              ?.image
                                                      }
                                                      // style={{ width: "100%" }}
                                                      onError={({
                                                        currentTarget,
                                                      }) => {
                                                        currentTarget.onerror =
                                                          null; // prevents looping
                                                        currentTarget.src =
                                                          "https://app.insiderhof.com.br/files/notfound.jpg";
                                                      }}
                                                    />
                                                  </div>
                                                )}

                                                <span
                                                  key={product.id}
                                                  className="text-muted fw-semibold text-muted d-block fs-7"
                                                >
                                                  {product.product?.name}:
                                                  {product.product?.price?.toLocaleString(
                                                    "pt-BR",
                                                    {
                                                      style: "currency",
                                                      currency: "BRL",
                                                    }
                                                  )}
                                                </span>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.price?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.type}
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.leadsCount}
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.cartCount}
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.leadsCount && child.cartCount
                              ? (
                                  (child.cartCount / child.leadsCount) *
                                  100
                                ).toFixed(1) + "%"
                              : "0%"}
                          </td>
                          <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
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

export { ManageLaunchWidget };
