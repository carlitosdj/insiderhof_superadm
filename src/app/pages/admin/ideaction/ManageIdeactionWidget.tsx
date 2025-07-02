import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Button, Modal, Card, Badge, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { Ideaction } from "../../../../store/ducks/ideaction/types";
import {
  deleteIdeactionRequest,
  reorderIdeactionsRequest,
  updateIdeactionRequest,
} from "../../../../store/ducks/ideaction/actions";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";

import Create from "./create";
import Update from "./update";
import View from "./view";
import { HowItWorks } from "./howitworks";

type Props = {
  className?: string;
  ideactions: Ideaction[];
};

// ====================================================================
// COMPONENTE IDEACTION ITEM (VERSÃO COM 5 ZONAS DE SCORE)
// ====================================================================
const IdeactionItem: React.FC<{
  ideaction: Ideaction;
  index: number;
  updateComponent: (ideaction: Ideaction) => void;
  viewComponent: (ideaction: Ideaction) => void;
  deleteComponent: (ideaction: Ideaction) => void;
}> = ({ ideaction, index, updateComponent, viewComponent, deleteComponent }) => {
  const dragControls = useDragControls();

  // O useMemo agora retorna um objeto completo com o score e sua categoria (5 níveis)
  const scoreInfo = useMemo(() => {
    const P = Number(ideaction.passion ?? 0);
    const S = Number(ideaction.skill ?? 0);
    const D = Number(ideaction.demand ?? 0);
    const E = Number(ideaction.effort ?? 0);
    const R = Number(ideaction.risk ?? 0);

    const numerator = P * S * D;
    const denominator = E + R;

    const scoreValue = denominator > 0 ? numerator / denominator : 0;

    // Lógica para definir a categoria e a cor da badge em 5 níveis
    // A ordem do 'if' é importante: do maior para o menor.
    if (scoreValue >= 120) {
      return {
        value: scoreValue,
        category: "Excepcional 🚀",
        variant: "primary",
      };
    }
    if (scoreValue >= 70) {
      return {
        value: scoreValue,
        category: "Prioridade Alta",
        variant: "success",
      };
    }
    if (scoreValue >= 30) {
      return {
        value: scoreValue,
        category: "Potencial a Discutir",
        variant: "warning",
      };
    }
    if (scoreValue >= 10) {
        return {
          value: scoreValue,
          category: "Análise Crítica",
          variant: "info",
        };
    }
    return {
      value: scoreValue,
      category: "Repensar ou Descartar",
      variant: "danger",
    };
  }, [ideaction]);

  // Função para lidar com o fim do arraste
  const handleDragEnd = () => {
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
    window.removeEventListener("pointerup", handleDragEnd);
  };

  // Função para lidar com o início do arraste
  const handleDragStart = (e: React.PointerEvent) => {
    dragControls.start(e);
    document.body.style.cursor = "grabbing";
    document.body.style.userSelect = "none";
    window.addEventListener("pointerup", handleDragEnd);
  };

  return (
    <Reorder.Item
      key={ideaction.id}
      value={ideaction}
      as="div"
      dragListener={false}
      dragControls={dragControls}
      style={{ touchAction: "pan-y" }}
      onDragEnd={handleDragEnd}
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
        className="card border mb-2 mb-md-3 ideaction-card"
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
        onPointerDownCapture={(e) => {
          const dragHandle = e.currentTarget.querySelector(".drag-handle");
          if (dragHandle && !dragHandle.contains(e.target as Node)) {
            e.stopPropagation();
          }
        }}
      >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div className="d-flex align-items-center flex-grow-1 w-100">
              <div className="flex-grow-1 min-w-0 me-3 me-md-4">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2 gap-2">
                  <h5 className="fw-bold text-dark mb-0 fs-6 fs-md-5">
                    {ideaction.name}
                  </h5>
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
                  {ideaction.description?.length! > 80
                    ? ideaction.description?.substring(0, 80) + "..."
                    : ideaction.description}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-2">
                  <Badge bg={scoreInfo.variant} className="fs-8 fs-md-7 fw-bold">
                    <KTIcon iconName="star" className="fs-7 me-1" />
                    SCORE: {scoreInfo.value.toFixed(2)} ({scoreInfo.category})
                  </Badge>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 flex-shrink-0 w-100 w-md-auto justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => viewComponent(ideaction)}
                  title="Visualizar ideação"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="eye" className="fs-6" />
                </button>

                <button
                  className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => updateComponent(ideaction)}
                  title="Editar ideação"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="pencil" className="fs-6" />
                </button>

                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja realmente excluir "${ideaction.name}"?`
                      )
                    ) {
                      deleteComponent(ideaction);
                    }
                  }}
                  title="Excluir ideação"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="trash" className="fs-6" />
                </button>

                {/* DRAG HANDLE */}
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
                    touchAction: "none",
                  }}
                  onPointerDown={handleDragStart}
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

// ====================================================================
// COMPONENTE PRINCIPAL (SEM ALTERAÇÕES)
// ====================================================================
const ManageIdeactionWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  ideactions,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [selectedIdeaction, setSelectedIdeaction] = useState<Ideaction>({});
  const [oldIdeactions, setOldIdeactions] = useState<Ideaction[]>([]);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  console.log("ManageIdeactionWidget - ideactions:", ideactions);

  // Inicializar oldIdeactions quando ideactions mudar
  useEffect(() => {
    console.log("ManageIdeactionWidget useEffect - ideactions:", ideactions);
    console.log(
      "ManageIdeactionWidget useEffect - oldIdeactions:",
      oldIdeactions
    );
    if (ideactions.length > 0 && oldIdeactions.length === 0) {
      console.log("ManageIdeactionWidget useEffect - setting oldIdeactions");
      setOldIdeactions([...ideactions]);
    }
  }, [ideactions, oldIdeactions.length]);

  const handleClose = useCallback(() => {
    setShow(false);
    setAction("");
    setSelectedIdeaction({});
  }, []);

  const createComponent = useCallback(() => {
    setAction("createComponent");
    setShow(true);
  }, []);

  const updateComponent = useCallback((ideaction: Ideaction) => {
    console.log(
      "ManageIdeactionWidget updateComponent - ideaction:",
      ideaction
    );
    setAction("updateComponent");
    setSelectedIdeaction(ideaction);
    setShow(true);
  }, []);

  const viewComponent = useCallback((ideaction: Ideaction) => {
    console.log(
      "ManageIdeactionWidget viewComponent - ideaction:",
      ideaction
    );
    setSelectedIdeaction(ideaction);
    setShowViewModal(true);
  }, []);

  const deleteComponent = useCallback(
    (ideaction: Ideaction) => {
      console.log(
        "ManageIdeactionWidget deleteComponent - ideaction:",
        ideaction
      );
      dispatch(deleteIdeactionRequest(ideaction.id!));
    },
    [dispatch]
  );

  const reorder = (newIdeactions: Ideaction[]) => {
    console.log(
      "ManageIdeactionWidget reorder - newIdeactions:",
      newIdeactions
    );
    newIdeactions.map((ideaction) => {
      let index = newIdeactions.findIndex(
        (item): any => item.id === ideaction.id
      );
      if (index !== -1) {
        newIdeactions[index] = { ...newIdeactions[index], order: index + 1 };
      }
    });
    console.log(
      "ManageIdeactionWidget reorder - dispatching reorderIdeactionsRequest"
    );
    dispatch(reorderIdeactionsRequest(newIdeactions));
  };

  const reorderToSave = (newIdeactions: Ideaction[]) => {
    console.log(
      "ManageIdeactionWidget reorderToSave - newIdeactions:",
      newIdeactions
    );
    console.log(
      "ManageIdeactionWidget reorderToSave - oldIdeactions:",
      oldIdeactions
    );
    if (JSON.stringify(oldIdeactions) !== JSON.stringify(newIdeactions)) {
      console.log(
        "ManageIdeactionWidget reorderToSave - dispatching updateIdeactionRequest for each ideaction"
      );
      newIdeactions.map((ideaction) => {
        dispatch(
          updateIdeactionRequest({ id: ideaction.id, order: ideaction.order })
        );
      });
      setOldIdeactions(newIdeactions);
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
            {action === "updateComponent" ? "Editar Ideação" : ""}
            {action === "createComponent" ? "Nova Ideação" : ""}
          </h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {action === "updateComponent" ? (
            <Update handleClose={handleClose} ideaction={selectedIdeaction} />
          ) : (
            ""
          )}
          {action === "createComponent" ? (
            <Create handleClose={handleClose} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      {/* Componente HowItWorks */}
      <HowItWorks show={showInfoModal} onHide={() => setShowInfoModal(false)} />

      {/* Componente View */}
      <View 
        show={showViewModal} 
        onHide={() => setShowViewModal(false)} 
        ideaction={selectedIdeaction} 
      />

      <div className={`card ${className} border-0`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              Gestão de Ideias
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerencie suas ideias de negócio
            </span>
          </h3>
          <div className="card-toolbar d-flex gap-2">
            <Button
              variant="outline-info"
              className="btn btn-lg px-4"
              onClick={() => setShowInfoModal(true)}
            >
              <KTIcon iconName="question" className="fs-2 me-2" />
              Como Funciona
            </Button>
            <Button
              className="btn btn-primary btn-lg px-6"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2 me-2" />
              Nova Ideia
            </Button>
          </div>
        </div>

        <div className="card-body py-3 px-3 px-md-4">
          <div className="d-flex flex-column gap-3">
            <Reorder.Group
              as="div"
              values={ideactions}
              onReorder={reorder}
              onTap={(e) => reorderToSave(ideactions)}
              onMouseUp={(e) => reorderToSave(ideactions)}
              style={{ touchAction: "pan-y" }}
            >
              <AnimatePresence>
                {ideactions.length === 0 && (
                  <div className="text-center py-8 py-md-12 px-3">
                    <div className="mb-3 mb-md-4">
                      <KTIcon
                        iconName="bulb"
                        className="fs-2 fs-md-1 text-muted opacity-50"
                      />
                    </div>
                    <h4 className="fw-bold text-dark mb-2 fs-5 fs-md-4">
                      Nenhuma ideação encontrada
                    </h4>
                    <p className="text-muted mb-4 fs-7 fs-md-6">
                      Comece criando sua primeira ideação para organizar suas
                      ideias de negócio
                    </p>
                    <button
                      className="btn btn-dark px-3 px-md-4 py-2 rounded-1 w-100 w-md-auto"
                      onClick={createComponent}
                    >
                      <KTIcon iconName="plus" className="me-2" />
                      Criar Primeira Ideação
                    </button>
                  </div>
                )}

                {ideactions.length !== 0 &&
                  ideactions?.map((ideaction: Ideaction, index: number) => (
                    <IdeactionItem
                      key={ideaction.id}
                      ideaction={ideaction}
                      index={index}
                      updateComponent={updateComponent}
                      viewComponent={viewComponent}
                      deleteComponent={deleteComponent}
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

export { ManageIdeactionWidget };