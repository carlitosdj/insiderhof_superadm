/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Component,
  ComponentState,
} from "../../../../../store/ducks/component/types";
// import {Extras} from '../../../../store/ducks/extras/types'

import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import { useDispatch } from "react-redux";
import {
  deleteComponentRequest,
  // updateComponentRequest,
} from "../../../../../store/ducks/component/actions";
import { useNavigate } from "react-router-dom";

import Create from "./create";
import Update from "./update";

// import momentDurationFormatSetup from 'moment-duration-format';

// const MOMENT = require('moment')
// momentDurationFormatSetup(MOMENT)

type Props = {
  className: string;
  comp: ComponentState;
};

const ManageItemWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  comp,
}) => {
  console.log("COMP AQUI", comp);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Component>({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Deleta componente: CHILD
  const deleteComponent = (component: Component) => {
    dispatch(deleteComponentRequest(component.id!));
  };

  // const toggleStatus = (component: Component) => {
  //   // console.log('Toggle', component.status);
  //   component.status = !component.status
  //   dispatch(updateComponentRequest(component))
  // }

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        enforceFocus={false} ////ckeditor link hack
        // centered
        backdrop="static"
        keyboard={false}
        fullscreen={"sm-down"}
      >
        <div className="modal-header">
          <h2>
            {action === "createComponent" ? "Adicionar componente" : ""}
            {action === "updateComponent" ? "Editar componente" : ""}
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
        <Modal.Body>
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
        </Modal.Body>
      </Modal>

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              {comp.data.name}
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              {comp.data.description}
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
              className="btn btn-light-primary"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Nova fase
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className="card-body py-3">
          {/* begin::Table container */}
          <div className="table-responsive">
            {/* begin::Table */}
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder text-muted">
                  {/* <th className='w-25px'>
                  <div className='form-check form-check-sm form-check-custom form-check-solid'>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value='1'
                      data-kt-check='true'
                      data-kt-check-target='.widget-9-check'
                    />
                  </div>
                </th> */}
                  <th className="min-w-150px">FASE</th>
                  <th className="min-w-150px">URL</th>
                  {/* <th className='min-w-140px'>Slug</th> */}
                  {/* <th className='min-w-140px'>Ordem</th>
                  <th className='min-w-140px'>Duração</th>
                  <th className='min-w-140px'>Tags</th>
                  <th className='min-w-140px'>OrderBy</th> */}
                  {/* <th className='min-w-140px'>Status</th> */}
                  {/* <th className='min-w-120px'>Progress</th> */}
                  <th className="min-w-100px text-end">AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {comp.data.children?.map((child: any, index) => {
                  return (
                    <tr key={index}>
                      <td className="align-items-center border-0">
                        <Link
                          to={"/launchextra/" + child.id}
                          style={{ display: "flex" }}
                          className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                        >
                          {child.name}
                        </Link>
                      </td>
                      <td>
                        <span className="text-muted fw-semibold text-muted d-block fs-7">
                          <a
                            target={"_blank"}
                            href={
                              child.name == "Captação de lead"
                                ? "https://insiderhof.com.br/lead/subscribe/" +
                                  child.description +
                                  "/site"
                                : ""
                            }
                          >
                            {" "}
                            {child.name == "Captação de lead"
                              ? "https://insiderhof.com.br/lead/subscribe/" +
                                child.description +
                                "/site"
                              : ""}{" "}
                          </a>
                          <a
                            target={"_blank"}
                            href={
                              child.name == "Evento"
                                ? "https://insiderhof.com.br/class/" +
                                  child.description +
                                  "/aula01"
                                : ""
                            }
                          >
                            {" "}
                            {child.name == "Evento"
                              ? "https://insiderhof.com.br/class/" +
                                child.description +
                                "/aula01"
                              : ""}{" "}
                          </a>
                          <a
                            target={"_blank"}
                            href={
                              child.name == "Vendas"
                                ? "https://insiderhof.com.br/sale/subscribe/" +
                                  child.description +
                                  ""
                                : ""
                            }
                          >
                            {child.name == "Vendas"
                              ? "https://insiderhof.com.br/sale/subscribe/" +
                                child.description +
                                ""
                              : ""}
                          </a>
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
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
        {/* begin::Body */}
      </div>
    </>
  );
};

export { ManageItemWidget };
