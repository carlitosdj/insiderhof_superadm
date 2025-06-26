import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { KTIcon } from '../../../../_metronic/helpers';
import { PageTitle } from '../../../../_metronic/layout/core';
import { Content } from '../../../../_metronic/layout/components/content';
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateLaunch } from './CreateLaunchContext';
import Stepper from './components/Stepper';

interface Step1CreateLaunchProps {
  onNext: (data: Step1Data) => void;
  currentStep: number;
}

interface Step1Data {
  name: string;
  description: string;
  slug: string;
  type: string;
  expertName: string;
  domain: string;
  cartOpenDate: Date;
  cartCloseDate: Date;
}

const getNextMonday = () => {
  const today = new Date();
  const nextMonday = new Date(today);
  const dayOfWeek = today.getDay(); // 0 = domingo, 1 = segunda, etc.
  const daysToMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7; // Dias para próxima segunda
  nextMonday.setDate(today.getDate() + daysToMonday);
  nextMonday.setHours(8, 0, 0, 0); // 9h da manhã
  return nextMonday;
};

const Step1CreateLaunch: React.FC<Step1CreateLaunchProps> = ({ onNext, currentStep }) => {
  const [validated, setValidated] = useState(false);
  const { step1Data, updateStep1Data } = useCreateLaunch();
  
  const [formData, setFormData] = useState<Step1Data>(() => {
    // Use cached data if available, otherwise use defaults
    if (step1Data) {
      return step1Data;
    }
    return {
      name: "INSIDERHOF - ABR2025",
      description: "InsiderHOF",
      slug: "jan25",
      type: "L. CLASSICO",
      expertName: "Dra. Vanessa Defelícibus",
      domain: "https://insiderhof.com.br",
      cartOpenDate: getNextMonday(),
      cartCloseDate: new Date()
    };
  });

  const launchTypes = [
    "L. PERPETUO",
    "L. METEORICO", 
    "L. SEMENTE",
    "L. CLASSICO",
    "L. HIGH TICKET"
  ];

  const handleInputChange = (field: keyof Step1Data, value: any) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    setFormData(newFormData);
    updateStep1Data(newFormData); // Update context
  };

  const calculateCartCloseDate = () => {
    if (formData.cartOpenDate) {
      const closeDate = new Date(formData.cartOpenDate);
      closeDate.setDate(closeDate.getDate() + 4);
      closeDate.setHours(20, 0, 0, 0); // 20h da noite
      setFormData(prev => ({
        ...prev,
        cartCloseDate: closeDate
      }));
    }
  };

  useEffect(() => {
    calculateCartCloseDate();
  }, [formData.cartOpenDate]);

  // Salvar dados default no contexto quando o componente monta
  useEffect(() => {
    if (!step1Data) {
      updateStep1Data(formData);
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    onNext(formData);
  };

  return (
    <>
      <PageTitle
        breadcrumbs={[
          {
            title: "CRIAR LANÇAMENTO",
            path: "/createlaunch",
            isSeparator: false,
            isActive: false,
          },
        ]}
      />
      
      <ToolbarWrapper />
      <Content>
        <Stepper currentStep={currentStep} />
        
        <div className="row g-5 gx-xxl-12">
          <div className="col-xxl-12">
            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bolder fs-3 mb-1">
                    <KTIcon iconName="rocket" className="fs-2 me-2" />
                    Dados do Lançamento
                  </span>
                  <span className="text-muted mt-1 fw-bold fs-7">
                    Passo 1 de 5 - Informações Básicas
                  </span>
                </h3>
              </div>

              <div className="card-body py-3">
                <Form validated={validated} onSubmit={handleSubmit}>
                  <div className="row g-5">
                    <div className="col-lg-8">
                      <div className="row g-4">
                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Nome do Lançamento
                            </Form.Label>
                            <Form.Control
                              placeholder="Ex: INSIDERHOF - ABR2025"
                              required
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                              autoFocus
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o nome do lançamento
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Este será o nome principal exibido para os clientes
                            </Form.Text>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="fw-bold fs-6 mb-2">
                              Descrição
                            </Form.Label>
                            <Form.Control
                              placeholder="Descreva brevemente o lançamento"
                              value={formData.description}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                              as="textarea"
                              rows={3}
                            />
                            <Form.Text className="text-muted fs-7">
                              Uma breve descrição do que será oferecido
                            </Form.Text>
                          </Form.Group>
                        </div>

                        <div className="col-md-6">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Slug
                            </Form.Label>
                            <Form.Control
                              placeholder="Ex: mai23, abr25"
                              required
                              value={formData.slug}
                              onChange={(e) => handleInputChange('slug', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o slug
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Identificador único para URLs (apenas letras e números)
                            </Form.Text>
                          </Form.Group>
                        </div>

                        <div className="col-md-6">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Tipo do Lançamento
                            </Form.Label>
                            <Form.Select
                              required
                              value={formData.type}
                              onChange={(e) => handleInputChange('type', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            >
                              {launchTypes.map((type) => (
                                <option key={type} value={type}>{type}</option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Por favor selecione o tipo do lançamento
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Estratégia de lançamento a ser utilizada
                            </Form.Text>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Nome do Expert
                            </Form.Label>
                            <Form.Control
                              placeholder="Ex: Dra. Vanessa Defelícibus"
                              required
                              value={formData.expertName}
                              onChange={(e) => handleInputChange('expertName', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o nome do expert
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Nome do especialista responsável pelo conteúdo
                            </Form.Text>
                          </Form.Group>
                        </div>

                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Domínio
                            </Form.Label>
                            <Form.Control
                              placeholder="https://exemplo.com"
                              required
                              value={formData.domain}
                              onChange={(e) => handleInputChange('domain', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o domínio
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              URL principal onde o lançamento será hospedado
                            </Form.Text>
                          </Form.Group>
                        </div>

                        {/* Período do Carrinho */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="calendar" className="fs-4 me-2" />
                                Período do Carrinho
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Data de Abertura do Carrinho
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.cartOpenDate}
                                      onChange={(date: any) => handleInputChange('cartOpenDate', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                      minDate={getNextMonday()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe a data de abertura
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Quando o carrinho estará disponível para compra
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Data de Fechamento do Carrinho
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.cartCloseDate}
                                      onChange={(date: any) => handleInputChange('cartCloseDate', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                      minDate={formData.cartOpenDate}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe a data de fechamento
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Calculado automaticamente (4 dias após abertura, 20h), mas pode ser editado
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="card bg-light-primary border-0">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <KTIcon iconName="eye" className="fs-2 text-primary me-2" />
                            <h6 className="fw-bold text-primary mb-0">Prévia do Lançamento</h6>
                          </div>
                          
                          <div className="d-flex flex-column">
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Nome:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.name || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Tipo:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.type || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Expert:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.expertName || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Domínio:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.domain || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Slug:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.slug || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Abertura:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.cartOpenDate.toLocaleDateString('pt-BR')} {formData.cartOpenDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Fechamento:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.cartCloseDate.toLocaleDateString('pt-BR')} {formData.cartCloseDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer border-0 pt-5">
                    <div className="d-flex justify-content-end align-items-center">
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        className="btn btn-lg btn-primary px-6"
                      >
                        Próximo Passo
                        <KTIcon iconName="arrow-right" className="fs-2 ms-2" />
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Step1CreateLaunch;    