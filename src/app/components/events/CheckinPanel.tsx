import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { createCheckinRequest } from "../../../store/ducks/eventcheckins/actions";
import api from "../../../services/api";
import { EventTicket } from "../../../store/ducks/eventtickets/types";
import { KTIcon } from "../../../_metronic/helpers";

const MOMENT = require("moment");

interface CheckinPanelProps {
  eventId: number;
}

const CheckinPanel: React.FC<CheckinPanelProps> = ({ eventId }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [foundTicket, setFoundTicket] = useState<EventTicket | null>(null);
  const [searchError, setSearchError] = useState<string>("");

  const loading = useSelector((state: ApplicationState) => state.eventcheckins.loading);
  const me = useSelector((state: ApplicationState) => state.me.me);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchError("Digite um código de ticket, email ou nome para buscar");
      return;
    }

    setSearching(true);
    setSearchError("");
    setFoundTicket(null);

    try {
      // Buscar tickets do evento com filtro
      const response = await api.get(`event-tickets/event/${eventId}`);
      const tickets: EventTicket[] = response.data || response;

      // Filtrar localmente por ticketCode, email ou nome
      const ticket = tickets.find((t) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          t.ticketCode?.toLowerCase() === searchLower ||
          t.user?.email?.toLowerCase() === searchLower ||
          t.user?.name?.toLowerCase().includes(searchLower)
        );
      });

      if (ticket) {
        setFoundTicket(ticket);
        setSearchError("");
      } else {
        setSearchError("Ticket não encontrado. Verifique o código, email ou nome e tente novamente.");
      }
    } catch (error: any) {
      setSearchError("Erro ao buscar ticket. Tente novamente.");
      console.error("Erro ao buscar ticket:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleCheckin = () => {
    if (!foundTicket || !foundTicket.id) {
      alert("Nenhum ticket selecionado para check-in");
      return;
    }

    if (foundTicket.checkin) {
      alert("Este ticket já teve check-in realizado!");
      return;
    }

    if (foundTicket.status !== "active") {
      alert(`Este ticket não está ativo (status: ${foundTicket.status})`);
      return;
    }

    const confirmed = window.confirm(
      `Confirmar check-in para:\n\n` +
      `Ticket: ${foundTicket.ticketCode}\n` +
      `Participante: ${foundTicket.user?.name}\n` +
      `Email: ${foundTicket.user?.email}\n\n` +
      `Deseja continuar?`
    );

    if (!confirmed) return;

    dispatch(
      createCheckinRequest({
        ticketId: foundTicket.id,
        checkinMethod: "manual",
        checkinLocation: "Admin Panel",
        checkinBy: me?.id,
      })
    );

    // Limpar após check-in
    setTimeout(() => {
      setFoundTicket(null);
      setSearchTerm("");
    }, 1500);
  };

  const getTicketTypeBadge = (type?: string) => {
    switch (type) {
      case "vip":
        return "badge-light-warning";
      case "normal":
        return "badge-light-primary";
      case "student":
        return "badge-light-info";
      case "press":
        return "badge-light-success";
      case "staff":
        return "badge-light-dark";
      case "sponsor":
        return "badge-light-danger";
      default:
        return "badge-light-secondary";
    }
  };

  const getTicketTypeText = (type?: string) => {
    switch (type) {
      case "vip":
        return "VIP";
      case "normal":
        return "Normal";
      case "student":
        return "Estudante";
      case "press":
        return "Imprensa";
      case "staff":
        return "Staff";
      case "sponsor":
        return "Patrocinador";
      default:
        return type || "-";
    }
  };

  return (
    <div>
      {/* Busca de Ticket */}
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="card-title">Buscar Ticket para Check-in</h3>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-8">
              <label className="form-label fw-bold">
                Código do Ticket, Email ou Nome
              </label>
              <div className="d-flex align-items-center position-relative">
                <KTIcon iconName="magnifier" className="fs-1 position-absolute ms-6" />
                <input
                  type="text"
                  className="form-control form-control-solid ps-14"
                  placeholder="Digite o código, email ou nome do participante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  disabled={searching}
                />
              </div>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-primary w-100"
                onClick={handleSearch}
                disabled={searching}
              >
                {searching ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Buscando...
                  </>
                ) : (
                  <>
                    <KTIcon iconName="magnifier" className="fs-3 me-2" />
                    Buscar Ticket
                  </>
                )}
              </button>
            </div>
          </div>

          {searchError && (
            <div className="alert alert-danger mt-4 mb-0">
              <KTIcon iconName="cross-circle" className="fs-2hx text-danger me-4" />
              {searchError}
            </div>
          )}
        </div>
      </div>

      {/* Ticket Encontrado */}
      {foundTicket && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Informações do Ticket</h3>
          </div>
          <div className="card-body">
            <div className="row g-5">
              {/* Coluna Esquerda: Informações do Ticket */}
              <div className="col-md-6">
                <div className="mb-7">
                  <label className="fw-bold text-muted mb-2">Código do Ticket</label>
                  <div className="fs-3 fw-bolder text-gray-900">
                    {foundTicket.ticketCode}
                  </div>
                  <div className="text-muted fs-7">
                    #{foundTicket.ticketNumber || "-"}
                  </div>
                </div>

                <div className="mb-7">
                  <label className="fw-bold text-muted mb-2">Tipo</label>
                  <div>
                    <span className={`badge ${getTicketTypeBadge(foundTicket.type)} fs-5`}>
                      {getTicketTypeText(foundTicket.type)}
                    </span>
                  </div>
                </div>

                <div className="mb-7">
                  <label className="fw-bold text-muted mb-2">Status do Check-in</label>
                  <div>
                    {foundTicket.checkin ? (
                      <div>
                        <span className="badge badge-light-success fs-5 mb-2">
                          <KTIcon iconName="check" className="fs-3 me-2" />
                          Check-in Realizado
                        </span>
                        <div className="text-muted fs-7">
                          Em {MOMENT(foundTicket.checkin.checkinAt).format("DD/MM/YYYY HH:mm")}
                        </div>
                        <div className="text-muted fs-7">
                          Método: {foundTicket.checkin.checkinMethod}
                        </div>
                      </div>
                    ) : (
                      <span className="badge badge-light-warning fs-5">
                        <KTIcon iconName="cross" className="fs-3 me-2" />
                        Pendente
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Informações do Participante */}
              <div className="col-md-6">
                <div className="mb-7">
                  <label className="fw-bold text-muted mb-2">Participante</label>
                  <div className="fs-4 fw-bold text-gray-900">
                    {foundTicket.user?.name || "-"}
                  </div>
                </div>

                <div className="mb-7">
                  <label className="fw-bold text-muted mb-2">Email</label>
                  <div className="fs-6 text-gray-700">
                    {foundTicket.user?.email || "-"}
                  </div>
                </div>

                <div className="mb-7">
                  <label className="fw-bold text-muted mb-2">WhatsApp</label>
                  <div className="fs-6 text-gray-700">
                    {foundTicket.user?.whatsapp || "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* Botão de Check-in */}
            <div className="separator my-7"></div>
            <div className="d-flex justify-content-center">
              {foundTicket.checkin ? (
                <button className="btn btn-light-success btn-lg" disabled>
                  <KTIcon iconName="double-check" className="fs-2 me-2" />
                  Check-in Já Realizado
                </button>
              ) : foundTicket.status !== "active" ? (
                <button className="btn btn-light-danger btn-lg" disabled>
                  <KTIcon iconName="cross-circle" className="fs-2 me-2" />
                  Ticket Inativo (Status: {foundTicket.status})
                </button>
              ) : (
                <button
                  className="btn btn-success btn-lg"
                  onClick={handleCheckin}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <KTIcon iconName="verify" className="fs-2 me-2" />
                      Confirmar Check-in
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mensagem quando nenhum ticket foi buscado ainda */}
      {!foundTicket && !searchError && (
        <div className="card">
          <div className="card-body text-center py-20">
            <KTIcon iconName="scanner" className="fs-5x text-muted mb-5" />
            <h3 className="text-gray-600 mb-2">
              Digite um código, email ou nome para buscar
            </h3>
            <p className="text-muted">
              O ticket será validado e você poderá confirmar o check-in
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckinPanel;
