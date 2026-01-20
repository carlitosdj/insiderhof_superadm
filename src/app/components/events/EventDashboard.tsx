import React, { useState, useEffect } from "react";
import { Nav, Tab, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { loadEventRequest, loadEventMetricsRequest } from "../../../store/ducks/events/actions";
import { Event } from "../../../store/ducks/events/types";
import { KTIcon } from "../../../_metronic/helpers";
import TicketsList from "./TicketsList";
import CheckinPanel from "./CheckinPanel";
import SessionsList from "./SessionsList";
import SpeakersList from "./SpeakersList";
import ArtifactsList from "./ArtifactsList";
import Update from "../../pages/admin/events/update";

const MOMENT = require("moment");

interface EventDashboardProps {
  eventId: number;
}

const EventDashboard: React.FC<EventDashboardProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);

  const event = useSelector((state: ApplicationState) => state.events.selectedEvent);
  const metrics = useSelector((state: ApplicationState) => state.events.metrics);
  const loading = useSelector((state: ApplicationState) => state.events.loadingEvent);

  useEffect(() => {
    if (eventId) {
      dispatch(loadEventRequest(eventId));
      dispatch(loadEventMetricsRequest(eventId));
    }
  }, [dispatch, eventId]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  if (loading || !event) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return "badge-light-secondary";
      case "open":
        return "badge-light-primary";
      case "full":
        return "badge-light-warning";
      case "closed":
        return "badge-light-secondary";
      case "in_progress":
        return "badge-light-info";
      case "finished":
        return "badge-light-success";
      case "cancelled":
        return "badge-light-danger";
      default:
        return "badge-light-secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho";
      case "open":
        return "Aberto";
      case "full":
        return "Lotado";
      case "closed":
        return "Fechado";
      case "in_progress":
        return "Em Andamento";
      case "finished":
        return "Finalizado";
      case "cancelled":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div>
      {/* Header do Evento */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="flex-grow-1">
              <h1 className="text-gray-900 fw-bold mb-2">{event.name}</h1>
              <div className="d-flex align-items-center text-muted fs-6">
                <KTIcon iconName="calendar" className="fs-3 me-2" />
                <span className="me-5">
                  {event.startDate ? MOMENT(event.startDate).format("DD/MM/YYYY HH:mm") : "-"}
                  {event.endDate && MOMENT(event.startDate).format("DD/MM/YYYY") !== MOMENT(event.endDate).format("DD/MM/YYYY") && (
                    <> - {MOMENT(event.endDate).format("DD/MM/YYYY HH:mm")}</>
                  )}
                </span>
                <KTIcon iconName="geolocation" className="fs-3 me-2" />
                <span className="me-5">{event.location || "Local não definido"}</span>
                <span className={`badge ${getStatusBadge(event.status || "draft")}`}>
                  {getStatusText(event.status || "draft")}
                </span>
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-sm btn-light-primary me-2"
                onClick={handleOpenEditModal}
              >
                <KTIcon iconName="pencil" className="fs-3" />
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || "overview")}>
        <div className="card">
          <div className="card-header border-0 pt-6">
            <Nav variant="tabs" className="nav-line-tabs nav-line-tabs-2x mb-0">
              <Nav.Item>
                <Nav.Link eventKey="overview" className="text-active-primary pb-4">
                  <KTIcon iconName="element-11" className="fs-2 me-2" />
                  Visão Geral
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tickets" className="text-active-primary pb-4">
                  <KTIcon iconName="tag" className="fs-2 me-2" />
                  Tickets
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="checkin" className="text-active-primary pb-4">
                  <KTIcon iconName="verify" className="fs-2 me-2" />
                  Check-in
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="schedule" className="text-active-primary pb-4">
                  <KTIcon iconName="calendar-8" className="fs-2 me-2" />
                  Programação
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="speakers" className="text-active-primary pb-4">
                  <KTIcon iconName="profile-user" className="fs-2 me-2" />
                  Palestrantes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="artifacts" className="text-active-primary pb-4">
                  <KTIcon iconName="star" className="fs-2 me-2" />
                  Recomendações
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="card-body">
            <Tab.Content>
              {/* Tab: Visão Geral */}
              <Tab.Pane eventKey="overview">
                

                {/* RSVP Metrics Row */}
                {event.enableRsvp && (
                  <div className="row g-5 ">
                    <div className="col-12">
                      <h3 className="text-gray-900 fw-bold mb-4">Confirmações de Presença (RSVP)</h3>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-flush">
                        <div className="card-header pt-5">
                          <div className="card-title d-flex flex-column">
                            <span className="fs-2hx fw-bold text-success me-2 lh-1">
                              {metrics?.confirmedRsvps || 0}
                            </span>
                            <span className="text-gray-500 pt-1 fw-semibold fs-6">
                              Confirmados
                            </span>
                          </div>
                        </div>
                        <div className="card-body d-flex align-items-end pt-0">
                          <div className="d-flex align-items-center flex-column w-100">
                            <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                              <span className="fw-bold fs-6 text-gray-500">
                                Total: {metrics?.totalTickets || 0}
                              </span>
                              <span className="fw-bold fs-6 text-success">
                                {metrics?.rsvpRate || 0}%
                              </span>
                            </div>
                            <div className="w-100 bg-light-success rounded h-5px">
                              <div
                                className="bg-success rounded h-5px"
                                style={{ width: `${metrics?.rsvpRate || 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-flush">
                        <div className="card-header pt-5">
                          <div className="card-title d-flex flex-column">
                            <span className="fs-2hx fw-bold text-danger me-2 lh-1">
                              {metrics?.declinedRsvps || 0}
                            </span>
                            <span className="text-gray-500 pt-1 fw-semibold fs-6">
                              Recusados
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-flush">
                        <div className="card-header pt-5">
                          <div className="card-title d-flex flex-column">
                            <span className="fs-2hx fw-bold text-warning me-2 lh-1">
                              {metrics?.pendingRsvps || 0}
                            </span>
                            <span className="text-gray-500 pt-1 fw-semibold fs-6">
                              Pendentes
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-flush">
                        <div className="card-header pt-5">
                          <div className="card-title d-flex flex-column">
                            <span className="fs-2hx fw-bold text-info me-2 lh-1">
                              {metrics?.noShows || 0}
                            </span>
                            <span className="text-gray-500 pt-1 fw-semibold fs-6">
                              No-Shows
                            </span>
                          </div>
                        </div>
                        <div className="card-body d-flex align-items-end pt-0">
                          <span className="text-muted fs-7">
                            Confirmaram mas não fizeram check-in
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row g-5 mt-5">
                  <div className="col-12">
                      <h3 className="text-gray-900 fw-bold mb-4">Check ins</h3>
                    </div>
                  {/* Métricas Cards */}
                  <div className="col-xl-3 col-md-6">
                    <div className="card card-flush">
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1">
                            {metrics?.totalTickets || 0}
                          </span>
                          <span className="text-gray-500 pt-1 fw-semibold fs-6">
                            Total de Tickets
                          </span>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-end pt-0">
                        <div className="d-flex align-items-center flex-column w-100">
                          <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                            <span className="fw-bold fs-6 text-gray-500">
                              Capacidade: {event.capacity}
                            </span>
                            <span className="fw-bold fs-6 text-gray-900">
                              {metrics?.occupancyRate || 0}%
                            </span>
                          </div>
                          <div className="w-100 bg-light-success rounded h-5px">
                            <div
                              className="bg-success rounded h-5px"
                              style={{ width: `${metrics?.occupancyRate || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6">
                    <div className="card card-flush">
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1">
                            {metrics?.totalCheckins || 0}
                          </span>
                          <span className="text-gray-500 pt-1 fw-semibold fs-6">
                            Check-ins Realizados
                          </span>
                        </div>
                      </div>
                      <div className="card-body d-flex align-items-end pt-0">
                        <div className="d-flex align-items-center flex-column w-100">
                          <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                            <span className="fw-bold fs-6 text-gray-500">
                              Pendentes: {metrics?.pendingCheckins || 0}
                            </span>
                            <span className="fw-bold fs-6 text-gray-900">
                              {metrics?.checkinRate || 0}%
                            </span>
                          </div>
                          <div className="w-100 bg-light-primary rounded h-5px">
                            <div
                              className="bg-primary rounded h-5px"
                              style={{ width: `${metrics?.checkinRate || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6">
                    <div className="card card-flush">
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1">
                            {metrics?.remainingSpots || 0}
                          </span>
                          <span className="text-gray-500 pt-1 fw-semibold fs-6">
                            Vagas Disponíveis
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-3 col-md-6">
                    <div className="card card-flush">
                      <div className="card-header pt-5">
                        <div className="card-title d-flex flex-column">
                          <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1">
                            {metrics?.totalTransfers || 0}
                          </span>
                          <span className="text-gray-500 pt-1 fw-semibold fs-6">
                            Transferências
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações do Evento */}
                <div className="row g-5 mt-5">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Informações do Evento</h3>
                      </div>
                      <div className="card-body">
                        <div className="row mb-7">
                          <label className="col-lg-4 fw-bold text-muted">Descrição</label>
                          <div className="col-lg-8">
                            <span className="fw-semibold fs-6 text-gray-900">
                              {event.description || "-"}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-7">
                          <label className="col-lg-4 fw-bold text-muted">Endereço</label>
                          <div className="col-lg-8">
                            <span className="fw-semibold fs-6 text-gray-900">
                              {event.address || "-"}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-7">
                          <label className="col-lg-4 fw-bold text-muted">Data de Início</label>
                          <div className="col-lg-8">
                            <span className="fw-semibold fs-6 text-gray-900">
                              {event.startDate
                                ? MOMENT(event.startDate).format("DD/MM/YYYY HH:mm")
                                : "-"}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-7">
                          <label className="col-lg-4 fw-bold text-muted">Data de Término</label>
                          <div className="col-lg-8">
                            <span className="fw-semibold fs-6 text-gray-900">
                              {event.endDate
                                ? MOMENT(event.endDate).format("DD/MM/YYYY HH:mm")
                                : "-"}
                            </span>
                          </div>
                        </div>
                        <div className="row mb-7">
                          <label className="col-lg-4 fw-bold text-muted">Contato</label>
                          <div className="col-lg-8">
                            <span className="fw-semibold fs-6 text-gray-900">
                              {event.contactEmail || "-"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>

              {/* Tab: Tickets */}
              <Tab.Pane eventKey="tickets">
                <TicketsList eventId={eventId} />
              </Tab.Pane>

              {/* Tab: Check-in */}
              <Tab.Pane eventKey="checkin">
                <CheckinPanel eventId={eventId} />
              </Tab.Pane>

              {/* Tab: Programação */}
              <Tab.Pane eventKey="schedule">
                <SessionsList eventId={eventId} />
              </Tab.Pane>

              {/* Tab: Palestrantes */}
              <Tab.Pane eventKey="speakers">
                <SpeakersList eventId={eventId} />
              </Tab.Pane>

              {/* Tab: Recomendações */}
              <Tab.Pane eventKey="artifacts">
                <ArtifactsList eventId={eventId} />
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>

      {/* Modal de Edição */}
      <Modal size="xl" show={showEditModal} onHide={handleCloseEditModal}>
        <div className="modal-header">
          <h2>Editar Evento</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleCloseEditModal}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>
        <div className="modal-body py-lg-10 px-lg-10">
          {event && <Update handleClose={handleCloseEditModal} child={event} />}
        </div>
      </Modal>
    </div>
  );
};

export default EventDashboard;
