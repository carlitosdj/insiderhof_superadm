/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";
import {
  AnimatePresence,
  Reorder,
  useDragControls,
  motion,
} from "framer-motion";
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

// Componente separado para cada item da lista
const LaunchItem: React.FC<{
  child: Launch;
  index: number;
  updateComponent: (child: Launch) => void;
  deleteComponent: (launch: Launch) => void;
  openHasLaunchs: (child: Launch) => void;
}> = ({ child, index, updateComponent, deleteComponent, openHasLaunchs }) => {
  const dragControls = useDragControls();

  // Função para lidar com o fim do arraste
  const handleDragEnd = () => {
    // Restaura o cursor e a seleção de texto no corpo do documento
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
    // Remove o ouvinte de evento para evitar acúmulo
    window.removeEventListener("pointerup", handleDragEnd);
  };

  // Função para lidar com o início do arraste
  const handleDragStart = (e: React.PointerEvent) => {
    // Inicia o arraste com o Framer Motion
    dragControls.start(e);
    // Altera o cursor para indicar que algo está sendo arrastado
    document.body.style.cursor = "grabbing";
    // Desabilita a seleção de texto para evitar o problema
    document.body.style.userSelect = "none";
    // Adiciona um ouvinte de evento global para quando o botão do mouse for solto
    window.addEventListener("pointerup", handleDragEnd);
  };

  // Pega a primeira oferta associada para mostrar a imagem
  const firstOffer = child.launchhasoffers?.[0]?.offer;

  return (
    <Reorder.Item
      key={child.id}
      value={child}
      as="div"
      dragListener={false} // Desabilita o drag automático
      dragControls={dragControls} // Usa o controle manual
      style={{ touchAction: "pan-y" }} // Permite scroll no item
      onDragEnd={handleDragEnd} // Limpa os estilos quando o arraste termina
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      <div
        className="card border mb-2 mb-md-3 launch-card"
        style={{
          transition: "all 0.3s ease",
          borderRadius: "6px",
        }}
        onMouseEnter={(e) => {
          if (window.innerWidth > 768) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }
        }}
        onMouseLeave={(e) => {
          if (window.innerWidth > 768) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
        // Previne drag em todo o card exceto no handle
        onPointerDownCapture={(e) => {
          // Verifica se o clique foi no drag handle ou em seus filhos
          const dragHandle = e.currentTarget.querySelector(".drag-handle");
          if (dragHandle && !dragHandle.contains(e.target as Node)) {
            e.stopPropagation();
          }
        }}
      >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <Link to={"/launch/" + child.id} className="text-decoration-none w-100">
              <div className="d-flex align-items-center flex-grow-1 w-100">
                <div className="me-3 me-md-4 flex-shrink-0">
                  {firstOffer?.image ? (
                    <img
                      className="rounded-3"
                      style={{
                        objectFit: "cover",
                        width: "120px",
                        //height: "90px",
                      }}
                      src={
                        firstOffer.image?.includes("https://")
                          ? firstOffer.image
                          : "https://app.insiderhof.com.br/files/" +
                            firstOffer.image
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "https://app.insiderhof.com.br/files/notfound.jpg";
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-3 d-flex align-items-center justify-content-center text-center"
                      style={{
                        width: "120px",
                        height: "160px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                      }}
                    >
                      <div>
                        <KTIcon iconName="plus" className="fs-4 mb-1" />
                        <div>Inclua uma oferta</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-grow-1 min-w-0 me-3 me-md-4">
                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2 gap-2">
                    <div className="text-decoration-none">
                      <h5 className="fw-bold text-dark mb-0 fs-6 fs-md-5">
                        {child.name}
                      </h5>
                    </div>
                    <span className="badge bg-light-primary text-primary fs-8 fs-md-7 fw-semibold">
                      {child.type}
                    </span>
                  </div>

                  <p
                    className="text-muted fs-8 fs-md-7 mb-2"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {child.description?.length! > 80
                      ? child.description?.substring(0, 80) + "..."
                      : child.description}
                  </p>

                  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2 mb-2">
                    <div className="d-flex align-items-center gap-1">
                      <span className="fw-bold fs-8 fs-md-7 text-primary">
                        {child.price?.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                      {/* {firstOffer?.price && (
                      <span className="text-muted fs-8 fs-md-7 text-decoration-line-through">
                        ({firstOffer.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })})
                      </span>
                    )} */}
                    </div>
                    {firstOffer?.dOfferHasProducts &&
                      firstOffer.dOfferHasProducts.length > 0 && (
                        <div className="d-flex align-items-center gap-1">
                          <span className="text-muted fs-8 fs-md-7 text-decoration-line-through">
                            (
                            {firstOffer.dOfferHasProducts
                              .reduce((total, offerProduct) => {
                                return (
                                  total + (offerProduct.product?.price || 0)
                                );
                              }, 0)
                              .toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            )
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Ofertas do lançamento */}
                  {child.launchhasoffers &&
                    child.launchhasoffers.length > 0 && (
                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {child.launchhasoffers.slice(0, 3).map((hasoffer) => (
                          <div
                            key={hasoffer.id}
                            className="d-flex align-items-center gap-1 bg-light-secondary rounded-3 px-2 py-1"
                            style={{ fontSize: "0.75rem" }}
                          >
                            {hasoffer.offer?.image && (
                              <img
                                className="rounded-1"
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  objectFit: "cover",
                                }}
                                src={
                                  hasoffer.offer?.image?.includes("https://")
                                    ? hasoffer.offer?.image
                                    : "https://app.insiderhof.com.br/files/" +
                                      hasoffer.offer?.image
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src =
                                    "https://app.insiderhof.com.br/files/notfound.jpg";
                                }}
                              />
                            )}
                            <span className="text-muted fw-semibold">
                              {hasoffer.offer?.name}
                            </span>
                          </div>
                        ))}
                        {child.launchhasoffers.length > 3 && (
                          <span className="text-muted fs-8">
                            +{child.launchhasoffers.length - 3} mais
                          </span>
                        )}
                      </div>
                    )}

                  <div className="d-flex align-items-center gap-1">
                    {/* <div className="d-flex align-items-center gap-1">
                    <KTIcon
                      iconName="element-plus"
                      className="fs-6 text-muted"
                    />
                    <span className="text-muted fs-8 fs-md-7">
                      {child.launchhasoffers?.length === 1
                        ? "1 oferta"
                        : child.launchhasoffers?.length + " ofertas"}
                    </span>
                  </div> */}
                    {(child.leadsCount ?? 0) > 0 && (
                      <div className="d-flex align-items-center gap-1">
                        <KTIcon iconName="user" className="fs-6 text-success" />
                        <span className="text-muted fs-8 fs-md-7">
                          {child.leadsCount} leads
                        </span>
                      </div>
                    )}
                    {(child.cartCount ?? 0) > 0 && (
                      <div className="d-flex align-items-center gap-1">
                        <KTIcon
                          iconName="purchase"
                          className="fs-6 text-success"
                        />
                        <span className="text-muted fs-8 fs-md-7">
                          {child.cartCount} vendas
                        </span>
                      </div>
                    )}
                    {(child.leadsCount ?? 0) > 0 &&
                      (child.cartCount ?? 0) > 0 && (
                        <div className="d-flex align-items-center gap-1">
                          <KTIcon
                            iconName="chart-simple"
                            className="fs-6 text-success"
                          />
                          <span className="text-muted fs-8 fs-md-7">
                            {(
                              ((child.cartCount ?? 0) /
                                (child.leadsCount ?? 1)) *
                              100
                            ).toFixed(1)}
                            % conversão
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </Link>

            <div className="d-flex flex-wrap align-items-center gap-2 flex-shrink-0 w-100 w-md-auto justify-content-between">
              <button
                className="btn btn-light-secondary btn-sm d-flex align-items-center justify-content-center gap-2 px-2 px-md-3 py-2 flex-grow-1"
                onClick={() => openHasLaunchs(child)}
                title="Gerenciar ofertas"
              >
                <KTIcon iconName="element-plus" className="fs-6" />
                <span className="fw-semibold d-sm-inline">
                  Gerenciar ofertas
                </span>
              </button>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => updateComponent(child)}
                  title="Editar lançamento"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="pencil" className="fs-6" />
                </button>

                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja realmente excluir "${child.name}"?`
                      )
                    ) {
                      deleteComponent(child);
                    }
                  }}
                  title="Excluir lançamento"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="trash" className="fs-6" />
                </button>

                {/* DRAG HANDLE - Único elemento que permite arrastar */}
                <div
                  className="drag-handle"
                  style={{
                    cursor: "grab",
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    touchAction: "none", // Desabilita scroll apenas neste elemento
                  }}
                  onPointerDown={handleDragStart} // <-- CORREÇÃO APLICADA AQUI
                >
                  <KTIcon
                    iconName="arrow-up-down"
                    className="text-muted fs-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
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
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={show}
        onHide={handleClose}
        backdrop={true}
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

      <div className={`card ${className} border-0`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Lançamentos</span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerencie seus lançamentos e campanhas
            </span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <a className="btn btn-primary" onClick={() => createComponent()}>
              <KTIcon iconName="plus" className="fs-2" />
              Novo Lançamento
            </a>
          </div>
        </div>

        <div className="card-body py-3 px-3 px-md-4">
          <div className="d-flex flex-column gap-3">
            <Reorder.Group
              as="div"
              values={launch.myLaunchs}
              onReorder={reorder}
              onTap={(e) => reorderToSave(launch.myLaunchs)}
              onMouseUp={(e) => reorderToSave(launch.myLaunchs)}
              style={{ touchAction: "pan-y" }} // Permite scroll vertical
            >
              <AnimatePresence>
                {launch.myLaunchs.length === 0 && (
                  <div className="text-center py-8 py-md-12 px-3">
                    <div className="mb-3 mb-md-4">
                      <KTIcon
                        iconName="element-plus"
                        className="fs-2 fs-md-1 text-muted opacity-50"
                      />
                    </div>
                    <h4 className="fw-bold text-dark mb-2 fs-5 fs-md-4">
                      Nenhum lançamento encontrado
                    </h4>
                    <p className="text-muted mb-4 fs-7 fs-md-6">
                      Comece criando seu primeiro lançamento para organizar suas
                      campanhas
                    </p>
                    <button
                      className="btn btn-dark px-3 px-md-4 py-2 rounded-1 w-100 w-md-auto"
                      onClick={createComponent}
                    >
                      <KTIcon iconName="plus" className="me-2" />
                      Criar Primeiro Lançamento
                    </button>
                  </div>
                )}

                {launch.myLaunchs.length !== 0 &&
                  launch.myLaunchs?.map((child: Launch, index: number) => (
                    <LaunchItem
                      key={child.id}
                      child={child}
                      index={index}
                      updateComponent={updateComponent}
                      deleteComponent={deleteComponent}
                      openHasLaunchs={openHasLaunchs}
                    />
                  ))}
              </AnimatePresence>
            </Reorder.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageLaunchWidget };
