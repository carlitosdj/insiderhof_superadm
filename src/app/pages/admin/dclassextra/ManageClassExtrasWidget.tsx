/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";
import { ClassExtra } from "../../../../store/ducks/dclassextra/types";
import {
  deleteClassExtraRequest,
  reorderClassExtrasRequest,
  updateClassExtraRequest,
} from "../../../../store/ducks/dclassextra/actions";
import CreateLink from "./create_link";
import CreateFile from "./create_file";
import CreateImage from "./create_img";
import CreateVideo from "./create_video";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  classextras: ClassExtra[];
};

const ManageClassExtrasWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  classextras,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<ClassExtra>({});
  const [oldChildren, setOldChildren] = useState<ClassExtra[]>(classextras);
  const { productId, courseId, moduleId, classId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };

  const createItem = () => {
    setAction("createItem");
    setShow(true);
  };

  const createLink = () => {
    setAction("createLink");
    setShow(true);
  };

  const createFile = () => {
    setAction("createFile");
    setShow(true);
  };

  const createImage = () => {
    setAction("createImage");
    setShow(true);
  };

  const createVideo = () => {
    setAction("createVideo");
    setShow(true);
  };

  const createAudio = () => {
    setAction("createAudio");
    setShow(true);
  };

  const updateComponent = (child: ClassExtra) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (extra: ClassExtra) => {
    dispatch(deleteClassExtraRequest(extra.id!));
  };

  const reorder = (children: ClassExtra[]) => {
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderClassExtrasRequest(children));
  };

  const reorderToSave = (children: ClassExtra[]) => {
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(updateClassExtraRequest({ id: child.id, order: child.order }));
      });
      setOldChildren(children);
    }
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
            {action === "updateComponent" ? "Editar item" : ""}
            {action === "createItem" ? "Adicionar item" : ""}
            {action === "createLink" ? "Adicionar link" : ""}
            {action === "createFile" ? "Adicionar arquivo" : ""}
            {action === "createImage" ? "Adicionar imagem" : ""}
            {action === "createVideo" ? "Adicionar video" : ""}
            {/* {action === "createAudio" ? "Adicionar audio" : ""} */}
          </h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {action === "updateComponent" && (
            <Update handleClose={handleClose} child={child} />
          )}
          {action === "createItem" && (
            <Create handleClose={handleClose} classId={Number(classId)} />
          )}
          {action === "createLink" && (
            <CreateLink handleClose={handleClose} classId={Number(classId)} />
          )}
          {action === "createFile" && (
            <CreateFile handleClose={handleClose} classId={Number(classId)} />
          )}
          {action === "createImage" && (
            <CreateImage handleClose={handleClose} classId={Number(classId)} />
          )}
          {action === "createVideo" && (
            <CreateVideo handleClose={handleClose} classId={Number(classId)} />
          )}
          {/* {action === "createAudio" && (
            <Create handleClose={handleClose} classId={Number(classId)} />
          )} */}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              Links e Downloads
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Links e downloads na aula
            </span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            <div className="btn-group">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Adicionar download & links
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton2"
              >
                <li>
                  <a
                    href="#!"
                    onClick={() => createItem()}
                    className="dropdown-item"
                  >
                    <KTIcon iconName="pencil" iconType="outline" /> Adicionar
                    key/value
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={() => createLink()}
                    className="dropdown-item"
                  >
                    <KTIcon iconName="pencil" iconType="outline" /> Adicionar
                    link
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={() => createImage()}
                    className="dropdown-item"
                  >
                    <KTIcon iconName="pencil" iconType="outline" /> Adicionar
                    imagem
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={() => createFile()}
                    className="dropdown-item"
                  >
                    <KTIcon iconName="pencil" iconType="outline" /> Adicionar
                    arquivo
                  </a>
                </li>
                <li>
                  <a
                    href="#!"
                    onClick={() => createVideo()}
                    className="dropdown-item"
                  >
                    <KTIcon iconName="pencil" iconType="outline" /> Adicionar
                    vídeo Youtube/Vimeo
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#!"
                    onClick={() => createAudio()}
                    className="dropdown-item"
                  >
                    <KTIcon iconName="pencil" iconType="outline" /> Adicionar
                    Audio
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-150px">ITEM</th>

                  <th className="min-w-50px text-end">AÇÕES</th>
                  <th className="w-15px"></th>
                </tr>
              </thead>
              <Reorder.Group
                as="tbody"
                //axis='y'
                values={classextras}
                onReorder={reorder}
                onTap={(e) => reorderToSave(classextras)}
                onMouseUp={(e) => reorderToSave(classextras)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>
                  {classextras.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhum item encontrado aqui. Adicione um item clicando
                        em "Adicionar item".
                      </td>
                    </tr>
                  )}

                  {classextras.length !== 0 &&
                    classextras?.map((child: ClassExtra, index: number) => {
                      //const { image } = child;
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
                            {/* {image && (
                              <div className="me-3">
                                <img
                                  className="embed-responsive-item rounded"
                                  height={75}
                                  src={
                                    image?.includes("https://")
                                      ? image
                                      : "https://app.insiderhof.com.br/files/" +
                                        image
                                  }
                                  // style={{ width: "100%" }}
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "https://app.insiderhof.com.br/files/notfound.jpg";
                                  }}
                                />
                              </div>
                            )} */}

                            <div className="d-flex flex-row">
                              <div>
                                <div
                                  style={{ display: "flex" }}
                                  className="text-gray-900 fw-bold  d-block fs-6"
                                >
                                  {child.name}
                                </div>
                                <div
                                  style={{ display: "flex" }}
                                  className="text-gray-900 d-block fs-6"
                                >
                                  {child.key}
                                </div>

                                <span className="text-muted fw-semibold text-muted d-block fs-7">
                                  {child.key === "img" && (
                                    <a
                                      target="_blank"
                                      href={
                                        "https://app.insiderhof.com.br/files/" +
                                        child.value
                                      }
                                    >
                                      <img
                                        src={
                                          "https://app.insiderhof.com.br/files/" +
                                          child.value
                                        }
                                        width="100"
                                      />
                                    </a>
                                  )}

                                  {child.key === "link" && (
                                    <a href={child.value} target="_blank">
                                      {child.value}
                                    </a>
                                  )}

                                  {child.key === "video" && (
                                    <a href={child.value} target="_blank">
                                      {child.value}
                                    </a>
                                  )}

                                  {child.key === "file" && (
                                    <a
                                      href={
                                        "https://app.insiderhof.com.br/files/" +
                                        child.value
                                      }
                                      target="_blank"
                                    >
                                      {child.value}
                                    </a>
                                  )}

                                  {child.key !== "img" &&
                                    child.key !== "link" &&
                                    child.key !== "video" &&
                                    child.key !== "file" && (
                                      <div>{child.value}</div>
                                    )}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex justify-content-end flex-shrink-0">
                              <a
                                href="#!"
                                onClick={() => navigate("/courses/" + child.id)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="switch" iconType="outline" />
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

export { ManageClassExtrasWidget };
