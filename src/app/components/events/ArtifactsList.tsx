import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  loadArtifactsRequest,
  deleteArtifactRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventArtifact } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";
import ArtifactForm from "./ArtifactForm";

interface ArtifactsListProps {
  eventId: number;
}

const ArtifactsList: React.FC<ArtifactsListProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<EventArtifact | null>(null);

  const artifacts = useSelector((state: ApplicationState) => state.eventsessions.artifacts);
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingArtifacts);

  useEffect(() => {
    if (eventId) {
      dispatch(loadArtifactsRequest(eventId));
    }
  }, [dispatch, eventId]);

  const filteredArtifacts = artifacts.filter((artifact) => {
    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        artifact.name?.toLowerCase().includes(searchLower) ||
        artifact.description?.toLowerCase().includes(searchLower) ||
        artifact.address?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Filter by type
    if (typeFilter !== "all" && artifact.type !== typeFilter) {
      return false;
    }

    return true;
  });

  const getTypeBadge = (type?: string) => {
    switch (type) {
      case "hotel":
        return "badge-light-primary";
      case "food":
        return "badge-light-success";
      case "transport":
        return "badge-light-info";
      case "leisure":
        return "badge-light-warning";
      case "sponsor":
        return "badge-light-danger";
      case "partner":
        return "badge-light-secondary";
      default:
        return "badge-light-dark";
    }
  };

  const getTypeText = (type?: string) => {
    switch (type) {
      case "hotel":
        return "Hotel";
      case "food":
        return "Alimentação";
      case "transport":
        return "Transporte";
      case "leisure":
        return "Lazer";
      case "sponsor":
        return "Patrocinador";
      case "partner":
        return "Parceiro";
      case "other":
        return "Outro";
      default:
        return type || "Outro";
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case "hotel":
        return "home-2";
      case "food":
        return "coffee";
      case "transport":
        return "bus";
      case "leisure":
        return "mask";
      case "sponsor":
        return "star";
      case "partner":
        return "handshake";
      default:
        return "element-11";
    }
  };

  const handleCreateArtifact = () => {
    setSelectedArtifact(null);
    setShowModal(true);
  };

  const handleEditArtifact = (artifact: EventArtifact) => {
    setSelectedArtifact(artifact);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedArtifact(null);
    // Recarregar artifacts após fechar modal
    setTimeout(() => {
      dispatch(loadArtifactsRequest(eventId));
    }, 300);
  };

  const handleDelete = (artifact: EventArtifact) => {
    if (
      window.confirm(
        `Deseja realmente excluir "${artifact.name}"?\n\nEsta ação não pode ser desfeita.`
      )
    ) {
      if (artifact.id) {
        dispatch(deleteArtifactRequest(artifact.id));
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
      {/* Header com Busca e Filtros */}
      <div className="card mb-5">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-5">
              <div className="d-flex align-items-center position-relative">
                <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                <input
                  type="text"
                  className="form-control form-control-solid ps-14"
                  placeholder="Buscar por nome, descrição ou endereço..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select form-select-solid"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Todos os Tipos</option>
                <option value="hotel">Hotéis</option>
                <option value="food">Alimentação</option>
                <option value="transport">Transporte</option>
                <option value="leisure">Lazer</option>
                <option value="sponsor">Patrocinadores</option>
                <option value="partner">Parceiros</option>
                <option value="other">Outros</option>
              </select>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                onClick={handleCreateArtifact}
              >
                <KTIcon iconName="plus" className="fs-3 me-2" />
                Nova Recomendação
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Artifacts */}
      <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
        {filteredArtifacts.length === 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-20">
                <KTIcon iconName="element-11" className="fs-5x text-muted mb-5" />
                <h3 className="text-gray-600 mb-2">
                  Nenhuma recomendação cadastrada
                </h3>
                <p className="text-muted">
                  Clique em "Nova Recomendação" para adicionar hotéis, restaurantes e outros serviços
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredArtifacts.map((artifact) => (
            <div key={artifact.id} className="col-md-6 col-xl-4">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  {/* Imagem/Logo */}
                  {(artifact.image || artifact.logo) && (
                    <div className="mb-5">
                      <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                        <img
                          src={artifact.logo || artifact.image}
                          alt={artifact.name}
                          style={{ objectFit: "cover", borderRadius: "8px" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Ícone e Badge de Tipo */}
                  <div className="d-flex align-items-center mb-3">
                    <div className="symbol symbol-40px me-3">
                      <div className="symbol-label bg-light">
                        <KTIcon iconName={getTypeIcon(artifact.type)} className="fs-2x text-primary" />
                      </div>
                    </div>
                    <span className={`badge ${getTypeBadge(artifact.type)}`}>
                      {getTypeText(artifact.type)}
                    </span>
                  </div>

                  {/* Nome */}
                  <h3 className="text-gray-900 fw-bold mb-3">
                    {artifact.name || "Sem nome"}
                  </h3>

                  {/* Descrição */}
                  {artifact.description && (
                    <div className="text-gray-600 fs-7 mb-4 flex-grow-1">
                      {artifact.description.length > 120
                        ? artifact.description.substring(0, 120) + "..."
                        : artifact.description}
                    </div>
                  )}

                  {/* Informações */}
                  <div className="mb-4">
                    {/* Endereço */}
                    {artifact.address && (
                      <div className="d-flex align-items-center mb-2">
                        <KTIcon iconName="geolocation" className="fs-5 text-muted me-2" />
                        <span className="text-gray-700 fs-7">{artifact.address}</span>
                      </div>
                    )}

                    {/* Preço */}
                    {artifact.priceInfo && (
                      <div className="d-flex align-items-center mb-2">
                        <KTIcon iconName="dollar" className="fs-5 text-muted me-2" />
                        <span className="text-gray-700 fs-7">{artifact.priceInfo}</span>
                      </div>
                    )}

                    {/* Desconto */}
                    {artifact.discount && (
                      <div className="d-flex align-items-center mb-2">
                        <KTIcon iconName="discount" className="fs-5 text-success me-2" />
                        <span className="text-success fs-7 fw-semibold">{artifact.discount}</span>
                      </div>
                    )}
                  </div>

                  {/* Contatos */}
                  {(artifact.phone || artifact.email || artifact.website) && (
                    <div className="d-flex justify-content-start gap-2 mb-4">
                      {artifact.phone && (
                        <a
                          href={`tel:${artifact.phone}`}
                          className="btn btn-icon btn-light btn-sm"
                          title="Telefone"
                        >
                          <KTIcon iconName="phone" className="fs-3" />
                        </a>
                      )}
                      {artifact.email && (
                        <a
                          href={`mailto:${artifact.email}`}
                          className="btn btn-icon btn-light btn-sm"
                          title="Email"
                        >
                          <KTIcon iconName="sms" className="fs-3" />
                        </a>
                      )}
                      {artifact.website && (
                        <a
                          href={artifact.website}
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

                  {/* Ações */}
                  <div className="separator my-3"></div>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-light-primary btn-sm flex-fill"
                      onClick={() => handleEditArtifact(artifact)}
                    >
                      <KTIcon iconName="pencil" className="fs-4 me-1" />
                      Editar
                    </button>

                    <button
                      className="btn btn-light-danger btn-sm"
                      onClick={() => handleDelete(artifact)}
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

      {/* Modal de Criar/Editar Artifact */}
      <ArtifactForm
        eventId={eventId}
        artifact={selectedArtifact}
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ArtifactsList;
