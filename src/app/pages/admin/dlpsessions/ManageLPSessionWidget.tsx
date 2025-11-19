/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";

import Create from "./create";
import Update from "./update";
import { ManageLPFeatureWidget } from "../dlpfeatures/ManageLPFeatureWidget";
import { LaunchHeaderCard } from "../dlaunchphase/LaunchHeaderCard";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";

import {
  LPSession,
  LPSessionState,
} from "../../../../store/ducks/dlpsessions/types";
import {
  deleteLPSessionRequest,
  reorderLPSessionsRequest,
  updateLPSessionRequest,
} from "../../../../store/ducks/dlpsessions/actions";
import { LPFeatureState } from "../../../../store/ducks/dlpfeatures/types";
import { LP } from "../../../../store/ducks/dlps/types";
import { loadMyLPFeaturesRequest } from "../../../../store/ducks/dlpfeatures/actions";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Estilos CSS padronizados para o novo layout
const widgetStyles = `
  .lpsession-widget-container {
    padding: 1.5rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
  }
  
  .lpsession-content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    flex: 1;
  }
  
  .lpsession-content-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e4e6ea;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .lpsession-content-header h3 {
    margin: 0;
    color: #181c32;
    font-weight: 600;
    font-size: 1.2rem;
  }
  
  .lpsession-content-header .subtitle {
    color: #7e8299;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .lpsession-action-buttons {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .lpsession-content-body {
    padding: 0;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .lpsession-content-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .lpsession-action-buttons {
      width: 100%;
      justify-content: flex-start;
    }
    
    .lpsession-widget-container {
      padding: 1rem;
    }
  }
`;

// Config Display Component
const ConfigDisplay: React.FC<{ config: any; isInactive?: boolean }> = ({ config, isInactive = false }) => {
  if (!config) {
    return (
      <span className={`fw-bold fs-7 ${isInactive ? "text-muted" : "text-muted"}`}>
        Sem configuração
      </span>
    );
  }

  try {
    const parsedConfig = typeof config === 'string' 
      ? JSON.parse(config) 
      : config;
    
    if (typeof parsedConfig === 'object' && parsedConfig !== null) {
      const entries = Object.entries(parsedConfig);
      
      if (entries.length === 0) {
        return (
          <span className={`fw-bold fs-7 ${isInactive ? "text-muted" : "text-muted"}`}>
            Sem configuração
          </span>
        );
      }
      
      return (
        <div className="d-flex flex-column gap-1">
          {entries.slice(0, 6).map(([key, value], index) => (
            <div key={index} className="d-flex align-items-center">
              <span className="badge badge-light-primary fs-8 me-1">
                {key}
              </span>
              <span className={`fs-7 ${isInactive ? "text-muted" : "text-gray-600"}`}>
                {String(value)}
              </span>
            </div>
          ))}
          {entries.length > 6 && (
            <span className="text-muted fs-8">
              +{entries.length - 6} mais...
            </span>
          )}
        </div>
      );
    }
  } catch (error) {
    // If JSON parsing fails, show as string
  }
  
  return (
    <span className={`fw-bold fs-7 ${isInactive ? "text-muted" : "text-muted"}`}>
      {typeof config === 'string' 
        ? config.length > 50 
          ? config.substring(0, 50) + '...'
          : config
        : 'Configuração inválida'
      }
    </span>
  );
};

type Props = {
  className: string;
  lpsessions?: LPSessionState;
  handleBackToLandingPages?: () => void;
  selectedLP?: LP;
  lpfeatures?: LPFeatureState;
  launchPhaseId?: number;
};

const ManageLPSessionWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  lpsessions,
  handleBackToLandingPages,
  selectedLP,
  lpfeatures,
  launchPhaseId: propLaunchPhaseId,
}) => {
  const { launchPhaseId: urlLaunchPhaseId, lpId } = useParams();

  // Get launch data from Redux state to display in header
  const { launchId } = useParams();
  const launch = useSelector((state: ApplicationState) =>
    state.launch.myLaunchs.find((l) => l.id === Number(launchId))
  );
  const launchPhase = useSelector((state: ApplicationState) =>
    state.launchphase.myLaunchPhases.find(
      (lp) => lp.id === (propLaunchPhaseId || Number(urlLaunchPhaseId))
    )
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Obtém o estado atualizado do Redux
  const currentLPSessions = useSelector((state: ApplicationState) => state.lpsessions);
  const currentLPFeatures = useSelector((state: ApplicationState) => state.lpfeatures);
  
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LPSession>({});
  const [oldChildren, setOldChildren] = useState<LPSession[]>(
    currentLPSessions?.myLPSessions || []
  );
  const [showLPFeatures, setShowLPFeatures] = useState<boolean>(false);
  const [selectedLPSession, setSelectedLPSession] = useState<LPSession>({});
  const reorderTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sincroniza oldChildren com o estado do Redux
  useEffect(() => {
    setOldChildren(currentLPSessions?.myLPSessions || []);
  }, [currentLPSessions?.myLPSessions]);

  // Cleanup do timeout quando o componente desmontar
  useEffect(() => {
    return () => {
      if (reorderTimeoutRef.current) {
        clearTimeout(reorderTimeoutRef.current);
      }
    };
  }, []);

  // Se lpsessions não estiver disponível, mostra loading
  if (!currentLPSessions) {
    return (
      <div className="widget-container">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }
  
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  // const landingPage = () => {
  //   navigate("/landingpage/" + lpId);
  // };

  const updateComponent = (child: LPSession) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: LPSession) => {
    dispatch(deleteLPSessionRequest(child.id!));
  };

  // Função para salvar reordenação no backend com debounce
  const saveReorderToBackend = useCallback((children: LPSession[]) => {
    // Limpa o timeout anterior se existir
    if (reorderTimeoutRef.current) {
      clearTimeout(reorderTimeoutRef.current);
    }

    // Cria um novo timeout com debounce de 1 segundo
    reorderTimeoutRef.current = setTimeout(() => {
      // Verifica se houve mudança real comparando com oldChildren
      const hasChanged = JSON.stringify(oldChildren) !== JSON.stringify(children);

      if (hasChanged) {
        // Envia uma requisição por item, mas com debounce para evitar sobrecarga
        children.forEach((child) => {
          dispatch(updateLPSessionRequest({ id: child.id, order: child.order }));
        });

        // Atualiza o oldChildren para refletir a nova ordem
        setOldChildren(children);
      }
    }, 1000);
  }, [oldChildren, dispatch]);

  // Função chamada quando o usuário reordena os itens
  const reorder = useCallback((children: LPSession[]) => {
    // Atualiza a ordem local de cada item
    const reorderedChildren = children.map((child, index) => ({
      ...child,
      order: index + 1
    }));

    // Atualiza o estado do Redux APENAS localmente para feedback visual imediato
    dispatch(reorderLPSessionsRequest(reorderedChildren));

    // Agenda salvamento no backend com debounce (não bloqueia a UI)
    saveReorderToBackend(reorderedChildren);
  }, [dispatch, saveReorderToBackend]);

  const openLPFeatures = (lpSession: LPSession) => {
    setSelectedLPSession(lpSession);
    setShowLPFeatures(true);
    // Carrega as lpfeatures específicas da seção
    dispatch(loadMyLPFeaturesRequest(Number(lpSession.id)));
  };

  const handleBackToLPSessions = () => {
    setShowLPFeatures(false);
    setSelectedLPSession({});
  };

  // Se estiver mostrando LPFeatures, renderiza o ManageLPFeatureWidget
  if (showLPFeatures && selectedLPSession.id) {
    return (
      <ManageLPFeatureWidget 
        className={className} 
        lpfeatures={currentLPFeatures}
        handleBackToLPSessions={handleBackToLPSessions}
        selectedLPSession={selectedLPSession}
        launchPhaseId={propLaunchPhaseId}
        selectedLP={selectedLP}
      />
    );
  }

  const openHasLaunchs = (child: LPSession) => {
    setAction("manageLaunchs");
    setShow(true);
    setChild(child);
  };

  return (
    <>
      <style>{widgetStyles}</style>
      
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
            {action === "updateComponent" ? "Editar sessão" : ""}
            {action === "createComponent" ? "Adicionar sessão" : ""}
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
            <Create handleClose={handleClose} lpId={Number(selectedLP?.id)} />
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

      <div className="lpsession-widget-container">
        {/* Header Card Padronizado */}
        <LaunchHeaderCard phaseName={`${selectedLP?.name || "Landing Page"} - Seções`} />
        
        <div className="lpsession-content-wrapper">
          {/* Content Header */}
          <div className="lpsession-content-header">
            <div>
              <h3>
                <KTIcon iconName="element-11" className="fs-4 text-primary me-2" />
                Seções - {selectedLP?.name}
              </h3>
              <div className="subtitle">
                {currentLPSessions.myLPSessions.length} seções cadastradas
              </div>
            </div>
            
            <div className="lpsession-action-buttons">
              <button
                className="btn btn-primary"
                onClick={() => createComponent()}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Adicionar nova seção"
              >
                <KTIcon iconName="plus" className="fs-6 me-2" />
                Nova Seção
              </button>

              {handleBackToLandingPages && (
                <button
                  className="btn btn-secondary"
                  onClick={handleBackToLandingPages}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Voltar para Landing Pages"
                >
                  <KTIcon iconName="arrow-left" className="fs-6 me-2" />
                  Voltar
                </button>
              )}
            </div>
          </div>

          <div className="lpsession-content-body">
            <div className="card-body py-3">
              <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="min-w-150px">NOME</th>
                    {/* <th className="min-w-100px">CONFIG</th> */}
                    {/* <th className="min-w-100px">ORDEM</th> */}
                    <th className="min-w-100px">TIPO</th>
                    <th className="min-w-100px">STATUS</th>
                    <th className="min-w-50px text-end">AÇÕES</th>
                    <th className="w-15px"></th>
                  </tr>
                </thead>
                <Reorder.Group
                  as="tbody"
                  //axis='y'
                  values={currentLPSessions.myLPSessions}
                  onReorder={reorder}
                  style={{ touchAction: "none" }}
                >
                  <AnimatePresence>
                    {currentLPSessions.myLPSessions.length === 0 && (
                      <tr className="border-0">
                        <td colSpan={7} className="text-center pt-10 ">
                          Nenhuma seção encontrada aqui. Adicione uma seção
                          clicando em "Nova seção".
                        </td>
                      </tr>
                    )}

                    {currentLPSessions.myLPSessions.length !== 0 &&
                      currentLPSessions.myLPSessions?.map(
                        (child: LPSession, index: number) => {
                          const isInactive = child.status === "0";
                          return (
                            <Reorder.Item
                              key={child.id}
                              value={child}
                              as="tr"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className={isInactive ? "opacity-50" : ""}
                            >
                              <td
                                onPointerDownCapture={(e) => e.stopPropagation()}
                              >
                                <div className="d-flex align-items-center border-0">
                                  <div>
                                    <a
                                      href="#!"
                                      onClick={() => openLPFeatures(child)}
                                      style={{ display: "flex" }}
                                      className={`fw-bold text-hover-primary d-block fs-6 ${
                                        isInactive ? "text-muted" : "text-gray-900"
                                      }`}
                                    >
                                      {child.name}
                                    </a>
                                  </div>
                                </div>
                              </td>
                              {/* <td>
                                <ConfigDisplay config={child.config} isInactive={isInactive} />
                              </td> */}
                              {/* <td>
                                <span className={isInactive ? "text-muted" : ""}>
                                  {child.order}
                                </span>
                              </td> */}
                              <td>
                                <span className={isInactive ? "text-muted" : ""}>
                                  {child.type}
                                </span>
                              </td>
                              <td onPointerDownCapture={(e) => e.stopPropagation()}>
                                <span className={`badge ${
                                  child.status === "1" 
                                    ? "badge-light-success" 
                                    : "badge-light-warning"
                                }`}>
                                  {child.status === "1" ? "Ativo" : "Inativo"}
                                </span>
                              </td>
                              <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                  {/* <a
                                    href="#!"
                                    onClick={() =>
                                      navigate("/launchhasoffers/" + child.id)
                                    }
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                  >
                                    <KTIcon
                                      iconName="switch"
                                      iconType="outline"
                                    />
                                  </a> */}
                                  
                                  <a
                                    href="#!"
                                    onClick={() => updateComponent(child)}
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                  >
                                    <KTIcon
                                      iconName="pencil"
                                      iconType="outline"
                                    />
                                  </a>
                                  <a
                                    href="#!"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Deseja realmente excluir: " +
                                            child.name +
                                            "?"
                                        )
                                      )
                                        deleteComponent(child);
                                    }}
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                  >
                                    <KTIcon iconName="trash" iconType="outline" />
                                  </a>
                                </div>
                              </td>
                              <td style={{ touchAction: "none" }}>
                                <div style={{ cursor: "grab" }}>
                                  <KTIcon
                                    iconName="arrow-up-down"
                                    iconType="outline"
                                  />
                                </div>
                              </td>
                            </Reorder.Item>
                          );
                        }
                      )}
                  </AnimatePresence>
                </Reorder.Group>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageLPSessionWidget };
