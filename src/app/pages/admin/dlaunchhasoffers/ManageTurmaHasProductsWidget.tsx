/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { AnimatePresence, Reorder } from "framer-motion";
import {
  LaunchHasOffers,
  LaunchHasOffersState,
} from "../../../../store/ducks/dlaunchhasoffers/types";
import {
  createLaunchHasOffersRequest,
  deleteLaunchHasOffersRequest,
  reorderLaunchHasOffersRequest,
  updateLaunchHasOffersRequest,
} from "../../../../store/ducks/dlaunchhasoffers/actions";
import { loadMyOffersRequest } from "../../../../store/ducks/doffer/actions";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";

import momentDurationFormatSetup from "moment-duration-format";
import { Launch } from "../../../../store/ducks/dlaunch/types";
import Loading from "../../../loading";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

type Props = {
  className: string;
  launchhasoffers: LaunchHasOffersState;
  child: Launch;
};

const ManageLaunchHasOffersWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  launchhasoffers,
  child,
}) => {
  const [oldChildren, setOldChildren] = useState<LaunchHasOffers[]>(
    launchhasoffers.data
  );

  const launchId = child.id;
  const dispatch = useDispatch();

  const offers = useSelector((state: ApplicationState) => state.offer);
  const me = useSelector((state: ApplicationState) => state.me);

  useEffect(() => {
    dispatch(loadMyOffersRequest(Number(me.me.id)));
  }, [dispatch, launchId]);

  // Deleta componente: CHILD
  const deleteComponent = (child: LaunchHasOffers) => {
    dispatch(deleteLaunchHasOffersRequest(child.id!));
  };

  const reorder = (children: LaunchHasOffers[]) => {
    // console.log("children", children);
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
      }
    });
    dispatch(reorderLaunchHasOffersRequest(children));
  };

  const reorderToSave = (children: LaunchHasOffers[]) => {
    //Verifica se o old é igual ao children para atualizar no backend:
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(
          updateLaunchHasOffersRequest({ id: child.id, order: child.order })
        );
      });
      //seta a lista de old para o novo:
      setOldChildren(children);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          {offers.myOffers.map((offer) => (
            <div key={offer.id} className="d-flex align-items-center mb-5">
              {/* Checkbox */}
              <div className="form-check form-check-custom form-check-solid me-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={offer.id}
                  checked={
                    launchhasoffers.data.find(
                      (child) => child.offerId === offer.id
                    )
                      ? true
                      : false
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const offerHasLaunch: LaunchHasOffers = {
                        launchId: Number(launchId),
                        offerId: Number(offer.id),
                      };
                      console.log("VERRRRAQUIIIIIIIIII", offerHasLaunch);
                      dispatch(createLaunchHasOffersRequest(offerHasLaunch));
                    } else {
                      const offerHasPods = launchhasoffers.data.find(
                        (child) => child.offerId === offer.id
                      );
                      dispatch(deleteLaunchHasOffersRequest(offerHasPods?.id!));
                    }
                  }}
                />
              </div>
              {offer.name}
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              {launchhasoffers.loading && (
                    <Loading/>
                  )}
              <Reorder.Group
                as="tbody"
                values={launchhasoffers.data}
                onReorder={reorder}
                onTap={(e) => reorderToSave(launchhasoffers.data)}
                onMouseUp={(e) => reorderToSave(launchhasoffers.data)}
                style={{ touchAction: "none" }}
              >
                <AnimatePresence>

                  
                  {launchhasoffers.data.length === 0 && (
                    <tr className="border-0">
                      <td colSpan={3} className="text-center pt-10 ">
                        Nenhuma oferta encontrado aqui. Adicione um produto
                        selecionando-o ao lado.
                      </td>
                    </tr>
                  )}

                  {launchhasoffers.data.length !== 0 &&
                    launchhasoffers.data?.map(
                      (child: LaunchHasOffers, index: number) => {
                        // const { image } = child;
                        return (
                          <Reorder.Item
                            key={child.id}
                            value={child}
                            as="tr"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <td
                              onPointerDownCapture={(e) => e.stopPropagation()}
                              className="d-flex align-items-center border-0"
                            >
                              <div className="d-flex flex-row">
                                <div>
                                  <Link
                                    to={"#!"}
                                    style={{ display: "flex" }}
                                    className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
                                  >
                                    {child.offer?.name}
                                  </Link>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="d-flex justify-content-end flex-shrink-0">
                                <a
                                  href="#!"
                                  onClick={() => {
                                    if (
                                      window.confirm(
                                        "Deseja realmente excluir: " +
                                          child.id +
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
                            <td style={{ touchAction: "none" }}>
                              <div style={{ cursor: "grab" }}>
                                <KTIcon
                                  iconName="arrow-up-down"
                                  iconType="outline"
                                />
                              </div>
                            </td>
                          </Reorder.Item>
                        );
                      }
                    )}
                </AnimatePresence>
              </Reorder.Group>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export { ManageLaunchHasOffersWidget };
