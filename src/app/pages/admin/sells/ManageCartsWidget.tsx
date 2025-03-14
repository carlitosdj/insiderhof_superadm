/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";
import { Launch, LaunchsState } from "../../../../store/ducks/dlaunch/types";
import { Cart, CartsState } from "../../../../store/ducks/carts/types";

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

  return (
    <>
      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">Vendas</span>
            <span className="text-muted mt-1 fw-bold fs-7">Últimas vendas</span>
          </h3>
        </div>

        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder text-muted">
                  <th className="min-w-120px">DATA</th>
                  <th className="min-w-120px">USUÁRIO</th>
                  <th className="min-w-100px">TREINAMENTO</th>
                  <th className="min-w-20px">PREÇO</th>
                  <th className="min-w-20px">PARCELAS</th>
                  <th className="min-w-20px">GATEWAY</th>
                  <th className="min-w-20px">REF</th>
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
                          <td>
                            {child.installments}
                          </td>
                          <td>
                            {child.gateway}
                          </td>
                          <td>
                            {child.idreference}
                          </td>
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
