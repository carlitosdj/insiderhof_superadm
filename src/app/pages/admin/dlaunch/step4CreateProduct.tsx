import React, { useState, useEffect } from 'react';
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
import { useCreateLaunch } from './CreateLaunchContext';
import Stepper from './components/Stepper';

interface Step4CreateProductProps {
  onPrevious: (data: Step4Data) => void;
  step1Data?: any;
  step2Data?: any;
  step3Data?: any;
  goToStep5?: () => void;
  currentStep: number;
}

interface Step4Data {
  productName: string;
  paidGroup: string;
  productWaitLink: string;
  price: number;
  installments: string;
  aviso: string;
  renovationTime: number;
  renovationPrice: number;
  antecipateRenovationPrice: number;
  renovationDescription: string;
  renovationInstallments: string;
  onboardingVideo: string;
  checkoutPage: string;
}

const Step4CreateProduct: React.FC<Step4CreateProductProps> = ({ onPrevious, step1Data, step2Data, step3Data, goToStep5, currentStep }) => {
  const [validated, setValidated] = useState(false);
  const { step4Data, updateStep4Data } = useCreateLaunch();
  
  const [formData, setFormData] = useState<Step4Data>(() => {
    // Use cached data if available, otherwise use defaults
    if (step4Data) {
      return step4Data;
    }
    return {
      productName: "Treinamento InsiderHOF Online 2025",
      paidGroup: "https://chat.whatsapp.com/DA5umaAQoLqL7YiZjH1I3Q",
      productWaitLink: "https://insiderhof.com.br/viawhats/espera",
      price: 2947,
      installments: "12",
      aviso: "",
      renovationTime: 12,
      renovationPrice: 1472,
      antecipateRenovationPrice: 877,
      renovationDescription: "Renovação",
      renovationInstallments: "12",
      onboardingVideo: "",
      checkoutPage: ""
    };
  });

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof Step4Data, value: any) => {
    const newFormData = {
      ...formData,
      [field]: value
    };
    setFormData(newFormData);
    updateStep4Data(newFormData); // Update context
  };

  // Salvar dados default no contexto quando o componente monta
  useEffect(() => {
    if (!step4Data) {
      updateStep4Data(formData);
    }
  }, []);

  const handlePrevious = () => {
    onPrevious(formData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    
    if (goToStep5) {
      goToStep5();
      return;
    }
    
    // Criar o objeto completo do lançamento
    const completeLaunch: Launch = {
      // Dados do Step 1
      name: step1Data?.name || "",
      description: step1Data?.description || "",
      ownerId: me.me.id,
      slug: step1Data?.slug || "",
      expertName: step1Data?.expertName || "",
      type: step1Data?.type || "",
      domain: step1Data?.domain || "",
      cartOpenDate: step1Data?.cartOpenDate?.toLocaleDateString('pt-BR') || "",
      cartCloseDate: step1Data?.cartCloseDate?.toLocaleDateString('pt-BR') || "",
      
      // Dados do Step 2
      eventName: step2Data?.eventName || "",
      eventGroupLink: step2Data?.eventGroupLink || "",
      leadForm: step2Data?.leadForm || "",
      leadSignUpStartDate: step2Data?.leadSignUpStartDate?.toLocaleDateString('pt-BR') || "",
      leadSignUpEndDate: step2Data?.leadSignUpEndDate?.toLocaleDateString('pt-BR') || "",
      
      // Dados do Step 3
      cpl1: step3Data?.cpl1 || "",
      cpl2: step3Data?.cpl2 || "",
      cpl3: step3Data?.cpl3 || "",
      dateCpl1: step3Data?.dateCpl1?.toLocaleDateString('pt-BR') || "",
      dateCpl2: step3Data?.dateCpl2?.toLocaleDateString('pt-BR') || "",
      dateCpl3: step3Data?.dateCpl3?.toLocaleDateString('pt-BR') || "",
      
      // Dados do Step 4
      productName: formData.productName,
      paidGroup: formData.paidGroup,
      productWaitLink: formData.productWaitLink,
      price: Number(formData.price),
      installments: formData.installments,
      renovationTime: formData.renovationTime,
      renovationPrice: formData.renovationPrice,
      antecipateRenovationPrice: formData.antecipateRenovationPrice,
      renovationDescription: formData.renovationDescription,
      renovationInstallments: formData.renovationInstallments,
      onboardingVideo: formData.onboardingVideo,
      checkoutPage: formData.checkoutPage
    };

    dispatch(createLaunchRequest(completeLaunch));
    
    // Navegar para a lista de lançamentos após a criação
    setTimeout(() => {
      navigate('/launch');
    }, 1000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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
                    <KTIcon iconName="dollar" className="fs-2 me-2" />
                    Configuração do Produto
                  </span>
                  <span className="text-muted mt-1 fw-bold fs-7">
                    Passo 4 de 5 - Preços e Configurações de Venda
                  </span>
                </h3>
              </div>

              <div className="card-body py-3">
                <Form validated={validated} onSubmit={handleSubmit}>
                  <div className="row g-5">
                    <div className="col-lg-8">
                      <div className="row g-4">
                        {/* Informações do Produto */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="element-11" className="fs-4 me-2" />
                                Informações do Produto
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-12">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Nome do Produto
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="Ex: Treinamento InsiderHOF Online 2025"
                                      required
                                      value={formData.productName}
                                      onChange={(e) => handleInputChange('productName', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o nome do produto
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Nome do produto que será oferecido
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Grupo da Turma
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://chat.whatsapp.com/..."
                                      required
                                      value={formData.paidGroup}
                                      onChange={(e) => handleInputChange('paidGroup', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o grupo da turma
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Grupo exclusivo para alunos pagantes
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Grupo de Espera
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://chat.whatsapp.com/..."
                                      required
                                      value={formData.productWaitLink}
                                      onChange={(e) => handleInputChange('productWaitLink', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o grupo de espera
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Grupo para pessoas na lista de espera
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Preços */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="dollar" className="fs-4 me-2" />
                                Configuração de Preços
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="required fw-bold fs-6 mb-2">
                                      Preço Atual
                                    </Form.Label>
                                    <Form.Control
                                      type="number"
                                      placeholder="0.00"
                                      required
                                      value={formData.price}
                                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                      Por favor informe o preço atual
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted fs-7">
                                      Preço que será cobrado dos clientes
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Parcelas
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="12"
                                      value={formData.installments}
                                      onChange={(e) => handleInputChange('installments', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Número de parcelas disponíveis
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-12">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Aviso de Pagamento
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="Ex: REFERENTE À ENTRADA PARA MATRÍCULA, O RESTANTE NO DIA DO CURSO."
                                      value={formData.aviso}
                                      onChange={(e) => handleInputChange('aviso', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                      as="textarea"
                                      rows={2}
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Informações importantes sobre o pagamento
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Configurações de Renovação */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="refresh" className="fs-4 me-2" />
                                Configurações de Renovação
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Tempo de Renovação (meses)
                                    </Form.Label>
                                    <Form.Control
                                      type="number"
                                      placeholder="12"
                                      value={formData.renovationTime}
                                      onChange={(e) => handleInputChange('renovationTime', parseInt(e.target.value) || 0)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Período para renovação automática
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Preço de Renovação
                                    </Form.Label>
                                    <Form.Control
                                      type="number"
                                      placeholder="0.00"
                                      value={formData.renovationPrice}
                                      onChange={(e) => handleInputChange('renovationPrice', parseFloat(e.target.value) || 0)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Valor da renovação mensal
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Preço Antecipado de Renovação
                                    </Form.Label>
                                    <Form.Control
                                      type="number"
                                      placeholder="0.00"
                                      value={formData.antecipateRenovationPrice}
                                      onChange={(e) => handleInputChange('antecipateRenovationPrice', parseFloat(e.target.value) || 0)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Valor com desconto para pagamento antecipado
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Parcelas da Renovação
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="12"
                                      value={formData.renovationInstallments}
                                      onChange={(e) => handleInputChange('renovationInstallments', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Número de parcelas para renovação
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-12">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Descrição da Renovação
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="Renovação"
                                      value={formData.renovationDescription}
                                      onChange={(e) => handleInputChange('renovationDescription', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Descrição que aparecerá na renovação
                                    </Form.Text>
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Links Adicionais */}
                        <div className="col-12">
                          <div className="card bg-light-primary border-0 mb-4">
                            <div className="card-body p-4">
                              <h6 className="fw-bold text-gray-700 mb-3">
                                <KTIcon iconName="link" className="fs-4 me-2" />
                                Links Adicionais
                              </h6>
                              
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Vídeo de Onboarding
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://www.youtube.com/embed/..."
                                      value={formData.onboardingVideo}
                                      onChange={(e) => handleInputChange('onboardingVideo', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      Vídeo de boas-vindas para novos clientes
                                    </Form.Text>
                                  </Form.Group>
                                </div>

                                <div className="col-md-6">
                                  <Form.Group>
                                    <Form.Label className="fw-bold fs-6 mb-2">
                                      Página de Checkout
                                    </Form.Label>
                                    <Form.Control
                                      placeholder="https://exemplo.com/checkout"
                                      value={formData.checkoutPage}
                                      onChange={(e) => handleInputChange('checkoutPage', e.target.value)}
                                      className="form-control form-control-lg form-control-solid"
                                    />
                                    <Form.Text className="text-muted fs-7">
                                      URL da página de finalização de compra
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
                            <KTIcon iconName="check" className="fs-2 text-primary me-2" />
                            <h6 className="fw-bold text-primary mb-0">Resumo Final</h6>
                          </div>
                          
                          <div className="d-flex flex-column">
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Produto:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.productName || 'Não informado'}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Preço:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formatCurrency(formData.price)}
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Parcelas:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.installments}x
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Renovação:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formatCurrency(formData.renovationPrice)} / {formData.renovationTime} meses
                              </p>
                            </div>
                            
                            <div className="mb-3">
                              <span className="fw-bold fs-7 text-gray-600">Grupos:</span>
                              <p className="text-gray-900 fw-bold fs-6 mb-0">
                                {formData.paidGroup && formData.productWaitLink ? 'Configurados' : 'Pendentes'}
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
                        className="btn btn-lg btn-success px-6"
                      >
                        <KTIcon iconName="check" className="fs-2 me-2" />
                        Revisão Final
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

export default Step4CreateProduct; 