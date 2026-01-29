/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Modal, Badge } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";

import Create from "./create";
import Update from "./update";

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

import moment from "moment";
momentDurationFormatSetup(moment);

// Estilos CSS customizados inspirados no Resume.tsx
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

  const lpsessions = () => {
    navigate("/lps/" + launchPhaseId);
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
    children.map((child) => {
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
      children.map((child) => {
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

      <div className="widget-container">
        {/* Header */}
        <div className="widget-header">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>
                {launch?.name || "Lançamento"} - {launchPhase?.name}
              </h2>
              <div className="subtitle">
                Gerenciamento de itens da fase •{" "}
                {launchphaseextras.myLaunchPhaseExtras.length} itens cadastrados
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center gap-2">
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a item"
              >
                <a
                  //href="#!"
                  className="btn btn-primary"
                  onClick={() => createComponent()}
                >
                  <KTIcon iconName="plus" className="fs-2" />
                  Novo item
                </a>
              </div>
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Manage landing pages"
              >
                <a
                  //href="#!"
                  className="btn btn-secondary"
                  onClick={() => lpsessions()}
                >
                  <KTIcon iconName="plus" className="fs-2" />
                  Landing Pages
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
                    <th className="min-w-150px">ITEM</th>
                    <th className="min-w-150px">VALUE</th>
                    <th className="min-w-50px text-end">AÇÕES</th>
                    <th className="w-15px"></th>
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
                  <AnimatePresence>
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
                                    <Link
                                      to={"/launchhasoffers/" + child.id}
                                      style={{ display: "flex" }}
                                      className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                    >
                                      {child.key}
                                    </Link>
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
    </>
  );
};

export { ManageLaunchPhaseExtraWidget };
