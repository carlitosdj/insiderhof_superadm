import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadSessionsRequest,
  deleteSessionRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventSession } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";
import SessionForm from "./SessionForm";
import ManageSessionSpeakersModal from "./ManageSessionSpeakersModal";

const MOMENT = require("moment");

interface SessionsListProps {
  eventId: number;
}

const SessionsList: React.FC<SessionsListProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<EventSession | null>(null);
  const [showSpeakersModal, setShowSpeakersModal] = useState(false);
  const [selectedSessionForSpeakers, setSelectedSessionForSpeakers] = useState<EventSession | null>(null);

  const sessions = useSelector((state: ApplicationState) => state.eventsessions.sessions);
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingSessions);

  useEffect(() => {
    if (eventId) {
      dispatch(loadSessionsRequest(eventId));
    }
  }, [dispatch, eventId]);

  const filteredSessions = sessions.filter((session) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      session.title?.toLowerCase().includes(searchLower) ||
      session.description?.toLowerCase().includes(searchLower) ||
      session.location?.toLowerCase().includes(searchLower)
    );
  });

  // Ordenar por data/hora
  const sortedSessions = [...filteredSessions].sort((a, b) => {
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  const getSessionTypeBadge = (type?: string) => {
    switch (type) {
      case "talk":
        return "badge-light-primary";
      case "workshop":
        return "badge-light-success";
      case "panel":
        return "badge-light-info";
      case "networking":
        return "badge-light-warning";
      case "break":
        return "badge-light-secondary";
      default:
        return "badge-light-secondary";
    }
  };

  const getSessionTypeText = (type?: string) => {
    switch (type) {
      case "talk":
        return "Palestra";
      case "workshop":
        return "Workshop";
      case "panel":
        return "Painel";
      case "networking":
        return "Networking";
      case "break":
        return "Intervalo";
      default:
        return type || "-";
    }
  };

  const handleDelete = (session: EventSession) => {
    if (
      window.confirm(
        `Deseja realmente excluir a sessão "${session.title}"?\n\nEsta ação não pode ser desfeita.`
      )
    ) {
      if (session.id) {
        dispatch(deleteSessionRequest(session.id));
      }
    }
  };

  const handleCreateSession = () => {
    setSelectedSession(null);
    setShowModal(true);
  };

  const handleEditSession = (session: EventSession) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSession(null);
    // Recarregar sessões após fechar modal
    setTimeout(() => {
      dispatch(loadSessionsRequest(eventId));
    }, 300);
  };

  const handleManageSpeakers = (session: EventSession) => {
    setSelectedSessionForSpeakers(session);
    setShowSpeakersModal(true);
  };

  const handleCloseSpeakersModal = () => {
    setShowSpeakersModal(false);
    setSelectedSessionForSpeakers(null);
    // Recarregar sessões após fechar modal para atualizar palestrantes
    setTimeout(() => {
      dispatch(loadSessionsRequest(eventId));
    }, 300);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header com Busca */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-8">
              <div className="d-flex align-items-center position-relative">
                <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                <input
                  type="text"
                  className="form-control form-control-solid ps-14"
                  placeholder="Buscar sessões por título, descrição ou local..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                onClick={handleCreateSession}
              >
                <KTIcon iconName="plus" className="fs-3 me-2" />
                Nova Sessão
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Sessões */}
      <div className="card">
        <div className="card-header border-0 pt-6">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bold text-gray-800">
              Programação do Evento
            </span>
            <span className="text-muted mt-1 fw-semibold fs-7">
              {sortedSessions.length} sessão(ões) encontrada(s)
            </span>
          </h3>
        </div>

        <div className="card-body py-3">
          {sortedSessions.length === 0 ? (
            <div className="text-center py-20">
              <KTIcon iconName="calendar-8" className="fs-5x text-muted mb-5" />
              <h3 className="text-gray-600 mb-2">
                Nenhuma sessão cadastrada
              </h3>
              <p className="text-muted">
                Clique em "Nova Sessão" para adicionar a primeira sessão ao evento
              </p>
            </div>
          ) : (
            <div className="timeline">
              {sortedSessions.map((session, index) => (
                <div key={session.id} className="timeline-item mb-8">
                  <div className="timeline-line w-40px"></div>

                  <div className="timeline-icon symbol symbol-circle symbol-40px">
                    <div className="symbol-label bg-light">
                      <KTIcon
                        iconName={
                          session.sessionType === "talk"
                            ? "microphone"
                            : session.sessionType === "workshop"
                            ? "wrench"
                            : session.sessionType === "panel"
                            ? "profile-user"
                            : session.sessionType === "networking"
                            ? "messages"
                            : "coffee"
                        }
                        className="fs-2 text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="timeline-content mb-10 mt-n1">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="flex-grow-1">
                            {/* Horário */}
                            <div className="text-muted fs-7 mb-1">
                              {session.startTime
                                ? MOMENT(session.startTime).format("DD/MM/YYYY")
                                : "-"}{" "}
                              •{" "}
                              {session.startTime
                                ? MOMENT(session.startTime).format("HH:mm")
                                : "-"}{" "}
                              -{" "}
                              {session.endTime
                                ? MOMENT(session.endTime).format("HH:mm")
                                : "-"}
                            </div>

                            {/* Título */}
                            <h4 className="text-gray-800 fw-bold mb-2">
                              {session.title || "Sem título"}
                            </h4>

                            {/* Badges */}
                            <div className="d-flex flex-wrap gap-2 mb-3">
                              <span
                                className={`badge ${getSessionTypeBadge(
                                  session.sessionType
                                )}`}
                              >
                                {getSessionTypeText(session.sessionType)}
                              </span>

                              {session.location && (
                                <span className="badge badge-light">
                                  <KTIcon iconName="geolocation" className="fs-4 me-1" />
                                  {session.location}
                                </span>
                              )}

                              {session.hasCapacityLimit ? (
                                <span className="badge badge-light">
                                  <KTIcon iconName="profile-user" className="fs-4 me-1" />
                                  Limite: {session.capacity} pessoas
                                </span>
                              ) : null}

                              {session.restrictedToTypes && session.restrictedToTypes.length > 0 && (
                                <span className="badge badge-light-warning">
                                  <KTIcon iconName="security-user" className="fs-4 me-1" />
                                  Restrito
                                </span>
                              )}
                            </div>

                            {/* Descrição */}
                            {session.description && (
                              <p className="text-gray-600 fs-6 mb-3">
                                {session.description.length > 150
                                  ? session.description.substring(0, 150) + "..."
                                  : session.description}
                              </p>
                            )}

                            {/* Palestrantes */}
                            {session.speakers && session.speakers.length > 0 && (
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <KTIcon iconName="profile-user" className="fs-4 text-muted" />
                                <span className="text-gray-700 fs-7">
                                  {session.speakers.map((s) => s.name).join(", ")}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Ações */}
                          <div className="d-flex flex-column gap-2">
                            <button
                              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                              onClick={() => handleEditSession(session)}
                              title="Editar"
                            >
                              <KTIcon iconName="pencil" className="fs-3" />
                            </button>

                            <button
                              className="btn btn-icon btn-bg-light btn-active-color-success btn-sm"
                              onClick={() => handleManageSpeakers(session)}
                              title="Gerenciar Palestrantes"
                            >
                              <KTIcon iconName="profile-user" className="fs-3" />
                            </button>

                            <button
                              className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
                              onClick={() => handleDelete(session)}
                              title="Remover"
                            >
                              <KTIcon iconName="trash" className="fs-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Criar/Editar Sessão */}
      <SessionForm
        eventId={eventId}
        session={selectedSession}
        show={showModal}
        onClose={handleCloseModal}
      />

      {/* Modal de Gerenciar Palestrantes */}
      <ManageSessionSpeakersModal
        show={showSpeakersModal}
        onClose={handleCloseSpeakersModal}
        session={selectedSessionForSpeakers}
        eventId={eventId}
      />
    </div>
  );
};

export default SessionsList;
