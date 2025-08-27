import React, { useState } from "react";
import { Card, Row, Col, Button, Modal, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";
import SurveyManagement from "./SurveyManagement";
import SurveyStatistics from "./SurveyStatistics";
import { LaunchHeaderCard } from "./LaunchHeaderCard";

// Estilos CSS customizados para a página de Lead Scoring
const leadScoreStyles = `
  .lead-score-container {
    padding: 1.5rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
  }
  
  
  @media (max-width: 768px) {
    .lead-score-container {
      padding: 1rem;
    }
  }
  
  .lead-score-header {
    background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  
  .lead-score-header::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
  
  .lead-score-header h2 {
    margin: 0;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }
  
  .lead-score-header .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-top: 0.5rem;
    position: relative;
    z-index: 2;
  }
  
  .score-card {
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
  
  .score-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
  
  .survey-card {
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0,0,0,0.06);
  }
  
  .survey-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }
`;

interface LeadScoreProps {
  launch?: any;
  onEdit?: () => void;
}

export const LeadScore: React.FC<LeadScoreProps> = ({ launch, onEdit }) => {
  const { launchId } = useParams();
  const navigate = useNavigate();
  const [showSurveyModal, setShowSurveyModal] = useState(false);

  const handleOpenSurveyModal = () => setShowSurveyModal(true);
  const handleCloseSurveyModal = () => setShowSurveyModal(false);

  // Buscar a fase de captação
  const captacaoPhase = useSelector((state: ApplicationState) => 
    state.launchphase.myLaunchPhases.find(
      (phase: any) => phase.launchId === Number(launchId) && 
      (phase.name?.toLowerCase().includes('captação') || phase.name?.toLowerCase().includes('captacao'))
    )
  );

  return (
    <>
      <style>{leadScoreStyles}</style>
      <div className="lead-score-container">
        {/* Launch Info Header */}
        {launch && <LaunchHeaderCard />}
        
        {/* Survey Management Section */}
            {captacaoPhase && (
          <Row className="mb-4">
            <Col lg={12}>
              <Card className="survey-card shadow-sm">
                <Card.Header className="bg-light-info d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <KTIcon iconName="questionnaire-tablet" className="fs-2 text-info me-3" />
                    <div>
                      <h5 className="mb-1 text-dark">Sistema de Pesquisas e Lead Scoring</h5>
                      <p className="text-muted mb-0">
                        Gerencie as pesquisas da fase de captação para calcular o score dos leads
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleOpenSurveyModal}
                    className="d-flex align-items-center ms-auto"
                  >
                    <KTIcon iconName="setting" className="fs-6 me-1" />
                    Gerenciar Pesquisas
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="symbol symbol-40px me-3">
                          <div className="symbol-label bg-light-primary">
                            <KTIcon iconName="user-plus" className="fs-6 text-primary" />
                          </div>
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Fase de Captação</div>
                          <div className="text-muted fs-7">{captacaoPhase.name}</div>
                        </div>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="d-flex align-items-center mb-3">
                        <div className="symbol symbol-40px me-3">
                          <div className="symbol-label bg-light-success">
                            <KTIcon iconName="chart-line-up" className="fs-6 text-success" />
                          </div>
                        </div>
                        <div>
                          <div className="fw-semibold text-dark">Lead Scoring</div>
                          <div className="text-muted fs-7">Sistema ativo para qualificação</div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Alert variant="info" className="d-flex align-items-center mb-0">
                    <KTIcon iconName="information-2" className="fs-3 me-3" />
                    <div>
                      <strong>Como funciona:</strong> As pesquisas criadas aqui serão exibidas na página de captação. 
                      Com base nas respostas dos leads, o sistema calculará automaticamente um score de interesse, 
                      permitindo priorizar os contatos mais qualificados.
                    </div>
                  </Alert>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Survey Statistics Section */}
        {captacaoPhase && (
          <Row className="mb-4">
            <Col lg={12}>
              <Card className="score-card shadow-sm">
                <Card.Header className="bg-light-success">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <KTIcon iconName="chart-line-up" className="fs-2 text-success me-3" />
                      <div>
                        <h5 className="mb-1 text-dark">Estatísticas das Pesquisas</h5>
                        <p className="text-muted mb-0">
                          Análise das respostas dos leads e distribuição de scores
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <SurveyStatistics phaseId={captacaoPhase.id!} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* No Captacao Phase Message */}
        {!captacaoPhase && (
          <Row className="mb-4">
            <Col lg={12}>
              <Card className="survey-card shadow-sm">
                <Card.Body className="text-center py-5">
                  <KTIcon iconName="information-2" className="fs-1 text-warning mb-3" />
                  <h4 className="text-dark mb-3">Fase de Captação Não Encontrada</h4>
                  <p className="text-muted mb-4">
                    Para utilizar o sistema de Lead Scoring, é necessário ter uma fase com nome contendo "Captação" em seu lançamento.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/admin/launch/${launchId}/phases`)}
                    className="d-flex align-items-center mx-auto"
                  >
                    <KTIcon iconName="plus" className="fs-6 me-2" />
                    Gerenciar Fases
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Action Buttons */}
        {onEdit && (
          <div className="d-flex justify-content-end">
            <Button variant="primary" size="lg" onClick={onEdit}>
              <KTIcon iconName="pencil" className="fs-5 me-2" />
              Editar Configurações
            </Button>
          </div>
        )}
      </div>

      {/* Survey Management Modal */}
      {captacaoPhase && showSurveyModal && (
        <Modal show={showSurveyModal} onHide={handleCloseSurveyModal} size="xl" className="modal-fullscreen-lg-down">
          <Modal.Header closeButton>
            <Modal.Title>Gerenciar Pesquisas - {captacaoPhase.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }}>
            <SurveyManagement 
              launchPhaseId={captacaoPhase.id!} 
              onClose={handleCloseSurveyModal}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default LeadScore;