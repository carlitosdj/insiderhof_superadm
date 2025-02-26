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

import Manage from "../dlaunchhasoffers/Manage";
import {
  LaunchPhases,
  LaunchPhasesState,
} from "../../../../store/ducks/dlaunchphase/types";
import {
  deleteLaunchPhasesRequest,
  reorderLaunchPhasesRequest,
  updateLaunchPhasesRequest,
} from "../../../../store/ducks/dlaunchphase/actions";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  launchphases: LaunchPhasesState;
};

const ManageLaunchPhaseWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  launchphases,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LaunchPhases>({});
  const [oldChildren, setOldChildren] = useState<LaunchPhases[]>(
    launchphases.myLaunchPhases
  );

  const { launchId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const updateComponent = (child: LaunchPhases) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: LaunchPhases) => {
    dispatch(deleteLaunchPhasesRequest(child.id!));
  };

  const reorder = (children: LaunchPhases[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLaunchPhasesRequest(children));
  };

  const reorderToSave = (children: LaunchPhases[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(
          updateLaunchPhasesRequest({ id: child.id, order: child.order })
        );
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const openHasLaunchs = (child: LaunchPhases) => {
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
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              Fases do lançamento
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerencie as fases do lançamento
            </span>
          </h3>
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
              Nova fase
            </a>
          </div>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-50px">FASE</th>
                  <th className="min-w-50px">ACESSO</th>

                  <th className="min-w-50px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={launchphases.myLaunchPhases}
                onReorder={reorder}
                onTap={(e) => reorderToSave(launchphases.myLaunchPhases)}
                onMouseUp={(e) => reorderToSave(launchphases.myLaunchPhases)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {launchphases.myLaunchPhases.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhuma launch encontrada aqui. Adicione uma launch
                        clicando em "Nova launch".
                      </td>
                    </tr>
                  )}

                  {launchphases.myLaunchPhases.length !== 0 &&
                    launchphases.myLaunchPhases?.map(
                      (child: LaunchPhases, index: number) => {
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
                                    to={"/launchphaseextra/" + child.id}
                                    style={{ display: "flex" }}
                                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                  >
                                    {child.name}
                                  </Link>

                                  <span className="text-muted fw-semibold text-muted d-block fs-7">
                                    {child.description?.length! > 50
                                      ? child.description?.substring(0, 50) +
                                        "..."
                                      : child.description}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td
                              onPointerDownCapture={(e) => e.stopPropagation()}
                            >
                              <span className="text-muted fw-semibold text-muted d-block fs-7">
                                <a
                                  target={"_blank"}
                                  href={
                                    child.name == "Captação"
                                      ? "https://insiderhof.com.br/lead/subscribe/" +
                                        child.slug +
                                        "/site"
                                      : ""
                                  }
                                >
                                  {" "}
                                  {child.name == "Captação"
                                    ? "https://insiderhof.com.br/lead/subscribe/" +
                                      child.slug +
                                      "/site"
                                    : ""}{" "}
                                </a>
                                <a
                                  target={"_blank"}
                                  href={
                                    child.name == "Evento"
                                      ? "https://insiderhof.com.br/class/" +
                                        child.slug +
                                        "/aula01"
                                      : ""
                                  }
                                >
                                  {" "}
                                  {child.name == "Evento"
                                    ? "https://insiderhof.com.br/class/" +
                                      child.slug +
                                      "/aula01"
                                    : ""}{" "}
                                </a>
                                <a
                                  target={"_blank"}
                                  href={
                                    child.name == "Vendas"
                                      ? "https://insiderhof.com.br/sale/subscribe/" +
                                        child.slug +
                                        ""
                                      : ""
                                  }
                                >
                                  {child.name == "Vendas"
                                    ? "https://insiderhof.com.br/sale/subscribe/" +
                                      child.slug +
                                      ""
                                    : ""}
                                </a>
                              </span>
                            </td>

                            <td>
                              <div className="d-flex justify-content-end flex-shrink-0">
                                <a
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
                                </a>
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

export { ManageLaunchPhaseWidget };
