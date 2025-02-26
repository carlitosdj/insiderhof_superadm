/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Component,
  ComponentState,
} from "../../../../store/ducks/component/types";
import { Extras } from "../../../../store/ducks/extras/types";
//import {KTSVG} from '../../../../_metronic/helpers'
import { useDispatch } from "react-redux";
import {
  // deleteComponentRequest,
  deleteExtraRequest,
  // updateComponentRequest,
} from "../../../../store/ducks/component/actions";
// import {useNavigate} from 'react-router-dom'

// import Create from './create'
// import Update from './update'

import CreateExtra from "../extra/create";
import CreateExtraImg from "../extra/create_img";
import CreateExtraVideo from "../extra/create_video";
import CreateExtraFile from "../extra/create_file";
import UpdateExtra from "../extra/update";
import CreateLink from "../extra/create_link";
import { KTIcon, KTSVG } from "../../../../_metronic/helpers";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  comp: Component;
};

const ManageItemExtraWidget: React.FC<React.PropsWithChildren<Props>> = ({
  comp,
}) => {
  // console.log("COMP AQUI", comp);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Component>({});
  const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const handleClose = () => {
    setShow(false);
  };

  const createExtra = (child: Component) => {
    setChild(child);
    setAction("createExtra");
    setShow(true);
  };

  const createLink = (child: Component) => {
    setChild(child);
    setAction("createLink");
    setShow(true);
  };

  const createExtraImg = (child: Component) => {
    setChild(child);
    setAction("createExtraImg");
    setShow(true);
  };

  const createExtraVideo = (child: Component) => {
    setChild(child);
    setAction("createExtraVideo");
    setShow(true);
  };

  const createExtraFile = (child: Component) => {
    setChild(child);
    setAction("createExtraFile");
    setShow(true);
  };

  const updateExtra = (child: Component, extra: Extras) => {
    setChild(child);
    setAction("updateExtra");
    setShow(true);
    setExtra(extra);
  };

  // Deleta extra:
  const deleteExtra = (extra: Extras) => {
    console.log("xxxextra", extra);
    dispatch(deleteExtraRequest(extra.id!));
  };

  return (
    <AnimatePresence>
      <div>
        <motion.div
          key={child.id}
          // src={child.id}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -300, opacity: 0 }}
        >
          <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            enforceFocus={false}
            backdrop="static"
            keyboard={false}
            fullscreen={"sm-down"}
          >
            <div className="modal-header">
              <h2>
                {action === "createExtra" && "Adicionar item em: " + child.name}
                {action === "createLink" && "Adicionar link em: " + child.name}
                {action === "createExtraImg" &&
                  "Adicionar imagem em: " + child.name}
                {action === "createExtraFile" &&
                  "Adicionar arquivo em: " + child.name}
                {action === "createExtraVideo" &&
                  "Adicionar video em: " + child.name}
                {action === "updateExtra" &&
                  "Editar: " + child.name + " - " + extra.keyExtra}
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
              {action === "createExtra" ? (
                <CreateExtra component={child} handleClose={handleClose} />
              ) : (
                ""
              )}
              {action === "createLink" ? (
                <CreateLink component={child} handleClose={handleClose} />
              ) : (
                ""
              )}
              {action === "createExtraImg" ? (
                <CreateExtraImg component={child} handleClose={handleClose} />
              ) : (
                ""
              )}
              {action === "createExtraFile" ? (
                <CreateExtraFile component={child} handleClose={handleClose} />
              ) : (
                ""
              )}
              {action === "createExtraVideo" ? (
                <CreateExtraVideo component={child} handleClose={handleClose} />
              ) : (
                ""
              )}
              {action === "updateExtra" ? (
                <UpdateExtra
                  handleClose={handleClose}
                  component={child}
                  child={extra}
                />
              ) : (
                ""
              )}
            </div>
          </Modal>
          <div className="bg-light-secondary rounded m-3">
            <div
              className="card-toolbar d-flex bg-secondary rounded"
              //className="card-toolbar d-flex bg-secondary rounded justify-content-between"
              // className="card-toolbar justify-content-between d-flex"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              style={{ width: "100%" }}
            >
              <a
                href="#!"
                className="btn btn-sm btn-light-primary m-2"
                onClick={() => createExtraImg(comp)}
              >
                <KTIcon iconName="picture" iconType="solid" className="p-0 fs-3" />
              </a>

              <a
                href="#!"
                className="btn btn-sm btn-light-primary m-2"
                onClick={() => createExtraVideo(comp)}
              >
                <KTIcon iconName="youtube" iconType="solid" className="p-0 fs-3" />
              </a>

              <a
                href="#!"
                className="btn btn-sm btn-light-primary m-2"
                onClick={() => createExtraFile(comp)}
              >
                <KTIcon iconName="file" iconType="solid" className="p-0 fs-3" />
              </a>

              <a
                href="#!"
                className="btn btn-sm btn-light-primary m-2"
                onClick={() => createLink(comp)}
              >
                <KTIcon
                  iconName="paper-clip"
                  iconType="solid"
                  className="p-0 fs-3"
                />
              </a>

              {/* <a
            href="#!"
            className="btn btn-sm btn-light-primary m-2"
            onClick={() => createExtra(comp)}
          >
            <KTIcon iconName="plus" iconType="solid" className="p-0" />
          </a>
           */}
            </div>

            <div className="card-body py-3">
              {/* begin::Table container */}
              <div className="table-responsive">
                {/* begin::Table */}
                <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                  {/* begin::Table head */}
                  {/* <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px"></th>
                  <th className="min-w-100px">VALOR</th>
                  <th className="min-w-50px text-end">AÇÕES</th>
                </tr>
              </thead> */}
                  {/* end::Table head */}
                  {/* begin::Table body */}
                  <tbody>
                    {comp.extras?.map((extra, index) => {
                      // console.log("VER AQUI##", extra);
                      return (
                        <tr key={index}>
                          <td className="p-0 ">
                            <span className="text-muted fw-bold d-block fs-7 me-3">
                              {extra.keyExtra == "url" && (
                                <iframe
                                  title="video"
                                  className="embed-responsive-item rounded"
                                  src={extra.valueExtra}
                                  style={{ width: 50 }}
                                  height={50}
                                  // frameBorder={0}
                                  // allow='autoplay; fullscreen'
                                  // allowFullScreen
                                />
                              )}

                              {extra.keyExtra == "img" && (
                                <img
                                  className="embed-responsive-item rounded"
                                  //style={{ width: 150 }}
                                  height={50}
                                  //src={users.user.image}
                                  //src={ image?.includes('https://') ? image : '../../files/' + image}
                                  src={
                                    extra.valueExtra?.includes("https://")
                                      ? extra.valueExtra
                                      : "https://app.insiderhof.com.br/files/" +
                                        extra.valueExtra
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "https://app.insiderhof.com.br/files/notfound.jpg";
                                  }}
                                />
                              )}

                              {extra.keyExtra == "file" && (
                                <div className="d-flex align-items-center justify-content-center">
                                <KTIcon iconName="file" iconType="solid" className="fs-1" />
                                </div>
                              )}
                              {extra.keyExtra == "link" && (
                                <div className="d-flex align-items-center justify-content-center">
                                <KTIcon iconName="paper-clip" iconType="solid" className="fs-1" />
                                </div>
                              )}
                            </span>
                          </td>
                          {/* <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex justify-content-start flex-column">
                            {extra.keyExtra}
                          </div>
                        </div>
                      </td> */}
                          <td className="p-0">
                            <span className="text-muted fw-bold d-block fs-7">
                              {/* {extra.valueExtra?.substring(0, 15)}... */}
                              {extra.valueExtra}
                            </span>
                          </td>

                          <td className="p-0">
                            <div className="d-flex justify-content-end flex-shrink-0">
                              <a
                                href="#!"
                                onClick={() => updateExtra(comp, extra)}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                              >
                                <KTIcon iconName="pencil" iconType="outline" />
                              </a>
                              <a
                                href="#!"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      "Tem cereza que deseja excluir o item: " +
                                        extra.keyExtra +
                                        " ?"
                                    )
                                  )
                                    deleteExtra(extra);
                                }}
                                className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                              >
                                <KTIcon iconName="trash" iconType="outline" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* end::Table body */}
                </table>
                {/* end::Table */}
              </div>
              {/* end::Table container */}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export { ManageItemExtraWidget };
