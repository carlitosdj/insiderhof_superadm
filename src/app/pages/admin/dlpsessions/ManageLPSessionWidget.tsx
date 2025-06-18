/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";

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

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Config Display Component
const ConfigDisplay: React.FC<{ config: any }> = ({ config }) => {
  if (!config) {
    return (
      <span className="text-muted fw-bold fs-7">
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
          <span className="text-muted fw-bold fs-7">
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
              <span className="text-gray-600 fs-7">
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
    <span className="text-muted fw-bold fs-7">
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
  lpsessions: LPSessionState;
};

const ManageLPSessionWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  lpsessions,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LPSession>({});
  const [oldChildren, setOldChildren] = useState<LPSession[]>(
    lpsessions.myLPSessions
  );

  const { launchPhaseId, lpId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const reorder = (children: LPSession[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLPSessionsRequest(children));
  };

  const reorderToSave = (children: LPSession[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateLPSessionRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openHasLaunchs = (child: LPSession) => {
    setAction("manageLaunchs");
    setShow(true);
    setChild(child);
  };


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
            <Create handleClose={handleClose} lpId={Number(lpId)} />
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
              Sessões do Lançamento
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Sessões nessa fase
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
                Nova sessão
              </a>
            </div>

            {/* <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a user"
            >
              <a
                href="#!"
                className="btn btn-secondary"
                onClick={() => exportLandingPage()}
              >
                <KTIcon iconName="file-down" className="fs-2" />
                Exportar Landing page
              </a>
            </div> */}
          </div>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">NOME</th>
                  <th className="min-w-100px">CONFIG</th>
                  <th className="min-w-100px">ORDEM</th>
                  <th className="min-w-100px">TIPO</th>
                  <th className="min-w-50px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={lpsessions.myLPSessions}
                onReorder={reorder}
                onTap={(e) => reorderToSave(lpsessions.myLPSessions)}
                onMouseUp={(e) => reorderToSave(lpsessions.myLPSessions)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {lpsessions.myLPSessions.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={4} className="text-center pt-10 ">
                        Nenhuma sessão encontrada aqui. Adicione uma sessão
                        clicando em "Nova sessão".
                      </td>
                    </tr>
                  )}

                  {lpsessions.myLPSessions.length !== 0 &&
                    lpsessions.myLPSessions?.map(
                      (child: LPSession, index: number) => {
                        return (
                          <Reorder.Item
                            key={child.id}
                            value={child}
                            as="tr"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td
                              onPointerDownCapture={(e) => e.stopPropagation()}
                            >
                              <div className="d-flex align-items-center border-0">
                                <div>
                                  <Link
                                    to={
                                      "/lpfeatures/" +
                                      launchPhaseId +
                                      "/" +
                                      lpId +
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
                            <td>
                              <ConfigDisplay config={child.config} />
                            </td>
                            <td>
                              {child.order}
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
    </>
  );
};

export { ManageLPSessionWidget };
