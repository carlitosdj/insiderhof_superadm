/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { AnimatePresence, Reorder } from "framer-motion";
import { Button, Card, Alert, Badge } from "react-bootstrap";
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
import moment from "moment";
momentDurationFormatSetup(moment);

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
    const confirmMessage = `Deseja realmente remover a oferta "${child.offer?.name}" deste lançamento?\n\nEsta ação é irreversível.`;
    
    if (window.confirm(confirmMessage)) {
      dispatch(deleteLaunchHasOffersRequest(child.id!));
    }
  };

  const reorder = (children: LaunchHasOffers[]) => {
    children.map((child) => {
      let index = children.findIndex((item): any => item.id === child.id);
      if (index !== -1) {
        children[index] = { ...children[index], order: index + 1 };
      }
    });
    dispatch(reorderLaunchHasOffersRequest(children));
  };

  const reorderToSave = (children: LaunchHasOffers[]) => {
    if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
      children.map((child) => {
        dispatch(
          updateLaunchHasOffersRequest({ id: child.id, order: child.order })
        );
      });
      setOldChildren(children);
    }
  };

  const handleOfferSelection = (offer: any, isChecked: boolean) => {
    if (isChecked) {
      // Verifica se já existe uma oferta selecionada
      const currentSelectedOffer = launchhasoffers.data.find(
        (child) => child.offerId === offer.id
      );
      
      if (launchhasoffers.data.length > 0 && !currentSelectedOffer) {
        const confirmMessage = `Já existe uma oferta selecionada para este lançamento.\n\nDeseja desmarcar a oferta atual e selecionar "${offer.name}"?`;
        
        if (window.confirm(confirmMessage)) {
          // Remove todas as ofertas existentes
          launchhasoffers.data.forEach((existingOffer) => {
            dispatch(deleteLaunchHasOffersRequest(existingOffer.id!));
          });
          
          // Adiciona a nova oferta
          setTimeout(() => {
            const offerHasLaunch: LaunchHasOffers = {
              launchId: Number(launchId),
              offerId: Number(offer.id),
            };
            dispatch(createLaunchHasOffersRequest(offerHasLaunch));
          }, 100);
        }
      } else if (!currentSelectedOffer) {
        // Adiciona a oferta normalmente se não houver nenhuma
        const offerHasLaunch: LaunchHasOffers = {
          launchId: Number(launchId),
          offerId: Number(offer.id),
        };
        dispatch(createLaunchHasOffersRequest(offerHasLaunch));
      }
    } else {
      // Remove a oferta
      const offerHasPods = launchhasoffers.data.find(
        (child) => child.offerId === offer.id
      );
      if (offerHasPods) {
        dispatch(deleteLaunchHasOffersRequest(offerHasPods.id!));
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      <div className="row g-4">
        {/* Coluna de Ofertas Disponíveis */}
        <div className="col-lg-6">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 pb-3">
              <div className="d-flex align-items-center">
                <div className="bg-light-primary rounded-circle p-2 me-3">
                  <KTIcon iconName="gift" className="fs-4 text-primary" />
                </div>
                <div>
                  <h5 className="fw-bold text-gray-800 mb-1">Ofertas Disponíveis</h5>
                  <p className="text-muted fs-7 mb-0">
                    Selecione uma oferta para associar ao lançamento
                  </p>
                </div>
              </div>
            </Card.Header>
            
            <Card.Body className="p-4 pt-0">
              {offers.loading ? (
                <Loading />
              ) : offers.myOffers.length === 0 ? (
                <Alert variant="info" className="text-center">
                  <KTIcon iconName="gift" className="fs-3 mb-2" />
                  <h6>Nenhuma oferta disponível</h6>
                  <p className="mb-0">Crie ofertas primeiro para poder associá-las aos lançamentos.</p>
                </Alert>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {offers.myOffers.map((offer) => {
                    const isSelected = launchhasoffers.data.find(
                      (child) => child.offerId === offer.id
                    );
                    
                    return (
                      <div 
                        key={offer.id} 
                        className={`p-3 rounded border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-light-success border-success' 
                            : 'bg-light border-light hover-bg-light-primary'
                        }`}
                        onClick={() => handleOfferSelection(offer, !isSelected)}
                      >
                        <div className="d-flex align-items-center">
                          <div className="form-check form-check-custom form-check-solid me-3">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={!!isSelected}
                              onChange={(e) => handleOfferSelection(offer, e.target.checked)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          
                          <div className="flex-grow-1">
                            <div className="d-flex align-items-center mb-2">
                              {offer.image && (
                                <img
                                  className="rounded me-3"
                                  height={40}
                                  width={40}
                                  src={
                                    offer.image.includes("https://")
                                      ? offer.image
                                      : "https://app.insiderhof.com.br/files/" + offer.image
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                                  }}
                                />
                              )}
                              <div className="flex-grow-1">
                                <h6 className="fw-bold text-gray-800 mb-1">{offer.name}</h6>
                                <div className="d-flex align-items-center gap-2">
                                  {/* <Badge bg="success" className="fs-8">
                                    {formatCurrency(offer.price || 0)}
                                  </Badge> */}
                                  {isSelected && (
                                    <Badge bg="success" className="fs-8">
                                      Selecionada
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {offer.description && (
                              <p className="text-muted fs-8 mb-0">
                                {offer.description.length > 100 
                                  ? offer.description.substring(0, 100) + '...' 
                                  : offer.description
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Coluna de Ofertas Selecionadas */}
        <div className="col-lg-6">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Header className="bg-transparent border-0 pt-4 pb-3">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="bg-light-info rounded-circle p-2 me-3">
                    <KTIcon iconName="check" className="fs-4 text-info" />
                  </div>
                  <div>
                    <h5 className="fw-bold text-gray-800 mb-1">Oferta Selecionada</h5>
                    <p className="text-muted fs-7 mb-0">
                      Oferta associada ao lançamento
                    </p>
                  </div>
                </div>
                <Badge bg="info" className="fs-8">
                  {launchhasoffers.data.length}/1
                </Badge>
              </div>
            </Card.Header>
            
            <Card.Body className="p-4 pt-0">
              {launchhasoffers.loading ? (
                <Loading />
              ) : launchhasoffers.data.length === 0 ? (
                <Alert variant="warning" className="text-center">
                  <KTIcon iconName="gift" className="fs-3 mb-2" />
                  <h6>Nenhuma oferta selecionada</h6>
                  <p className="mb-0">Selecione uma oferta na coluna ao lado para associá-la ao lançamento.</p>
                </Alert>
              ) : (
                <Reorder.Group
                  values={launchhasoffers.data}
                  onReorder={reorder}
                  onTap={(e) => reorderToSave(launchhasoffers.data)}
                  onMouseUp={(e) => reorderToSave(launchhasoffers.data)}
                  style={{ touchAction: "none" }}
                  className="d-flex flex-column gap-3"
                >
                  <AnimatePresence>
                    {launchhasoffers.data?.map((child: LaunchHasOffers, index: number) => (
                      <Reorder.Item
                        key={child.id}
                        value={child}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-0 bg-light-success">
                          <Card.Body className="p-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                {child.offer?.image && (
                                  <img
                                    className="rounded me-3"
                                    height={50}
                                    width={50}
                                    src={
                                      child.offer?.image.includes("https://")
                                        ? child.offer?.image
                                        : "https://app.insiderhof.com.br/files/" + child.offer?.image
                                    }
                                    onError={({ currentTarget }) => {
                                      currentTarget.onerror = null;
                                      currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                                    }}
                                  />
                                )}
                                <div>
                                  <h6 className="fw-bold text-gray-800 mb-1">{child.offer?.name}</h6>
                                  {/* <Badge bg="success" className="fs-8">
                                    {formatCurrency(child.offer?.price || 0)}
                                  </Badge> */}
                                </div>
                              </div>
                              
                              <div className="d-flex align-items-center gap-2">
                                <div 
                                  style={{ cursor: "grab" }} 
                                  className="text-muted p-2 rounded hover-bg-light"
                                  title="Arrastar para reordenar"
                                >
                                  <KTIcon iconName="arrow-up-down" className="fs-5" />
                                </div>
                                
                                <Button
                                  size="sm"
                                  variant="outline-danger"
                                  onClick={() => deleteComponent(child)}
                                  className="btn-sm"
                                  title="Remover oferta"
                                >
                                  <KTIcon iconName="trash" className="fs-6" />
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Reorder.Item>
                    ))}
                  </AnimatePresence>
                </Reorder.Group>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export { ManageLaunchHasOffersWidget };
