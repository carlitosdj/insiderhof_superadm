/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { getAppFileUrl } from "../../../../utils/getApiUrl";

import Create from "./create";
import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";

import {
  deleteClassRequest,
  reorderClassesRequest,
  updateClassRequest,
} from "../../../../store/ducks/dclass/actions";
import { AnimatePresence, Reorder } from "framer-motion";
import { Class } from "../../../../store/ducks/dclass/types";
import InfoProgress from "./infoProgress";
import InfoRate from "./infoRate";

import moment from "moment";
momentDurationFormatSetup(moment);

type Props = {
  className: string;
  classes: Class[];
};

const ManageClassWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  classes,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Class>({});
  const [oldChildren, setOldChildren] = useState<Class[]>(classes);
  const { productId, moduleId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const updateComponent = (child: Class) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (child: Class) => {
    dispatch(deleteClassRequest(child.id!));
  };

  const reorder = (children: Class[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderClassesRequest(children));
  };

  const reorderToSave = (children: Class[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateClassRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  const infoProgress = (child: Class) => {
    setAction("infoProgress");
    setShow(true);
    setChild(child);
  };

  const infoRate = (child: Class) => {
    setAction("infoRate");
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
            {action === "updateComponent" ? "Editar aula" : ""}
            {action === "createComponent" ? "Adicionar aula" : ""}
            {action === "infoProgress" ? "Informações do progresso" : ""}
            {action === "infoRate" ? "Informações RATE" : ""}
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
            <Create handleClose={handleClose} moduleId={Number(moduleId)} />
          ) : (
            ""
          )}
          {action === "infoProgress" ? (
            <InfoProgress handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
          {action === "infoRate" ? (
            <InfoRate handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Aulas</span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Aulas cadastradas no módulo
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
              Adicionar aula
            </a>
          </div>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">AULA</th>

                  <th className="min-w-50px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={classes}
                onReorder={reorder}
                onTap={(e) => reorderToSave(classes)}
                onMouseUp={(e) => reorderToSave(classes)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {classes.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhuma aula encontrado aqui. Adicione uma aula clicando
                        em "Adicionar aula".
                      </td>
                    </tr>
                  )}

                  {classes.length !== 0 &&
                    classes?.map((child: Class, index: number) => {
                      const { image, video } = child;
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
                            className="d-flex align-items-center border-0"
                          >
                            {video && (
                              <div className="symbol symbol-35 symbol-75px overflow-hidden me-3">
                                <div className="symbol-label">
                                  <iframe
                                    title="video"
                                    className="embed-responsive-item rounded"
                                    src={video}
                                    style={{ width: 150 }}
                                    height={75}
                                    frameBorder={0}
                                  />
                                </div>
                              </div>
                            )}
                            {image && (
                              <div className="me-3">
                                <img
                                  className="embed-responsive-item rounded"
                                  height={75}
                                  src={
                                    image?.includes("https://")
                                      ? image
                                      : getAppFileUrl(image)
                                  }
                                  // style={{ width: "100%" }}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = getAppFileUrl("notfound.jpg");
                                  }}
                                />
                              </div>
                            )}

                            <div className="d-flex flex-row">
                              <div>
                                <Link
                                  to={
                                    "/extras/" +
                                    productId +
                                    "/" +
                                    moduleId +
                                    "/" +
                                    child.id
                                  }
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

                                <div className="text-muted fw-semibold text-muted d-block fs-7">
                                  {moment.duration(
                                    child.duration,
                                    "seconds"
                                  ).format("hh:mm:ss", {
                                    trim: false,
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
                              <a
                                href="#!"
                                onClick={() => infoRate(child)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="eye" iconType="outline" />
                                <span className="text-muted ">
                                  <small>
                                    &nbsp;
                                    {child.rate
                                      ?.filter((child) => child.rate)
                                      .reduce(
                                        (avg, value, _, { length }) =>
                                          avg + value.rate! / length,
                                        0
                                      )
                                      .toFixed(2) + " "}
                                  </small>
                                </span>
                              </a>

                              <a
                                href="#!"
                                onClick={() => infoProgress(child)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="eye" iconType="outline" />
                                <span className="text-muted ">
                                  <small>&nbsp;{child.completed?.length}</small>
                                </span>
                              </a>

                              {/* <a
                                href="#!"
                                onClick={() =>
                                  navigate(
                                    "/extras/" +
                                      productId +
                                      "/" +
                                      moduleId +
                                      "/" +
                                      child.id
                                  )
                                }
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="switch" iconType="outline" />
                              </a> */}
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

export { ManageClassWidget };
