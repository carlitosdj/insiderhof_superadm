import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Alert, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { KTIcon } from '../../../../_metronic/helpers';
import { ApplicationState } from '../../../../store';
import { loadLaunchQuestionsRequest, clearLaunchQuestionState, deleteLaunchQuestionRequest } from '../../../../store/ducks/dlaunchquestion/actions';
import { LaunchQuestion } from '../../../../store/ducks/dlaunchquestion/types';
import QuestionForm from './QuestionForm';
import SurveyPreview from './SurveyPreview';

interface SurveyManagementProps {
  launchPhaseId: number;
  isVisible?: boolean;
  onClose?: () => void;
}

const SurveyManagement: React.FC<SurveyManagementProps> = ({
  launchPhaseId,
  isVisible = true,
  onClose
}) => {
  const dispatch = useDispatch();
  const { launchId, phaseId } = useParams();
  
  // Redux state
  const { questions, loading, error } = useSelector((state: ApplicationState) => state.launchquestion);
  const launchPhase = useSelector((state: ApplicationState) =>
    state.launchphase.myLaunchPhases.find(phase => phase.id === launchPhaseId)
  );

  // Local state
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<LaunchQuestion | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<LaunchQuestion | null>(null);

  // Load questions on mount
  useEffect(() => {
    if (launchPhaseId) {
      dispatch(loadLaunchQuestionsRequest(launchPhaseId));
    }

    return () => {
      dispatch(clearLaunchQuestionState());
    };
  }, [dispatch, launchPhaseId]);

  // Check if this is a CAPTACAO phase
  const isCaptacaoPhase = launchPhase?.name?.toLowerCase().includes('captação') || 
                         launchPhase?.name?.toLowerCase().includes('captacao');

  // Handle form success
  const handleFormSuccess = () => {
    setShowQuestionForm(false);
    setSelectedQuestion(null);
    // Reload questions
    if (launchPhaseId) {
      dispatch(loadLaunchQuestionsRequest(launchPhaseId));
    }
  };

  // Handle delete confirmation
  const handleDeleteQuestion = (question: LaunchQuestion) => {
    setQuestionToDelete(question);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (questionToDelete?.id) {
      dispatch(deleteLaunchQuestionRequest(questionToDelete.id));
      setShowDeleteConfirm(false);
      setQuestionToDelete(null);
    }
  };

  if (!isVisible) return null;

  if (!isCaptacaoPhase) {
    return (
      <Card className="shadow-sm">
        <Card.Header className="bg-light-info">
          <div className="d-flex align-items-center">
            <KTIcon iconName="information" className="fs-2 text-info me-3" />
            <div>
              <h5 className="mb-1 text-dark">Gerenciamento de Pesquisas</h5>
              <p className="text-muted mb-0">Funcionalidade disponível apenas para fases de Captação</p>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Alert variant="info" className="d-flex align-items-center mb-0">
            <KTIcon iconName="information-2" className="fs-3 me-3" />
            <div>
              <strong>Fase não compatível:</strong> O sistema de pesquisas e scoring de leads está disponível 
              apenas para fases marcadas como "Captação". Esta fase atual é: <strong>{launchPhase?.name || 'Não identificada'}</strong>
            </div>
          </Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-sm">
        <Card.Header className="bg-light-primary">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <KTIcon iconName="questionnaire-tablet" className="fs-2 text-primary me-3" />
              <div>
                <h5 className="mb-1 text-dark">Gerenciamento de Pesquisas</h5>
                <p className="text-muted mb-0">
                  Fase: {launchPhase?.name} • {questions.length} pergunta{questions.length !== 1 ? 's' : ''} configurada{questions.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="d-flex gap-2">
              {questions.length > 0 && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setShowPreview(true)}
                  className="d-flex align-items-center"
                >
                  <KTIcon iconName="eye" className="fs-6 me-1" />
                  Visualizar
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSelectedQuestion(null);
                  setShowQuestionForm(true);
                }}
                className="d-flex align-items-center"
              >
                <KTIcon iconName="plus" className="fs-6 me-1" />
                Nova Pergunta
              </Button>
              {onClose && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={onClose}
                  className="d-flex align-items-center"
                >
                  <KTIcon iconName="cross" className="fs-6" />
                </Button>
              )}
            </div>
          </div>
        </Card.Header>

        <Card.Body>
          {loading && (
            <div className="d-flex justify-content-center py-8">
              <div className="d-flex flex-column align-items-center">
                <div className="spinner-border text-primary mb-3" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="text-muted">Carregando pesquisas...</p>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="d-flex align-items-center">
              <KTIcon iconName="cross-circle" className="fs-3 me-3" />
              <div>
                <strong>Erro ao carregar pesquisas:</strong> {JSON.stringify(error)}
              </div>
            </Alert>
          )}

          {!loading && !error && questions.length === 0 && (
            <div className="text-center py-8">
              <div className="symbol symbol-100px mx-auto mb-6">
                <div className="symbol-label bg-light-primary">
                  <KTIcon iconName="questionnaire-tablet" className="fs-2x text-primary" />
                </div>
              </div>
              <h3 className="text-dark fw-bold mb-2">Nenhuma pergunta cadastrada</h3>
              <p className="text-muted fs-6 mb-6">
                Crie suas primeiras perguntas para começar a coletar dados dos leads e 
                calcular o score de interesse dos seus potenciais clientes.
              </p>
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedQuestion(null);
                  setShowQuestionForm(true);
                }}
                className="d-flex align-items-center mx-auto"
              >
                <KTIcon iconName="plus" className="fs-6 me-2" />
                Criar Primeira Pergunta
              </Button>
            </div>
          )}

          {!loading && !error && questions.length > 0 && (
            <Row>
              <Col lg={12}>
                <div className="d-flex flex-column gap-3">
                  {questions
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((question, index) => (
                      <Card key={question.id} className="border">
                        <Card.Body className="py-3">
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center mb-2">
                                <span className="badge badge-light-primary me-2">
                                  #{question.order || index + 1}
                                </span>
                                <span className="badge badge-light-info me-2">
                                  {question.type === 'multiple_choice' && 'Múltipla Escolha'}
                                  {question.type === 'scale' && 'Escala'}
                                  {question.type === 'text' && 'Texto Livre'}
                                </span>
                                {question.required && (
                                  <span className="badge badge-light-warning me-2">
                                    Obrigatória
                                  </span>
                                )}
                                <span className="badge badge-light-secondary">
                                  Peso: {question.weight}
                                </span>
                              </div>
                              <h6 className="text-dark mb-2">{question.question}</h6>
                              {question.options && question.options.length > 0 && (
                                <div className="text-muted fs-7">
                                  {question.options.length} opção/ções de resposta
                                </div>
                              )}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setSelectedQuestion(question);
                                  setShowQuestionForm(true);
                                }}
                                title="Editar pergunta"
                              >
                                <KTIcon iconName="pencil" className="fs-6" />
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDeleteQuestion(question)}
                                title="Excluir pergunta"
                              >
                                <KTIcon iconName="trash" className="fs-6" />
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                title="Arrastar para reordenar"
                                className="cursor-move"
                              >
                                <KTIcon iconName="menu" className="fs-6" />
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                </div>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Question Form Modal */}
      {showQuestionForm && (
        <Modal show={showQuestionForm} onHide={() => setShowQuestionForm(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedQuestion ? 'Editar Pergunta' : 'Nova Pergunta'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QuestionForm
              launchPhaseId={launchPhaseId}
              question={selectedQuestion}
              onSuccess={handleFormSuccess}
              onCancel={() => setShowQuestionForm(false)}
            />
          </Modal.Body>
        </Modal>
      )}

      {/* Survey Preview Modal */}
      {showPreview && (
        <Modal show={showPreview} onHide={() => setShowPreview(false)} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Visualização da Pesquisa</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <SurveyPreview questions={questions} showScoring={true} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPreview(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && questionToDelete && (
        <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-start">
              <div className="symbol symbol-50px me-3">
                <div className="symbol-label bg-light-danger">
                  <KTIcon iconName="trash" className="fs-2x text-danger" />
                </div>
              </div>
              <div>
                <h5 className="text-dark mb-2">Excluir Pergunta</h5>
                <p className="text-muted mb-3">
                  Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita.
                </p>
                <div className="bg-light-warning p-3 rounded">
                  <strong>Pergunta:</strong> {questionToDelete.question}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              <KTIcon iconName="trash" className="fs-6 me-1" />
              Excluir Pergunta
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SurveyManagement;