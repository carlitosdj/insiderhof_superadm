import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { KTIcon } from '../../../../_metronic/helpers';
import { PageTitle } from '../../../../_metronic/layout/core';
import { Content } from '../../../../_metronic/layout/components/content';
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateLaunch } from './CreateLaunchContext';
import Stepper from './components/Stepper';

interface Step2CreateEventProps {
  onNext: (data: Step2Data) => void;
  onPrevious: (data: Step2Data) => void;
  step1Data?: any;
  currentStep: number;
}

interface Step2Data {
  eventName: string;
  leadForm: string;
  eventGroupLink: string;
  domain: string;
  productName: string;
  productWaitLink: string;
  paidGroup: string;
  leadSignUpStartDate: Date;
  leadSignUpEndDate: Date;
  eventStartDate: Date;
  eventEndDate: Date;
}

const Step2CreateEvent: React.FC<Step2CreateEventProps> = ({ onNext, onPrevious, step1Data, currentStep }) => {
  const [validated, setValidated] = useState(false);
  const { step2Data, updateStep2Data } = useCreateLaunch();
  
  const [formData, setFormData] = useState<Step2Data>(() => {
    // Use cached data if available, otherwise use defaults
    if (step2Data) {
      return step2Data;
    }
    return {
      eventName: "Semana InsiderHOF 2025",
      leadForm: "https://forms.gle/pa8KqCmTAyNEdYDb6",
      eventGroupLink: "https://insiderhof.com.br/viawhats/insiderhof",
      domain: "https://insiderhof.com.br",
      productName: "Treinamento InsiderHOF Online 2025",
      productWaitLink: "https://insiderhof.com.br/viawhats/espera",
      paidGroup: "https://chat.whatsapp.com/DA5umaAQoLqL7YiZjH1I3Q",
      leadSignUpStartDate: new Date(),
      leadSignUpEndDate: new Date(),
      eventStartDate: new Date(),
      eventEndDate: new Date()
    };
  });

  const handleInputChange = (field: keyof Step2Data, value: any) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    setFormData(newFormData);
    updateStep2Data(newFormData); // Update context
  };

  const calculateLeadDates = () => {
    if (step1Data?.cartOpenDate) {
      const cartOpenDate = new Date(step1Data.cartOpenDate);
      
      // Primeiro calcular as datas do evento para usar como referência
      const eventStartDate = new Date(cartOpenDate);
      eventStartDate.setDate(cartOpenDate.getDate() - 7); // Uma semana antes
      const dayOfWeek = eventStartDate.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      eventStartDate.setDate(eventStartDate.getDate() - daysToMonday);
      
      // Início das inscrições: 1 mês antes do início do evento
      const startSubscribeDate = new Date(eventStartDate);
      startSubscribeDate.setMonth(startSubscribeDate.getMonth() - 1);
      startSubscribeDate.setHours(0, 0, 0, 0); // Meia-noite
      
      // Fim das inscrições: dia anterior à abertura do carrinho às 23:59
      const endSubscribeDate = new Date(cartOpenDate);
      endSubscribeDate.setDate(cartOpenDate.getDate() - 1);
      endSubscribeDate.setHours(23, 59, 0, 0); // 23:59
      
      setFormData(prev => ({
        ...prev,
        leadSignUpStartDate: startSubscribeDate,
        leadSignUpEndDate: endSubscribeDate
      }));
    }
  };

  const calculateEventDates = () => {
    if (step1Data?.cartOpenDate) {
      const cartOpenDate = new Date(step1Data.cartOpenDate);
      
      // Encontrar a segunda-feira da semana anterior à abertura do carrinho
      const eventStartDate = new Date(cartOpenDate);
      eventStartDate.setDate(cartOpenDate.getDate() - 7); // Uma semana antes
      const dayOfWeek = eventStartDate.getDay(); // 0 = domingo, 1 = segunda, etc.
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Dias para chegar na segunda-feira
      eventStartDate.setDate(eventStartDate.getDate() - daysToMonday);
      eventStartDate.setHours(20, 0, 0, 0); // 9h da manhã
      
      // Encontrar a quinta-feira da semana anterior à abertura do carrinho
      const eventEndDate = new Date(eventStartDate);
      eventEndDate.setDate(eventStartDate.getDate() + 3); // Segunda + 3 dias = quinta-feira
      eventEndDate.setHours(23, 59, 0, 0); // 18h da tarde
      
      setFormData(prev => ({
        ...prev,
        eventStartDate,
        eventEndDate
      }));
    }
  };

  React.useEffect(() => {
    calculateLeadDates();
    calculateEventDates();
  }, [step1Data?.cartOpenDate]);

  // Salvar dados default no contexto quando o componente monta
  React.useEffect(() => {
    if (!step2Data) {
      updateStep2Data(formData);
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
    handleNext();
  };

  const handlePrevious = () => {
    onPrevious(formData);
  };

  const handleNext = () => {
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
                    <KTIcon iconName="user" className="fs-2 me-2" />
                    Captação de Leads
                  </span>
                  <span className="text-muted mt-1 fw-bold fs-7">
                    Passo 2 de 5 - Configuração de Captação
                  </span>
                </h3>
              </div>

              <div className="card-body py-3">
                <Form validated={validated} onSubmit={handleSubmit}>
                  <div className="row g-5">
                    <div className="col-lg-8">
                      <div className="row g-4">
                        {/* Nome do Evento */}
                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Nome do Evento
                            </Form.Label>
                            <Form.Control
                              placeholder="Ex: Semana InsiderHOF 2025"
                              required
                              value={formData.eventName}
                              onChange={(e) => handleInputChange('eventName', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o nome do evento
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Nome específico do evento ou programa
                            </Form.Text>
                          </Form.Group>
                        </div>

                        {/* Período do Evento */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="calendar" className="fs-4 me-2" />
                                Período do Evento
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Início do Evento
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.eventStartDate}
                                      onChange={(date: any) => handleInputChange('eventStartDate', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Segunda-feira da semana anterior à abertura do carrinho (9h)
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Fim do Evento
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.eventEndDate}
                                      onChange={(date: any) => handleInputChange('eventEndDate', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Quinta-feira da semana anterior à abertura do carrinho (18h)
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Formulário do Lead */}
                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Formulário do Lead
                            </Form.Label>
                            <Form.Control
                              placeholder="https://forms.google.com/..."
                              required
                              value={formData.leadForm}
                              onChange={(e) => handleInputChange('leadForm', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o formulário
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Link do formulário para captação de leads
                            </Form.Text>
                          </Form.Group>
                        </div>

                        {/* Grupo do WhatsApp */}
                        <div className="col-12">
                          <Form.Group>
                            <Form.Label className="required fw-bold fs-6 mb-2">
                              Link do Grupo do WhatsApp
                            </Form.Label>
                            <Form.Control
                              placeholder="https://chat.whatsapp.com/..."
                              required
                              value={formData.eventGroupLink}
                              onChange={(e) => handleInputChange('eventGroupLink', e.target.value)}
                              className="form-control form-control-lg form-control-solid"
                            />
                            <Form.Control.Feedback type="invalid">
                              Por favor informe o link do grupo
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted fs-7">
                              Grupo principal do evento
                            </Form.Text>
                          </Form.Group>
                        </div>

                        {/* Período de Inscrição */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="calendar" className="fs-4 me-2" />
                                Período de Inscrição de Leads
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Início das Inscrições
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.leadSignUpStartDate}
                                      onChange={(date: any) => handleInputChange('leadSignUpStartDate', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      1 mês antes do início do evento (00h)
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Fim das Inscrições
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.leadSignUpEndDate}
                                      onChange={(date: any) => handleInputChange('leadSignUpEndDate', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Dia anterior à abertura do carrinho (23:59)
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
                            <h6 className="fw-bold text-primary mb-0">Resumo da Captação</h6>
                          </div>
                          
                          <div className="d-flex flex-column">
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Evento:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.eventName || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Período do Evento:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.eventStartDate.toLocaleDateString('pt-BR')} - {formData.eventEndDate.toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Formulário:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.leadForm ? 'Configurado' : 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Grupo WhatsApp:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.eventGroupLink ? 'Configurado' : 'Pendente'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Inscrições:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.leadSignUpStartDate.toLocaleDateString('pt-BR')} - {formData.leadSignUpEndDate.toLocaleDateString('pt-BR')}
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
                        variant="outline-secondary"
                        size="lg"
                        onClick={handlePrevious}
                        className="btn btn-lg btn-light-secondary me-3"
                      >
                        <KTIcon iconName="arrow-left" className="fs-2 me-2" />
                        Anterior
                      </Button>
                      
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

export default Step2CreateEvent;    