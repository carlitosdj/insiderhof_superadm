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

// Componente separado para cada item da lista
const ClassExtraItem: React.FC<{
  child: ClassExtra;
  index: number;
  updateComponent: (child: ClassExtra) => void;
  deleteComponent: (extra: ClassExtra) => void;
}> = ({
  child,
  index,
  updateComponent,
  deleteComponent,
}) => {
  return (
    <Reorder.Item
      key={child.id}
      value={child}
      as="div"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -2,
        transition: { duration: 0.2 },
      }}
    >
      <div
        className="card border mb-2 mb-md-3 class-extra-card"
        style={{
          transition: "all 0.3s ease",
          borderRadius: "6px",
        }}
        onMouseEnter={(e) => {
          if (window.innerWidth > 768) {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }
        }}
        onMouseLeave={(e) => {
          if (window.innerWidth > 768) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
            <div className="d-flex align-items-center flex-grow-1 w-100">
              {/* Preview da imagem se for do tipo img */}
              {child.key === "img" && child.value && (
                <div className="me-3 me-md-4 flex-shrink-0">
                  <div
                    className="rounded-3 overflow-hidden"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <img
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      src={
                        "https://app.insiderhof.com.br/files/" + child.value
                      }
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "https://app.insiderhof.com.br/files/notfound.jpg";
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Preview do vídeo se for do tipo video */}
              {child.key === "video" && child.value && (
                <div className="me-3 me-md-4 flex-shrink-0">
                  <div
                    className="rounded-3 overflow-hidden"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <iframe
                      title="video"
                      className="w-100 h-100"
                      src={child.value}
                      frameBorder={0}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              )}

              {/* Ícone para outros tipos */}
              {child.key !== "img" && child.key !== "video" && (
                <div className="me-3 me-md-4 flex-shrink-0">
                  <div
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "90px",
                      height: "90px",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    <KTIcon
                      iconName={
                        child.key === "link"
                          ? "link"
                          : child.key === "file"
                          ? "document"
                          : "element-plus"
                      }
                      className="fs-2 text-muted"
                    />
                  </div>
                </div>
              )}

              <div className="flex-grow-1 min-w-0 me-3 me-md-4">
                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mb-2 gap-2">
                  <h5 className="fw-bold text-dark mb-0 fs-6 fs-md-5">
                    {child.name}
                  </h5>

                  <span className="badge bg-light-primary text-primary fs-8 fs-md-7 fw-semibold">
                    {child.key === "link"
                      ? "Link"
                      : child.key === "file"
                      ? "Arquivo"
                      : child.key === "img"
                      ? "Imagem"
                      : child.key === "video"
                      ? "Vídeo"
                      : "Item"}
                  </span>
                </div>

                <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
                  <div className="d-flex align-items-center gap-1">
                    <KTIcon iconName="tag" className="fs-6 text-primary" />
                    <span className="text-muted fs-8 fs-md-7">
                      {child.key}
                    </span>
                  </div>
                </div>

                {/* Preview do conteúdo */}
                <div className="mt-2">
                  {child.key === "img" && (
                    <a
                      target="_blank"
                      href={
                        "https://app.insiderhof.com.br/files/" + child.value
                      }
                      className="text-decoration-none"
                    >
                      <span className="text-muted fs-8 fs-md-7">
                        Ver imagem
                      </span>
                    </a>
                  )}

                  {child.key === "link" && (
                    <a
                      href={child.value}
                      target="_blank"
                      className="text-decoration-none"
                    >
                      <span className="text-muted fs-8 fs-md-7">
                        {child.value?.length! > 50
                          ? child.value?.substring(0, 50) + "..."
                          : child.value}
                      </span>
                    </a>
                  )}

                  {child.key === "video" && (
                    <a
                      href={child.value}
                      target="_blank"
                      className="text-decoration-none"
                    >
                      <span className="text-muted fs-8 fs-md-7">
                        {child.value?.length! > 50
                          ? child.value?.substring(0, 50) + "..."
                          : child.value}
                      </span>
                    </a>
                  )}

                  {child.key === "file" && (
                    <a
                      href={
                        "https://app.insiderhof.com.br/files/" + child.value
                      }
                      target="_blank"
                      className="text-decoration-none"
                    >
                      <span className="text-muted fs-8 fs-md-7">
                        {child.value}
                      </span>
                    </a>
                  )}

                  {child.key !== "img" &&
                    child.key !== "link" &&
                    child.key !== "video" &&
                    child.key !== "file" && (
                      <span className="text-muted fs-8 fs-md-7">
                        {child.value?.length! > 80
                          ? child.value?.substring(0, 80) + "..."
                          : child.value}
                      </span>
                    )}
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2 flex-shrink-0 w-100 w-md-auto justify-content-between">
              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => updateComponent(child)}
                  title="Editar item"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="pencil" className="fs-6" />
                </button>

                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                  onClick={() => {
                    if (
                      window.confirm(
                        `Deseja realmente excluir "${child.name}"?`
                      )
                    ) {
                      deleteComponent(child);
                    }
                  }}
                  title="Excluir item"
                  style={{ width: "36px", height: "36px" }}
                >
                  <KTIcon iconName="trash" className="fs-6" />
                </button>

                {/* DRAG HANDLE */}
                <div
                  className="drag-handle"
                  style={{
                    cursor: "grab",
                    width: "36px",
                    height: "36px",
                    borderRadius: "4px",
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #dee2e6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    touchAction: "none",
                  }}
                >
                  <KTIcon
                    iconName="arrow-up-down"
                    className="text-muted fs-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
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

      <div className={`card ${className} border-0`}>
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
                <KTIcon iconName="plus" className="fs-2" />
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

        <div className="card-body py-3 px-3 px-md-4">
          <div className="d-flex flex-column gap-3">
            <Reorder.Group
              as="div"
              values={classextras}
              onReorder={reorder}
              onTap={(e) => reorderToSave(classextras)}
              onMouseUp={(e) => reorderToSave(classextras)}
              style={{ touchAction: "pan-y" }}
            >
              <AnimatePresence>
                {classextras.length === 0 && (
                  <div className="text-center py-8 py-md-12 px-3">
                    <div className="mb-3 mb-md-4">
                      <KTIcon
                        iconName="element-plus"
                        className="fs-2 fs-md-1 text-muted opacity-50"
                      />
                    </div>
                    <h4 className="fw-bold text-dark mb-2 fs-5 fs-md-4">
                      Nenhum item encontrado
                    </h4>
                    <p className="text-muted mb-4 fs-7 fs-md-6">
                      Comece adicionando links e downloads para enriquecer o conteúdo da aula
                    </p>
                    <div className="btn-group">
                      <button
                        className="btn btn-dark px-3 px-md-4 py-2 rounded-1 dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <KTIcon iconName="plus" className="me-2" />
                        Adicionar Primeiro Item
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            href="#!"
                            onClick={() => createItem()}
                            className="dropdown-item"
                          >
                            <KTIcon iconName="pencil" iconType="outline" /> Adicionar key/value
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            onClick={() => createLink()}
                            className="dropdown-item"
                          >
                            <KTIcon iconName="pencil" iconType="outline" /> Adicionar link
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            onClick={() => createImage()}
                            className="dropdown-item"
                          >
                            <KTIcon iconName="pencil" iconType="outline" /> Adicionar imagem
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            onClick={() => createFile()}
                            className="dropdown-item"
                          >
                            <KTIcon iconName="pencil" iconType="outline" /> Adicionar arquivo
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            onClick={() => createVideo()}
                            className="dropdown-item"
                          >
                            <KTIcon iconName="pencil" iconType="outline" /> Adicionar vídeo
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {classextras.length !== 0 &&
                  classextras?.map((child: ClassExtra, index: number) => (
                    <ClassExtraItem
                      key={child.id}
                      child={child}
                      index={index}
                      updateComponent={updateComponent}
                      deleteComponent={deleteComponent}
                    />
                  ))}
              </AnimatePresence>
            </Reorder.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageClassExtrasWidget };
