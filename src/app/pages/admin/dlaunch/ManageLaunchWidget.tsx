/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from "react";
import { Button, Modal, Card, Badge, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";
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
  const [draggedItem, setDraggedItem] = useState<Launch | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const [openProduct, setOpenProduct] = useState<boolean>(false);
  const [openedId, setOpenedId] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Custom styles for enhanced UI
  const customStyles = `
    .hover-shadow-lg {
      transition: all 0.3s ease;
    }
    
    .hover-shadow-lg:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
    }
    
    .transition-all {
      transition: all 0.3s ease;
    }
    
    .hover-primary:hover {
      color: var(--kt-primary) !important;
    }
    
    .cursor-grab {
      cursor: grab;
    }
    
    .cursor-grab:active {
      cursor: grabbing;
    }
    
    /* Reorder styles */
    .reorder-item {
      user-select: none;
      touch-action: none;
    }
    
    .reorder-item:active {
      cursor: grabbing;
    }
    
    .reorder-group {
      position: relative;
    }
    
    /* Prevent text selection during drag */
    .reorder-item * {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    
    /* Allow text selection in buttons and inputs */
    .reorder-item button,
    .reorder-item input,
    .reorder-item textarea {
      user-select: text;
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
    }
    
    .symbol-50px {
      width: 50px;
      height: 50px;
    }
    
    .symbol-40px {
      width: 40px;
      height: 40px;
    }
    
    .symbol-100px {
      width: 100px;
      height: 100px;
    }
    
    .bg-light-primary {
      background-color: rgba(var(--kt-primary-rgb), 0.1);
    }
    
    .bg-light-success {
      background-color: rgba(var(--kt-success-rgb), 0.1);
    }
    
    .bg-light-warning {
      background-color: rgba(var(--kt-warning-rgb), 0.1);
    }
    
    .bg-light-info {
      background-color: rgba(var(--kt-info-rgb), 0.1);
    }
    
    .bg-light-dark {
      background-color: rgba(var(--kt-dark-rgb), 0.05);
    }
    
    .fs-8 {
      font-size: 0.75rem !important;
    }
    
    .p-6 {
      padding: 1.5rem !important;
    }
    
    .py-12 {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }
    
    .mb-8 {
      margin-bottom: 2rem !important;
    }
    
    /* Force 3 columns on large screens */
    @media (min-width: 992px) {
      .reorder-item {
        flex: 0 0 33.333333% !important;
        max-width: 33.333333% !important;
      }
    }
    
    /* 2 columns on medium screens */
    @media (min-width: 768px) and (max-width: 991px) {
      .reorder-item {
        flex: 0 0 50% !important;
        max-width: 50% !important;
      }
    }
    
    /* 1 column on small screens */
    @media (max-width: 767px) {
      .reorder-item {
        flex: 0 0 100% !important;
        max-width: 100% !important;
      }
    }
    
    /* Drag and drop visual indicators */
    .reorder-item.dragging {
      opacity: 0.5;
      transform: rotate(2deg) scale(0.95);
      z-index: 1000;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;
    }
    
    .reorder-item.drag-over {
      position: relative;
    }
    
    .reorder-item.drag-over::before {
      content: '';
      position: absolute;
      top: -8px;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #007bff, #28a745);
      border-radius: 2px;
      z-index: 1001;
      animation: dropIndicator 0.3s ease-in-out;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    }
    
    .reorder-item.drag-over::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #007bff, #28a745);
      border-radius: 2px;
      z-index: 1001;
      animation: dropIndicator 0.3s ease-in-out;
      box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    }
    
    @keyframes dropIndicator {
      0% {
        opacity: 0;
        transform: scaleX(0);
      }
      50% {
        opacity: 1;
        transform: scaleX(1.1);
      }
      100% {
        opacity: 1;
        transform: scaleX(1);
      }
    }
    
    .reorder-item.drag-over .card {
      border: 2px solid #007bff !important;
      box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1) !important;
    }
    
    /* Drag handle hover effect */
    .drag-handle:hover {
      background-color: rgba(0, 123, 255, 0.1) !important;
      transform: scale(1.1);
    }
    
    .drag-handle:active {
      background-color: rgba(0, 123, 255, 0.2) !important;
      transform: scale(0.95);
    }
  `;
  
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

  // Custom drag and drop handlers
  const handleDragStart = (e: React.DragEvent, item: Launch) => {
    setDraggedItem(item);
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', item.id?.toString() || '');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const draggedIndex = launch.myLaunchs.findIndex(item => item.id === draggedItem.id);
    if (draggedIndex === -1 || draggedIndex === dropIndex) return;
    
    const newItems = [...launch.myLaunchs];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, removed);
    
    // Update order property
    newItems.forEach((item, index) => {
      item.order = index + 1;
    });
    
    dispatch(reorderLaunchsRequest(newItems));
    
    // Save the new order to backend using reorderToSave
    reorderToSave(newItems);
    
    setDragOverIndex(null);
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

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getStatusColor = (launch: Launch) => {
    if (launch.status === '1') return 'success';
    if (launch.status === '0') return 'danger';
    return 'secondary';
  };

  const getStatusText = (launch: Launch) => {
    if (launch.status === '1') return 'Ativo';
    if (launch.status === '0') return 'Inativo';
    return 'Pendente';
  };

  const getConversionRate = (launch: Launch) => {
    if (launch.leadsCount && launch.cartCount) {
      return ((launch.cartCount / launch.leadsCount) * 100).toFixed(1);
    }
    return '0';
  };

  const getRevenue = (launch: Launch) => {
    return (launch.cartCount || 0) * (launch.price || 0);
  };

  return (
    <>
      <style>{customStyles}</style>
      
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
          ) : action === "createComponent" ? (
            <Create handleClose={handleClose} />
          ) : action === "manageLaunchs" ? (
            <Manage handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      <div className={`${className}`}>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-8">
          <div>
            <h1 className="text-dark fw-bold fs-2 mb-2">Lançamentos</h1>
            <p className="text-muted fs-6 mb-0">
              Gerencie seus lançamentos e acompanhe o desempenho
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            className="btn-primary d-flex align-items-center gap-2"
            onClick={createComponent}
          >
            <KTIcon iconName="plus" className="fs-2" />
            Novo Lançamento
          </Button>
        </div>

        {/* Statistics Overview */}
        <Row className="mb-8">
          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-6">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="symbol symbol-50px me-3">
                      <div className="symbol-label bg-light-primary">
                        <KTIcon iconName="chart-line" className="fs-2x text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted fw-semibold fs-7">Total de Lançamentos</div>
                    <div className="fs-3 fw-bold text-dark">{launch.myLaunchs.length}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-6">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="symbol symbol-50px me-3">
                      <div className="symbol-label bg-light-success">
                        <KTIcon iconName="user" className="fs-2x text-success" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted fw-semibold fs-7">Total de Leads</div>
                    <div className="fs-3 fw-bold text-dark">
                      {formatNumber(launch.myLaunchs.reduce((sum, l) => sum + (l.leadsCount || 0), 0))}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-6">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="symbol symbol-50px me-3">
                      <div className="symbol-label bg-light-warning">
                        <KTIcon iconName="basket" className="fs-2x text-warning" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted fw-semibold fs-7">Total de Vendas</div>
                    <div className="fs-3 fw-bold text-dark">
                      {formatNumber(launch.myLaunchs.reduce((sum, l) => sum + (l.cartCount || 0), 0))}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-6">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="symbol symbol-50px me-3">
                      <div className="symbol-label bg-light-info">
                        <KTIcon iconName="dollar" className="fs-2x text-info" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="text-muted fw-semibold fs-7">Receita Total</div>
                    <div className="fs-3 fw-bold text-dark">
                      {formatCurrency(launch.myLaunchs.reduce((sum, l) => sum + getRevenue(l), 0))}
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Launches Grid */}
        <div className="row reorder-group" style={{ touchAction: "none" }}>
          {launch.myLaunchs.length === 0 && (
            <Col xs={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-12">
                  <div className="symbol symbol-100px mb-6">
                    <div className="symbol-label bg-light-primary">
                      <KTIcon iconName="rocket" className="fs-2x text-primary" />
                    </div>
                  </div>
                  <h3 className="text-dark fw-bold mb-2">Nenhum lançamento encontrado</h3>
                  <p className="text-muted fs-6 mb-6">
                    Comece criando seu primeiro lançamento para gerenciar suas campanhas
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={createComponent}
                    className="btn-primary"
                  >
                    <KTIcon iconName="plus" className="fs-2 me-2" />
                    Criar Primeiro Lançamento
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}

          {launch.myLaunchs.map((launchItem: Launch, index: number) => (
            <Col 
              key={launchItem.id} 
              className={`col-lg-4 col-md-6 col-12 mb-4 reorder-item ${dragOverIndex === index ? 'drag-over' : ''} ${draggedItem?.id === launchItem.id ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, launchItem)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Card className="h-100 border-0 shadow-sm hover-shadow-lg transition-all">
                <Card.Body className="p-6">
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="flex-grow-1">
                      <Link
                        to={"/launch/" + launchItem.id}
                        className="text-decoration-none"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h4 className="text-dark fw-bold fs-5 mb-1 hover-primary">
                          {launchItem.name}
                        </h4>
                      </Link>
                      <p className="text-muted fs-7 mb-2">
                        {launchItem.description?.length! > 80
                          ? launchItem.description?.substring(0, 80) + "..."
                          : launchItem.description || "Sem descrição"}
                      </p>
                      {/* <div className="d-flex align-items-center gap-2">
                        <Badge bg={getStatusColor(launchItem)} className="fs-8">
                          {getStatusText(launchItem)}
                        </Badge>
                        <span className="text-muted fs-8">•</span>
                        <span className="text-muted fs-8">{launchItem.type}</span>
                      </div> */}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="symbol symbol-40px">
                        <div className="symbol-label bg-light-primary">
                          <KTIcon iconName="rocket" className="fs-2 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="row g-3 mb-4">
                    <Col xs={3}>
                      <div className="bg-light-primary rounded p-3 text-center">
                        <div className="fs-6 fw-bold text-primary mb-1">
                          {formatNumber(launchItem.leadsCount || 0)}
                        </div>
                        <div className="fs-8 text-muted">Leads</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="bg-light-primary rounded p-3 text-center">
                        <div className="fs-6 fw-bold text-primary mb-1">
                          {formatNumber(launchItem.cartCount || 0)}
                        </div>
                        <div className="fs-8 text-muted">Vendas</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="bg-light-success rounded p-3 text-center">
                        <div className="fs-6 fw-bold text-success mb-1">
                          {getConversionRate(launchItem)}%
                        </div>
                        <div className="fs-8 text-muted">Conversão</div>
                      </div>
                    </Col>
                    <Col xs={3}>
                      <div className="bg-light-success rounded p-3 text-center">
                        <div className="fs-6 fw-bold text-success mb-1">
                          {formatCurrency(launchItem.price || 0)}
                        </div>
                        <div className="fs-8 text-muted">Ticket</div>
                      </div>
                    </Col>
                  </div>

                  {/* Revenue */}
                  <div className="bg-light-dark rounded p-3 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fs-7 text-muted">Receita Total</span>
                      <span className="fs-5 fw-bold text-dark">
                        {formatCurrency(getRevenue(launchItem))}
                      </span>
                    </div>
                  </div>

                  {/* Offers */}
                  {/* {launchItem.launchhasoffers && launchItem.launchhasoffers.length > 0 && (
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fs-7 fw-semibold text-dark">Ofertas ({launchItem.launchhasoffers.length})</span>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={(e) => handleButtonClick(e, () => openHasLaunchs(launchItem))}
                          className="btn-sm"
                        >
                          <KTIcon iconName="gear" className="fs-6 me-1" />
                          Gerenciar
                        </Button>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        {launchItem.launchhasoffers.slice(0, 3).map((hasoffer, idx) => (
                          <div key={hasoffer.id} className="d-flex align-items-center bg-light rounded p-2">
                            {hasoffer.offer?.image && (
                              <img
                                className="rounded me-2"
                                width={24}
                                height={24}
                                src={
                                  hasoffer.offer?.image.includes("https://")
                                    ? hasoffer.offer?.image
                                    : "https://app.insiderhof.com.br/files/" + hasoffer.offer?.image
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                                }}
                                alt={hasoffer.offer?.name}
                              />
                            )}
                            <span className="fs-8 text-dark fw-semibold">
                              {hasoffer.offer?.name}
                            </span>
                          </div>
                        ))}
                        {launchItem.launchhasoffers.length > 3 && (
                          <div className="bg-light rounded p-2">
                            <span className="fs-8 text-muted">
                              +{launchItem.launchhasoffers.length - 3} mais
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )} */}

                  {/* Actions */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={(e) => handleButtonClick(e, () => updateComponent(launchItem))}
                        className="btn-sm"
                      >
                        <KTIcon iconName="pencil" className="fs-6 me-1" />
                        Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={(e) => handleButtonClick(e, () => {
                          if (window.confirm("Deseja realmente excluir: " + launchItem.name + "?")) {
                            deleteComponent(launchItem);
                          }
                        })}
                        className="btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-6 me-1" />
                        Excluir
                      </Button>
                    </div>
                    <div 
                      className="drag-handle d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '32px', 
                        height: '32px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        transition: 'all 0.2s ease',
                        cursor: 'grab'
                      }}
                      title="Arrastar para reordenar"
                    >
                      <KTIcon iconName="arrow-up-down" className="fs-5 text-muted" />
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </div>
      </div>
    </>
  );
};

export { ManageLaunchWidget };
