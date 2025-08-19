import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { KTIcon } from '../../../../_metronic/helpers';
import { ApplicationState } from '../../../../store';
import { 
  createLaunchQuestionRequest, 
  updateLaunchQuestionRequest 
} from '../../../../store/ducks/dlaunchquestion/actions';
import { 
  CreateLaunchQuestionDto, 
  LaunchQuestion 
} from '../../../../store/ducks/dlaunchquestion/types';

interface QuestionFormProps {
  launchPhaseId: number;
  question?: LaunchQuestion | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface FormValues {
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  required: boolean;
  weight: number;
  options: Array<{
    optionText: string;
    weight: number;
    order: number;
  }>;
}

const validationSchema = Yup.object().shape({
  question: Yup.string()
    .required('A pergunta é obrigatória')
    .min(10, 'A pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'A pergunta deve ter no máximo 500 caracteres'),
  type: Yup.string()
    .required('O tipo da pergunta é obrigatório')
    .oneOf(['multiple_choice', 'scale', 'text'], 'Tipo inválido'),
  required: Yup.boolean(),
  weight: Yup.number()
    .required('O peso é obrigatório')
    .min(0.1, 'O peso deve ser maior que 0')
    .max(10, 'O peso deve ser menor ou igual a 10'),
  options: Yup.array().when('type', {
    is: (type: string) => type === 'multiple_choice' || type === 'scale',
    then: () => Yup.array()
      .min(2, 'Pelo menos 2 opções são necessárias')
      .max(10, 'Máximo de 10 opções permitidas')
      .of(
        Yup.object().shape({
          optionText: Yup.string()
            .required('A opção é obrigatória')
            .min(1, 'A opção deve ter pelo menos 1 caractere')
            .max(200, 'A opção deve ter no máximo 200 caracteres'),
          weight: Yup.number()
            .required('O peso da opção é obrigatório')
            .min(0, 'O peso deve ser maior ou igual a 0')
            .max(10, 'O peso deve ser menor ou igual a 10'),
        })
      ),
    otherwise: () => Yup.array()
  })
});

const QuestionForm: React.FC<QuestionFormProps> = ({
  launchPhaseId,
  question,
  onSuccess,
  onCancel
}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: ApplicationState) => state.launchquestion);

  const [nextOrder, setNextOrder] = useState(1);
  
  // Get next order number for new questions
  const { questions } = useSelector((state: ApplicationState) => state.launchquestion);
  
  useEffect(() => {
    const maxOrder = questions.reduce((max, q) => Math.max(max, q.order || 0), 0);
    setNextOrder(maxOrder + 1);
  }, [questions]);

  const initialValues: FormValues = {
    question: question?.question || '',
    type: question?.type || 'multiple_choice',
    required: question?.required || false,
    weight: question?.weight || 1,
    options: question?.options?.map((opt, index) => ({
      optionText: opt.optionText,
      weight: opt.weight,
      order: opt.order || index + 1
    })) || [
      { optionText: '', weight: 1, order: 1 },
      { optionText: '', weight: 1, order: 2 }
    ]
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    try {
      if (question?.id) {
        // Update existing question
        dispatch(updateLaunchQuestionRequest({
          id: question.id,
          question: values.question,
          type: values.type,
          required: values.required,
          weight: values.weight.toString(),
          launchPhaseId
        }));
      } else {
        // Create new question
        const createDto: CreateLaunchQuestionDto = {
          question: values.question,
          type: values.type,
          required: values.required,
          weight: values.weight.toString(),
          order: nextOrder,
          launchPhaseId,
          options: values.type === 'text' ? undefined : values.options.filter(opt => opt.optionText.trim()).map(opt => ({
            optionText: opt.optionText,
            weight: opt.weight.toString(),
            order: opt.order
          }))
        };

        dispatch(createLaunchQuestionRequest(createDto));
      }

      if (onSuccess) {
        setTimeout(onSuccess, 1000); // Give time for the request to complete
      }
    } catch (err) {
      console.error('Error submitting question:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const addOption = (formik: FormikProps<FormValues>) => {
    const newOptions = [...formik.values.options];
    newOptions.push({
      optionText: '',
      weight: 1,
      order: newOptions.length + 1
    });
    formik.setFieldValue('options', newOptions);
  };

  const removeOption = (formik: FormikProps<FormValues>, index: number) => {
    const newOptions = formik.values.options.filter((_, i) => i !== index);
    // Reorder remaining options
    const reorderedOptions = newOptions.map((opt, i) => ({
      ...opt,
      order: i + 1
    }));
    formik.setFieldValue('options', reorderedOptions);
  };

  const generateScaleOptions = (formik: FormikProps<FormValues>) => {
    const scaleOptions = Array.from({ length: 5 }, (_, i) => ({
      optionText: `${i + 1} - ${getScaleLabel(i + 1)}`,
      weight: i + 1,
      order: i + 1
    }));
    formik.setFieldValue('options', scaleOptions);
  };

  const getScaleLabel = (value: number) => {
    const labels = {
      1: 'Muito baixo',
      2: 'Baixo',
      3: 'Médio',
      4: 'Alto',
      5: 'Muito alto'
    };
    return labels[value as keyof typeof labels] || '';
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          {error && (
            <Alert variant="danger" className="d-flex align-items-center mb-4">
              <KTIcon iconName="cross-circle" className="fs-3 me-3" />
              <div>
                <strong>Erro ao salvar pergunta:</strong> {JSON.stringify(error)}
              </div>
            </Alert>
          )}

          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Configurações da Pergunta</h6>
                </Card.Header>
                <Card.Body>
                  {/* Question Text */}
                  <div className="mb-4">
                    <Form.Label className="required">Pergunta</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="question"
                      value={formik.values.question}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.question && !!formik.errors.question}
                      placeholder="Digite sua pergunta aqui..."
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.question}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                      {formik.values.question.length}/500 caracteres
                    </Form.Text>
                  </div>

                  {/* Question Type */}
                  <Row className="mb-4">
                    <Col md={6}>
                      <Form.Label className="required">Tipo da Pergunta</Form.Label>
                      <Form.Select
                        name="type"
                        value={formik.values.type}
                        onChange={(e) => {
                          formik.handleChange(e);
                          // Auto-generate scale options if type is scale
                          if (e.target.value === 'scale') {
                            generateScaleOptions(formik);
                          } else if (e.target.value === 'text') {
                            formik.setFieldValue('options', []);
                          }
                        }}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.type && !!formik.errors.type}
                      >
                        <option value="multiple_choice">Múltipla Escolha</option>
                        <option value="scale">Escala (1-5)</option>
                        <option value="text">Texto Livre</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.type}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3}>
                      <Form.Label className="required">Peso</Form.Label>
                      <Form.Control
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="10"
                        name="weight"
                        value={formik.values.weight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={formik.touched.weight && !!formik.errors.weight}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.weight}
                      </Form.Control.Feedback>
                    </Col>
                    <Col md={3} className="d-flex align-items-end">
                      <Form.Check
                        type="checkbox"
                        id="required"
                        name="required"
                        label="Obrigatória"
                        checked={formik.values.required}
                        onChange={formik.handleChange}
                        className="mb-2"
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h6 className="mb-0">Informações</h6>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <strong>Tipo:</strong>
                      <span className="ms-2">
                        {formik.values.type === 'multiple_choice' && 'Múltipla Escolha'}
                        {formik.values.type === 'scale' && 'Escala (1-5)'}
                        {formik.values.type === 'text' && 'Texto Livre'}
                      </span>
                    </div>
                    <div>
                      <strong>Peso:</strong>
                      <span className="ms-2">{formik.values.weight}</span>
                    </div>
                    <div>
                      <strong>Obrigatória:</strong>
                      <span className={`ms-2 ${formik.values.required ? 'text-success' : 'text-muted'}`}>
                        {formik.values.required ? 'Sim' : 'Não'}
                      </span>
                    </div>
                    {(formik.values.type === 'multiple_choice' || formik.values.type === 'scale') && (
                      <div>
                        <strong>Opções:</strong>
                        <span className="ms-2">{formik.values.options.filter(opt => opt.optionText.trim()).length}</span>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Options Management */}
          {(formik.values.type === 'multiple_choice' || formik.values.type === 'scale') && (
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Opções de Resposta</h6>
                {formik.values.type === 'multiple_choice' && (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => addOption(formik)}
                    disabled={formik.values.options.length >= 10}
                  >
                    <KTIcon iconName="plus" className="fs-6 me-1" />
                    Adicionar Opção
                  </Button>
                )}
                {formik.values.type === 'scale' && (
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => generateScaleOptions(formik)}
                  >
                    <KTIcon iconName="arrows-loop" className="fs-6 me-1" />
                    Regenerar Escala
                  </Button>
                )}
              </Card.Header>
              <Card.Body>
                {formik.values.options.map((option, index) => (
                  <div key={index} className="d-flex align-items-center gap-3 mb-3">
                    <div className="flex-shrink-0">
                      <span className="badge badge-light-primary">{index + 1}</span>
                    </div>
                    <div className="flex-grow-1">
                      <Form.Control
                        type="text"
                        name={`options.${index}.optionText`}
                        value={option.optionText}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Digite a opção de resposta"
                        isInvalid={
                          formik.touched.options?.[index]?.optionText && 
                          !!(formik.errors.options as any)?.[index]?.optionText
                        }
                        disabled={formik.values.type === 'scale'}
                      />
                      <Form.Control.Feedback type="invalid">
                        {(formik.errors.options as any)?.[index]?.optionText}
                      </Form.Control.Feedback>
                    </div>
                    <div style={{ width: '120px' }}>
                      <Form.Control
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        name={`options.${index}.weight`}
                        value={option.weight}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Peso"
                        size="sm"
                        disabled={formik.values.type === 'scale'}
                        isInvalid={
                          formik.touched.options?.[index]?.weight && 
                          !!(formik.errors.options as any)?.[index]?.weight
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {(formik.errors.options as any)?.[index]?.weight}
                      </Form.Control.Feedback>
                    </div>
                    {formik.values.type === 'multiple_choice' && formik.values.options.length > 2 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeOption(formik, index)}
                        title="Remover opção"
                      >
                        <KTIcon iconName="trash" className="fs-6" />
                      </Button>
                    )}
                  </div>
                ))}
                
                {typeof formik.errors.options === 'string' && (
                  <Alert variant="danger" className="mt-3">
                    <KTIcon iconName="information" className="fs-6 me-2" />
                    {formik.errors.options}
                  </Alert>
                )}
              </Card.Body>
            </Card>
          )}

          {/* Form Actions */}
          <div className="d-flex justify-content-end gap-3">
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !formik.isValid}
              className="d-flex align-items-center"
            >
              {loading && (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
              )}
              {question ? 'Atualizar Pergunta' : 'Criar Pergunta'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default QuestionForm;