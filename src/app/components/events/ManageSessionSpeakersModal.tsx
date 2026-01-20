import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadSpeakersRequest,
  loadSessionsRequest,
  addSpeakerToSessionRequest,
  removeSpeakerFromSessionRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventSession, EventSpeaker } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";

interface ManageSessionSpeakersModalProps {
  show: boolean;
  onClose: () => void;
  session: EventSession | null;
  eventId: number;
}

const ManageSessionSpeakersModal: React.FC<ManageSessionSpeakersModalProps> = ({
  show,
  onClose,
  session,
  eventId,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("speaker");

  const speakers = useSelector((state: ApplicationState) => state.eventsessions.speakers);
  const sessions = useSelector((state: ApplicationState) => state.eventsessions.sessions);
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingSpeakers);

  useEffect(() => {
    if (show && eventId) {
      dispatch(loadSpeakersRequest(eventId));
    }
  }, [show, eventId, dispatch]);

  if (!session) return null;

  // Pegar a sessão atualizada da store (com os palestrantes mais recentes)
  const currentSession = sessions.find((s) => s.id === session.id) || session;
  const sessionSpeakerIds = new Set(currentSession.speakers?.map((s) => s.id) || []);

  const filteredSpeakers = speakers.filter((speaker) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      speaker.name?.toLowerCase().includes(searchLower) ||
      speaker.company?.toLowerCase().includes(searchLower) ||
      speaker.title?.toLowerCase().includes(searchLower)
    );
  });

  const handleAddSpeaker = (speakerId: number) => {
    if (session.id) {
      dispatch(
        addSpeakerToSessionRequest({
          sessionId: session.id,
          speakerId,
          role: selectedRole,
        })
      );
      // Recarregar as sessões para atualizar a lista de palestrantes vinculados
      setTimeout(() => {
        if (eventId) {
          dispatch(loadSessionsRequest(eventId));
        }
      }, 500);
    }
  };

  const handleRemoveSpeaker = (speakerId: number) => {
    if (session.id) {
      if (
        window.confirm(
          "Deseja realmente remover este palestrante desta sessão?"
        )
      ) {
        dispatch(
          removeSpeakerFromSessionRequest({
            sessionId: session.id,
            speakerId,
          })
        );
        // Recarregar as sessões para atualizar a lista de palestrantes vinculados
        setTimeout(() => {
          if (eventId) {
            dispatch(loadSessionsRequest(eventId));
          }
        }, 500);
      }
    }
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "speaker":
        return "badge-light-primary";
      case "moderator":
        return "badge-light-info";
      case "panelist":
        return "badge-light-success";
      case "special_guest":
        return "badge-light-warning";
      default:
        return "badge-light-secondary";
    }
  };

  const getRoleText = (role?: string) => {
    switch (role) {
      case "speaker":
        return "Palestrante";
      case "moderator":
        return "Moderador";
      case "panelist":
        return "Painelista";
      case "special_guest":
        return "Convidado Especial";
      default:
        return "Outro";
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <KTIcon iconName="profile-user" className="fs-2 me-2" />
          Gerenciar Palestrantes
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Informação da Sessão */}
        <div className="alert alert-primary d-flex align-items-center mb-5">
          <KTIcon iconName="information-5" className="fs-2x text-primary me-4" />
          <div className="flex-grow-1">
            <h5 className="mb-1">{session.title}</h5>
            <p className="text-muted mb-0 fs-7">
              Selecione os palestrantes para esta sessão
            </p>
          </div>
        </div>

        {/* Palestrantes já na sessão */}
        {sessionSpeakerIds.size > 0 && (
          <div className="mb-5">
            <h6 className="text-gray-700 fw-bold mb-3">
              <KTIcon iconName="check-circle" className="fs-4 text-success me-2" />
              Palestrantes desta sessão ({sessionSpeakerIds.size})
            </h6>
            <div className="d-flex flex-column gap-2">
              {currentSession.speakers?.map((speaker) => (
                <div
                  key={speaker.id}
                  className="card card-flush border border-gray-300"
                >
                  <div className="card-body py-3 px-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        {speaker.image ? (
                          <div
                            className="symbol symbol-40px"
                            style={{
                              backgroundImage: `url(${speaker.image})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                            }}
                          ></div>
                        ) : (
                          <div className="symbol symbol-40px">
                            <div className="symbol-label bg-light-primary">
                              <KTIcon
                                iconName="profile-circle"
                                className="fs-2 text-primary"
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <div className="fw-bold text-gray-800">
                            {speaker.name}
                          </div>
                          {speaker.title && (
                            <div className="text-muted fs-7">
                              {speaker.title}
                              {speaker.company && ` • ${speaker.company}`}
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        className="btn btn-sm btn-light-danger"
                        onClick={() => handleRemoveSpeaker(speaker.id!)}
                      >
                        <KTIcon iconName="trash" className="fs-4" />
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Busca e seleção de função */}
        <div className="mb-4">
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label text-gray-700 fw-semibold fs-7 mb-2">
                Buscar palestrante
              </label>
              <div className="position-relative">
                <KTIcon
                  iconName="magnifier"
                  className="fs-2 position-absolute ms-4 mt-3"
                />
                <input
                  type="text"
                  className="form-control form-control-solid ps-12"
                  placeholder="Buscar por nome, empresa ou cargo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <label className="form-label text-gray-700 fw-semibold fs-7 mb-2">
                Função ao adicionar
              </label>
              <select
                className="form-select form-select-solid"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="speaker">Palestrante</option>
                <option value="moderator">Moderador</option>
                <option value="panelist">Painelista</option>
                <option value="special_guest">Convidado Especial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de palestrantes disponíveis */}
        <div>
          <h6 className="text-gray-700 fw-bold mb-3">
            <KTIcon iconName="user" className="fs-4 text-gray-500 me-2" />
            Adicionar palestrantes ({filteredSpeakers.length})
          </h6>

          {loading ? (
            <div className="text-center py-10">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : filteredSpeakers.length === 0 ? (
            <div className="text-center py-10">
              <KTIcon iconName="information-5" className="fs-5x text-muted mb-3" />
              <p className="text-muted">
                {search
                  ? "Nenhum palestrante encontrado com este filtro"
                  : "Nenhum palestrante cadastrado neste evento"}
              </p>
            </div>
          ) : (
            <div
              className="d-flex flex-column gap-2"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {filteredSpeakers.map((speaker) => {
                const isInSession = sessionSpeakerIds.has(speaker.id!);

                return (
                  <div
                    key={speaker.id}
                    className={`card card-flush ${
                      isInSession ? "border border-success bg-light-success" : "border border-gray-300"
                    }`}
                  >
                    <div className="card-body py-3 px-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                          {speaker.image ? (
                            <div
                              className="symbol symbol-40px"
                              style={{
                                backgroundImage: `url(${speaker.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></div>
                          ) : (
                            <div className="symbol symbol-40px">
                              <div className="symbol-label bg-light-primary">
                                <KTIcon
                                  iconName="profile-circle"
                                  className="fs-2 text-primary"
                                />
                              </div>
                            </div>
                          )}

                          <div>
                            <div className="fw-bold text-gray-800">
                              {speaker.name}
                              {isInSession && (
                                <span className="badge badge-success ms-2 fs-8">
                                  Na sessão
                                </span>
                              )}
                            </div>
                            {speaker.title && (
                              <div className="text-muted fs-7">
                                {speaker.title}
                                {speaker.company && ` • ${speaker.company}`}
                              </div>
                            )}
                          </div>
                        </div>

                        {!isInSession && (
                          <button
                            className="btn btn-sm btn-light-primary"
                            onClick={() => handleAddSpeaker(speaker.id!)}
                          >
                            <KTIcon iconName="plus" className="fs-4" />
                            Adicionar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-light" onClick={onClose}>
          Fechar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageSessionSpeakersModal;
