import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { KTIcon } from '../../../../_metronic/helpers';
import { PageTitle } from '../../../../_metronic/layout/core';
import { Content } from '../../../../_metronic/layout/components/content';
import { ToolbarWrapper } from '../../../../_metronic/layout/components/toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../../store';
import { createLaunchRequest } from '../../../../store/ducks/dlaunch/actions';
import { Launch } from '../../../../store/ducks/dlaunch/types';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCreateLaunch } from './CreateLaunchContext';
import Stepper from './components/Stepper';

interface Step3CreateSaleProps {
  onNext: (data: Step3Data) => void;
  onPrevious: (data: Step3Data) => void;
  step1Data?: any;
  step2Data?: any;
  currentStep: number;
}

interface Step3Data {
  cpl1: string;
  cpl2: string;
  cpl3: string;
  dateCpl1: Date;
  dateCpl2: Date;
  dateCpl3: Date;
}

const Step3CreateSale: React.FC<Step3CreateSaleProps> = ({ onNext, onPrevious, step1Data, step2Data, currentStep }) => {
  const [validated, setValidated] = useState(false);
  const { step3Data, updateStep3Data } = useCreateLaunch();
  
  const [formData, setFormData] = useState<Step3Data>(() => {
    // Use cached data if available, otherwise use defaults
    if (step3Data) {
      return step3Data;
    }
    
    // Calculate initial CPL dates based on step1Data if available
    let initialDateCpl1 = new Date();
    let initialDateCpl2 = new Date();
    let initialDateCpl3 = new Date();
    
    if (step1Data?.cartOpenDate) {
      const cartOpenDate = new Date(step1Data.cartOpenDate);
      
      // Encontrar a segunda-feira da semana anterior à abertura do carrinho
      const weekBeforeCart = new Date(cartOpenDate);
      weekBeforeCart.setDate(cartOpenDate.getDate() - 7);
      const dayOfWeek = weekBeforeCart.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      weekBeforeCart.setDate(weekBeforeCart.getDate() - daysToMonday);
      
      // CPL1: Segunda-feira da semana anterior às 20h
      const dateCpl1 = new Date(weekBeforeCart);
      dateCpl1.setHours(20, 0, 0, 0);
      
      // CPL2: Terça-feira da semana anterior às 20h
      const dateCpl2 = new Date(weekBeforeCart);
      dateCpl2.setDate(weekBeforeCart.getDate() + 1);
      dateCpl2.setHours(20, 0, 0, 0);
      
      // CPL3: Quinta-feira da semana anterior às 20h
      const dateCpl3 = new Date(weekBeforeCart);
      dateCpl3.setDate(weekBeforeCart.getDate() + 3);
      dateCpl3.setHours(20, 0, 0, 0);
      
      initialDateCpl1 = dateCpl1;
      initialDateCpl2 = dateCpl2;
      initialDateCpl3 = dateCpl3;
    }
    
    return {
      cpl1: "https://www.youtube.com/embed/am-FQ86mKV0",
      cpl2: "https://www.youtube.com/embed/u-6XK1yy3rE",
      cpl3: "https://www.youtube.com/embed/BJYpPfyz3ks",
      dateCpl1: initialDateCpl1,
      dateCpl2: initialDateCpl2,
      dateCpl3: initialDateCpl3
    };
  });

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof Step3Data, value: any) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    setFormData(newFormData);
    updateStep3Data(newFormData); // Update context
  };

  const calculateCplDates = () => {
    if (step1Data?.cartOpenDate) {
      const cartOpenDate = new Date(step1Data.cartOpenDate);
      
      // Encontrar a segunda-feira da semana anterior à abertura do carrinho
      const weekBeforeCart = new Date(cartOpenDate);
      weekBeforeCart.setDate(cartOpenDate.getDate() - 7); // Uma semana antes
      const dayOfWeek = weekBeforeCart.getDay(); // 0 = domingo, 1 = segunda, etc.
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Dias para chegar na segunda-feira
      weekBeforeCart.setDate(weekBeforeCart.getDate() - daysToMonday);
      
      // CPL1: Segunda-feira da semana anterior às 20h
      const dateCpl1 = new Date(weekBeforeCart);
      dateCpl1.setHours(20, 0, 0, 0); // 20h
      
      // CPL2: Terça-feira da semana anterior às 20h
      const dateCpl2 = new Date(weekBeforeCart);
      dateCpl2.setDate(weekBeforeCart.getDate() + 1); // Segunda + 1 dia = terça
      dateCpl2.setHours(20, 0, 0, 0); // 20h
      
      // CPL3: Quinta-feira da semana anterior às 20h
      const dateCpl3 = new Date(weekBeforeCart);
      dateCpl3.setDate(weekBeforeCart.getDate() + 3); // Segunda + 3 dias = quinta
      dateCpl3.setHours(20, 0, 0, 0); // 20h
      
      const newFormData = {
        ...formData,
        dateCpl1,
        dateCpl2,
        dateCpl3
      };
      setFormData(newFormData);
      updateStep3Data(newFormData); // Update context immediately
      

    }
  };

  React.useEffect(() => {
    if (step1Data?.cartOpenDate) {
      calculateCplDates();
    }
  }, [step1Data?.cartOpenDate]);

  // Salvar dados default no contexto quando o componente monta
  React.useEffect(() => {
    if (!step3Data) {
      updateStep3Data(formData);
    }
  }, []);

  // Recalculate dates when step1Data becomes available
  React.useEffect(() => {
    if (step1Data?.cartOpenDate && !step3Data) {

      calculateCplDates();
    }
  }, [step1Data]);

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
                    <KTIcon iconName="calendar" className="fs-2 me-2" />
                    Configuração do Evento
                  </span>
                  <span className="text-muted mt-1 fw-bold fs-7">
                    Passo 3 de 5 - CPLs e Cronograma
                  </span>
                </h3>
              </div>

              <div className="card-body py-3">
                <Form validated={validated} onSubmit={handleSubmit}>
                  <div className="row g-5">
                    <div className="col-lg-8">
                      <div className="row g-4">
                        {/* CPL1 */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="video" className="fs-4 me-2" />
                                CPL1 - Primeiro Conteúdo
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-12">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Link do Vídeo CPL1
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://www.youtube.com/embed/..."
                                      required
                                      value={formData.cpl1}
                                      onChange={(e) => handleInputChange('cpl1', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o link do CPL1
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Segunda-feira da semana anterior à abertura do carrinho (20h)
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                                
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Data do CPL1
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.dateCpl1}
                                      onChange={(date: any) => handleInputChange('dateCpl1', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Calculado automaticamente, mas pode ser editado
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CPL2 */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="video" className="fs-4 me-2" />
                                CPL2 - Conteúdo Intermediário
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-12">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Link do Vídeo CPL2
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://www.youtube.com/embed/..."
                                      required
                                      value={formData.cpl2}
                                      onChange={(e) => handleInputChange('cpl2', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o link do CPL2
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Terça-feira da semana anterior à abertura do carrinho (20h)
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                                
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Data do CPL2
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.dateCpl2}
                                      onChange={(date: any) => handleInputChange('dateCpl2', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Calculado automaticamente, mas pode ser editado
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CPL3 */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="video" className="fs-4 me-2" />
                                CPL3 - Conteúdo Final
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-12">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Link do Vídeo CPL3
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://www.youtube.com/embed/..."
                                      required
                                      value={formData.cpl3}
                                      onChange={(e) => handleInputChange('cpl3', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o link do CPL3
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Quinta-feira da semana anterior à abertura do carrinho (20h)
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                                
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Data do CPL3
                                    </Form.Label>
                                    <DatePicker
                                      locale="ptBR"
                                      showTimeSelect
                                      dateFormat="dd/MM/yyyy HH:mm"
                                      selected={formData.dateCpl3}
                                      onChange={(date: any) => handleInputChange('dateCpl3', date)}
                                      className="form-control form-control-lg form-control-solid"
                                      wrapperClassName="w-100"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Calculado automaticamente, mas pode ser editado
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
                            <h6 className="fw-bold text-primary mb-0">Cronograma Calculado</h6>
                          </div>
                          
                          <div className="d-flex flex-column">
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">CPL1:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.dateCpl1.toLocaleDateString('pt-BR')} às {formData.dateCpl1.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">CPL2:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.dateCpl2.toLocaleDateString('pt-BR')} às {formData.dateCpl2.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">CPL3:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.dateCpl3.toLocaleDateString('pt-BR')} às {formData.dateCpl3.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Abertura Carrinho:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {step1Data?.cartOpenDate ? new Date(step1Data.cartOpenDate).toLocaleDateString('pt-BR') + ' às ' + new Date(step1Data.cartOpenDate).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : 'Não definido'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Fechamento Carrinho:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {step1Data?.cartOpenDate ? (() => {
                                  const closeDate = new Date(step1Data.cartOpenDate);
                                  closeDate.setDate(closeDate.getDate() + 4);
                                  closeDate.setHours(20, 0, 0, 0);
                                  return closeDate.toLocaleDateString('pt-BR') + ' às ' + closeDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                                })() : 'Não definido'}
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

export default Step3CreateSale;    