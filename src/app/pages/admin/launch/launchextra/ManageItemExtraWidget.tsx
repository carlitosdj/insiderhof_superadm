/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Component,
  ComponentState,
} from "../../../../../store/ducks/component/types";
import { Extras } from "../../../../../store/ducks/extras/types";
import { KTIcon, KTSVG } from "../../../../../_metronic/helpers";
import { useDispatch } from "react-redux";
import {
  // deleteComponentRequest,
  deleteExtraRequest,
  // updateComponentRequest,
} from "../../../../../store/ducks/component/actions";
// import {useNavigate} from 'react-router-dom'

// import Create from './create'
// import Update from './update'

import CreateExtra from "./create";
import CreateExtraImg from "./create_img";
import CreateExtraVideo from "./create_video";
import CreateExtraFile from "./create_file";
import UpdateExtra from "./update";

type Props = {
  className: string;
  comp: ComponentState;
};

const ManageItemExtraWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  comp,
}) => {
  console.log("COMP AQUI", comp);
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child] = useState<Component>({});
  const [extra, setExtra] = useState<Extras>({});
  const dispatch = useDispatch();
  // const navigate = useNavigate()

  const handleClose = () => {
    setShow(false);
  };

  const createExtra = () => {
    setAction("createExtra");
    setShow(true);
  };

  const createExtraImg = () => {
    setAction("createExtraImg");
    setShow(true);
  };

  const createExtraVideo = () => {
    setAction("createExtraVideo");
    setShow(true);
  };

  const createExtraFile = () => {
    setAction("createExtraFile");
    setShow(true);
  };

  const updateExtra = (extra: Extras) => {
    setAction("updateExtra");
    setShow(true);
    setExtra(extra);
  };

  // Deleta extra:
  const deleteExtra = (extra: Extras) => {
    dispatch(deleteExtraRequest(extra.id!));
  };

  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        enforceFocus={false}
        // centered
        backdrop="static"
        keyboard={false}
        fullscreen={"sm-down"}
      >
        <div className="modal-header">
          <h2>
            {action === "createExtra" ? "Adicionar extra" : ""}
            {action === "createExtraImg" ? "Adicionar extra - imagem" : ""}
            {action === "createExtraFile" ? "Adicionar extra - arquivo" : ""}
            {action === "createExtraVideo" ? "Adicionar extra - video" : ""}
            {action === "updateExtra" ? "Editar extra" : ""}
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
          {/* { (action === 'createComponent')?<Create handleClose={handleClose} />:'' }
          { (action === 'updateComponent')?<Update handleClose={handleClose} child={child} />:'' } */}
          {action === "createExtra" ? (
            <CreateExtra handleClose={handleClose} />
          ) : (
            ""
          )}
          {action === "createExtraImg" ? (
            <CreateExtraImg handleClose={handleClose} />
          ) : (
            ""
          )}
          {action === "createExtraFile" ? (
            <CreateExtraFile handleClose={handleClose} />
          ) : (
            ""
          )}
          {action === "createExtraVideo" ? (
            <CreateExtraVideo handleClose={handleClose} />
          ) : (
            ""
          )}
          {action === "updateExtra" ? (
            <UpdateExtra handleClose={handleClose} child={extra} />
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
            <div
              className="card-toolbar justify-content-end d-flex"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              style={{ width: "100%" }}
            >
              <a
                href="#!"
                className="btn btn-light-primary"
                onClick={() => createExtra()}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Novo item
              </a>
              &nbsp;&nbsp;
              {/* <a href='#!' className='btn btn-sm btn-light-primary' onClick={() => createExtraVideo()}>
                <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                Novo Vídeo
              </a> */}
              <a
                href="#!"
                className="btn btn-light-primary"
                onClick={() => createExtraImg()}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Nova imagem
              </a>
              &nbsp;&nbsp;
              <a
                href="#!"
                className="btn btn-light-primary"
                onClick={() => createExtraFile()}
              >
                <KTIcon iconName="plus" className="fs-2" />
                Novo Arquivo
              </a>
            </div>
          </div>
        </div>
        {/* end::H

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
                  <th className="min-w-50px">TIPO</th>
                  <th className="min-w-450px">DESCRIÇÃO</th>

                  <th className="min-w-50px text-end">AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {comp.data.extras?.map((extra, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                      </div>
                    </td> */}
                      {/* <td>
                        <div className='d-flex align-items-center'>
                          {/* <div className='symbol symbol-45px me-5'>
                          <img src={toAbsoluteUrl('/media/avatars/150-11.jpg')} alt='' />
                        </div> *x/}
                          <div className='d-flex justify-content-start flex-column'>
                            
                              {extra.keyExtra}
                              
                           
                            {/* <span className='text-muted fw-bold text-muted d-block fs-7'>
                            {child.description}
                          </span> *x/}
                          </div>
                        </div>
                      </td> */}
                      <td>
                        <div className="text-gray-900 fw-bold d-block fs-6">
                          {extra.keyExtra}
                        </div>
                      </td>
                      <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> */}
                        <span className="text-muted fw-bold d-block fs-7">
                          {extra.valueExtra?.substring(0, 200)}...
                        </span>
                      </td>
                      {/* <td>
                        {/* <a href='#!' className='text-dark fw-bolder text-hover-primary d-block fs-6'>
                        Intertico
                      </a> *x/}
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          {(extra.keyExtra == "url")? 
                              <iframe
                              title='video'
                              className='embed-responsive-item rounded'
                              src={extra.valueExtra}
                              style={{width:150}}
                              height={75}
                              frameBorder={0}
                              // allow='autoplay; fullscreen'
                              // allowFullScreen
                            />
                              :''}
                        </span>
                      </td> */}

                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          {/* <a
                          href='#!'
                          onClick={() => history.push('/manage/'+child.id)} 
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen019.svg'
                            className='svg-icon-3'
                          />
                        </a> */}
                          <a
                            href="#!"
                            onClick={() => updateExtra(extra)}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <KTIcon iconName="pencil" iconType="outline" />
                          </a>
                          <a
                            href="#!"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this item?"
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
        {/* begin::Body */}
      </div>
    </>
  );
};

export { ManageItemExtraWidget };
