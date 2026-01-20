import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadSpeakersRequest,
  deleteSpeakerRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventSpeaker } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";
import SpeakerForm from "./SpeakerForm";

interface SpeakersListProps {
  eventId: number;
}

const SpeakersList: React.FC<SpeakersListProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<EventSpeaker | null>(null);

  const speakers = useSelector((state: ApplicationState) => state.eventsessions.speakers);
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingSpeakers);

  useEffect(() => {
    if (eventId) {
      dispatch(loadSpeakersRequest(eventId));
    }
  }, [dispatch, eventId]);

  const filteredSpeakers = speakers.filter((speaker) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      speaker.name?.toLowerCase().includes(searchLower) ||
      speaker.title?.toLowerCase().includes(searchLower) ||
      speaker.company?.toLowerCase().includes(searchLower)
    );
  });

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case "speaker":
        return "badge-light-primary";
      case "moderator":
        return "badge-light-info";
      case "panelist":
        return "badge-light-warning";
      case "special_guest":
        return "badge-light-success";
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
        return role || "Palestrante";
    }
  };

  const handleCreateSpeaker = () => {
    setSelectedSpeaker(null);
    setShowModal(true);
  };

  const handleEditSpeaker = (speaker: EventSpeaker) => {
    setSelectedSpeaker(speaker);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSpeaker(null);
    // Recarregar palestrantes após fechar modal
    setTimeout(() => {
      dispatch(loadSpeakersRequest(eventId));
    }, 300);
  };

  const handleDelete = (speaker: EventSpeaker) => {
    if (
      window.confirm(
        `Deseja realmente excluir o palestrante "${speaker.name}"?\n\nEsta ação não pode ser desfeita.`
      )
    ) {
      if (speaker.id) {
        dispatch(deleteSpeakerRequest(speaker.id));
      }
    }
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
                  placeholder="Buscar palestrantes por nome, cargo ou empresa..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                onClick={handleCreateSpeaker}
              >
                <KTIcon iconName="plus" className="fs-3 me-2" />
                Novo Palestrante
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Palestrantes */}
      <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
        {filteredSpeakers.length === 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-20">
                <KTIcon iconName="profile-user" className="fs-5x text-muted mb-5" />
                <h3 className="text-gray-600 mb-2">
                  Nenhum palestrante cadastrado
                </h3>
                <p className="text-muted">
                  Clique em "Novo Palestrante" para adicionar o primeiro palestrante ao evento
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredSpeakers.map((speaker) => (
            <div key={speaker.id} className="col-md-6 col-xl-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  {/* Foto e Info Básica */}
                  <div className="d-flex flex-column align-items-center mb-5">
                    <div className="symbol symbol-100px symbol-circle mb-5">
                      {speaker.image ? (
                        <img src={speaker.image} alt={speaker.name} />
                      ) : (
                        <div className="symbol-label fs-2 fw-bold text-primary bg-light-primary">
                          {speaker.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <h3 className="text-gray-900 fw-bold mb-1">
                        {speaker.name || "Sem nome"}
                      </h3>

                      {speaker.title && (
                        <div className="text-gray-700 fw-semibold mb-1">
                          {speaker.title}
                        </div>
                      )}

                      {speaker.company && (
                        <div className="text-muted fw-semibold mb-3">
                          {speaker.company}
                        </div>
                      )}

                      <span className={`badge ${getRoleBadge(speaker.role)}`}>
                        {getRoleText(speaker.role)}
                      </span>
                    </div>
                  </div>

                  {/* Bio */}
                  {speaker.bio && (
                    <div className="mb-5 flex-grow-1">
                      <div className="text-gray-600 fs-7">
                        {speaker.bio.length > 120
                          ? speaker.bio.substring(0, 120) + "..."
                          : speaker.bio}
                      </div>
                    </div>
                  )}

                  {/* Redes Sociais */}
                  {speaker.socialMedia && (
                    <div className="d-flex justify-content-center gap-3 mb-5">
                      {speaker.socialMedia.linkedin && (
                        <a
                          href={speaker.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-icon btn-light btn-sm"
                          title="LinkedIn"
                        >
                          <KTIcon iconName="linkedin" className="fs-3" />
                        </a>
                      )}
                      {speaker.socialMedia.instagram && (
                        <a
                          href={speaker.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-icon btn-light btn-sm"
                          title="Instagram"
                        >
                          <KTIcon iconName="instagram" className="fs-3" />
                        </a>
                      )}
                      {speaker.socialMedia.twitter && (
                        <a
                          href={speaker.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-icon btn-light btn-sm"
                          title="Twitter"
                        >
                          <KTIcon iconName="twitter" className="fs-3" />
                        </a>
                      )}
                      {speaker.socialMedia.website && (
                        <a
                          href={speaker.socialMedia.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-icon btn-light btn-sm"
                          title="Website"
                        >
                          <KTIcon iconName="globe" className="fs-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {/* Sessões */}
                  {speaker.sessions && speaker.sessions.length > 0 && (
                    <div className="mb-5">
                      <div className="text-muted fs-7 mb-2">
                        <KTIcon iconName="calendar-8" className="fs-4 me-1" />
                        {speaker.sessions.length} sessão(ões)
                      </div>
                      <div className="text-gray-700 fs-8">
                        {speaker.sessions.slice(0, 2).map((s) => s.title).join(", ")}
                        {speaker.sessions.length > 2 && "..."}
                      </div>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="separator my-3"></div>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-light-primary btn-sm flex-fill"
                      onClick={() => handleEditSpeaker(speaker)}
                    >
                      <KTIcon iconName="pencil" className="fs-4 me-1" />
                      Editar
                    </button>

                    <button
                      className="btn btn-light-danger btn-sm"
                      onClick={() => handleDelete(speaker)}
                      title="Remover"
                    >
                      <KTIcon iconName="trash" className="fs-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Criar/Editar Palestrante */}
      <SpeakerForm
        eventId={eventId}
        speaker={selectedSpeaker}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SpeakersList;
