import React from 'react';
import { Button, Card, Row, Col } from 'react-bootstrap';
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

interface Step5ReviewProps {
  onPrevious: () => void;
  currentStep: number;
}

const Step5Review: React.FC<Step5ReviewProps> = ({ onPrevious, currentStep }) => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);
  const navigate = useNavigate();
  const { step1Data, step2Data, step3Data, step4Data, clearAllData } = useCreateLaunch();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR') + ' às ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleCreateLaunch = () => {
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
      productName: step4Data?.productName || "",
      paidGroup: step4Data?.paidGroup || "",
      productWaitLink: step4Data?.productWaitLink || "",
      price: Number(step4Data?.price) || 0,
      installments: step4Data?.installments || "",
      renovationTime: step4Data?.renovationTime || 0,
      renovationPrice: step4Data?.renovationPrice || 0,
      antecipateRenovationPrice: step4Data?.antecipateRenovationPrice || 0,
      renovationDescription: step4Data?.renovationDescription || "",
      renovationInstallments: step4Data?.renovationInstallments || "",
      onboardingVideo: step4Data?.onboardingVideo || "",
      checkoutPage: step4Data?.checkoutPage || "",
      aviso: step4Data?.aviso || "",
      
    };

    dispatch(createLaunchRequest(completeLaunch));
    
    // Limpar cache e navegar para a lista de lançamentos
    setTimeout(() => {
      clearAllData();
      navigate('/launches');
    }, 1000);
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
                    <KTIcon iconName="check" className="fs-2 me-2" />
                    Revisão Final
                  </span>
                  <span className="text-muted mt-1 fw-bold fs-7">
                    Passo 5 de 5 - Confirmação e Criação
                  </span>
                </h3>
              </div>

              <div className="card-body py-3">
                <div className="row g-5">
                  <div className="col-lg-8">
                    <div className="row g-4">
                      {/* Dados do Lançamento */}
                      <div className="col-12">
                        <div className="card bg-light-primary border-0 mb-4">
                          <div className="card-body p-4">
                            <h6 className="fw-bold text-gray-700 mb-3">
                              <KTIcon iconName="rocket" className="fs-4 me-2" />
                              Dados do Lançamento
                            </h6>
                            
                            <div className="row g-3">
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Nome:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step1Data?.name || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Tipo:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step1Data?.type || 'Não informado'}</p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Descrição:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step1Data?.description || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Expert:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step1Data?.expertName || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Slug:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step1Data?.slug || 'Não informado'}</p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Domínio:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step1Data?.domain || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Abertura do Carrinho:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step1Data?.cartOpenDate ? formatDate(step1Data.cartOpenDate) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Fechamento do Carrinho:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step1Data?.cartCloseDate ? formatDate(step1Data.cartCloseDate) : 'Não definido'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Captação de Leads */}
                      <div className="col-12">
                        <div className="card bg-light-primary border-0 mb-4">
                          <div className="card-body p-4">
                            <h6 className="fw-bold text-gray-700 mb-3">
                              <KTIcon iconName="user" className="fs-4 me-2" />
                              Captação de Leads
                            </h6>
                            
                            <div className="row g-3">
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Nome do Evento:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step2Data?.eventName || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Início do Evento:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step2Data?.eventStartDate ? formatDate(step2Data.eventStartDate) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Fim do Evento:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step2Data?.eventEndDate ? formatDate(step2Data.eventEndDate) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Início das Inscrições:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step2Data?.leadSignUpStartDate ? formatDate(step2Data.leadSignUpStartDate) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Fim das Inscrições:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step2Data?.leadSignUpEndDate ? formatDate(step2Data.leadSignUpEndDate) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Formulário de Lead:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step2Data?.leadForm || 'Não informado'}</p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Grupo do WhatsApp:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step2Data?.eventGroupLink || 'Não informado'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo Pré-Lançamento */}
                      <div className="col-12">
                        <div className="card bg-light-primary border-0 mb-4">
                          <div className="card-body p-4">
                            <h6 className="fw-bold text-gray-700 mb-3">
                              <KTIcon iconName="calendar" className="fs-4 me-2" />
                              Conteúdo Pré-Lançamento
                            </h6>
                            
                            <div className="row g-3">
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">CPL1:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step3Data?.dateCpl1 ? formatDate(step3Data.dateCpl1) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">CPL2:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step3Data?.dateCpl2 ? formatDate(step3Data.dateCpl2) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">CPL3:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step3Data?.dateCpl3 ? formatDate(step3Data.dateCpl3) : 'Não definido'}
                                </p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Links dos CPLs:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">
                                  {step3Data?.cpl1 && step3Data?.cpl2 && step3Data?.cpl3 ? 'Todos configurados' : 'Pendentes'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Configuração do Produto */}
                      <div className="col-12">
                        <div className="card bg-light-primary border-0 mb-4">
                          <div className="card-body p-4">
                            <h6 className="fw-bold text-gray-700 mb-3">
                              <KTIcon iconName="dollar" className="fs-4 me-2" />
                              Configuração do Produto
                            </h6>
                            
                            <div className="row g-3">
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Nome do Produto:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step4Data?.productName || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Preço:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{formatCurrency(step4Data?.price || 0)}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Parcelas:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step4Data?.installments || 'Não informado'}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Preço de Renovação:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{formatCurrency(step4Data?.renovationPrice || 0)}</p>
                              </div>
                              <div className="col-md-6">
                                <span className="fw-bold fs-7 text-gray-600">Preço Antecipado:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{formatCurrency(step4Data?.antecipateRenovationPrice || 0)}</p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Grupo da Turma:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step4Data?.paidGroup || 'Não informado'}</p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Grupo de Espera:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step4Data?.productWaitLink || 'Não informado'}</p>
                              </div>
                              <div className="col-12">
                                <span className="fw-bold fs-7 text-gray-600">Aviso de Pagamento:</span>
                                <p className="text-gray-900 fw-bold fs-6 mb-2">{step4Data?.aviso || 'Não informado'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="card bg-light-success border-0">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center mb-3">
                          <KTIcon iconName="check" className="fs-2 text-success me-2" />
                          <h6 className="fw-bold text-success mb-0">Pronto para Criar!</h6>
                        </div>
                        
                        <div className="d-flex flex-column">
                          <div className="mb-3">
                            <span className="fw-bold fs-7 text-gray-600">Lançamento:</span>
                            <p className="text-gray-900 fw-bold fs-6 mb-0">
                              {step1Data?.name || 'Não informado'}
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <span className="fw-bold fs-7 text-gray-600">Evento:</span>
                            <p className="text-gray-900 fw-bold fs-6 mb-0">
                              {step2Data?.eventName || 'Não informado'}
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <span className="fw-bold fs-7 text-gray-600">Produto:</span>
                            <p className="text-gray-900 fw-bold fs-6 mb-0">
                              {step4Data?.productName || 'Não informado'}
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <span className="fw-bold fs-7 text-gray-600">Preço:</span>
                            <p className="text-gray-900 fw-bold fs-6 mb-0">
                              {formatCurrency(step4Data?.price || 0)}
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <span className="fw-bold fs-7 text-gray-600">Status:</span>
                            <p className="text-success fw-bold fs-6 mb-0">
                              ✓ Todos os dados preenchidos
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
                      onClick={onPrevious}
                      className="btn btn-lg btn-light-secondary me-3"
                    >
                      <KTIcon iconName="arrow-left" className="fs-2 me-2" />
                      Voltar
                    </Button>
                    
                    <Button
                      variant="success"
                      size="lg"
                      onClick={handleCreateLaunch}
                      className="btn btn-lg btn-success px-6"
                    >
                      <KTIcon iconName="check" className="fs-2 me-2" />
                      Criar Lançamento
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Step5Review; 