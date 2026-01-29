/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";

import Create from "./create";
import Update from "./update";
import { ManageLPSessionWidget } from "../dlpsessions/ManageLPSessionWidget";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";

import { LP, LPState } from "../../../../store/ducks/dlps/types";
import {
  deleteLPRequest,
  duplicateLPRequest,
  exportLPRequest,
  importLPRequest,
  reorderLPsRequest,
  updateLPRequest,
  clearExportLP,
} from "../../../../store/ducks/dlps/actions";
import { LPSessionState } from "../../../../store/ducks/dlpsessions/types";
import { LPFeatureState } from "../../../../store/ducks/dlpfeatures/types";
import { loadMyLPSessionsRequest } from "../../../../store/ducks/dlpsessions/actions";

import moment from "moment";
momentDurationFormatSetup(moment);

// Estilos CSS para o header e botão de ação
const widgetStyles = `
  .widget-container {
    padding: 2rem;
    min-height: 100vh;
  }
  
  .widget-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }
  
  .widget-header h2 {
    margin: 0;
    font-weight: 700;
  }
  
  .widget-header .subtitle {
    opacity: 0.9;
    margin-top: 0.5rem;
  }
  
  .action-buttons {
    background: white;
    border: none;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .btn-secondary {
    background: #95a5a6;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    transition: transform 0.2s ease;
  }
  
  .btn-secondary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(149, 165, 166, 0.3);
  }
`;

type Props = {
  className: string;
  lps: LPState;
  handleBackToItems?: () => void;
  lpsessions?: LPSessionState;
  lpfeatures?: LPFeatureState;
};

const ManageLPWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  lps,
  handleBackToItems,
  lpsessions,
  lpfeatures,
}) => {
  // Obtém o estado atualizado do Redux
  const currentLPSessions = useSelector((state: ApplicationState) => state.lpsessions);
  const currentLPFeatures = useSelector((state: ApplicationState) => state.lpfeatures);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LP>({});
  const [oldChildren, setOldChildren] = useState<LP[]>(lps.myLPs);
  const [showLPSessions, setShowLPSessions] = useState<boolean>(false);
  const [selectedLP, setSelectedLP] = useState<LP>({});

  const { launchPhaseId } = useParams();

  // Get launch data from Redux state to display in header
  const { launchId } = useParams();
  const launch = useSelector((state: ApplicationState) =>
    state.launch.myLaunchs.find((l) => l.id === Number(launchId))
  );
  const launchPhase = useSelector((state: ApplicationState) =>
    state.launchphase.myLaunchPhases.find(
      (lp) => lp.id === Number(launchPhaseId)
    )
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to recursively remove IDs and timestamp fields
  const removeIdsAndTimestamps = (obj: any): any => {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => removeIdsAndTimestamps(item));
    }

    if (typeof obj === "object") {
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        // Skip ID fields and timestamp fields
        if (
          key === "id" ||
          key === "createdAt" ||
          key === "updatedAt" ||
          key.endsWith("Id") ||
          key.endsWith("_id")
        ) {
          continue;
        }

        // Recursively clean nested objects
        cleaned[key] = removeIdsAndTimestamps(value);
      }
      return cleaned;
    }

    return obj;
  };

  // Function to export data to JSON file
  const exportToFile = (data: any, filename: string) => {
    // console.log("📁 exportToFile called with data:", data);
    // console.log("📁 exportToFile filename:", filename);

    const jsonString = JSON.stringify(data, null, 2);
    //console.log("📁 JSON string created, length:", jsonString.length);

    const blob = new Blob([jsonString], { type: "application/json" });
    //console.log("📁 Blob created, size:", blob.size);

    const url = window.URL.createObjectURL(blob);
    //console.log("📁 URL created:", url);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    //console.log("📁 Link created with download:", filename);

    document.body.appendChild(link);
    //console.log("📁 Link appended to body");

    link.click();
    //console.log("📁 Link clicked");

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    //console.log("📁 Cleanup completed");
  };

  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const landingPage = () => {
    navigate("/landingpage/" + launchPhaseId);
  };

  const updateComponent = (child: LP) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: LP) => {
    dispatch(deleteLPRequest(child.id!));
  };

  const reorder = (children: LP[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLPsRequest(children));
  };

  const exportLP = (landingPageId: number) => {
    // Find the landing page by ID to get its name
    const landingPage = lps.myLPs.find(lp => lp.id === landingPageId);
    const landingPageName = landingPage?.name || 'Landing Page';
    
    // Show confirmation dialog
    if (window.confirm(`Deseja realmente exportar a landing page "${landingPageName}"?`)) {
      //console.log("🚀 exportLP called with ID:", landingPageId);
      dispatch(exportLPRequest(landingPageId));
    } else {
      //console.log("❌ Export cancelled by user");
    }
  };

  // Watch for export data changes
  useEffect(() => {
    if (lps.exportLP && lps.exportLP !== null) {
      const cleanedData = removeIdsAndTimestamps(lps.exportLP);
      const exportData = { landingPage: cleanedData };
      // Get landing page name
      const lpName = lps.exportLP.name ? lps.exportLP.name.replace(/[^a-zA-Z0-9-_]/g, "-") : 'LandingPage';
      // Format date as dd-mm-yyyy
      const now = new Date();
      const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth()+1).padStart(2, '0')}-${now.getFullYear()}`;
      // Format time as HH-MM-SS
      const timeStr = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `InsiderHOF-${lpName}-${dateStr}-${timeStr}.json`;
      exportToFile(exportData, filename);
      dispatch(clearExportLP());
    }
  }, [lps.exportLP, dispatch]);

  // Watch for import data changes
  // useEffect(() => {
  //   if (lps.importLP && lps.importLP !== null) {
  //     console.log("✅ Import successful:", lps.importLP);
  //     alert("Landing page importada com sucesso!");
  //   }
  // }, [lps.importLP]);

  const importLP = () => {
    //console.log("🚀 importLP called");
    
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    
    // Add event listener for file selection
    fileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      
      if (!file) {
        //console.log("❌ No file selected");
        return;
      }
      
      // Validate file extension
      if (!file.name.toLowerCase().endsWith('.json')) {
        alert('Por favor, selecione um arquivo no formato .json');
        return;
      }
      
      // Read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = e.target?.result as string;
          const jsonData = JSON.parse(jsonContent);

          //Adiciona o launchPhaseId ao jsonData:
          jsonData.landingPage.launchPhaseId = Number(launchPhaseId);
          
          //console.log("📁 File loaded:", file.name);
          //console.log("📁 JSON data:", jsonData);
          
          // Show confirmation with filename
          if (window.confirm(`Deseja realmente importar o arquivo "${file.name}"?`)) {
            //console.log("✅ Import confirmed, dispatching importLPRequest");
            dispatch(importLPRequest(jsonData.landingPage));
          } else {
            //console.log("❌ Import cancelled by user");
          }
          
        } catch (error) {
          //console.error("❌ Error parsing JSON:", error);
          alert('Erro ao ler o arquivo JSON. Verifique se o arquivo está no formato correto.');
        }
      };
      
      reader.onerror = () => {
        //console.error("❌ Error reading file");
        alert('Erro ao ler o arquivo.');
      };
      
      reader.readAsText(file);
    });
    
    // Trigger file selection
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const duplicateLP = (landingPageId: number) => {
    // console.log("🚀 duplicateLP called with ID:", landingPageId);
    
    // Find the landing page by ID to get its name
    const landingPage = lps.myLPs.find(lp => lp.id === landingPageId);
    const landingPageName = landingPage?.name || 'Landing Page';
    
    // Show confirmation dialog
    if (window.confirm(`Deseja realmente duplicar a landing page "${landingPageName}"?`)) {
      dispatch(duplicateLPRequest(landingPageId));
    }
  };

  const reorderToSave = (children: LP[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateLPRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openLPSessions = (lp: LP) => {
    setSelectedLP(lp);
    setShowLPSessions(true);
    // Carrega as lpsessions específicas da landing page
    dispatch(loadMyLPSessionsRequest(Number(lp.id)));
  };

  const handleBackToLandingPages = () => {
    setShowLPSessions(false);
    setSelectedLP({});
  };

  // Se estiver mostrando LPSessions, renderiza o ManageLPSessionWidget
  if (showLPSessions && selectedLP.id) {
    return (
      <ManageLPSessionWidget 
        className={className} 
        lpsessions={currentLPSessions}
        handleBackToLandingPages={handleBackToLandingPages}
        selectedLP={selectedLP}
        lpfeatures={currentLPFeatures}
      />
    );
  }

  // const openHasLaunchs = (child: LP) => {
  //   setAction("manageLaunchs");
  //   setShow(true);
  //   setChild(child);
  // };

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
            {action === "updateComponent" ? "Editar landing page" : ""}
            {action === "createComponent" ? "Adicionar landing page" : ""}
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
              launchPhaseId={Number(launchPhaseId)}
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

      <div className="widget-container">
        {/* Header */}
        <div className="widget-header">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>
                {launch?.name || "Lançamento"} - {launchPhase?.name}
              </h2>
              <div className="subtitle">
                Gerenciamento de Landing Pages •{" "}
                {lps.myLPs.length} páginas cadastradas
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a landing page"
              >
                <a
                  href="#!"
                  className="btn btn-primary"
                  onClick={() => createComponent()}
                >
                  <KTIcon iconName="plus" className="fs-2" />
                  Nova landing page
                </a>
              </div>

              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Import landing page"
              >
                <a
                  href="#!"
                  className="btn btn-secondary"
                  onClick={() => importLP()}
                >
                  <KTIcon iconName="file-up" className="fs-2" />
                  Importar landing page
                  {(lps.loadingImport || lps.loadingDuplicate) && <span className="spinner-border spinner-border-sm ms-2"></span>}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={`card ${className}`}>
          <div className="card-body py-3">
            <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="min-w-150px">NOME</th>
                    <th className="min-w-150px">SLUG</th>
                    <th className="min-w-200px">DESCRIÇÃO</th>
                    {/* <th className="min-w-100px">ORDEM</th> */}
                    <th className="min-w-100px">STATUS</th>
                    <th className="min-w-100px">LAYOUT</th>
                    <th className="min-w-50px text-end">AÇÕES</th>
                    <th className="w-15px"></th>
                  </tr>
                </thead>
                <Reorder.Group
                  as="tbody"
                  //axis='y'
                  values={lps.myLPs}
                  onReorder={reorder}
                  onTap={(e) => reorderToSave(lps.myLPs)}
                  onMouseUp={(e) => reorderToSave(lps.myLPs)}
                  style={{ touchAction: "none" }}
                >
                  <AnimatePresence>
                    {lps.myLPs.length === 0 && (
                      <tr className="border-0">
                        <td colSpan={8} className="text-center pt-10 ">
                          Nenhuma landing page encontrada aqui. Adicione uma
                          landing page clicando em "Nova landing page".
                        </td>
                      </tr>
                    )}

                    {lps.myLPs.length !== 0 &&
                      lps.myLPs?.map((child: LP, index: number) => {
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
                            <td onPointerDownCapture={(e) => e.stopPropagation()}>
                              <div className="d-flex align-items-center border-0">
                                <div>
                                  <a
                                    href="#!"
                                    onClick={() => openLPSessions(child)}
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
                            <td onPointerDownCapture={(e) => e.stopPropagation()}>
                              <div className="d-flex align-items-center border-0">
                                <div>
                                  <a
                                    href={`https://insiderhof.com.br/${launchPhase?.name === "Vendas" ? "join" : "subscribe"}/${launchPhase?.slug || launchPhaseId}/${child.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "flex" }}
                                    className={`fw-bold text-hover-primary d-block fs-6 ${
                                      isInactive ? "text-muted" : "text-gray-900"
                                    }`}
                                  >
                                    https://insiderhof.com.br/{launchPhase?.name === "Vendas" ? "join" : "subscribe"}/{launchPhase?.slug || launchPhaseId}/{child.slug}
                                  </a>
                                </div>
                              </div>
                            </td>
                            <td onPointerDownCapture={(e) => e.stopPropagation()}>
                              <span className={isInactive ? "text-muted" : ""}>
                                {child.description}
                              </span>
                            </td>
                            {/* <td onPointerDownCapture={(e) => e.stopPropagation()}>
                              <span className={isInactive ? "text-muted" : ""}>
                                {child.order}
                              </span>
                            </td> */}
                            <td onPointerDownCapture={(e) => e.stopPropagation()}>
                              <span className={`badge ${
                                child.status === "1" 
                                  ? "badge-light-success" 
                                  : "badge-light-warning"
                              }`}>
                                {child.status === "1" ? "Ativo" : "Inativo"}
                              </span>
                            </td>
                            <td onPointerDownCapture={(e) => e.stopPropagation()}>
                              <span className={isInactive ? "text-muted" : ""}>
                                {child.layout}
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
                                {/* duplicate */}
                                <a
                                  href="#!"
                                  onClick={() => duplicateLP(Number(child.id))}
                                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                >
                                  <KTIcon iconName="copy" iconType="outline" />
                                </a>
                                {/* export */}
                                <a
                                  href="#!"
                                  onClick={() => exportLP(Number(child.id))}
                                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                >
                                  <KTIcon
                                    iconName="file-down"
                                    iconType="outline"
                                  />
                                </a>
                                <a
                                  href="#!"
                                  onClick={() => updateComponent(child)}
                                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                >
                                  <KTIcon iconName="pencil" iconType="outline" />
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
                      })}
                  </AnimatePresence>
                </Reorder.Group>
              </table>
            </div>
            
            {/* Action Buttons */}
            {handleBackToItems && (
              <div className="action-buttons">
                <Button variant="secondary" size="lg" onClick={handleBackToItems}>
                  <KTIcon iconName="arrow-left" className="fs-5 me-2" />
                  Voltar aos Itens
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageLPWidget };
