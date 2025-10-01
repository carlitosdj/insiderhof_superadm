import { useSelector } from "react-redux";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { Content } from "../../../../../../_metronic/layout/components/content";
import { Card4 } from "../../../../../../_metronic/partials/content/cards/Card4";
import momentDurationFormatSetup from "moment-duration-format";
import { ApplicationState } from "../../../../../../store";
import { useEffect, useState } from "react";
import Loading from "../../../../../loading";
import { useParams } from "react-router-dom";
import { User } from "../../../../../../store/ducks/me/types";
import { Cart } from "../../../../../../store/ducks/carts/types";
import { useDispatch } from "react-redux";
import {
  deleteCartRequest,
  loadCartRequest,
} from "../../../../../../store/ducks/carts/actions";
import { Modal } from "react-bootstrap";
import Create from "./create";
import Update from "./update";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type paymentProps = {
  user: User;
};

export function CartPage({ user }: paymentProps) {
  const carts = useSelector((state: ApplicationState) => state.carts);

  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<Cart>({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCartRequest(user.id!));
  }, []);

  console.log("carts", carts);

  // const { image, name, email, completed } = user;
  // const [array, setArray] = useState<any>([]);
  const handleClose = () => {
    setShow(false);
  };
  const updateComponent = (child: Cart) => {
    setAction("updateComponent");
    setShow(true);
    setChild(child);
  };

  // Deleta componente: CHILD
  const deleteComponent = (component: Cart) => {
    dispatch(deleteCartRequest(component.id!));
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <div className="modal-header">
          <h2>
            {action === "createComponent" ? "Adicionar pagamento" : ""}
            {action === "updateComponent" ? "Editar pagamento" : ""}
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
            <Create handleClose={handleClose} user={user} />
          ) : (
            ""
          )}
          {action === "updateComponent" ? (
            <Update handleClose={handleClose} child={child} user={user} />
          ) : (
            ""
          )}
        </div>
      </Modal>
      <div className="row g-5 g-xxl-8">
        <div className="col-xl-12">
          <div className={`card mb-5 mb-xxl-8`}>
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bolder fs-3 mb-1">
                  Gerenciador de pagamentos
                </span>
                <span className="text-muted mt-1 fw-bold fs-7">
                  Pagamentos criados
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
                  onClick={() => createComponent()}
                >
                  <KTIcon iconName="plus" className="fs-2" />
                  Novo pagamento
                </a>
              </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className="card-body pt-5">
              <>
                <div className="col-xxl-12">
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="min-w-50px">LAUNCHID</th>
                          <th className="min-w-50px">REGISTRO</th>
                          <th className="min-w-50px">UPDATE</th>
                          <th className="min-w-50px">STATUS</th>
                          <th className="min-w-140px">GATEWAY</th>
                          <th className="min-w-140px">MÉTODO</th>
                          <th className="min-w-140px">PARCELAS</th>
                          <th className="min-w-140px">PREÇO/BASE</th>
                          <th className="min-w-140px">QUANTIDADE</th>
                          <th className="min-w-140px">DESCRIÇÃO</th>
                          <th className="min-w-140px">IDREF</th>
                          <th className="min-w-140px">NOTAFISCAL</th>
                         
                          <th className="min-w-140px">TOTAL/PAGO</th>
                          <th className="min-w-140px">RECEBIDO</th>
                          <th className="min-w-140px">PARCELA</th>
                          <th className="min-w-140px">TAXA/MAQUINA</th>
                          <th className="min-w-140px">TAXA/FINANCIAMENTO</th>

                          <th className="min-w-140px">TURMA</th>
                          <th className="min-w-140px">RENOVATION</th>
                          <th className="min-w-100px text-end">AÇÕES</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user.cart && user.cart.length === 0 && (
                          <tr className="border-0">
                            <td colSpan={6} className="text-center pt-10 ">
                              Nenhum dado de pagamento foi encontrado.
                            </td>
                          </tr>
                        )}

                        {carts.data &&
                          carts.data.map((payment: Cart, index: number) => (
                            <tr key={index}>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="d-flex justify-content-start flex-column">
                                    {payment.launchId}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="d-flex justify-content-start flex-column">
                                    {MOMENT(payment.createdAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="d-flex justify-content-start flex-column">
                                    {MOMENT(payment.updatedAt).format(
                                      "DD/MM/YYYY"
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="d-flex justify-content-start flex-column">
                                    {payment.status}
                                  </div>
                                </div>
                              </td>
                              <td>{payment.gateway}</td>
                              <td>{payment.paymentmethod}</td>
                              <td>{payment.installments}</td>
                              <td>{payment.price}</td>

                              <td>{payment.quantity}</td>
                              <td>{payment.description}</td>
                              <td>{payment.idreference}</td>
                              <td>{payment.notafiscal}</td>
                              
                              <td>{payment.total_paid_amount}</td>
                              <td>{payment.net_received_amount}</td>
                              <td>{payment.installment_amount}</td>
                              <td>{payment.mercadopago_fee}</td>
                              <td>{payment.financing_fee}</td>
                        
                              









                              <td>{payment.launch?.name}</td>
                              <td>{payment.renovationTime}</td>
                              <td>
                                <div className="d-flex justify-content-end flex-shrink-0">
                                  <a
                                    href="#!"
                                    onClick={() => updateComponent(payment)}
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                                  >
                                    <KTIcon
                                      iconName="pencil"
                                      iconType="outline"
                                    />
                                  </a>
                                  <a
                                    href="#!"
                                    onClick={() => {
                                      if (
                                        window.confirm(
                                          "Deseja realmente excluir: " +
                                          payment.id +
                                            "?"
                                        )
                                      )
                                        deleteComponent(payment);
                                    }}
                                    className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                                  >
                                    <KTIcon
                                      iconName="trash"
                                      iconType="outline"
                                    />
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
