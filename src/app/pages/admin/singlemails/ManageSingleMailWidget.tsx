/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { KTIcon, KTSVG } from "../../../../_metronic/helpers";

import CreateEmail from "./create";
import DOMPurify from "dompurify";
import { SingleMailState } from "../../../../store/ducks/singlemail/types";
const MOMENT = require("moment");
type Props = {
  className: string;
  singlemail: SingleMailState;
};

const RawHtmlComponent = (html: any) => {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
};

const ManageSingleMailWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  singlemail,
}) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };

  const createEmail = () => {
    setShow(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        enforceFocus={false} //ckeditor link hack
      >
        <div className="modal-header">
          <h2>Criar Email</h2>

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
          <CreateEmail handleClose={handleClose} />
        </div>
      </Modal>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Emails</span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Mensagens enviadas via e-mail
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
              // data-bs-toggle='modal'
              // data-bs-target='#kt_modal_invite_friends'
              onClick={() => createEmail()}
            >
              <KTIcon iconName="plus" className="fs-2" />
              Novo e-mail
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
                  {/* <th className='min-w-30px'>ID</th> */}
                  <th className="min-w-100px">LISTA</th>
                  <th className="min-w-150px">EMAIL</th>
                  <th className="min-w-120px">MENSAGEM</th>
                  <th className="min-w-150px">DATA</th>
                  <th className="min-w-120px">ABERTOS</th>
                  
                  {/* <th className='min-w-120px'>Aberto por</th> */}
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {singlemail.data.map((child, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                        <div className='d-flex align-items-center'>
                          <div className='justify-content-start flex-column'>{child.id}</div>
                        </div>
                      </td> */}
                      <td>
                        <span className="text-gray-900 d-block fs-7">
                          {child.to}
                        </span>
                      </td>
                      <td>
                        <span className="text-gray-900 d-block fs-7">
                          {child.subject}
                        </span>
                      </td>
                      <td>
                        <span className="text-gray-900 d-block fs-7">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(child.message!),
                            }}
                          />
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {MOMENT(child.createdAt).format("DD/MM/YY HH:mm")}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {child.openedSingleMail?.length}
                        </span>
                      </td>
                      
                      {/* <td>
                        <span className='text-muted fw-bold d-block fs-7'>
                          {child.openedMails.map((item: any) => {
                            if (item) {
                              return item.lead.name+", "
                            }
                          })}
                          
                        </span>
                      </td> */}
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

export { ManageSingleMailWidget };
