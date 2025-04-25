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
import { selectCartsAddRequest, selectCartsRemoveRequest } from "../../../../store/ducks/carts/actions";

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
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  let precobasetotal = 0;
  let precopagototal = 0;
  let recebidototal = 0;
  let taxamaquinatotal = 0;
  let taxaparcelamentototal = 0;
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

  const selectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      carts.data.map((child) => {
        dispatch(selectCartsRemoveRequest(child)); //Remove antes, pra nao dar duplicação
        dispatch(selectCartsAddRequest(child));
      });
    } else {
      setIsAllChecked(false);
      carts.data.map((child) => {
        dispatch(selectCartsRemoveRequest(child));
      });
    }
  };

  const setSelected = (e: React.ChangeEvent<HTMLInputElement>, child: Cart) => {
    //console.log("CHILD!", child)
    //dispatch(selectUsersAddRequest(child))
    console.log("****ENTREI AQUI****");
    console.log("Checked", e.target.checked);
    console.log("child", child);
    if (e.target.checked) {
      dispatch(selectCartsAddRequest(child));
      //e.target.checked = false
    } else {
      setIsAllChecked(false);
      dispatch(selectCartsRemoveRequest(child));
      //e.target.checked = true
    }
  };

    console.log("Carts Selected", carts.selectedCarts)
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
            {/* <div className="d-flex align-items-center position-relative my-1">
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
            </div> */}
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
                  <th>
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="kt_settings_notification_email"
                        onChange={(e: any) => selectAll(e)}
                      />
                    </div>
                  </th>
                  <th className="min-w-120px">ID</th>
                  <th className="min-w-120px">DATA</th>
                  <th className="min-w-200px">USUÁRIO</th>
                  <th className="min-w-120px">EMAIL</th>

                  <th className="min-w-120px">DOCUMENTO</th>
                  <th className="min-w-200px">ENDEREÇO</th>
                  <th className="min-w-120px">TELEFONE</th>

                  <th className="min-w-200px">PRODUTO</th>
                  <th className="min-w-100px">PREÇO/BASE</th>
                  <th className="min-w-20px">N/PARCELAS</th>
                  <th className="min-w-20px">PARCELA</th>
                  <th className="min-w-20px">GATEWAY</th>
                  <th className="min-w-20px">MÉTODO</th>
                  <th className="min-w-20px">REF</th>

                  <th className="min-w-20px">PREÇO/PAGO</th>
                  <th className="min-w-20px">RECEBIDO</th>

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
                      //TODO: AQUIIIII fazer o somatorio
                      precobasetotal += Number(child.price)!;
                      precopagototal += Number(child.total_paid_amount)!;
                      recebidototal += Number(child.net_received_amount);
                      taxamaquinatotal += Number(child.mercadopago_fee);
                      taxaparcelamentototal += Number(child.financing_fee);

                      let check = carts.selectedCarts?.filter(
                        (item) => item.id === child.id
                      );
                      let defaultChecked =
                        check.length || isAllChecked ? true : false;

                      return (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-custom form-check-solid">
                                {/* <img src={'https://app.insiderhof.com.br/files/1678819623100-vf.jpg'} alt='' /> */}
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="selectusers"
                                  //defaultChecked={defaultChecked}
                                  checked={defaultChecked}
                                  onChange={(e: any) => setSelected(e, child)}
                                />
                              </div>
                            </div>
                          </td>
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
                                  {child.user?.email}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex align-items-center border-0">
                              <div>
                                <div className="text-gray-900 fw-bold d-block fs-6">
                                  {/* {child.name} */}
                                  {child.user?.type} {child.user?.cpf}
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
                              {/* {child.description?.length! > 50
                                ? child.description?.substring(0, 50) + "..."
                                : child.description} */}
                                {child.launch?.name}
                            </div>
                          </td>
                          <td>
                            {Number(child.price)?.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td>{child.installments}</td>
                          <td>
                            {Number(child.installment_amount)?.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </td>
                          <td>{child.gateway}</td>
                          <td>{child.paymentmethod}</td>
                          <td>{child.idreference}</td>
                          <td>
                            {Number(child.total_paid_amount)?.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </td>
                          <td>
                            {Number(child.net_received_amount)?.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </td>

                          <td>
                            {Number(child.mercadopago_fee)?.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </td>
                          <td>
                            {Number(child.financing_fee)?.toLocaleString(
                              "pt-BR",
                              {
                                style: "currency",
                                currency: "BRL",
                              }
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  <tr className="bg-info text-white" key={'last'}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {precobasetotal?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      {precopagototal?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>
                      {recebidototal?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td>
                      {taxamaquinatotal?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>
                      {taxaparcelamentototal?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                  </tr>
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
