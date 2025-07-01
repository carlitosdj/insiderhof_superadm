/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";

import { AnimatePresence, Reorder, useDragControls, motion } from "framer-motion";
import { Offer, OffersState } from "../../../../store/ducks/doffer/types";
import {
  deleteOfferRequest,
  reorderOffersRequest,
  updateOfferRequest,
} from "../../../../store/ducks/doffer/actions";
import Manage from "../dofferhasproduct/Manage";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  offer: OffersState;
};

// Componente separado para cada item da lista
const OfferItem: React.FC<{
  child: Offer;
  index: number;
  updateComponent: (child: Offer) => void;
  deleteComponent: (offer: Offer) => void;
  openHasOffers: (child: Offer) => void;
}> = ({ child, index, updateComponent, deleteComponent, openHasOffers }) => {
  const dragControls = useDragControls();
  const { image } = child;

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

  return (
    <Reorder.Item
      key={child.id}
      value={child}
      as="div"
      dragListener={false}      // Desabilita o drag automático
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
          className="card border mb-2 mb-md-3 offer-card"
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
            const dragHandle = e.currentTarget.querySelector('.drag-handle');
            if (dragHandle && !dragHandle.contains(e.target as Node)) {
              e.stopPropagation();
            }
          }}
        >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div className="d-flex align-items-center flex-grow-1 w-100">
              {image && (
                <div className="me-3 me-md-4 flex-shrink-0">
                  <img
                    className="rounded-3"
                    style={{
                      objectFit: "cover",
                      width: "90px",
                      //height: "90px",
                    }}
                    src={
                      image?.includes("https://")
                        ? image
                        : "https://app.insiderhof.com.br/files/" + image
                    }
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src =
                        "https://app.insiderhof.com.br/files/notfound.jpg";
                    }}
                  />
                </div>
              )}

              <div className="flex-grow-1 min-w-0 me-3 me-md-4">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2 gap-2">
                  <h5 
                    className="fw-bold text-dark mb-0 fs-6 fs-md-5 cursor-pointer"
                    onClick={() => openHasOffers(child)}
                    style={{ cursor: "pointer" }}
                  >
                    {child.name}
                  </h5>
                  <span className="badge bg-light-primary text-primary fs-8 fs-md-7 fw-semibold">
                    Oferta
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
                  <span className="fw-bold fs-8 fs-md-7 text-primary">
                    {child.price?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                  <div className="d-flex align-items-center gap-1">
                    <KTIcon iconName="element-plus" className="fs-6 text-muted" />
                    <span className="text-muted fs-8 fs-md-7">
                      {child.dOfferHasProducts?.length || 0} produtos
                    </span>
                  </div>
                </div>

                {/* Produtos da oferta */}
                {child.dOfferHasProducts && child.dOfferHasProducts.length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mb-2">
                    {child.dOfferHasProducts.slice(0, 3).map((product) => (
                      <div
                        key={product.id}
                        className="d-flex align-items-center gap-1 bg-light-secondary rounded-3 px-2 py-1"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {product.product?.image && (
                          <img
                            className="rounded-1"
                            style={{
                              width: "16px",
                              height: "16px",
                              objectFit: "cover",
                            }}
                            src={
                              product.product?.image?.includes("https://")
                                ? product.product?.image
                                : "https://app.insiderhof.com.br/files/" +
                                  product.product?.image
                            }
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null;
                              currentTarget.src =
                                "https://app.insiderhof.com.br/files/notfound.jpg";
                            }}
                          />
                        )}
                        <span className="text-muted fw-semibold">
                          {product.product?.name}
                        </span>
                      </div>
                    ))}
                    {child.dOfferHasProducts.length > 3 && (
                      <span className="text-muted fs-8">
                        +{child.dOfferHasProducts.length - 3} mais
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 flex-shrink-0 w-100 w-md-auto justify-content-between">
              <button
                className="btn btn-light-secondary btn-sm d-flex align-items-center justify-content-center gap-2 px-2 px-md-3 py-2 flex-grow-1"
                onClick={() => openHasOffers(child)}
                title="Gerenciar produtos"
              >
                <KTIcon iconName="element-plus" className="fs-6" />
                <span className="fw-semibold d-sm-inline">
                  Gerenciar produtos
                </span>
              </button>
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => updateComponent(child)}
                  title="Editar oferta"
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
                  title="Excluir oferta"
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

const ManageOfferWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  offer,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Offer>({});
  const { OfferId } = useParams();
  const [oldChildren, setOldChildren] = useState<Offer[]>(offer.myOffers);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const updateComponent = (child: Offer) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (Offer: Offer) => {
    dispatch(deleteOfferRequest(Offer.id!));
  };

  const reorder = (children: Offer[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderOffersRequest(children));
  };

  const reorderToSave = (children: Offer[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateOfferRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openHasOffers = (child: Offer) => {
    setAction("openHasOffers");
    setShow(true);
    setChild(child);
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
            {action === "updateComponent" ? "Editar Oferta" : ""}
            {action === "createComponent" ? "Adicionar Oferta" : ""}
            {action === "openHasOffers" ? "Produtos vinculados" : ""}
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

          {action === "openHasOffers" ? (
            <Manage handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      <div className={`card ${className} border-0`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Ofertas</span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerencie suas ofertas e pacotes
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
              href="#!"
              className="btn btn-primary"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Adicionar Oferta
            </a>
          </div>
        </div>

        <div className="card-body py-3 px-3 px-md-4">
          <div className="d-flex flex-column gap-3">
            <Reorder.Group
              as="div"
              values={offer.myOffers}
              onReorder={reorder}
              onTap={(e) => reorderToSave(offer.myOffers)}
              onMouseUp={(e) => reorderToSave(offer.myOffers)}
              style={{ touchAction: "pan-y" }} // Permite scroll vertical
            >
              <AnimatePresence>
                {offer.myOffers.length === 0 && (
                  <div className="text-center py-8 py-md-12 px-3">
                    <div className="mb-3 mb-md-4">
                      <KTIcon
                        iconName="element-plus"
                        className="fs-2 fs-md-1 text-muted opacity-50"
                      />
                    </div>
                    <h4 className="fw-bold text-dark mb-2 fs-5 fs-md-4">
                      Nenhuma oferta encontrada
                    </h4>
                    <p className="text-muted mb-4 fs-7 fs-md-6">
                      Comece adicionando sua primeira oferta para organizar
                      seus produtos
                    </p>
                    <button
                      className="btn btn-dark px-3 px-md-4 py-2 rounded-1 w-100 w-md-auto"
                      onClick={createComponent}
                    >
                      <KTIcon iconName="plus" className="me-2" />
                      Adicionar Primeira Oferta
                    </button>
                  </div>
                )}

                {offer.myOffers.length !== 0 &&
                  offer.myOffers?.map((child: Offer, index: number) => (
                    <OfferItem
                      key={child.id}
                      child={child}
                      index={index}
                      updateComponent={updateComponent}
                      deleteComponent={deleteComponent}
                      openHasOffers={openHasOffers}
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

export { ManageOfferWidget };
