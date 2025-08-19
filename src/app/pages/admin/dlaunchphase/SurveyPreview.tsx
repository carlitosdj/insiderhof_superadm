import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Badge } from 'react-bootstrap';
import { KTIcon } from '../../../../_metronic/helpers';
import { LaunchQuestion } from '../../../../store/ducks/dlaunchquestion/types';

interface SurveyPreviewProps {
  questions: LaunchQuestion[];
  showScoring?: boolean;
}

interface PreviewAnswers {
  [questionId: number]: string | number;
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({
  questions,
  showScoring = false
}) => {
  const [answers, setAnswers] = useState<PreviewAnswers>({});
  const [showResults, setShowResults] = useState(false);

  // Sort questions by order
  const sortedQuestions = [...questions].sort((a, b) => (a.order || 0) - (b.order || 0));

  const handleAnswerChange = (questionId: number, value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let totalWeight = 0;

    sortedQuestions.forEach(question => {
      if (answers[question.id!] !== undefined && question.id) {
        const answer = answers[question.id];
        let optionWeight = 0;

        if (question.type === 'multiple_choice') {
          const selectedOption = question.options?.find(
            opt => opt.optionText === answer
          );
          optionWeight = selectedOption?.weight || 0;
        } else if (question.type === 'scale') {
          optionWeight = Number(answer);
        } else if (question.type === 'text') {
          // For text questions, give max weight if answered
          optionWeight = answer.toString().trim() ? question.weight : 0;
        }

        const questionScore = (question.weight || 1) * optionWeight;
        totalScore += questionScore;
        totalWeight += question.weight || 1;
      }
    });

    return {
      totalScore,
      totalWeight,
      percentage: totalWeight > 0 ? (totalScore / (totalWeight * 10)) * 100 : 0 // Assuming max weight per option is 10
    };
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 75) return 'success';
    if (percentage >= 50) return 'warning';
    if (percentage >= 25) return 'info';
    return 'danger';
  };

  const renderQuestion = (question: LaunchQuestion, index: number) => {
    const questionId = question.id!;

    return (
      <Card key={questionId} className="mb-4 border">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-2">
                <Badge bg="light" text="dark" className="me-2">
                  Pergunta {index + 1}
                </Badge>
                <Badge 
                  bg={question.type === 'multiple_choice' ? 'primary' : 
                      question.type === 'scale' ? 'info' : 'secondary'} 
                  className="me-2"
                >
                  {question.type === 'multiple_choice' && 'Múltipla Escolha'}
                  {question.type === 'scale' && 'Escala'}
                  {question.type === 'text' && 'Texto'}
                </Badge>
                {question.required && (
                  <Badge bg="warning" className="me-2">Obrigatória</Badge>
                )}
                {showScoring && (
                  <Badge bg="light" text="dark">
                    Peso: {question.weight}
                  </Badge>
                )}
              </div>
              <h6 className="text-dark mb-3">
                {question.question}
                {question.required && <span className="text-danger ms-1">*</span>}
              </h6>
            </div>
          </div>

          {/* Render question based on type */}
          {question.type === 'multiple_choice' && question.options && (
            <div>
              {question.options
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((option, optIndex) => (
                  <Form.Check
                    key={`${questionId}-${optIndex}`}
                    type="radio"
                    id={`question-${questionId}-option-${optIndex}`}
                    name={`question-${questionId}`}
                    label={
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <span>{option.optionText}</span>
                        {showScoring && (
                          <Badge bg="light" text="dark" className="ms-2">
                            Peso: {option.weight}
                          </Badge>
                        )}
                      </div>
                    }
                    value={option.optionText}
                    checked={answers[questionId] === option.optionText}
                    onChange={(e) => handleAnswerChange(questionId, e.target.value)}
                    className="mb-2"
                  />
                ))}
            </div>
          )}

          {question.type === 'scale' && (
            <div>
              <Form.Range
                min={1}
                max={5}
                step={1}
                value={answers[questionId] || 1}
                onChange={(e) => handleAnswerChange(questionId, Number(e.target.value))}
                className="mb-3"
              />
              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">1 - Muito baixo</small>
                <div className="d-flex align-items-center">
                  <strong className="me-2">Valor selecionado: {answers[questionId] || 1}</strong>
                  {showScoring && (
                    <Badge bg="light" text="dark">
                      Peso da pergunta: {question.weight}
                    </Badge>
                  )}
                </div>
                <small className="text-muted">5 - Muito alto</small>
              </div>
            </div>
          )}

          {question.type === 'text' && (
            <div>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Digite sua resposta..."
                value={answers[questionId] || ''}
                onChange={(e) => handleAnswerChange(questionId, e.target.value)}
              />
              {showScoring && (
                <div className="mt-2">
                  <Badge bg="light" text="dark">
                    Peso da pergunta: {question.weight} 
                    {answers[questionId] && String(answers[questionId]).trim() ? ' (Pontuação máxima)' : ' (Sem pontuação se vazio)'}
                  </Badge>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    );
  };

  if (sortedQuestions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="symbol symbol-100px mx-auto mb-6">
          <div className="symbol-label bg-light-warning">
            <KTIcon iconName="questionnaire-tablet" className="fs-2x text-warning" />
          </div>
        </div>
        <h4 className="text-dark fw-bold mb-2">Nenhuma pergunta para visualizar</h4>
        <p className="text-muted">Adicione perguntas à pesquisa para ver a visualização.</p>
      </div>
    );
  }

  const score = calculateScore();
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = sortedQuestions.length;

  return (
    <div>
      {/* Survey Header */}
      <Card className="mb-4 bg-light-primary">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 className="text-dark mb-1">Visualização da Pesquisa</h5>
              <p className="text-muted mb-0">
                {totalQuestions} pergunta{totalQuestions !== 1 ? 's' : ''} • 
                {answeredQuestions} respondida{answeredQuestions !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="d-flex align-items-center gap-3">
              {showScoring && (
                <Button
                  variant={showResults ? 'outline-secondary' : 'primary'}
                  size="sm"
                  onClick={() => setShowResults(!showResults)}
                >
                  {showResults ? 'Ocultar Score' : 'Ver Score'}
                </Button>
              )}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Score Results */}
      {showResults && showScoring && (
        <Alert variant={getScoreColor(score.percentage)} className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Pontuação Calculada</h6>
              <p className="mb-0">
                Score Total: <strong>{score.totalScore.toFixed(2)}</strong> de <strong>{score.totalWeight * 10}</strong> possíveis
              </p>
            </div>
            <div className="text-end">
              <div className="fs-2 fw-bold">{score.percentage.toFixed(1)}%</div>
              <small>Percentual de interesse</small>
            </div>
          </div>
        </Alert>
      )}

      {/* Questions */}
      <div>
        {sortedQuestions.map((question, index) => renderQuestion(question, index))}
      </div>

      {/* Survey Footer */}
      <Card className="bg-light border-0">
        <Card.Body className="text-center">
          <h6 className="text-dark mb-2">Fim da Pesquisa</h6>
          <p className="text-muted mb-0">
            Obrigado por responder nossa pesquisa! Suas respostas nos ajudam a entender melhor seu perfil.
          </p>
          {showScoring && answeredQuestions === totalQuestions && (
            <div className="mt-3">
              <Badge bg={getScoreColor(score.percentage)} className="fs-6 px-3 py-2">
                Score Final: {score.percentage.toFixed(1)}%
              </Badge>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SurveyPreview;