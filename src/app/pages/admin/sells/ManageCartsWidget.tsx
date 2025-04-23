/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";
// import { Launch, LaunchsState } from "../../../../store/ducks/dlaunch/types";
import { Cart, CartsState } from "../../../../store/ducks/carts/types";
import { Modal } from "react-bootstrap";
import Filter from "./filter";
import ExportSell from "./export";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  carts: CartsState;
};

const ManageCartsWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  carts,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  //const [child, setChild] = useState<User>({});

  const filter = () => {
    setAction("showFilter");
    setShow(true);
  };

  const exportSells = () => {
    setAction("showExport");
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
     <Modal size="xl" show={show} onHide={handleClose}>
        <div className="modal-header">
          <h2>
            {action === "showExport" ? "Exportar" : ""}
            {action === "showFilter" ? "Filtro" : ""}
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
          {action === "showExport" && <ExportSell handleClose={handleClose} />}
          {action === "showFilter" ? <Filter handleClose={handleClose} /> : ""}
        </div>
      </Modal>
      <div className={`card ${className}`}>
        {/* <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Vendas</span>
            <span className="text-muted mt-1 fw-bold fs-7">Últimas vendas</span>
          </h3>
        </div> */}
        <div className="card-header border-0 pt-5">
          <div className="card-title">
            {/* begin::Search */}
            <div className="d-flex align-items-center position-relative my-1">
              <KTIcon
                iconName="magnifier"
                className="fs-1 position-absolute ms-6"
              />
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Pesquisar..."
                // value={search}
                // onChange={(e: any) => setSearch(e.target.value)}
                // onKeyDownCapture={(e: any) => {
                //   if (e.key === "Enter") searchUser();
                // }}
              />
            </div>
            {/* end::Search */}
          </div>
          <div className="card-toolbar">
            <div
              className="d-flex justify-content-end"
              data-kt-user-table-toolbar="base"
            >
              <button
                type="button"
                className="btn btn-light-primary me-3"
                onClick={() => filter()}
              >
                <KTIcon iconName="filter" className="fs-2" />
                Filtro
              </button>

              {/* begin::Export */}
              <button
                type="button"
                className="btn btn-light-primary me-3"
                onClick={() => exportSells()}
              >
                <KTIcon iconName="exit-up" className="fs-2" />
                Exportar
              </button>
              {/* end::Export */}

              {/* begin::Add user */}
         
            </div>
          </div>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px">ID</th>
                  <th className="min-w-120px">DATA</th>
                  <th className="min-w-120px">USUÁRIO</th>

                  <th className="min-w-120px">DOCUMENTO</th>
                  <th className="min-w-250px">ENDEREÇO</th>
                  <th className="min-w-120px">TELEFONE</th>

                  <th className="min-w-100px">PRODUTO</th>
                  <th className="min-w-100px">PREÇO/BASE</th>
                  <th className="min-w-20px">PARCELAS</th>
                  <th className="min-w-20px">GATEWAY</th>
                  <th className="min-w-20px">MÉTODO</th>
                  <th className="min-w-20px">REF</th>

                  <th className="min-w-20px">PREÇO/PAGO</th>
                  <th className="min-w-20px">RECEBIDO</th>
                  <th className="min-w-20px">PARCELA</th>
                  <th className="min-w-20px">TAXA/MAQUINA</th>
                  <th className="min-w-20px">TAXA/PARCELAMENTO</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {carts.data.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhuma venda encontrada aqui. Adicione uma launch
                        clicando em "Nova launch".
                      </td>
                    </tr>
                  )}

                  {carts.data.length !== 0 &&
                    carts.data?.map((child: Cart, index: number) => {
                      return (
                        <tr>
                          <td>{child.id}</td>
                          <td>
                            <div className="d-flex align-items-center border-0">
                              {MOMENT(child.createdAt)
                                .utc()
                                .format("DD/MM/YYYY HH:mm")}
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <div className="text-gray-900 fw-bold d-block fs-6">
                                  {/* {child.name} */}
                                  {child.user?.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <div className="text-gray-900 fw-bold d-block fs-6">
                                  {/* {child.name} */}
                                  {child.user?.type}: {child.user?.cpf}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <div className="text-gray-900 fw-bold d-block fs-6">
                                  {/* {child.name} */}
                                  {child.user?.address},{" "}
                                  {child.user?.addressNumber},{" "}
                                  {child.user?.addressDistrict}
                                  {child.user?.addressComplement
                                    ? ", " + child.user?.addressComplement
                                    : ""}
                                  , {child.user?.city?.name}/
                                  {child.user?.state?.state},{" "}
                                  {child.user?.postalCode}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <div className="text-gray-900 fw-bold d-block fs-6">
                                  {/* {child.name} */}
                                  {child.user?.whatsapp}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="text-gray-900 fw-bold text-muted d-block fs-7">
                              {child.description?.length! > 50
                                ? child.description?.substring(0, 50) + "..."
                                : child.description}
                            </div>
                          </td>
                          <td>
                            R${" "}
                            {child.price?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            ,00
                          </td>
                          <td>{child.installments}</td>
                          <td>{child.gateway}</td>
                          <td>{child.paymentmethod}</td>
                          <td>{child.idreference}</td>
                          <td>{child.total_paid_amount}</td>
                          <td>{child.net_received_amount}</td>
                          <td>{child.installment_amount}</td>
                          <td>{child.mercadopago_fee}</td>
                          <td>{child.financing_fee}</td>
                        </tr>
                      );
                    })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageCartsWidget };
