/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Badge, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";
import Configuration from "./Configuration";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";

import Manage from "../dlaunchhasoffers/Manage";
import { ManageLaunchPhaseExtraWidget } from "../dlaunchphaseextra/ManageLaunchPhaseExtraWidget";
import Resume from "./Resume";
import { ManageLPWidget } from "../dlps/ManageLPWidget";
import {
  LaunchPhases,
  LaunchPhasesState,
} from "../../../../store/ducks/dlaunchphase/types";
import {
  deleteLaunchPhasesRequest,
  reorderLaunchPhasesRequest,
  updateLaunchPhasesRequest,
  loadMyLaunchPhasesRequest,
} from "../../../../store/ducks/dlaunchphase/actions";
import { loadMyLaunchPhaseExtrasRequest } from "../../../../store/ducks/dlaunchphaseextras/actions";
import { loadLaunchRequest } from "../../../../store/ducks/dlaunch/actions";
import { ApplicationState } from "../../../../store";
import { LPState } from "../../../../store/ducks/dlps/types";
import { loadMyLPsRequest } from "../../../../store/ducks/dlps/actions";
import { LPSessionState } from "../../../../store/ducks/dlpsessions/types";
import { LPFeatureState } from "../../../../store/ducks/dlpfeatures/types";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Estilos CSS customizados
const tabStyles = `
  .nav-tabs {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    scrollbar-color: #007bff #f8f9fa;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 4px;
  }
  
  .nav-tabs::-webkit-scrollbar {
    height: 6px;
  }
  
  .nav-tabs::-webkit-scrollbar-track {
    background: #f8f9fa;
    border-radius: 3px;
  }
  
  .nav-tabs::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 3px;
  }
  
  .nav-tabs::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }
  
  .nav-tabs .nav-item {
    flex-shrink: 0;
    margin-right: 4px;
  }
  
  .nav-tabs .nav-link {
    border: none;
    border-radius: 8px 8px 0 0;
    padding: 12px 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    white-space: nowrap;
    min-width: fit-content;
  }
  
  .nav-tabs .nav-link.active {
    background: #007bff;
    color: white;
    box-shadow: 0 4px 12px rgba(0,123,255,0.3);
  }
  
  .nav-tabs .nav-link:hover:not(.active) {
    background: rgba(0,123,255,0.1);
    color: #007bff;
  }
  
  .tab-content {
    background: white;
    border-radius: 0 8px 8px 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    min-height: 400px;
  }
  
  .tab-pane {
    height: 100%;
  }
  
  .tab-pane .component-wrapper {
    padding: 0;
    height: 100%;
  }
  
  .tab-pane .component-wrapper .card {
    border: none;
    box-shadow: none;
    margin: 0;
  }
  
  .tab-pane .component-wrapper .card-header {
    background: transparent;
    border-bottom: 1px solid #e9ecef;
    padding: 1rem 1.5rem;
  }
  
  .tab-pane .component-wrapper .card-body {
    padding: 1.5rem;
  }
  
  /* Responsividade para telas muito pequenas */
  @media (max-width: 576px) {
    .nav-tabs .nav-link {
      padding: 10px 16px;
      font-size: 0.875rem;
    }
    
    .nav-tabs .nav-link .fs-6 {
      font-size: 0.75rem !important;
    }
    
    .tabs-container {
      padding-left: 1rem !important;
      padding-right: 1rem !important;
    }
  }
  
  /* Responsividade para telas médias */
  @media (max-width: 768px) {
    .nav-tabs .nav-link {
      padding: 10px 14px;
    }
  }
`;

type Props = {
  className: string;
};

const ManageLaunchPhaseWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LaunchPhases>({});
  const [activeTab, setActiveTab] = useState<string>("resumo");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLandingPage, setSelectedLandingPage] = useState<string>("");
  const [lpListResetFlag, setLpListResetFlag] = useState(0);

  const { launchId, launchPhaseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state para launchphaseextras
  const launch = useSelector((state: ApplicationState) =>
    state.launch.myLaunchs.find(l => l.id === Number(launchId))
  );
  const launchphases = useSelector((state: ApplicationState) => state.launchphase);
  const launchphaseextras = useSelector((state: ApplicationState) => state.launchphaseextra);
  const lps = useSelector((state: ApplicationState) => state.lps);
  const lpsessions = useSelector((state: ApplicationState) => state.lpsessions);
  const lpfeatures = useSelector((state: ApplicationState) => state.lpfeatures);

  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const updateComponent = (phase: LaunchPhases) => {
    setAction("updateComponent");
    setChild(phase);
    setShow(true);
  };

  // useEffect principal para carregar dados apenas uma vez
  useEffect(() => {
    console.log(
      "ManageLaunchPhaseWidget: useEffect principal executando, launchId:",
      launchId
    );
    if (launchId && !launchphases.myLaunchPhases.length) {
      console.log("Carregando dados do launch e fases...");
      dispatch(loadLaunchRequest(Number(launchId)));
      dispatch(loadMyLaunchPhasesRequest(Number(launchId)));
    }
  }, [launchId, dispatch, launchphases.myLaunchPhases.length]); // Executa quando launchId muda ou quando não há fases carregadas
  
  // Logs de debug
  console.log("ManageLaunchPhaseWidget - launch:", launch);
  console.log("ManageLaunchPhaseWidget - launchphases:", launchphases);
  console.log("ManageLaunchPhaseWidget - activeTab:", activeTab);
  
  // Função para scroll suave para a aba ativa
  const scrollToActiveTab = () => {
    const activeTabElement = document.querySelector('.nav-tabs .nav-link.active');
    if (activeTabElement) {
      activeTabElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };
  // useEffect para configurar tab ativa baseada na URL
  useEffect(() => {
    console.log(
      "ManageLaunchPhaseWidget: useEffect tab ativa, launchId:",
      launchId,
      "launchPhaseId:",
      launchPhaseId
    );
    if (launchPhaseId === "landing-page-captacao") {
      setActiveTab("landing-page-captacao");
      setSelectedLandingPage("captacao");
    } else if (launchPhaseId === "landing-page-vendas") {
      setActiveTab("landing-page-vendas");
      setSelectedLandingPage("vendas");
    } else if (launchPhaseId) {
      setActiveTab(launchPhaseId);
    } else if (launchId) {
      setActiveTab("resumo");
      // Reset editing state when navigating to resumo tab
      setIsEditing(false);
    }
  }, [launchId, launchPhaseId]);

  // useEffect para carregar dados da fase ativa (apenas para fases específicas)
  useEffect(() => {
    console.log(
      "ManageLaunchPhaseWidget: useEffect fase ativa, activeTab:",
      activeTab
    );
    if (activeTab && activeTab !== "resumo" && activeTab !== "configuracao" && activeTab !== "landing-page-captacao" && activeTab !== "landing-page-vendas") {
      dispatch(loadMyLaunchPhaseExtrasRequest(Number(activeTab)));
      dispatch(loadMyLPsRequest(Number(activeTab))); // Carrega os LPs da fase
      // LPSessions e LPFeatures serão carregados sob demanda quando necessário
    }
  }, [activeTab, dispatch]);

  // useEffect para carregar dados das landing pages quando a tab for ativada
  useEffect(() => {
    console.log(
      "ManageLaunchPhaseWidget: useEffect tab landing pages ativada, activeTab:",
      activeTab
    );
    if ((activeTab === "landing-page-captacao" || activeTab === "landing-page-vendas") && launchphases.myLaunchPhases.length > 0) {
      // Encontra a fase correspondente à landing page selecionada
      const targetPhase = launchphases.myLaunchPhases.find(phase => {
        if (activeTab === "landing-page-captacao") {
          return phase.name === "Captação";
        } else if (activeTab === "landing-page-vendas") {
          return phase.name === "Vendas";
        }
        return false;
      });

      if (targetPhase) {
        console.log("Carregando landing pages para a fase:", targetPhase.name, "ID:", targetPhase.id);
        dispatch(loadMyLPsRequest(Number(targetPhase.id)));
      }
    }
  }, [activeTab, launchphases.myLaunchPhases, dispatch]);
  
  // useEffect para scroll para a aba ativa
  useEffect(() => {
    if (activeTab && launchphases.myLaunchPhases.length > 0) {
      // Pequeno delay para garantir que o DOM foi atualizado
      setTimeout(scrollToActiveTab, 100);
    }
  }, [activeTab, launchphases.myLaunchPhases.length]);

  // Handle tab click to change URL
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    if (tabId === "resumo") {
      setIsEditing(false);
      navigate(`/launch/${launchId}`);
    } else if (tabId === "configuracao") {
      navigate(`/launch/${launchId}/configuracao`);
    } else if (tabId === "landing-page-captacao" || tabId === "landing-page-vendas") {
      setSelectedLandingPage(tabId === "landing-page-captacao" ? "captacao" : "vendas");
      setLpListResetFlag(flag => flag + 1); // incrementa para forçar reset
      navigate(`/launch/${launchId}/${tabId}`);
    } else {
      navigate(`/launch/${launchId}/${tabId}`);
    }
  };

  // Handle back to landing pages list
  const handleBackToLandingPages = () => {
    // This function is passed to ManageLPWidget but not used in this context
  };

  const renderTabContent = () => {
    console.log("renderTabContent - Iniciando renderização");
    
    // Verifica se os dados estão carregando
    if (launchphases.loading || !launch) {
      console.log("renderTabContent - Mostrando loading");
      return (
        <div className="tab-pane fade show active p-4">
          <div className="text-center py-8">
            <div className="spinner-border text-primary mb-4" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <h4 className="text-muted mb-2">Carregando dados...</h4>
            <p className="text-muted fs-6 mb-4">
              Aguarde enquanto carregamos as informações do lançamento.
            </p>
          </div>
        </div>
      );
    }

    if (activeTab === "resumo") {
      return (
        <div className="tab-pane fade show active">
          <div className="component-wrapper">
            {!isEditing ? (
              <Resume onEdit={() => setIsEditing(true)} />
            ) : (
              <Configuration onCancel={() => setIsEditing(false)} />
            )}
          </div>
        </div>
      );
    }

    if (activeTab === "landing-page-captacao" || activeTab === "landing-page-vendas") {
      return (
        <div className="tab-pane fade show active">
          <div className="component-wrapper">
            <div className="p-0">
              {/* <div className="card-header border-0 pt-5 pb-3">
                <div className="d-flex align-items-center">
                  <h3 className="card-title mb-0">
                    <KTIcon 
                      iconName={activeTab === "landing-page-captacao" ? "user-plus" : "shopping-cart"} 
                      className="fs-2 text-primary me-2" 
                    />
                    Landing Page: {activeTab === "landing-page-captacao" ? "Captação" : "Vendas"}
                  </h3>
                </div>
              </div> */}
              
              <div className="card-body p-0">
                {(() => {
                  // Encontra a fase correspondente à landing page selecionada
                  const targetPhase = launchphases.myLaunchPhases.find(phase => {
                    if (activeTab === "landing-page-captacao") {
                      return phase.name === "Captação";
                    } else if (activeTab === "landing-page-vendas") {
                      return phase.name === "Vendas";
                    }
                    return false;
                  });
                  
                  console.log("ManageLaunchPhaseWidget - targetPhase:", targetPhase);
                  console.log("ManageLaunchPhaseWidget - lps.myLPs:", lps.myLPs);
                  console.log("ManageLaunchPhaseWidget - lps.loading:", lps.loading);
                  
                  return (
                    <ManageLPWidget 
                      key={activeTab}
                      resetToListFlag={lpListResetFlag}
                      className="" 
                      lps={lps} 
                      //handleBackToItems={handleBackToLandingPages}
                      lpsessions={lpsessions}
                      lpfeatures={lpfeatures}
                      launchPhaseId={targetPhase ? Number(targetPhase.id) : undefined}
                    />
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!activeTab) {
      return (
        <div className="tab-pane fade show active p-4">
          <div className="text-center py-8">
            <KTIcon iconName="rocket" className="fs-4x text-muted mb-4" />
            <h4 className="text-muted mb-2">Nenhuma fase selecionada</h4>
            <p className="text-muted fs-6 mb-4">
              Selecione uma fase na aba acima para visualizar seu conteúdo.
            </p>
          </div>
        </div>
      );
    }

    const phase = launchphases.myLaunchPhases.find(
      (p) => p.id?.toString() === activeTab
    );
    if (!phase) {
      return (
        <div className="tab-pane fade show active p-4">
          <div className="text-center py-8">
            <KTIcon
              iconName="exclamation-triangle"
              className="fs-4x text-muted mb-4"
            />
            <h4 className="text-muted mb-2">Fase não encontrada</h4>
            <p className="text-muted fs-6 mb-4">
              A fase selecionada não foi encontrada.
            </p>
          </div>
        </div>
      );
    }

    // Retorna o componente ManageLaunchPhaseExtraWidget
    return (
      <div className="tab-pane fade show active">
        <div className="component-wrapper">
          <ManageLaunchPhaseExtraWidget
            launchPhaseId={Number(activeTab)}
            launchphaseextras={launchphaseextras}
            className=""
          />
        </div>
      </div>
    );
  };

  // Logs de debug para identificar problemas
  console.log("ManageLaunchPhaseWidget - Estado atual:", {
    launchId,
    launchPhaseId,
    activeTab,
    launch: !!launch,
    launchphasesLoading: launchphases.loading,
    launchphasesCount: launchphases.myLaunchPhases.length,
    isEditing
  });

  // Se ainda está carregando os dados básicos, mostra loading
  if (!launch && launchphases.loading) {
    console.log("Mostrando loading - dados básicos carregando");
    return (
      <div className="card">
        <div className="card-body p-8">
          <div className="text-center py-8">
            <div className="spinner-border text-primary mb-4" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <h4 className="text-muted mb-2">Carregando lançamento...</h4>
            <p className="text-muted fs-6 mb-4">
              Aguarde enquanto carregamos as informações do lançamento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se não tem launch mas não está carregando, pode ser erro
  if (!launch && !launchphases.loading) {
    console.log("Erro: Não tem launch e não está carregando");
    return (
      <div className="card">
        <div className="card-body p-8">
          <div className="text-center py-8">
            <KTIcon iconName="exclamation-triangle" className="fs-4x text-warning mb-4" />
            <h4 className="text-warning mb-2">Erro ao carregar lançamento</h4>
            <p className="text-muted fs-6 mb-4">
              Não foi possível carregar as informações do lançamento. Verifique se o ID está correto.
            </p>
            <p className="text-muted fs-8">
              LaunchId: {launchId} | Loading: {launchphases.loading ? 'Sim' : 'Não'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{tabStyles}</style>

      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={show}
        onHide={handleClose}
        backdrop={true}
      >
        <div className="modal-header">
          <h2>
            {action === "updateComponent" ? "Editar launch" : ""}
            {action === "createComponent" ? "Adicionar launch" : ""}
            {/* {action === "manageLaunchs" ? "Gerenciar ofertas" : ""} */}
          </h2>

          {/* begin::Close */}
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
          {/* end::Close */}
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {action === "updateComponent" ? (
            <Update handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
          {action === "createComponent" ? (
            <Create handleClose={handleClose} launchId={Number(launchId)} />
          ) : (
            ""
          )}
          {/* {action === "manageLaunchs" ? (
            <Manage handleClose={handleClose} child={child} />
          ) : (
            ""
          )} */}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <div className="d-flex align-items-center">
            {/* Offer Image */}
            {launch?.launchhasoffers && launch.launchhasoffers.length > 0 && launch.launchhasoffers[0].offer?.image && (
              <div className="me-4 flex-shrink-0 d-flex align-items-center">
                <img
                  className="rounded-3"
                  style={{
                    width: "60px",
                    //height: "60px",
                    objectFit: "cover",
                    border: "2px solid #e9ecef"
                  }}
                  src={
                    launch.launchhasoffers[0].offer.image.includes("https://")
                      ? launch.launchhasoffers[0].offer.image
                      : "https://app.insiderhof.com.br/files/" + launch.launchhasoffers[0].offer.image
                  }
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                  }}
                  alt={launch.launchhasoffers[0].offer.name || "Oferta"}
                />
              </div>
            )}
            
            {/* Title and Description */}
            <div className="flex-grow-1">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  <KTIcon iconName="rocket" className="fs-2 text-primary me-2" />
                  {launch ? `${launch.name} - Gerenciador de Fases` : "Carregando..."}
                </span>
                <span className="text-muted mt-1 fw-bold fs-7">
                  Gerencie todas as fases do seu lançamento
                </span>
                {/* {launch?.launchhasoffers && launch.launchhasoffers.length > 0 && launch.launchhasoffers[0].offer?.name && (
                  <span className="text-primary mt-1 fw-semibold fs-7">
                    Oferta: {launch.launchhasoffers[0].offer.name}
                  </span>
                )} */}
              </h3>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          {/* Navegação por Abas */}
          <Nav variant="tabs" className="border-0 px-6 pt-3 tabs-container">
            <Nav.Item>
              <Nav.Link
                active={activeTab === "resumo"}
                onClick={() => handleTabClick("resumo")}
                className="d-flex align-items-center"
              >
                <KTIcon iconName="chart-line" className="fs-6 me-2" />
                Resumo
              </Nav.Link>
            </Nav.Item>
            {launchphases.myLaunchPhases && launchphases.myLaunchPhases.length > 0 ? (
              (() => {
                console.log("Renderizando abas, fases disponíveis:", launchphases.myLaunchPhases.map(p => ({ id: p.id, name: p.name })));
                return launchphases.myLaunchPhases.map(
                  (phase: LaunchPhases, index: number) => (
                    <React.Fragment key={phase.id}>
                      <Nav.Item>
                        <Nav.Link
                          active={activeTab === phase.id?.toString()}
                          onClick={() => handleTabClick(phase.id?.toString() || "")}
                          className="d-flex align-items-center"
                        >
                          <KTIcon
                            iconName={
                              phase.name === "Captação"
                                ? "user"
                                : phase.name === "Evento"
                                ? "calendar"
                                : phase.name === "Vendas"
                                ? "purchase"
                                : phase.name === "Aquecimento"
                                ? "purchase"
                                : phase.name === "Debriefing"
                                ? "chart-simple-3"
                                : "gear"
                            }
                            className="fs-6 me-2"
                          />
                          {phase.name}
                          <button
                            type="button"
                            className="btn btn-icon btn-sm btn-light ms-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              updateComponent(phase);
                            }}
                            title={`Editar fase ${phase.name}`}
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "0",
                              border: "none",
                              background: "transparent"
                            }}
                          >
                            <KTIcon iconName="pencil" className="fs-8 text-muted" />
                          </button>
                          {/* <Badge bg="success" className="ms-2 fs-8">
                          #{index + 1}
                        </Badge> */}
                        </Nav.Link>
                      </Nav.Item>
                      
                      {/* Landing Page Tab - aparece ao lado da fase correspondente */}
                      {(() => {
                        console.log(`Verificando fase "${phase.name}" para landing page Captação:`, phase.name === "Captação");
                        return phase.name === "Captação" && (
                          <Nav.Item>
                            <Nav.Link
                              active={activeTab === "landing-page-captacao"}
                              onClick={() => handleTabClick("landing-page-captacao")}
                              className="d-flex align-items-center"
                            >
                              <KTIcon iconName="rocket" className="fs-6 me-2" />
                              Landing Page Captação
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })()}
                      
                      {(() => {
                        console.log(`Verificando fase "${phase.name}" para landing page Vendas:`, phase.name === "Vendas");
                        return phase.name === "Vendas" && (
                          <Nav.Item>
                            <Nav.Link
                              active={activeTab === "landing-page-vendas"}
                              onClick={() => handleTabClick("landing-page-vendas")}
                              className="d-flex align-items-center"
                            >
                              <KTIcon iconName="rocket" className="fs-6 me-2" />
                              Landing Page Vendas
                            </Nav.Link>
                          </Nav.Item>
                        );
                      })()}
                    </React.Fragment>
                  )
                );
              })()
            ) : (
              // Mostra loading nas abas se ainda não carregou
              launchphases.loading && (
                <Nav.Item>
                  <div className="nav-link d-flex align-items-center">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                    <span className="text-muted">Carregando fases...</span>
                  </div>
                </Nav.Item>
              )
            )}
          </Nav>

          {/* Conteúdo das Abas */}
          {/* <div className="tab-content">{renderTabContent()}</div> */}
          <div className="">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export { ManageLaunchPhaseWidget }; 