/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Modal, Badge } from "react-bootstrap";
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
  LaunchPhaseExtras,
  LaunchPhaseExtrasState,
} from "../../../../store/ducks/dlaunchphaseextras/types";
import {
  deleteLaunchPhaseExtrasRequest,
  reorderLaunchPhaseExtrasRequest,
  updateLaunchPhaseExtrasRequest,
} from "../../../../store/ducks/dlaunchphaseextras/actions";


const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Estilos CSS padronizados para o novo layout
const widgetStyles = `
  .phase-extra-container {
    padding: 1.5rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #f8f9fa;
  }
  
  .phase-extra-wrapper {
    background: white;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    flex: 1;
  }
  
  .phase-extra-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e4e6ea;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .phase-extra-header h3 {
    margin: 0;
    color: #181c32;
    font-weight: 600;
    font-size: 1.2rem;
  }
  
  .phase-extra-header .subtitle {
    color: #7e8299;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .phase-extra-content {
    padding: 0;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .phase-extra-container {
      padding: 1rem;
    }
  }
  
  .extra-item {
    margin-top: 0.5rem;
  }
  
  .status-badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .card {
    border: none;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
  }
  
  .card-header {
    background: transparent;
    border-bottom: 1px solid #e9ecef;
    padding: 1.5rem;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  /* Table responsiveness fixes */
  .table-responsive {
    overflow-x: hidden !important;
  }
  
  .table {
    table-layout: fixed !important;
    width: 100% !important;
  }
  
  .table th, .table td {
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    text-overflow: ellipsis !important;
  }
`;

type Props = {
  className: string;
  launchphaseextras: LaunchPhaseExtrasState;
  launchPhaseId: number;
};

const ManageLaunchPhaseExtraWidget: React.FC<
  React.PropsWithChildren<Props>
> = ({ className, launchphaseextras, launchPhaseId }) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LaunchPhaseExtras>({});
  const [oldChildren, setOldChildren] = useState<LaunchPhaseExtras[]>(
    launchphaseextras.myLaunchPhaseExtras
  );

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



  //const { launchPhaseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };



  const updateComponent = (child: LaunchPhaseExtras) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: LaunchPhaseExtras) => {
    dispatch(deleteLaunchPhaseExtrasRequest(child.id!));
  };

  const reorder = (children: LaunchPhaseExtras[]) => {
    // console.log("children", children);
    children.forEach((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLaunchPhaseExtrasRequest(children));
  };

  const reorderToSave = (children: LaunchPhaseExtras[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.forEach((child) => {
        dispatch(
          updateLaunchPhaseExtrasRequest({ id: child.id, order: child.order })
        );
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openHasLaunchs = (child: LaunchPhaseExtras) => {
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

      <div className="phase-extra-container">
        {/* Header Card Padronizado */}
        <LaunchHeaderCard phaseName={launchPhase?.name} />
        
        <div className="phase-extra-wrapper">
          {/* Content Header */}
          <div className="phase-extra-header">
            <div>
              <h3>
                <KTIcon iconName="gear" className="fs-4 text-primary me-2" />
                Itens da Fase - {launchPhase?.name}
              </h3>
              <div className="subtitle">
                {launchphaseextras.myLaunchPhaseExtras.length} itens cadastrados
              </div>
            </div>
            
            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-primary"
                onClick={() => createComponent()}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Adicionar novo item"
              >
                <KTIcon iconName="plus" className="fs-6 me-2" />
                Novo Item
              </button>
            </div>
          </div>

          <div className="phase-extra-content">
            <div className="card-body py-3">
              <div className="table-responsive">
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th style={{width: "25%", maxWidth: "150px"}}>ITEM</th>
                    <th style={{width: "25%", maxWidth: "150px"}}>VALUE</th>
                    <th style={{width: "20%", maxWidth: "120px"}}>NAME</th>
                    <th style={{width: "15%", maxWidth: "100px"}}>TYPE</th>
                    <th style={{width: "10%", minWidth: "80px"}} className="text-end">AÇÕES</th>
                    <th style={{width: "5%", minWidth: "40px"}}></th>
                  </tr>
                </thead>
                <Reorder.Group
                  as="tbody"
                  //axis='y'
                  values={launchphaseextras.myLaunchPhaseExtras}
                  onReorder={reorder}
                  onTap={(e) =>
                    reorderToSave(launchphaseextras.myLaunchPhaseExtras)
                  }
                  onMouseUp={(e) =>
                    reorderToSave(launchphaseextras.myLaunchPhaseExtras)
                  }
                  style={{ touchAction: "none" }}
                >
                  {/* <AnimatePresence> */}
                    {launchphaseextras.myLaunchPhaseExtras.length === 0 && (
                      <tr className="border-0">
                        <td colSpan={3} className="text-center pt-10 ">
                          Nenhuma launch encontrada aqui. Adicione uma launch
                          clicando em "Nova launch".
                        </td>
                      </tr>
                    )}

                    {launchphaseextras.myLaunchPhaseExtras.length !== 0 &&
                      launchphaseextras.myLaunchPhaseExtras?.map(
                        (child: LaunchPhaseExtras, index: number) => {
                          return (
                            <Reorder.Item
                              key={child.id}
                              value={child}
                              as="tr"
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <td
                                onPointerDownCapture={(e) =>
                                  e.stopPropagation()
                                }
                              >
                                <div className="d-flex align-items-center border-0">
                                  <div>
                                    <div
                                      //to={"/launchhasoffers/" + child.id}
                                      style={{ display: "flex" }}
                                      className="text-gray-900 fw-bold  d-block fs-6"
                                    >
                                      {child.key}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td
                                onPointerDownCapture={(e) =>
                                  e.stopPropagation()
                                }
                              >
                                {child.value}
                              </td>
                              <td>
                                {child.name}
                              </td>
                              <td>
                                {child.type}
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
                                  {/* <a
                                    href="#!"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Deseja realmente excluir: " +
                                            child.key +
                                            "?"
                                        )
                                      )
                                        deleteComponent(child);
                                    }}
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                  >
                                    <KTIcon
                                      iconName="trash"
                                      iconType="outline"
                                    />
                                  </a> */}
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
                  {/* </AnimatePresence> */}
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

export { ManageLaunchPhaseExtraWidget };
