/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Badge, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, motion } from "framer-motion";
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

// Estilos CSS customizados para o grid responsivo
const gridStyles = `
  .launch-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    position: relative;
  }
  
  .launch-grid > div {
    width: calc(33.333% - 0.67rem);
    min-width: 300px;
    transition: transform 0.2s ease;
  }
  
  .launch-grid > div.dragging {
    z-index: 1000;
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
  
  .launch-grid > div.drag-over {
    transform: scale(0.95);
    opacity: 0.7;
    border: 2px dashed #007bff;
  }
  
  .launch-grid > div.drag-over::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border: 2px dashed #007bff;
    border-radius: 8px;
    pointer-events: none;
    z-index: 999;
  }
  
  @media (max-width: 1200px) {
    .launch-grid > div {
      width: calc(50% - 0.5rem);
    }
  }
  
  @media (max-width: 768px) {
    .launch-grid > div {
      width: 100%;
    }
  }
`;

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
  
  // Estados para drag and drop customizado
  const [draggedItem, setDraggedItem] = useState<Launch | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number>(-1);
  const [dragOverIndex, setDragOverIndex] = useState<number>(-1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const gridRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    navigate("/createlaunch");
  };

  const updateComponent = (child: Launch) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  const deleteComponent = (child: Launch) => {
    dispatch(deleteLaunchRequest(child.id!));
  };

  const reorder = (children: Launch[]) => {
    // Atualiza a ordem baseada na nova posição no array
    // O Framer Motion automaticamente reorganiza os itens no grid
    children.forEach((child, index) => {
      children[index] = { ...children[index], order: index + 1 };
    });
    dispatch(reorderLaunchsRequest(children));
  };

  const reorderToSave = (children: Launch[]) => {
    // Verifica se houve mudança na ordem antes de salvar
    // Compara cada item com sua posição anterior
    const hasChanged = children.some((child, index) => {
      const oldChild = oldChildren[index];
      return !oldChild || oldChild.id !== child.id || oldChild.order !== child.order;
    });

    if (hasChanged) {
      children.forEach((child) => {
        dispatch(updateLaunchRequest({ id: child.id, order: child.order }));
      });
      setOldChildren([...children]);
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

  // Funções para drag and drop customizado
  const handleDragStart = (e: React.MouseEvent, item: Launch, index: number) => {
    e.preventDefault();
    setDraggedItem(item);
    setDraggedIndex(index);
    setIsDragging(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Adiciona classe de dragging
    if (dragRef.current) {
      dragRef.current.classList.add('dragging');
    }
  };

  const handleDragOver = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (isDragging && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    if (isDragging && draggedItem && draggedIndex !== dragOverIndex && dragOverIndex !== -1) {
      // Reordena os itens
      const newItems = [...launch.myLaunchs];
      const [removed] = newItems.splice(draggedIndex, 1);
      newItems.splice(dragOverIndex, 0, removed);
      
      // Atualiza a ordem
      newItems.forEach((item, index) => {
        newItems[index] = { ...item, order: index + 1 };
      });
      
      // Salva no Redux
      dispatch(reorderLaunchsRequest(newItems));
      
      // Salva no backend
      newItems.forEach((item) => {
        dispatch(updateLaunchRequest({ id: item.id, order: item.order }));
      });
      
      setOldChildren([...newItems]);
    }
    
    // Limpa os estados
    setDraggedItem(null);
    setDraggedIndex(-1);
    setDragOverIndex(-1);
    setIsDragging(false);
    
    // Remove classe de dragging
    if (dragRef.current) {
      dragRef.current.classList.remove('dragging');
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && gridRef.current) {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Encontra o elemento sob o mouse
      const elements = gridRef.current.children;
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        const rect = element.getBoundingClientRect();
        
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          if (dragOverIndex !== i) {
            setDragOverIndex(i);
          }
          break;
        }
      }
    }
  };

  // Event listeners para mouse move
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleDragEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [isDragging, draggedItem, draggedIndex, dragOverIndex]);

  const getStatusBadge = (launch: Launch) => {
    const hasOffers = launch.launchhasoffers && launch.launchhasoffers.length > 0;
    const hasPhases = launch.phases && launch.phases.length > 0;
    const hasPrice = launch.price && launch.price > 0;
    
    if (hasOffers && hasPhases && hasPrice) {
      return <Badge bg="success" className="fs-8 px-2 py-1">Completo</Badge>;
    } else if (hasOffers || hasPhases || hasPrice) {
      return <Badge bg="warning" className="fs-8 px-2 py-1">Parcial</Badge>;
    } else {
      return <Badge bg="secondary" className="fs-8 px-2 py-1">Pendente</Badge>;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <style>{gridStyles}</style>
      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered"
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

          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
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
            <span className="card-label fw-bolder fs-3 mb-1">
              <KTIcon iconName="rocket" className="fs-2 text-primary me-2" />
              Lançamentos
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerenciador de lançamentos e campanhas
            </span>
          </h3>
          <div className="card-toolbar">
            <Button
              className="btn btn-primary btn-lg px-6"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2 me-2" />
              Novo Lançamento
            </Button>
          </div>
        </div>

        <div className="card-body py-3">
          {launch.myLaunchs.length === 0 ? (
            <div className="text-center py-10">
              <KTIcon iconName="rocket" className="fs-4x text-muted mb-4" />
              <h4 className="text-muted mb-2">Nenhum lançamento encontrado</h4>
              <p className="text-muted mb-4">
                Comece criando seu primeiro lançamento para gerenciar campanhas e ofertas.
              </p>
              <Button
                className="btn btn-primary"
                onClick={() => createComponent()}
              >
                <KTIcon iconName="plus" className="fs-2 me-2" />
                Criar Primeiro Lançamento
              </Button>
            </div>
          ) : (
            <div className="launch-grid" ref={gridRef}>
              <AnimatePresence>
                {launch.myLaunchs?.map((child: Launch, index: number) => {
                  return (
                    <motion.div
                      key={child.id}
                      ref={draggedItem === child ? dragRef : null}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      whileDrag={{ 
                        scale: 1.05, 
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        zIndex: 1000
                      }}
                      className={`${draggedItem === child ? 'dragging' : ''} ${dragOverIndex === index ? 'drag-over' : ''}`}
                      style={{ 
                        touchAction: "none",
                        cursor: "grab"
                      }}
                      onMouseDown={(e) => handleDragStart(e, child, index)}
                      onMouseEnter={(e) => handleDragOver(e, index)}
                    >
                      <Card className="h-100 shadow-sm border-0">
                        <Card.Header className="bg-transparent border-0 pt-4 pb-2">
                          <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center">
                              <KTIcon iconName="rocket" className="fs-3 text-primary me-2" />
                              <h6 className="fw-bold text-gray-700 mb-0">
                                {child.name}
                              </h6>
                            </div>
                            {getStatusBadge(child)}
                          </div>
                          <p className="text-muted fs-7 mb-0">
                            {child.description?.length! > 80
                              ? child.description?.substring(0, 80) + "..."
                              : child.description}
                          </p>
                        </Card.Header>

                        <Card.Body className="p-4">
                          <div className="row g-3 mb-4">
                            <div className="col-6">
                              <div className="d-flex flex-column">
                                <span className="fw-bold fs-7 text-gray-600 mb-1">Tipo</span>
                                <Badge bg="primary" className="fs-8 px-2 py-1 w-fit-content">
                                  {child.type || 'Não definido'}
                                </Badge>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="d-flex flex-column">
                                <span className="fw-bold fs-7 text-gray-600 mb-1">Preço</span>
                                <p className="text-success fw-bold fs-6 mb-0">
                                  {child.price ? formatCurrency(child.price) : 'Não definido'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Ofertas */}
                          <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <span className="fw-bold fs-7 text-gray-600">
                                <KTIcon iconName="gift" className="fs-5 text-warning me-1" />
                                Ofertas ({child.launchhasoffers?.length || 0})
                              </span>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => openHasLaunchs(child)}
                                className="btn-sm"
                              >
                                <KTIcon iconName="settings" className="fs-6 me-1" />
                                Gerenciar
                              </Button>
                            </div>
                            
                            {child.launchhasoffers && child.launchhasoffers.length > 0 && (
                              <div className="d-flex flex-column gap-2">
                                {child.launchhasoffers.slice(0, 2).map((hasoffer) => (
                                  <div key={hasoffer.id} className="d-flex align-items-center bg-light rounded p-2">
                                    {hasoffer.offer?.image && (
                                      <img
                                        className="rounded me-2"
                                        height={30}
                                        width={30}
                                        src={
                                          hasoffer.offer?.image.includes("https://")
                                            ? hasoffer.offer?.image
                                            : "https://app.insiderhof.com.br/files/" + hasoffer.offer?.image
                                        }
                                        onError={({ currentTarget }) => {
                                          currentTarget.onerror = null;
                                          currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                                        }}
                                      />
                                    )}
                                    <div className="flex-grow-1">
                                      <p className="fw-bold fs-7 mb-0">{hasoffer.offer?.name}</p>
                                      <p className="text-success fs-8 mb-0">
                                        {formatCurrency(hasoffer.offer?.price || 0)}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                                {child.launchhasoffers.length > 2 && (
                                  <p className="text-muted fs-8 mb-0 text-center">
                                    +{child.launchhasoffers.length - 2} mais ofertas
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Fases */}
                          {/* <div className="mb-3">
                            <span className="fw-bold fs-7 text-gray-600">
                              <KTIcon iconName="calendar" className="fs-5 text-info me-1" />
                              Fases ({child.phases?.length || 0})
                            </span>
                            {child.phases && child.phases.length > 0 && (
                              <div className="d-flex flex-wrap gap-1 mt-2">
                                {child.phases.slice(0, 3).map((phase) => (
                                  <Badge key={phase.id} bg="light" text="dark" className="fs-8">
                                    {phase.name}
                                  </Badge>
                                ))}
                                {child.phases.length > 3 && (
                                  <Badge bg="light" text="dark" className="fs-8">
                                    +{child.phases.length - 3}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div> */}
                        </Card.Body>

                        <Card.Footer className="bg-transparent border-0 pt-0">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2">
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => navigate("/launchphase/" + child.id)}
                                className="btn-sm"
                              >
                                <KTIcon iconName="switch" className="fs-6 me-1" />
                                Fases
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-warning"
                                onClick={() => updateComponent(child)}
                                className="btn-sm"
                              >
                                <KTIcon iconName="pencil" className="fs-6 me-1" />
                                Editar
                              </Button>
                            </div>
                            
                            <div className="d-flex align-items-center gap-2">
                              <div 
                                style={{ cursor: "grab" }} 
                                className="text-muted p-1 rounded hover-bg-light"
                                title="Arrastar para reordenar"
                              >
                                <KTIcon iconName="arrow-up-down" className="fs-5" />
                              </div>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => {
                                  if (window.confirm("Deseja realmente excluir: " + child.name + "?")) {
                                    deleteComponent(child);
                                  }
                                }}
                                className="btn-sm"
                              >
                                <KTIcon iconName="trash" className="fs-6" />
                              </Button>
                            </div>
                          </div>
                        </Card.Footer>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { ManageLaunchWidget };
