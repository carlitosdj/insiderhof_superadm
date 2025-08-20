/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";

import Create from "./create";
import Update from "./update";
import { LaunchHeaderCard } from "../dlaunchphase/LaunchHeaderCard";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";

import {
  LPFeature,
  LPFeatureState,
} from "../../../../store/ducks/dlpfeatures/types";
import {
  deleteLPFeatureRequest,
  reorderLPFeaturesRequest,
  updateLPFeatureRequest,
} from "../../../../store/ducks/dlpfeatures/actions";
import { LPSession } from "../../../../store/ducks/dlpsessions/types";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Estilos CSS padronizados para o novo layout
const widgetStyles = `
  .lpfeature-widget-container {
    padding: 1.5rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
  }
  
  .lpfeature-content-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    flex: 1;
  }
  
  .lpfeature-content-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e4e6ea;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .lpfeature-content-header h3 {
    margin: 0;
    color: #181c32;
    font-weight: 600;
    font-size: 1.2rem;
  }
  
  .lpfeature-content-header .subtitle {
    color: #7e8299;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .lpfeature-action-buttons {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .lpfeature-content-body {
    padding: 0;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .lpfeature-content-header {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .lpfeature-action-buttons {
      width: 100%;
      justify-content: flex-start;
    }
    
    .lpfeature-widget-container {
      padding: 1rem;
    }
  }
`;

type Props = {
  className: string;
  lpfeatures?: LPFeatureState;
  handleBackToLPSessions?: () => void;
  selectedLPSession?: LPSession;
  launchPhaseId?: number;
  selectedLP?: any;
};

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

const ManageLPFeatureWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  lpfeatures,
  handleBackToLPSessions,
  selectedLPSession,
  launchPhaseId: propLaunchPhaseId,
  selectedLP,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LPFeature>({});
  const [oldChildren, setOldChildren] = useState<LPFeature[]>(
    lpfeatures?.myLPFeatures || []
  );

  const { lpSessionId } = useParams();

  // Get launch data from Redux state to display in header
  const { launchId, launchPhaseId: urlLaunchPhaseId } = useParams();
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
  
  // Se lpfeatures não estiver disponível, mostra loading
  if (!lpfeatures) {
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

  const landingPage = () => {
    navigate("/landingpage/" + lpSessionId);
  };

  const updateComponent = (child: LPFeature) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: LPFeature) => {
    dispatch(deleteLPFeatureRequest(child.id!));
  };

  const reorder = (children: LPFeature[]) => {
    // console.log("children", children);
    children.forEach((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLPFeaturesRequest(children));
  };

  const reorderToSave = (children: LPFeature[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.forEach((child) => {
        dispatch(updateLPFeatureRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openHasLaunchs = (child: LPFeature) => {
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
            {action === "updateComponent" ? "Editar feature" : ""}
            {action === "createComponent" ? "Adicionar feature" : ""}
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
            <Create
              handleClose={handleClose}
              lpSessionId={Number(selectedLPSession?.id)}
            />
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

      <div className="lpfeature-widget-container">
        {/* Header Card Padronizado */}
        <LaunchHeaderCard phaseName={`${selectedLPSession?.name || "Seção"} - Features`} />
        
        <div className="lpfeature-content-wrapper">
          {/* Content Header */}
          <div className="lpfeature-content-header">
            <div>
              <h3>
                <KTIcon iconName="setting" className="fs-4 text-primary me-2" />
                Features - {selectedLPSession?.name}
              </h3>
              <div className="subtitle">
                {lpfeatures.myLPFeatures.length} features cadastradas
              </div>
            </div>
            
            <div className="lpfeature-action-buttons">
              <button
                className="btn btn-primary"
                onClick={() => createComponent()}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Adicionar nova feature"
              >
                <KTIcon iconName="plus" className="fs-6 me-2" />
                Nova Feature
              </button>

              {handleBackToLPSessions && (
                <button
                  className="btn btn-secondary"
                  onClick={handleBackToLPSessions}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Voltar para Seções"
                >
                  <KTIcon iconName="arrow-left" className="fs-6 me-2" />
                  Voltar
                </button>
              )}
            </div>
          </div>

          <div className="lpfeature-content-body">
            <div className="card-body py-3">
              <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="min-w-100px">CONFIG</th>
                    <th className="min-w-100px">ORDEM</th>
                    <th className="min-w-100px">STATUS</th>
                    <th className="min-w-50px text-end">AÇÕES</th>
                    <th className="w-15px"></th>
                  </tr>
                </thead>
                <Reorder.Group
                  as="tbody"
                  //axis='y'
                  values={lpfeatures.myLPFeatures}
                  onReorder={reorder}
                  onTap={(e) => reorderToSave(lpfeatures.myLPFeatures)}
                  onMouseUp={(e) => reorderToSave(lpfeatures.myLPFeatures)}
                  style={{ touchAction: "none" }}
                >
                  <AnimatePresence>
                    {lpfeatures.myLPFeatures.length === 0 && (
                      <tr className="border-0">
                        <td colSpan={5} className="text-center pt-10 ">
                          Nenhuma feature encontrada aqui. Adicione uma feature
                          clicando em "Nova feature".
                        </td>
                      </tr>
                    )}

                    {lpfeatures.myLPFeatures.length !== 0 &&
                      lpfeatures.myLPFeatures?.map(
                        (child: LPFeature, index: number) => {
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
                                  <div className={`fw-bold d-block fs-6 ${isInactive ? "text-muted" : "text-gray-900"}`}>
                                    <ConfigDisplay config={child.config} isInactive={isInactive} />
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                  <span className={isInactive ? "text-muted" : ""}>
                                    {child.order}
                                  </span>
                                </div>
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
                                            child.config +
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

export { ManageLPFeatureWidget };
