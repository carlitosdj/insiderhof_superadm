/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Component,
  ComponentState,
} from "../../../../store/ducks/component/types";
import { useDispatch } from "react-redux";
import {
  deleteComponentRequest,
  reorderComponentRequest,
  updateComponentRequest,
} from "../../../../store/ducks/component/actions";
import { useNavigate } from "react-router-dom";
import {
  Reorder,
  useDragControls,
  AnimatePresence,
  motion,
} from "framer-motion";
import Create from "./create";
import Update from "./update";
import ManageAvailable from "./ManageAvailable";
import InfoProgress from "./infoProgress";
import { KTIcon, KTSVG, toAbsoluteUrl } from "../../../../_metronic/helpers";
import momentDurationFormatSetup from "moment-duration-format";
import { CreateAppModal } from "../../../../_metronic/partials";
import { ManageItemExtraWidget } from "./ManageItemExtraWidget";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  comp: ComponentState;
};

const ManageItemWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  comp,
}) => {
  // console.log('COMP AQUI', comp)
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Component>({});

  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);

  const [openExtra, setOpenExtra] = useState<boolean>(false);
  const [openedId, setOpenedId] = useState<number>(0);

  const [oldChildren, setOldChildren] = useState<Component[]>(
    comp.data.children!
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };


  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  const updateComponent = (child: Component) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  const manageAvailable = (child: Component) => {
    setAction("manageAvailable");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (component: Component) => {
    dispatch(deleteComponentRequest(component.id!));
  };

  const infoProgress = (child: Component) => {
    setAction("infoProgress");
    setShow(true);
    setChild(child);
  };

  const reorder = (children: Component[]) => {
    console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: (index + 1).toString() }; // Replaces the object with id 2
      }
    });
    dispatch(reorderComponentRequest(children));
  };

  const open = (open: boolean, id: number) => {
    setOpenedId(id);
    setOpenExtra(open);

    if (id !== openedId) {
      setOpenExtra(true);
    }
  };

  const reorderToSave = (children: Component[]) => {
    // console.log("Reorder to save??? CHILDREN", children);
    // console.log("Reorder to save??? oldChildren", oldChildren);
    console.log(oldChildren === children);

    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      //Só altera aqui dentro:
      //TODO: Checar quais nós foram alterados, e atualizar o backend:

      // _.difference(oldChildren, children).map((child) => {
      //   console.log('child DIFFERENCE', child)
      //   //dispatch(updateComponentRequest({id: child.id, order: child.order}))
      // })

      // console.log('reorderToSave', children)
      children.map((child) => {
        //console.log('child', child)
        dispatch(updateComponentRequest({ id: child.id, order: child.order }));
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  console.log("**********comp********", comp);

  return (
    <>
      <CreateAppModal
        show={showCreateAppModal}
        handleClose={() => setShowCreateAppModal(false)}
      />
      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={show}
        onHide={handleClose}
        //onEntered={loadStepper}
        backdrop={true}

        // size="lg"
        // show={show}
        // onHide={handleClose}
        // enforceFocus={false} ////ckeditor link hack
        // // centered
        // backdrop="static"
        // keyboard={false}
        // fullscreen={"sm-down"}
      >
        <div className="modal-header">
          <h2>
            {action === "createComponent" ? "Adicionar componente" : ""}
            {action === "updateComponent" ? "Editar componente" : ""}
            {action === "manageAvailable" ? child.name : ""}
            {action === "infoProgress" ? "Informações do progresso" : ""}
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
          {action === "createComponent" ? (
            <Create handleClose={handleClose} />
          ) : (
            ""
          )}
          {action === "updateComponent" ? (
            <Update handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
          {action === "manageAvailable" ? (
            <ManageAvailable handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
          {action === "infoProgress" ? (
            <InfoProgress handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              {comp.data.name}
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              {comp.data?.description?.length! > 50
                ? comp.data.description?.substring(0, 50) + "..."
                : comp.data.description}
            </span>
          </h3>
          <div
            className="card-toolbar"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-trigger="hover"
            title="Click to add a user"
          >
            {/* <a
              href="#"
              onClick={() => setShowCreateAppModal(true)}
              className="btn btn-sm fw-bold btn-primary"
            >
              Createxxx
            </a> */}

            <a
              href="#!"
              className="btn btn-light-primary"
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Adicionar componente
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}

        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}

            {comp.data.children?.length === 0 && (
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                {/* begin::Table head */}
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="w-15px"></th>
                    <th className="min-w-100px">COMPONENTE</th>

                    <th className="min-w-100px text-end">AÇÕES</th>
                  </tr>
                </thead>
                <tr className="border-0">
                  <td colSpan={3} className="text-center pt-10 ">
                    Nenhum componente encontrado aqui. Adicione um componente
                    clicando em "Adicionar componente".
                  </td>
                </tr>
              </table>
            )}

            {comp.data.children?.length !== 0 && (
              <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                {/* begin::Table head */}
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="min-w-150px">COMPONENTE</th>
                    <th className="min-w-50px text-end">AÇÕES</th>
                    <th className="w-15px"></th>
                  </tr>
                </thead>
                {/* end::Table head */}
                {/* begin::Table body */}
                <Reorder.Group
                  as="tbody"
                  //axis='y'
                  values={comp.data.children!}
                  onReorder={reorder}
                  onTap={(e) => reorderToSave(comp.data.children!)}
                  onMouseUp={(e) => reorderToSave(comp.data.children!)}
                  style={{ touchAction: "none" }}
                >
                  <AnimatePresence>
                    {comp.data.children!?.map((child: Component, index) => {
                      const { extras } = child;
                      const image = extras?.filter(
                        (extra) => extra.keyExtra === "img"
                      )[0]?.valueExtra;
                      const url = extras?.filter(
                        (extra) => extra.keyExtra === "url"
                      )[0]?.valueExtra;
                      const file = extras?.filter(
                        (extra) => extra.keyExtra === "file"
                      );
                      const link = extras?.filter(
                        (extra) => extra.keyExtra === "link"
                      );
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
                            {image && (
                              <div className="me-3">
                                <img
                                  className="embed-responsive-item rounded"
                                  height={75}
                                  //src={users.user.image}
                                  //src={ image?.includes('https://') ? image : '../../files/' + image}
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
                            )}

                            {url && (
                              <div className="symbol symbol-35 symbol-75px overflow-hidden me-3">
                                <div className="symbol-label">
                                  <iframe
                                    title="video"
                                    className="embed-responsive-item rounded"
                                    src={url}
                                    style={{ width: 150 }}
                                    height={75}
                                    frameBorder={0}
                                    // allow='autoplay; fullscreen'
                                    // allowFullScreen
                                  />
                                </div>
                              </div>
                            )}

                            <div>
                              <div className="d-flex flex-row">
                                <div>
                                  <Link
                                    to={"/manage/" + child.id}
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
                                <button
                                  className="btn btn-sm"
                                  onClick={() => open(!openExtra, child.id!)}
                                >
                                  {openExtra && openedId === child.id ? (
                                    <KTIcon iconName="up" iconType="solid" />
                                  ) : (
                                    <KTIcon iconName="down" iconType="solid" />
                                  )}
                                </button>
                              </div>

                              <div className="d-flex flex-row">
                                <div>
                                  {child.duration !== 0 && (
                                    <small className="text-muted fw-semibold text-muted d-block fs-7">
                                      <KTIcon
                                        iconName="time"
                                        iconType="solid"
                                        className="path1 text-primary"
                                      />{" "}
                                      {MOMENT.duration(
                                        child.duration,
                                        "seconds"
                                      ).format("hh:mm:ss", {
                                        trim: false,
                                      })}
                                    </small>
                                  )}
                                </div>
                                <div style={{ paddingLeft: 8 }}>
                                  {child.completed?.length !== 0 && (
                                    <small className="text-muted fw-semibold text-muted d-block fs-7">
                                      <KTIcon
                                        iconName="star"
                                        iconType="solid"
                                        className="path1 text-warning"
                                      />{" "}
                                      {child.completed?.length
                                        ? child.completed
                                            ?.filter((child) => child.rate)
                                            .reduce(
                                              (avg, value, _, { length }) =>
                                                avg + value.rate! / length,
                                              0
                                            )
                                            .toFixed(2) + " "
                                        : "-"}
                                    </small>
                                  )}
                                </div>
                              </div>

                              {/* <AnimatePresence> */}
                              {openExtra && openedId === child.id && (
                                <ManageItemExtraWidget comp={child} />
                              )}
                              {/* </AnimatePresence> */}
                            </div>
                          </td>

                          <td onPointerDownCapture={(e) => e.stopPropagation()}>
                            <div className="d-flex justify-content-end flex-shrink-0">
                              {child.completed?.length !== 0 && (
                                <a
                                  href="#!"
                                  onClick={() => infoProgress(child)}
                                  className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                >
                                  <KTIcon iconName="eye" iconType="outline" />
                                  <span className="text-muted ">
                                    <small>
                                      &nbsp;{child.completed?.length}
                                    </small>
                                  </span>
                                </a>
                              )}

                              <a
                                href="#!"
                                onClick={() => manageAvailable(child)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="check" iconType="outline" />
                                <span className="text-muted text-sm">
                                  <small>&nbsp;{child.available?.length}</small>
                                </span>
                              </a>
                              <div>
                                <div className="btn-group">
                                  <button
                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    Ações
                                  </button>
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton2"
                                  >
                                    {/* <li>
                                      <a
                                        href="#!"
                                        onClick={() => infoProgress(child)}
                                        className="dropdown-item"
                                      >
                                        <KTIcon
                                          iconName="eye"
                                          iconType="outline"
                                        />
                                        <span className="text-muted ">
                                          <small>
                                          {' '}{child.completed?.length}{' '}Progresso
                                          </small>
                                        </span>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="#!"
                                        onClick={() => manageAvailable(child)}
                                        className="dropdown-item"
                                      >
                                        <KTIcon
                                          iconName="check"
                                          iconType="outline"
                                        />
                                        <span className="text-muted text-sm">
                                          <small>
                                          {' '}{child.available?.length}{' '}Disponibilidade
                                          </small>
                                        </span>
                                      </a>
                                    </li>

                                    <li>
                                      <hr className="dropdown-divider" />
                                    </li> */}
                                    {/* <li>
                                      <a
                                        href="#!"
                                        onClick={() =>
                                          navigate("/manage/" + child.id)
                                        }
                                        className="dropdown-item"
                                      >
                                        <KTIcon
                                          iconName="switch"
                                          iconType="outline"
                                        />
                                      </a>
                                    </li> */}

                                    <li>
                                      <a
                                        href="#!"
                                        onClick={() => updateComponent(child)}
                                        className="dropdown-item"
                                      >
                                        <KTIcon
                                          iconName="pencil"
                                          iconType="outline"
                                        />{" "}
                                        Editar componente
                                      </a>
                                    </li>
                                    <li>
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
                                        className="dropdown-item"
                                      >
                                        <KTIcon
                                          iconName="trash"
                                          iconType="outline"
                                        />{" "}
                                        Remover componente
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
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

                {/* end::Table body */}
              </table>
            )}
            {/* end::Table */}
          </div>
          {/* end::Table container */}
        </div>

        {/* begin::Body */}
      </div>
    </>
  );
};

export { ManageItemWidget };
