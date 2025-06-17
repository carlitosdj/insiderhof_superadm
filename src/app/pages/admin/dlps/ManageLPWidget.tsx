/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";

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
} from "../../../../store/ducks/dlps/actions";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  lps: LPState;
};

const ManageLPWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  lps,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LP>({});
  const [oldChildren, setOldChildren] = useState<LP[]>(lps.myLPs);

  const { launchPhaseId } = useParams();

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
    //console.log("🔍 useEffect triggered - exportLP data:", lps.exportLP);

    if (lps.exportLP && lps.exportLP !== null) {
      //console.log("✅ Export data received, processing...");

      // Clean the export data
      const cleanedData = removeIdsAndTimestamps(lps.exportLP);
      //console.log("🧹 Cleaned data:", cleanedData);

      // Create export data structure
      const exportData = {
        landingPage: cleanedData,
        //exportDate: new Date().toISOString(),
        //totalSessions: cleanedData.sessions?.length || 0,
        //totalFeatures: cleanedData.sessions?.reduce((acc: number, session: any) =>
        //  acc + (session.features?.length || 0), 0) || 0
      };

      // Generate filename
      const date = new Date().toISOString().split("T")[0];
      const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-");
      const filename = `landing-page-export-${date}-${time}.json`;

      // Export to file
      //console.log("📁 About to call exportToFile with filename:", filename);
      exportToFile(exportData, filename);

      //console.log("✅ Landing page exported successfully", cleanedData);
    } else if (lps.exportLP === null) {
      //console.log("⚠️ Export data is null");
    } else if (!lps.exportLP) {
      //console.log("⚠️ Export data is undefined");
    }
  }, [lps.exportLP]);

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

  // const openHasLaunchs = (child: LP) => {
  //   setAction("manageLaunchs");
  //   setShow(true);
  //   setChild(child);
  // };

  return (
    <>
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

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              Landing Pages
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Páginas nessa fase
            </span>
          </h3>
          <div className="d-flex justify-content-end align-items-center gap-2">
            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a user"
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
              title="Click to add a user"
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

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">NOME</th>
                  <th className="min-w-150px">SLUG</th>
                  <th className="min-w-200px">DESCRIÇÃO</th>
                  <th className="min-w-100px">ORDEM</th>
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
                      <td colSpan={5} className="text-center pt-10 ">
                        Nenhuma landing page encontrada aqui. Adicione uma
                        landing page clicando em "Nova landing page".
                      </td>
                    </tr>
                  )}

                  {lps.myLPs.length !== 0 &&
                    lps.myLPs?.map((child: LP, index: number) => {
                      return (
                        <Reorder.Item
                          key={child.id}
                          value={child}
                          as="tr"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <Link
                                  to={
                                    "/lpsessions/" +
                                    launchPhaseId +
                                    "/" +
                                    child.id
                                  }
                                  style={{ display: "flex" }}
                                  className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                >
                                  {child.name}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <Link
                                  to={
                                    "/lpsessions/" +
                                    launchPhaseId +
                                    "/" +
                                    child.id
                                  }
                                  style={{ display: "flex" }}
                                  className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                >
                                  {child.slug}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.description}
                          </td>
                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            {child.order}
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
        </div>
      </div>
    </>
  );
};

export { ManageLPWidget };
