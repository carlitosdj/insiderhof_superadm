/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Badge, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";
import Configuration from "./Configuration";
import { LaunchSidebar } from "./LaunchSidebar";
import { LaunchHeaderCard } from "./LaunchHeaderCard";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";

import Manage from "../dlaunchhasoffers/Manage";
import { ManageLaunchPhaseExtraWidget } from "../dlaunchphaseextra/ManageLaunchPhaseExtraWidget";
import Resume from "./Resume";
import LeadScore from "./LeadScore";
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

// Estilos CSS para o novo layout
const layoutStyles = `
  .launch-layout {
    display: flex;
    min-height: calc(100vh - 200px);
    background: #f8f9fa;
    gap: 1.5rem;
    padding: 1.5rem;
  }
  
  .launch-main-content {
    flex: 1;
    background: transparent;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  
  .launch-content-area {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
  }
  
  .content-wrapper {
    background: white;
    border-radius: 12px;
    min-height: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  
  /* Mobile responsiveness */
  @media (max-width: 992px) {
    .launch-layout {
      position: relative;
    }
    
    .launch-main-content {
      width: 100%;
    }
    
    .mobile-sidebar-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1060;
      background: #009ef7;
      color: white;
      border: none;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0 4px 20px rgba(0, 158, 247, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }
    
    .mobile-sidebar-toggle:hover {
      background: #0085d1;
      transform: scale(1.1);
    }
    
    .mobile-sidebar-toggle:active {
      transform: scale(0.95);
    }
    
    /* Force mobile sidebar behavior - Simples e limpo */
    .launch-sidebar {
      position: fixed !important;
      top: 0 !important;
      left: -280px !important;
      z-index: 1055 !important;
      height: 100vh !important;
      width: 280px !important;
      background: white !important;
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.5) !important;
      transition: left 0.3s ease !important;
      overflow-y: auto !important;
    }
    
    .launch-sidebar.show {
      left: 0 !important;
    }
    
    /* Forçar o LaunchSidebar interno a aparecer no mobile */
    .launch-sidebar .launch-sidebar {
      position: relative !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
    }
  }
  
  /* Layout responsivo para tabelas e conteúdo */
  .content-wrapper {
    width: 100% !important;
    overflow-x: hidden !important;
  }
  
  .tab-content-wrapper {
    width: 100% !important;
    overflow-x: hidden !important;
  }
  
  .component-wrapper {
    width: 100% !important;
    overflow-x: hidden !important;
  }
  
  /* Tabelas responsivas */
  .table-responsive {
    overflow-x: hidden !important;
    -webkit-overflow-scrolling: touch !important;
  }
  
  table {
    width: 100% !important;
    table-layout: fixed !important;
  }
  
  /* Cards e containers responsivos */
  .card, .card-body {
    width: 100% !important;
    overflow-x: hidden !important;
    word-wrap: break-word !important;
  }
  
  /* Colunas responsivas para formulários e grids */
  .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, 
  .col-7, .col-8, .col-9, .col-10, .col-11, .col-12,
  [class*="col-"] {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
  
  @media (max-width: 768px) {
    /* Em telas pequenas, forçar colunas para largura total */
    .col-md-6, .col-lg-4, .col-xl-3 {
      flex: 0 0 100% !important;
      max-width: 100% !important;
    }
    
    /* Reduzir padding em telas pequenas */
    .card-body, .content-wrapper {
      padding: 1rem !important;
    }
    
    /* Tabelas em telas pequenas */
    table {
      font-size: 0.875rem !important;
    }
    
    th, td {
      padding: 0.5rem !important;
    }
  }
  }
  
  /* Sidebar overlay */
  .launch-sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    display: none;
  }
  
  .launch-sidebar-overlay.show {
    opacity: 1;
    visibility: visible;
    display: block;
  }
  
  @media (min-width: 993px) {
    .launch-sidebar-overlay {
      display: none !important;
    }
  }
  
  @media (min-width: 993px) {
    .mobile-sidebar-toggle {
      display: none;
    }
  }
  
  /* Loading states */
  .content-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    flex-direction: column;
    gap: 1rem;
  }
  
  .content-loading .spinner-border {
    color: #009ef7;
  }
  
  /* Content styles */
  .tab-content-wrapper {
    padding: 0;
  }
  
  .tab-content-wrapper .component-wrapper {
    padding: 0;
  }
  
  .tab-content-wrapper .component-wrapper .card {
    border: none;
    box-shadow: none;
    margin: 0;
    background: transparent;
  }
  
  .tab-content-wrapper .component-wrapper .card-header {
    background: transparent;
    border-bottom: 1px solid #e9ecef;
    padding: 1.5rem;
  }
  
  .tab-content-wrapper .component-wrapper .card-body {
    padding: 1.5rem;
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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

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
    // Fechar sidebar mobile ao editar
    setShowMobileSidebar(false);
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
    } else if (launchPhaseId === "lead-score") {
      setActiveTab("lead-score");
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
    if (activeTab && activeTab !== "resumo" && activeTab !== "lead-score" && activeTab !== "configuracao" && activeTab !== "landing-page-captacao" && activeTab !== "landing-page-vendas") {
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
    
    // Fechar sidebar mobile ao navegar
    setShowMobileSidebar(false);

    if (tabId === "resumo") {
      setIsEditing(false);
      navigate(`/launch/${launchId}`);
    } else if (tabId === "lead-score") {
      navigate(`/launch/${launchId}/lead-score`);
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
  
  // Toggle mobile sidebar
  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  // Handle back to landing pages list
  const handleBackToLandingPages = () => {
    // This function is passed to ManageLPWidget but not used in this context
  };

  const renderTabContent = () => {
    console.log("renderTabContent - Iniciando renderização");
    
    // Verifica se os dados estão carregando
    if (launchphases.loading || !finalLaunch) {
      console.log("renderTabContent - Mostrando loading");
      return (
        <div className="content-loading">
          <div className="spinner-border mb-3" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <h5 className="text-muted mb-2">Carregando dados...</h5>
          <p className="text-muted fs-6 mb-0">
            Aguarde enquanto carregamos as informações do lançamento.
          </p>
        </div>
      );
    }

    if (activeTab === "resumo") {
      return (
        <div className="tab-content-wrapper">
          <div className="component-wrapper">
            {!isEditing ? (
              <Resume launch={finalLaunch} onEdit={() => setIsEditing(true)} />
            ) : (
              <Configuration launch={finalLaunch} onCancel={() => setIsEditing(false)} />
            )}
          </div>
        </div>
      );
    }

    if (activeTab === "lead-score") {
      return (
        <div className="tab-content-wrapper">
          <div className="component-wrapper">
            <LeadScore launch={finalLaunch} />
          </div>
        </div>
      );
    }

    if (activeTab === "landing-page-captacao" || activeTab === "landing-page-vendas") {
      return (
        <div className="tab-content-wrapper">
          <div className="component-wrapper">
            <div className="p-0" style={{ overflow: 'hidden', width: '100%' }}>
              <div className="card-body p-0" style={{ width: '100%' }}>
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
                    <>
                      <style>{`
                        .launch-sidebar {
                          width: 280px !important;
                          min-width: 280px !important;
                          max-width: 280px !important;
                          flex-shrink: 0 !important;
                        }
                      `}</style>
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
                    </>
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
        <div className="content-loading">
          <KTIcon iconName="rocket" className="fs-4x text-muted mb-4" />
          <h4 className="text-muted mb-2">Nenhuma fase selecionada</h4>
          <p className="text-muted fs-6 mb-0">
            Selecione uma fase no menu lateral para visualizar seu conteúdo.
          </p>
        </div>
      );
    }

    const phase = launchphases.myLaunchPhases.find(
      (p) => p.id?.toString() === activeTab
    );
    
    if (!phase) {
      return (
        <div className="content-loading">
          <KTIcon
            iconName="exclamation-triangle"
            className="fs-4x text-muted mb-4"
          />
          <h4 className="text-muted mb-2">Fase não encontrada</h4>
          <p className="text-muted fs-6 mb-0">
            A fase selecionada não foi encontrada.
          </p>
        </div>
      );
    }

    // Retorna o componente ManageLaunchPhaseExtraWidget
    return (
      <div className="tab-content-wrapper">
        <div className="component-wrapper">
          <>
            <style>{`
              .launch-sidebar {
                width: 280px !important;
                min-width: 280px !important;
                max-width: 280px !important;
                flex-shrink: 0 !important;
              }
            `}</style>
            <ManageLaunchPhaseExtraWidget
              launchPhaseId={Number(activeTab)}
              launchphaseextras={launchphaseextras}
              className=""
            />
          </>
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


  // Buscar launch do Redux state geral como fallback
  const launchState = useSelector((state: ApplicationState) => state.launch);
  const fallbackLaunch = launchState.launch?.id === Number(launchId) ? launchState.launch : null;
  const finalLaunch = launch || fallbackLaunch;

  // Se ainda está carregando os dados básicos, mostra loading
  if (!finalLaunch && (launchphases.loading || launchState.loading)) {
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
  if (!finalLaunch && !launchphases.loading && !launchState.loading) {
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
      <style>{layoutStyles}</style>

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
          </h2>

          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
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
        </div>
      </Modal>

      {/* Mobile Sidebar Overlay */}
      {showMobileSidebar && (
        <div 
          className="launch-sidebar-overlay show"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* New Layout Structure */}
      <div className="launch-layout">
        {/* Sidebar */}
        <div className={`launch-sidebar ${showMobileSidebar ? 'show' : ''}`}>
          <div style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <LaunchSidebar
              activeTab={activeTab}
              onTabClick={handleTabClick}
              isEditing={isEditing}
              onEdit={updateComponent}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="launch-main-content">
          {/* Header Card - Não mostrar para abas que têm headers próprias */}
          {!["resumo", "lead-score", "configuracao", "landing-page-captacao", "landing-page-vendas"].includes(activeTab) && 
           !activeTab.match(/^\d+$/) && (
            <div className="launch-content-area" style={{ paddingBottom: 0 }}>
              <LaunchHeaderCard activeTab={activeTab} />
            </div>
          )}
          
          {/* Content */}
          <div className="launch-content-area" style={{ 
            paddingTop: (["resumo", "lead-score", "configuracao", "landing-page-captacao", "landing-page-vendas"].includes(activeTab) || 
                        activeTab.match(/^\d+$/)) ? 0 : 0, 
            flex: 1 
          }}>
            <div className="content-wrapper">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="mobile-sidebar-toggle"
        onClick={toggleMobileSidebar}
        title={showMobileSidebar ? "Fechar menu" : "Abrir menu"}
        aria-label={showMobileSidebar ? "Fechar menu" : "Abrir menu"}
      >
        <KTIcon iconName={showMobileSidebar ? "cross" : "burger-menu-2"} />
      </button>
    </>
  );
};

export { ManageLaunchPhaseWidget }; 