/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { KTIcon, KTSVG } from "../../../../_metronic/helpers";
import { User } from "../../../../store/ducks/me/types";
// import CreateEmail from './create'
import { Support, SupportState } from "../../../../store/ducks/support/types";

import Info from "./info";
// import Create from './create'
import Update from "./update";
import { useIntl } from "react-intl";

type Props = {
  className: string;
  supportsList: SupportState;
};

const ManageSupportsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  supportsList,
}) => {
  const MOMENT = require("moment");
  const intl = useIntl();

  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<User>({});

  const infoSupport = (support: Support) => {
    setAction("infoSupport");
    setShow(true);
    setChild(support);
  };
  const updateSupport = (support: Support) => {
    setAction("editSupport");
    setShow(true);
    setChild(support);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <div className="modal-header">
          <h2>
            {action === "infoSupport" && "Informações do chamado"}
            {action === "editSupport" && "Responder chamado"}
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
          {action === "infoSupport" && (
            <Info handleClose={handleClose} child={child} />
          )}
          {action === "editSupport" && (
            <Update handleClose={handleClose} child={child} />
          )}
        </div>
      </Modal>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              {intl.formatMessage({ id: "MENU.SUPPORT" })}
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Chamados na plataforma
            </span>
          </h3>
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
                  {/* <th className="min-w-50px">ID</th> */}
                  <th className="min-w-150px">REGISTRO</th>
                  <th className="min-w-120px">CHAMADO</th>
                  <th className="min-w-120px">RESPOSTA</th>
                  <th className="min-w-120px">USUÁRIO</th>
                  <th className="min-w-120px">STATUS</th>
                  <th className="min-w-100px text-end">AÇÕES</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {supportsList.all.map((support: any, index: number) => {
                  return (
                    <tr key={index}>
                      {/* <td>
                        <div className="d-flex align-items-center">
                          <div className="d-flex justify-content-start flex-column">
                            {support.id}
                          </div>
                        </div>
                      </td> */}
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {MOMENT(support.createdAt).format("DD/MM/YYYY HH:mm")}
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold d-block fs-7">
                          {support.message}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {support.reply}
                        </span>
                      </td>
                      <td>
                        <span className="fw-bold d-block fs-7">
                          {support.parentUser.name}
                        </span>
                      </td>
                      <td>
                        <span className="text-muted fw-bold d-block fs-7">
                          {support.status}
                        </span>
                      </td>

                      <td>
                        <div className="d-flex justify-content-end flex-shrink-0">
                          <a
                            // href='#!'
                            onClick={() => infoSupport(support)}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <KTIcon iconName="switch" iconType="outline" />
                          </a>
                          <a
                            // href='#!'
                            onClick={() => updateSupport(support)}
                            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          >
                            <KTIcon iconName="pencil" iconType="outline" />
                          </a>
                          {/* <a
                            href='#!'
                            onClick={() => { if (window.confirm('Deseja realmente excluir: ' + child.username + '?')) deleteUser(child)  } }
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                          >
                            <KTIcon iconName="trash" iconType="outline" />
                          </a> */}
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

export { ManageSupportsWidget };
