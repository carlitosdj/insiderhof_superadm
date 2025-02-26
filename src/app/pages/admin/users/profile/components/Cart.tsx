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
import { loadCartRequest } from "../../../../../../store/ducks/carts/actions";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type paymentProps = {
  user: User;
};

export function CartPage({ user }: paymentProps) {
  const carts = useSelector((state: ApplicationState) => state.carts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCartRequest(user.id!));
  },[])

  console.log("carts",carts)

  const { image, name, email, completed } = user;
  const [array, setArray] = useState<any>([]);

  return (
    <div>
      <div className="row g-5 g-xxl-8">
        <div className="col-xl-12">
          <div className={`card mb-5 mb-xxl-8`}>
            <div className="card-header align-items-center border-0 mt-4">
              <h3 className="card-title align-items-start flex-column">
                <span className="fw-bold mb-2 text-gray-900">
                  Dados de compras
                </span>
                <span className="text-muted fw-semibold fs-7">Pagamentos</span>
              </h3>
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
                          <th className="min-w-50px">REGISTRO</th>
                          <th className="min-w-50px">STATUS</th>
                          <th className="min-w-140px">GATEWAY</th>
                          <th className="min-w-140px">METHOD</th>
                          <th className="min-w-140px">PARCELAS</th>
                          <th className="min-w-140px">PREÇO BASE</th>
                          <th className="min-w-140px">TURMA</th>
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
                                    {MOMENT(payment.createdAt).format(
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
                              {/* <td>{payment.launch?.map((launch: any) => launch.name)}</td> */}
                              <td>{payment.launch?.name}</td>
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
