import React, { useEffect, useState } from "react";
import { Card, Row, Col, Badge, Button, Modal } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import { useDispatch } from "react-redux";
import Update from "./update";
import { LaunchPhases } from "../../../../store/ducks/dlaunchphase/types";
import { Link, useParams } from "react-router-dom";
import { loadLaunchRequest } from "../../../../store/ducks/dlaunch/actions";

// Estilos CSS customizados - Novo formato
const resumeStyles = `
  .resume-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }
  
  .resume-header h2 {
    margin: 0;
    font-weight: 700;
  }
  
  .resume-header .subtitle {
    opacity: 0.9;
    margin-top: 0.5rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .stat-box {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1.5rem;
    text-align: center;
    transition: transform 0.2s ease;
  }
  
  .stat-box:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #7f8c8d;
    font-size: 0.9rem;
    font-weight: 500;
  }
  
  .content-section {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    margin-bottom: 1.5rem;
  }
  
  .section-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e1e5e9;
    background: #f8f9fa;
    border-radius: 8px 8px 0 0;
  }
  
  .section-header h5 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
  }
  
  .section-body {
    padding: 1.5rem;
  }
  
  .phase-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .phase-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 4px solid #3498db;
  }
  
  .phase-item.completed {
    border-left-color: #27ae60;
  }
  
  .phase-item.active {
    border-left-color: #f39c12;
  }
  
  .phase-item.pending {
    border-left-color: #95a5a6;
  }
  
  .phase-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .phase-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3498db;
    color: white;
    font-weight: 600;
  }
  
  .phase-item.completed .phase-icon {
    background: #27ae60;
  }
  
  .phase-item.active .phase-icon {
    background: #f39c12;
  }
  
  .phase-item.pending .phase-icon {
    background: #95a5a6;
  }
  
  .phase-details h6 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
  }
  
  .phase-details p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.85rem;
  }
  
  .phase-progress {
    text-align: right;
  }
  
  .progress-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: conic-gradient(#3498db 0deg, #3498db calc(var(--progress) * 3.6deg), #e1e5e9 calc(var(--progress) * 3.6deg), #e1e5e9 360deg);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  .progress-text {
    font-weight: 700;
    color: #2c3e50;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f3f4;
  }
  
  .info-item:last-child {
    border-bottom: none;
  }
  
  .info-label {
    color: #7f8c8d;
    font-weight: 500;
  }
  
  .info-value {
    color: #2c3e50;
    font-weight: 600;
  }
  
  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

type Props = {
  className?: string;
};

const Resume: React.FC<React.PropsWithChildren<Props>> = ({ className }) => {
  // Redux states
  const launch = useSelector((state: ApplicationState) => state.launch);
  const launchphases = useSelector((state: ApplicationState) => state.launchphase);
  const launchphaseextras = useSelector((state: ApplicationState) => state.launchphaseextra);
  const launchhasoffers = useSelector((state: ApplicationState) => state.launchhasoffers);
  const dispatch = useDispatch();
  console.log("launchxxxxxxxxxxx", launch);
  //Load launch:

  const launchId = useParams().launchId;
  useEffect(() => {
    dispatch(loadLaunchRequest(Number(launchId)));
  }, []);

  // Modal state
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [selectedPhase, setSelectedPhase] = useState<LaunchPhases>({});

  const handleClose = () => {
    setShow(false);
  };

  const updateComponent = (phase: LaunchPhases) => {
    setAction("updateComponent");
    setShow(true);
    setSelectedPhase(phase);
  };

  // useEffect(() => {
  //   console.log(carts);
  //   //dispatch(loadMyCartsRequest());
  // }, [carts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const formatDate = (date: string | Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  // Dados mockados para demonstração
  const launchMetrics = {
    totalLeads: launch.launch.leadsCount || 0,
    totalSales: launch.launch.cartCount || 0,
    ticket: launch.launch.price || 0,
    emailsSent: 3240,
    conversionRate: launch.launch.leadsCount && launch.launch.cartCount ? 
      ((launch.launch.cartCount / launch.launch.leadsCount) * 100).toFixed(1) : 0,
    revenue: (launch.launch.cartCount || 0) * (launch.launch.price || 0),
    costPerLead: 12.50,
    roi: 3.2,
    totalPhases: launchphases.myLaunchPhases.length,
    totalOffers: launchhasoffers.data.length,
    totalExtras: launchphaseextras.myLaunchPhaseExtras.length,
  };

  const getPhaseStatus = (phase: any) => {
    if (phase.name === "Captação") return "completed";
    if (phase.name === "Evento") return "active";
    if (phase.name === "Vendas") return "pending";
    return "pending";
  };

  const getPhaseProgress = (phase: any) => {
    switch (phase.name) {
      case "Captação": return 100;
      case "Evento": return 75;
      case "Vendas": return 30;
      default: return 0;
    }
  };

  const getLaunchStatus = () => {
    const totalPhases = launchphases.myLaunchPhases.length;
    const completedPhases = launchphases.myLaunchPhases.filter(p => getPhaseStatus(p) === "completed").length;
    
    if (completedPhases === totalPhases) return { status: "success", text: "Completo" };
    if (completedPhases > 0) return { status: "warning", text: "Em Andamento" };
    return { status: "secondary", text: "Pendente" };
  };

  const launchStatus = getLaunchStatus();

  if (!launch.launch) {
    return (
      <div className="text-center py-8">
        <KTIcon iconName="exclamation-triangle" className="fs-4x text-muted mb-4" />
        <h4 className="text-muted mb-2">Lançamento não encontrado</h4>
        <p className="text-muted fs-6 mb-4">
          O lançamento selecionado não foi encontrado.
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{resumeStyles}</style>
      
      <div className={`resume-container ${className || ""}`}>
        {/* Header */}
        <div className="resume-header">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>{launch.launch?.name || "Lançamento"}</h2>
              <div className="subtitle">
                Criado em {launch.launch?.createdAt ? 
                  formatDate(launch.launch?.createdAt) : 
                  "N/A"
                } • {launch.launch?.type || "N/A"}
              </div>
            </div>
            <Badge bg={launchStatus.status} className="status-badge">
              {launchStatus.text}
            </Badge>
          </div>
        </div>

        {/* Estatísticas Principais */}
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-number">{formatNumber(launchMetrics.totalLeads)}</div>
            <div className="stat-label">Leads Capturados</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{formatNumber(launchMetrics.totalSales)}</div>
            <div className="stat-label">Vendas Realizadas</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{launchMetrics.conversionRate}%</div>
            <div className="stat-label">Taxa de Conversão</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{formatCurrency(launchMetrics.ticket)}</div>
            <div className="stat-label">Ticket</div>
          </div>

          <div className="stat-box">
            <div className="stat-number">{formatCurrency(launchMetrics.revenue)}</div>
            <div className="stat-label">Receita Total</div>
          </div>
        </div>

        {/* Fases do Lançamento */}
        <div className="content-section">
          <div className="section-header">
            <h5>Fases do Lançamento</h5>
          </div>
          <div className="section-body">
            <div className="phase-list">
              {launchphases.myLaunchPhases.map((phase, index) => {
                const status = getPhaseStatus(phase);
                const progress = getPhaseProgress(phase);
                
                return (
                  <div key={phase.id} className={`phase-item ${status}`}>
                    <div className="phase-info">
                      <div className="phase-icon">
                        {index + 1}
                      </div>
                      <div className="phase-details">
                        <h6><Link to={`/launch/${phase.launchId}/${phase.id}`}>{phase.name}</Link></h6>
                        <p>
                          {phase.description?.length! > 60
                            ? phase.description?.substring(0, 60) + "..."
                            : phase.description || "Sem descrição"}
                        </p>
                        <p>
                          SLUG: {phase.slug}
                        </p>
                      </div>
                    </div>
                    <div className="phase-progress d-flex align-items-center gap-3">
                      <div 
                        className="progress-circle" 
                        style={{ '--progress': progress } as React.CSSProperties}
                      >
                        <span className="progress-text">{progress}%</span>
                      </div>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => updateComponent(phase)}
                        className="btn-icon"
                      >
                        <KTIcon className="fs-6" iconName="pencil" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Informações de Leads e Vendas */}
        <Row>
          <Col md={6}>
            <div className="content-section">
              <div className="section-header">
                <h5>Leads e Vendas</h5>
              </div>
              <div className="section-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Leads Capturados</span>
                    <span className="info-value">{formatNumber(launch.launch.leadsCount || 0)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendas Realizadas</span>
                    <span className="info-value">{formatNumber(launch.launch.cartCount || 0)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Taxa de Conversão</span>
                    <span className="info-value">
                      {launch.launch.leadsCount && launch.launch.cartCount ? 
                        ((launch.launch.cartCount / launch.launch.leadsCount) * 100).toFixed(1) + '%' : 
                        '0%'
                      }
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Receita Total</span>
                    <span className="info-value">
                      {formatCurrency((launch.launch.cartCount || 0) * (launch.launch.price || 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="content-section">
              <div className="section-header">
                <h5>Fase de Captação</h5>
              </div>
              <div className="section-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Slug da Fase</span>
                    <span className="info-value">
                      {launchphases.myLaunchPhases.find(p => p.name === 'Captação')?.slug || 'N/A'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status da Fase</span>
                    <span className="info-value">
                      {getPhaseStatus(launchphases.myLaunchPhases.find(p => p.name === 'Captação') || {}) === 'completed' ? 'Completa' : 'Pendente'}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Progresso</span>
                    <span className="info-value">
                      {getPhaseProgress(launchphases.myLaunchPhases.find(p => p.name === 'Captação') || {})}%
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Preço do Produto</span>
                    <span className="info-value">
                      {launch.launch?.price ? formatCurrency(launch.launch.price) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Informações Detalhadas */}
        <Row>
          <Col md={6}>
            <div className="content-section">
              <div className="section-header">
                <h5>Configurações</h5>
              </div>
              <div className="section-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Ofertas Configuradas</span>
                    <span className="info-value">{launchMetrics.totalOffers}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Itens Extras</span>
                    <span className="info-value">{launchMetrics.totalExtras}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">E-mails Enviados</span>
                    <span className="info-value">{formatNumber(launchMetrics.emailsSent)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Fases Ativas</span>
                    <span className="info-value">{launchMetrics.totalPhases}</span>
                  </div>
                 
                </div>
              </div>
            </div>
          </Col>
          
          <Col md={6}>
            <div className="content-section">
              <div className="section-header">
                <h5>Performance</h5>
              </div>
              <div className="section-body">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Custo por Lead</span>
                    <span className="info-value">{formatCurrency(launchMetrics.costPerLead)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">ROI</span>
                    <span className="info-value">{launchMetrics.roi}x</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Preço do Produto</span>
                    <span className="info-value">
                      {launch.launch?.price ? 
                        formatCurrency(launch.launch.price!) : 
                        "N/A"
                      }
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status Geral</span>
                    <span className="info-value">{launchStatus.text}</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* Modal for editing phases */}
      <Modal
        id="kt_modal_edit_phase"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={show}
        onHide={handleClose}
        backdrop={true}
      >
        <div className="modal-header">
          <h2>
            {action === "updateComponent" ? "Editar Fase" : ""}
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
            <Update handleClose={handleClose} child={selectedPhase} />
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
};

export { Resume };
