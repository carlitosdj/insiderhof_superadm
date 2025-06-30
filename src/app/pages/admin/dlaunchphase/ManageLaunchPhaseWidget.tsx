/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Badge, Nav } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";

import Create from "./create";
import Update from "./update";
import Configuration from "./Configuration";

import momentDurationFormatSetup from "moment-duration-format";
import { AnimatePresence, Reorder } from "framer-motion";

import Manage from "../dlaunchhasoffers/Manage";
import { ManageLaunchPhaseExtraWidget } from "../dlaunchphaseextra/ManageLaunchPhaseExtraWidget";
import Resume from "./Resume";
import {
  LaunchPhases,
  LaunchPhasesState,
} from "../../../../store/ducks/dlaunchphase/types";
import {
  deleteLaunchPhasesRequest,
  reorderLaunchPhasesRequest,
  updateLaunchPhasesRequest,
  loadMyLaunchPhasesRequest,
} from "../../../../store/ducks/dlaunchphase/actions";
import { loadMyLaunchPhaseExtrasRequest } from "../../../../store/ducks/dlaunchphaseextras/actions";
import { loadLaunchRequest } from "../../../../store/ducks/dlaunch/actions";
import { ApplicationState } from "../../../../store";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Estilos CSS customizados
const tabStyles = `
  .nav-tabs .nav-link {
    border: none;
    border-radius: 8px 8px 0 0;
    margin-right: 4px;
    padding: 12px 20px;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .nav-tabs .nav-link.active {
    background: #007bff;
    color: white;
    box-shadow: 0 4px 12px rgba(0,123,255,0.3);
  }
  
  .nav-tabs .nav-link:hover:not(.active) {
    background: rgba(0,123,255,0.1);
    color: #007bff;
  }
  
  .tab-content {
    background: white;
    border-radius: 0 8px 8px 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    min-height: 400px;
  }
  
  .tab-pane {
    height: 100%;
  }
  
  .tab-pane .component-wrapper {
    padding: 0;
    height: 100%;
  }
  
  .tab-pane .component-wrapper .card {
    border: none;
    box-shadow: none;
    margin: 0;
  }
  
  .tab-pane .component-wrapper .card-header {
    background: transparent;
    border-bottom: 1px solid #e9ecef;
    padding: 1rem 1.5rem;
  }
  
  .tab-pane .component-wrapper .card-body {
    padding: 1.5rem;
  }
`;

type Props = {
  className: string;
};

const ManageLaunchPhaseWidget: React.FC<React.PropsWithChildren<Props>> = ({
  className,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [child, setChild] = useState<LaunchPhases>({});
  const [activeTab, setActiveTab] = useState<string>("resumo");

  const { launchId, launchPhaseId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state para launchphaseextras
  const launch = useSelector((state: ApplicationState) => state.launch);
  const launchphases = useSelector((state: ApplicationState) => state.launchphase);
  const launchphaseextras = useSelector((state: ApplicationState) => state.launchphaseextra);

  const handleClose = () => {
    setShow(false);
  };

  const createComponent = () => {
    setAction("createComponent");
    setShow(true);
  };

  // const updateComponent = (child: LaunchPhases) => {
  //   setAction("updateComponent");
  //   setShow(true);
  //   setChild(child);
  // };

  // Deleta componente: CHILD
  // const deleteComponent = (child: LaunchPhases) => {
  //   dispatch(deleteLaunchPhasesRequest(child.id!));
  // };

  // const reorder = (children: LaunchPhases[]) => {
  //   // console.log("children", children);
  //   children.map((child) => {
  //     let index = children.findIndex((item): any => item.id === child.id);
  //     if (index !== -1) {
  //       children[index] = { ...children[index], order: index + 1 }; // Replaces the object with id 2
  //     }
  //   });
  //   dispatch(reorderLaunchPhasesRequest(children));
  // };

  // const reorderToSave = (children: LaunchPhases[]) => {
  //   //Verifica se o old é igual ao children para atualizar no backend:
  //   if (JSON.stringify(oldChildren) !== JSON.stringify(children)) {
  //     children.map((child) => {
  //       dispatch(
  //         updateLaunchPhasesRequest({ id: child.id, order: child.order })
  //       );
  //     });
  //     //seta a lista de old para o novo:
  //     setOldChildren(children);
  //   }
  // };

  // const openHasLaunchs = (child: LaunchPhases) => {
  //   setAction("manageLaunchs");
  //   setShow(true);
  //   setChild(child);
  // };

  // useEffect principal para carregar dados apenas uma vez
  // useEffect(() => {
  //   console.log(
  //     "ManageLaunchPhaseWidget: useEffect principal executando, launchId:",
  //     launchId
  //   );
  //   if (!launch.launch) {
  //     dispatch(loadLaunchRequest(Number(launchId)));
  //     // dispatch(loadMyLaunchPhasesRequest(Number(launchId)));
  //   }
  // }, []); // Array vazio - executa apenas uma vez
  console.log("launch-------", launch);
  // useEffect para configurar tab ativa baseada na URL
  useEffect(() => {
    console.log(
      "ManageLaunchPhaseWidget: useEffect tab ativa, launchId:",
      launchId,
      "launchPhaseId:",
      launchPhaseId
    );
    if (launchPhaseId) {
      setActiveTab(launchPhaseId);
    } else if (launchId) {
      setActiveTab("resumo");
    }
  }, [launchId, launchPhaseId]);

  // useEffect para carregar dados da fase ativa (apenas para fases específicas)
  useEffect(() => {
    console.log(
      "ManageLaunchPhaseWidget: useEffect fase ativa, activeTab:",
      activeTab
    );
    if (activeTab && activeTab !== "resumo" && activeTab !== "configuracao") {
      dispatch(loadMyLaunchPhaseExtrasRequest(Number(activeTab)));
    }
  }, [activeTab]);

  // Handle tab click to change URL
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);

    if (tabId === "resumo") {
      // Navigate to launch overview without phase
      navigate(`/launch/${launchId}`);
    } else if (tabId === "configuracao") {
      // Navigate to configuration tab
      navigate(`/launch/${launchId}/configuracao`);
    } else {
      // Navigate to specific phase
      navigate(`/launch/${launchId}/${tabId}`);
    }
  };

  const renderTabContent = () => {
    if (activeTab === "resumo") {
      return (
        <div className="tab-pane fade show active">
          <div className="component-wrapper">
            <Resume />
          </div>
        </div>
      );
    }

    if (activeTab === "configuracao") {
      return (
        <div className="tab-pane fade show active">
          <div className="component-wrapper">
            <Configuration />
          </div>
        </div>
      );
    }

    if (!activeTab) {
      return (
        <div className="tab-pane fade show active p-4">
          <div className="text-center py-8">
            <KTIcon iconName="rocket" className="fs-4x text-muted mb-4" />
            <h4 className="text-muted mb-2">Nenhuma fase selecionada</h4>
            <p className="text-muted fs-6 mb-4">
              Selecione uma fase na aba acima para visualizar seu conteúdo.
            </p>
          </div>
        </div>
      );
    }

    const phase = launchphases.myLaunchPhases.find(
      (p) => p.id?.toString() === activeTab
    );
    if (!phase) {
      return (
        <div className="tab-pane fade show active p-4">
          <div className="text-center py-8">
            <KTIcon
              iconName="exclamation-triangle"
              className="fs-4x text-muted mb-4"
            />
            <h4 className="text-muted mb-2">Fase não encontrada</h4>
            <p className="text-muted fs-6 mb-4">
              A fase selecionada não foi encontrada.
            </p>
          </div>
        </div>
      );
    }

    // Retorna o componente ManageLaunchPhaseExtraWidget
    return (
      <div className="tab-pane fade show active">
        <div className="component-wrapper">
          <ManageLaunchPhaseExtraWidget
            launchPhaseId={Number(activeTab)}
            launchphaseextras={launchphaseextras}
            className=""
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{tabStyles}</style>

      <Modal
        id="kt_modal_create_app"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={show}
        onHide={handleClose}
        backdrop={true}
      >
        <div className="modal-header">
          <h2>
            {action === "updateComponent" ? "Editar launch" : ""}
            {action === "createComponent" ? "Adicionar launch" : ""}
            {/* {action === "manageLaunchs" ? "Gerenciar ofertas" : ""} */}
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
          {action === "updateComponent" ? (
            <Update handleClose={handleClose} child={child} />
          ) : (
            ""
          )}
          {action === "createComponent" ? (
            <Create handleClose={handleClose} launchId={Number(launchId)} />
          ) : (
            ""
          )}
          {/* {action === "manageLaunchs" ? (
            <Manage handleClose={handleClose} child={child} />
          ) : (
            ""
          )} */}
        </div>
      </Modal>

      <div className={`card ${className}`}>
        <div className="card-header border-0 pt-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              <KTIcon iconName="rocket" className="fs-2 text-primary me-2" />
              Gerenciador de Fases
            </span>
            <span className="text-muted mt-1 fw-bold fs-7">
              Gerencie todas as fases do seu lançamento
            </span>
          </h3>
          <div className="card-toolbar">
            <Button
              className="btn btn-primary btn-lg px-6"
              onClick={() => createComponent()}
            >
              <KTIcon iconName="plus" className="fs-2 me-2" />
              Nova Fase
            </Button>
          </div>
        </div>

        <div className="card-body p-0">
          {/* Navegação por Abas */}
          <Nav variant="tabs" className="border-0 px-6 pt-3">
            <Nav.Item>
              <Nav.Link
                active={activeTab === "resumo"}
                onClick={() => handleTabClick("resumo")}
                className="d-flex align-items-center"
              >
                <KTIcon iconName="chart-line" className="fs-6 me-2" />
                Resumo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                active={activeTab === "configuracao"}
                onClick={() => handleTabClick("configuracao")}
                className="d-flex align-items-center"
              >
                <KTIcon iconName="gear" className="fs-6 me-2" />
                Configuração
              </Nav.Link>
            </Nav.Item>
            {launchphases.myLaunchPhases?.map(
              (phase: LaunchPhases, index: number) => (
                <Nav.Item key={phase.id}>
                  <Nav.Link
                    active={activeTab === phase.id?.toString()}
                    onClick={() => handleTabClick(phase.id?.toString() || "")}
                    className="d-flex align-items-center"
                  >
                    <KTIcon
                      iconName={
                        phase.name === "Captação"
                          ? "user-plus"
                          : phase.name === "Evento"
                          ? "calendar"
                          : phase.name === "Vendas"
                          ? "shopping-cart"
                          : "gear"
                      }
                      className="fs-6 me-2"
                    />
                    {phase.name}
                    {/* <Badge bg="success" className="ms-2 fs-8">
                    #{index + 1}
                  </Badge> */}
                  </Nav.Link>
                </Nav.Item>
              )
            )}
          </Nav>

          {/* Conteúdo das Abas */}
          {/* <div className="tab-content">{renderTabContent()}</div> */}
          <div className="">{renderTabContent()}</div>
        </div>
      </div>
    </>
  );
};

export { ManageLaunchPhaseWidget };
