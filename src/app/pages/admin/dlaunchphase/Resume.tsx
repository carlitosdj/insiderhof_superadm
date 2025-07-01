import React, { useState } from "react";
import { Card, Row, Col, Badge, ProgressBar, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";
import Manage from "../dlaunchhasoffers/Manage";

// Estilos CSS customizados inspirados no Resume copy.tsx
const resumeStyles = `
  .resume-container {
    padding: 2rem;
    /*background: #f8f9fa;*/
    min-height: 100vh;
  }
  
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
    height: 100%;
    display: flex;
    flex-direction: column;
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
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .section-body {
    padding: 1.5rem;
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
  
  .metric-card {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1.5rem;
    height: 100%;
    transition: transform 0.2s ease;
  }
  
  .metric-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .metric-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .metric-number {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .metric-label {
    color: #7f8c8d;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  .progress-container {
    margin-top: 1rem;
  }
  
  .progress-bar {
    height: 6px;
    border-radius: 3px;
    background: #e1e5e9;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.3s ease;
  }
  
  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .financial-summary {
    background: linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%);
    border-radius: 8px;
    padding: 1.5rem;
    color: #2c3e50;
  }
  
  .financial-item {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    margin-bottom: 1rem;
  }
  
  .financial-item:last-child {
    margin-bottom: 0;
  }
  
  .financial-label {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .financial-value {
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .info-item .alert {
    flex: 1;
    min-width: 0;
  }
  
  .info-item .info-label {
    flex: 1;
    min-width: 0;
  }
  
  .info-item .info-value {
    flex-shrink: 0;
  }
  
  .action-buttons {
    background: white;
    border: none;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    transition: transform 0.2s ease;
  }
  
  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  .btn-secondary {
    background: #95a5a6;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    transition: transform 0.2s ease;
  }
  
  .btn-secondary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(149, 165, 166, 0.3);
  }
`;

const Resume = ({ onEdit }: { onEdit?: () => void }) => {
  const { launchId } = useParams();
  
  // Get launch data from Redux state
  const launch = useSelector((state: ApplicationState) => 
    state.launch.myLaunchs.find(l => l.id === Number(launchId))
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getStatusColor = (launch: any) => {
    if (launch.status === '1') return 'success';
    if (launch.status === '0') return 'danger';
    return 'secondary';
  };

  const getStatusText = (launch: any) => {
    if (launch.status === '1') return 'Ativo';
    if (launch.status === '0') return 'Inativo';
    return 'Pendente';
  };

  const getConversionRate = (launch: any) => {
    if (launch.leadsCount && launch.cartCount) {
      return ((launch.cartCount / launch.leadsCount) * 100).toFixed(1);
    }
    return '0';
  };

  const getRevenue = (launch: any) => {
    return (launch.cartCount || 0) * (launch.price || 0);
  };

  // Extract price values for comparison
  // const oldPrice = launch?.oldPrice || 0;
  const price = launch?.price || 0;

  const [showOffersModal, setShowOffersModal] = useState(false);
  const handleOpenOffersModal = () => setShowOffersModal(true);
  const handleCloseOffersModal = () => setShowOffersModal(false);

  if (!launch) {
    return (
      <div className="resume-container">
        <div className="text-center py-8">
          <div className="symbol symbol-100px mx-auto mb-6">
            <div className="symbol-label bg-light-danger">
              <KTIcon iconName="exclamation-triangle" className="fs-2x text-danger" />
            </div>
          </div>
          <h3 className="text-dark fw-bold mb-2">Lançamento não encontrado</h3>
          <p className="text-muted fs-6">
            O lançamento selecionado não foi encontrado no sistema.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{resumeStyles}</style>
      
      <div className="resume-container">
        {/* Header */}
        <div className="resume-header">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>{launch.name} - Resumo</h2>
              <div className="subtitle">
                Visão geral e métricas do lançamento • {launch.type || 'N/A'}
              </div>
            </div>
            <Badge bg={getStatusColor(launch)} className="status-badge">
              {getStatusText(launch)}
            </Badge>
          </div>
        </div>

        {/* Estatísticas Principais */}
        <div className="stats-grid">
          <div className="stat-box bg-light-primary">
            <div className="stat-number">{formatNumber(launch.leadsCount || 0)}</div>
            <div className="stat-label">Leads Capturados</div>
          </div>
          <div className="stat-box bg-light-primary">
            <div className="stat-number">{formatNumber(launch.cartCount || 0)}</div>
            <div className="stat-label">Vendas Realizadas</div>
          </div>
          <div className="stat-box bg-light-primary">
            <div className="stat-number">{getConversionRate(launch)}%</div>
            <div className="stat-label">Taxa de Conversão</div>
          </div>
          <div className="stat-box bg-light-primary">
            <div className="stat-number">{formatCurrency(launch.price || 0)}</div>
            <div className="stat-label">Ticket Médio</div>
          </div>
          <div className="stat-box bg-light-primary">
            <div className="stat-number">{formatCurrency(getRevenue(launch))}</div>
            <div className="stat-label">Receita Total</div>
          </div>
        </div>

        {/* Main Content */}
        <Row className="g-4 align-items-stretch">
          {/* Informações do Lançamento */}
          <Col lg={6} className="h-100">
            <div className="content-section h-100">
              <div className="section-header">
                <h5>
                  <KTIcon iconName="information" className="fs-5" />
                  Informações do Lançamento
                </h5>
              </div>
              <div className="section-body">
                <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="info-item">
                    <span className="info-label">Nome</span>
                    <span className="info-value">{launch.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Tipo</span>
                    <span className="info-value">{launch.type || 'Não informado'}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status</span>
                    <span className="info-value">
                      <Badge bg={getStatusColor(launch)} className="fs-7">
                        {getStatusText(launch)}
                      </Badge>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Parcelas</span>
                    <span className="info-value">{launch.installments || 'Não informado'}</span>
                  </div>
                  {launch.launchhasoffers && launch.launchhasoffers.length > 0 ? (
                    <div className="info-item">
                      
                      <span className="info-label">
                        <div className="d-flex align-items-center gap-2">
                          {launch.launchhasoffers[0].offer?.image && (
                            <img
                              className="rounded"
                              width={24}
                              height={24}
                              src={
                                launch.launchhasoffers[0].offer?.image.includes("https://")
                                  ? launch.launchhasoffers[0].offer?.image
                                  : "https://app.insiderhof.com.br/files/" + launch.launchhasoffers[0].offer?.image
                              }
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                              }}
                              alt={launch.launchhasoffers[0].offer?.name}
                            />
                          )}
                          <span className="fs-7 fw-semibold text-dark">
                            {launch.launchhasoffers[0].offer?.name || 'Oferta não encontrada'}
                          </span>
                          
                        </div>
                      </span>
                      <span className="info-value">
                        <Button variant="outline-primary" size="sm" onClick={handleOpenOffersModal} className="btn-sm">
                          <KTIcon iconName="gear" className="fs-6 me-1" />
                          Gerenciar
                        </Button>
                      </span>
                    </div>
                  ) : (
                    <div className="info-item">
                      {/* <span className="info-label">Oferta Selecionada</span> */}
                      <span className="info-label">
                        <div className="alert alert-danger py-2 px-3 mb-0 w-100 text-center">
                          <KTIcon iconName="cross" className="fs-4 me-1" />
                          Nenhuma oferta selecionada
                        </div>
                      </span>
                      <span className="info-value m-1">
                        <Button variant="outline-primary" size="sm" onClick={handleOpenOffersModal} className="btn-sm">
                          <KTIcon iconName="gear" className="fs-6 me-1" />
                          Gerenciar
                        </Button>
                      </span>
                    </div>
                  )}
                  <div className="info-item">
                    <span className="info-label">Preço dos Produtos da Oferta</span>
                    <span className="info-value text-muted" style={{ textDecoration: 'line-through' }}>
                      {launch.launchhasoffers && launch.launchhasoffers.length > 0 &&
                        launch.launchhasoffers[0].offer?.dOfferHasProducts &&
                        launch.launchhasoffers[0].offer.dOfferHasProducts.length > 0
                        ? formatCurrency(
                            launch.launchhasoffers[0].offer.dOfferHasProducts.reduce(
                              (total: number, offerProduct: any) => total + (offerProduct.product?.price || 0),
                              0
                            )
                          )
                        : formatCurrency(0)
                      }
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Preço Atual</span>
                    <span className="info-value text-success">{formatCurrency(launch.price || 0)}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="info-label">Leads Capturados</span>
                    <span className="info-value">{formatNumber(launch.leadsCount || 0)}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendas Realizadas</span>
                    <span className="info-value">{formatNumber(launch.cartCount || 0)}</span>
                  </div>
                </div>
                
                {launch.description && (
                  <div className="mt-4 p-3 bg-light-primary bg-opacity-10 rounded">
                    <div className="d-flex align-items-start">
                      <KTIcon iconName="document" className="fs-2 text-primary me-3 mt-1" />
                      <div>
                        <div className="fw-bold text-dark mb-2">Descrição</div>
                        <div className="text-dark">{launch.description}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
          {/* Configurações de Renovação */}
          {(launch.renovationTime || launch.renovationPrice || launch.renovationDescription) && (
            <Col lg={6} className="h-100">
              <div className="content-section h-100">
                <div className="section-header">
                  <h5>
                    <KTIcon iconName="refresh" className="fs-5" />
                    Configurações de Renovação
                  </h5>
                </div>
                <div className="section-body">
                  <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {launch.renovationTime && (
                      <div className="info-item">
                        <span className="info-label">Tempo de Renovação (dias)</span>
                        <span className="info-value">{launch.renovationTime}</span>
                      </div>
                    )}
                    {launch.renovationPrice && (
                      <div className="info-item">
                        <span className="info-label">Preço de Renovação</span>
                        <span className="info-value">{formatCurrency(launch.renovationPrice)}</span>
                      </div>
                    )}
                    {launch.antecipateRenovationPrice && (
                      <div className="info-item">
                        <span className="info-label">Renovação Antecipada</span>
                        <span className="info-value">{formatCurrency(launch.antecipateRenovationPrice)}</span>
                      </div>
                    )}
                    {launch.renovationInstallments && (
                      <div className="info-item">
                        <span className="info-label">Parcelas de Renovação</span>
                        <span className="info-value">{launch.renovationInstallments}</span>
                      </div>
                    )}

                  </div>
                  
                  {launch.renovationDescription && (
                    <div className="mt-4 p-3 bg-light-warning bg-opacity-10 rounded">
                      <div className="d-flex align-items-start">
                        <KTIcon iconName="document" className="fs-2 text-primary me-3 mt-1" />
                        <div>
                          <div className="fw-bold text-dark mb-2">Descrição da Renovação</div>
                          <div className="text-dark">{launch.renovationDescription}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="content-section">
              <div className="section-header">
                <h5>
                  <KTIcon iconName="link" className="fs-5" />
                  LINKS IMPORTANTES
                </h5>
              </div>
              <div className="section-body">
                <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {/* Link da Captação */}
                  {(() => {
                    const captacaoPhase = useSelector((state: ApplicationState) => 
                      state.launchphase.myLaunchPhases.find(
                        (phase: any) => phase.launchId === Number(launchId) && phase.name === "Captação"
                      )
                    );
                    
                    return captacaoPhase ? (
                      <div className="info-item">
                        <span className="info-label">
                          <div className="d-flex align-items-center gap-2">
                            <KTIcon iconName="user-plus" className="fs-4 text-primary" />
                            <span className="fw-semibold">Página de Captação</span>
                          </div>
                        </span>
                        <span className="info-value">
                          <a
                            href={`https://insiderhof.com.br/subscribe/${captacaoPhase.slug || captacaoPhase.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            {/* <KTIcon iconName="external-link" className="fs-6 me-1" /> */}
                            {`https://insiderhof.com.br/subscribe/${captacaoPhase.slug || captacaoPhase.id}`}
                          </a>
                        </span>
                      </div>
                    ) : null;
                  })()}
                  
                  {/* Link das Vendas */}
                  {(() => {
                    const vendasPhase = useSelector((state: ApplicationState) => 
                      state.launchphase.myLaunchPhases.find(
                        (phase: any) => phase.launchId === Number(launchId) && phase.name === "Vendas"
                      )
                    );
                    
                    return vendasPhase ? (
                      <div className="info-item">
                        <span className="info-label">
                          <div className="d-flex align-items-center gap-2">
                            <KTIcon iconName="shopping-cart" className="fs-4 text-success" />
                            <span className="fw-semibold">Página de Vendas</span>
                          </div>
                        </span>
                        <span className="info-value">
                          <a
                            href={`https://insiderhof.com.br/join/${vendasPhase.slug || vendasPhase.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                          >
                            {/* <KTIcon iconName="external-link" className="fs-6 me-1" /> */}
                            {`https://insiderhof.com.br/join/${vendasPhase.slug || vendasPhase.id}`}
                          </a>
                        </span>
                      </div>
                    ) : null;
                  })()}
                  
                  {/* Mensagem se não houver fases */}
                  {(() => {
                    const captacaoPhase = useSelector((state: ApplicationState) => 
                      state.launchphase.myLaunchPhases.find(
                        (phase: any) => phase.launchId === Number(launchId) && phase.name === "Captação"
                      )
                    );
                    const vendasPhase = useSelector((state: ApplicationState) => 
                      state.launchphase.myLaunchPhases.find(
                        (phase: any) => phase.launchId === Number(launchId) && phase.name === "Vendas"
                      )
                    );
                    
                    if (!captacaoPhase && !vendasPhase) {
                      return (
                        <div className="info-item">
                          <span className="info-label">
                            <div className="alert alert-info py-2 px-3 mb-0 w-100 text-center">
                              <KTIcon iconName="information" className="fs-4 me-1" />
                              Nenhuma fase de Captação ou Vendas encontrada
                            </div>
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </div>
            </Col>
          )}
        </Row>


        {/* Action Buttons */}
        {onEdit && (
          <div className="action-buttons">
            <Button variant="primary" size="lg" onClick={onEdit}>
              <KTIcon iconName="pencil" className="fs-5 me-2" />
              Editar Configurações
            </Button>
          </div>
        )}
      </div>

      <Modal show={showOffersModal} onHide={handleCloseOffersModal} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Gerenciar Ofertas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Manage handleClose={handleCloseOffersModal} child={launch} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Resume; 