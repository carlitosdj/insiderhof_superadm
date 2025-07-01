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
`;

const Resume = () => {
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
              <h2>{launch.name}</h2>
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
        <Row className="g-4">
          {/* Informações do Lançamento */}
          <Col lg={12}>
            <div className="content-section">
              <div className="section-header">
                <h5>
                  <KTIcon iconName="information" className="fs-5" />
                  Informações do Lançamento
                </h5>
              </div>
              <div className="section-body">
                <div className="info-grid">
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
        </Row>

        {/* Configurações de Renovação */}
        {(launch.renovationTime || launch.renovationPrice || launch.renovationDescription) && (
          <div className="content-section">
            <div className="section-header">
              <h5>
                <KTIcon iconName="refresh" className="fs-5" />
                Configurações de Renovação
              </h5>
            </div>
            <div className="section-body">
              <Row className="g-4">
                {launch.renovationTime && (
                  <Col lg={3} md={6}>
                    <div className="metric-card">
                      <div className="metric-icon bg-warning">
                        <KTIcon iconName="clock" className="fs-2 text-white" />
                      </div>
                      <div className="metric-number text-warning">{launch.renovationTime}</div>
                      <div className="metric-label">Tempo de Renovação (dias)</div>
                    </div>
                  </Col>
                )}
                {launch.renovationPrice && (
                  <Col lg={3} md={6}>
                    <div className="metric-card">
                      <div className="metric-icon bg-success">
                        <KTIcon iconName="dollar" className="fs-2 text-white" />
                      </div>
                      <div className="metric-number text-success">{formatCurrency(launch.renovationPrice)}</div>
                      <div className="metric-label">Preço de Renovação</div>
                    </div>
                  </Col>
                )}
                {launch.antecipateRenovationPrice && (
                  <Col lg={3} md={6}>
                    <div className="metric-card">
                      <div className="metric-icon bg-info">
                        <KTIcon iconName="star" className="fs-2 text-white" />
                      </div>
                      <div className="metric-number text-info">{formatCurrency(launch.antecipateRenovationPrice)}</div>
                      <div className="metric-label">Renovação Antecipada</div>
                    </div>
                  </Col>
                )}
                {launch.renovationInstallments && (
                  <Col lg={3} md={6}>
                    <div className="metric-card">
                      <div className="metric-icon bg-primary">
                        <KTIcon iconName="credit-card" className="fs-2 text-white" />
                      </div>
                      <div className="metric-number text-primary">{launch.renovationInstallments}</div>
                      <div className="metric-label">Parcelas de Renovação</div>
                    </div>
                  </Col>
                )}
                {launch.renovationDescription && (
                  <Col lg={12}>
                    <div className="p-4 bg-light-dark bg-opacity-10 rounded">
                      <div className="d-flex align-items-start">
                        <KTIcon iconName="document" className="fs-2 text-dark me-3 mt-1" />
                        <div>
                          <div className="fw-bold text-dark mb-2">Descrição da Renovação</div>
                          <div className="text-dark">{launch.renovationDescription}</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        )}

        {/* Seção de Ofertas Associadas */}
        {launch.launchhasoffers && launch.launchhasoffers.length > 0 && (
          <div className="content-section">
            <div className="section-header d-flex justify-content-between align-items-center">
              <h5>
                <KTIcon iconName="gift" className="fs-5" />
                Ofertas Associadas ({launch.launchhasoffers.length})
              </h5>
              <Button variant="outline-primary" size="sm" onClick={handleOpenOffersModal} className="btn-sm">
                <KTIcon iconName="gear" className="fs-6 me-1" />
                Gerenciar
              </Button>
            </div>
            <div className="section-body">
              <div className="d-flex flex-wrap gap-2">
                {launch.launchhasoffers.slice(0, 6).map((hasoffer) => (
                  <div key={hasoffer.id} className="d-flex align-items-center bg-light rounded p-3 border">
                    {hasoffer.offer?.image && (
                      <img
                        className="rounded me-3"
                        width={32}
                        height={32}
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
                    <div>
                      <div className="fs-7 fw-semibold text-dark mb-1">
                        {hasoffer.offer?.name}
                      </div>
                      <div className="fs-8 text-muted">Oferta vinculada</div>
                    </div>
                  </div>
                ))}
                {launch.launchhasoffers.length > 6 && (
                  <div className="bg-light rounded p-3 border">
                    <div className="text-center">
                      <div className="fs-6 fw-bold text-muted mb-1">
                        +{launch.launchhasoffers.length - 6}
                      </div>
                      <div className="fs-8 text-muted">mais ofertas</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
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