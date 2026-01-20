import React from "react";
import { Modal, Button } from "react-bootstrap";
import { EventTicket } from "../../../store/ducks/eventtickets/types";
import { KTIcon } from "../../../_metronic/helpers";

const MOMENT = require("moment");

interface TicketDetailsModalProps {
  show: boolean;
  onHide: () => void;
  ticket: EventTicket | null;
}

const TicketDetailsModal: React.FC<TicketDetailsModalProps> = ({ show, onHide, ticket }) => {
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

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "active":
        return "badge-light-success";
      case "pending":
        return "badge-light-warning";
      case "cancelled":
        return "badge-light-danger";
      case "transferred":
        return "badge-light-info";
      case "used":
        return "badge-light-secondary";
      default:
        return "badge-light-secondary";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelado";
      case "transferred":
        return "Transferido";
      case "used":
        return "Usado";
      default:
        return status || "-";
    }
  };

  if (!ticket) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header>
        <Modal.Title>
          <KTIcon iconName="information" className="fs-2 me-2" />
          Detalhes do Ticket
        </Modal.Title>
        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={onHide}>
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </Modal.Header>

      <Modal.Body>
        {/* Informações Principais */}
        <div className="bg-light-primary rounded p-6 mb-6">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="text-muted small mb-1">Código do Ticket</div>
              <div className="fw-bold text-gray-900 fs-4">{ticket.ticketCode}</div>
            </div>
            <div className="col-md-3">
              <div className="text-muted small mb-1">Número</div>
              <div className="fw-bold text-gray-900 fs-4">#{ticket.ticketNumber}</div>
            </div>
            <div className="col-md-3">
              <div className="text-muted small mb-1">Tipo</div>
              <div>
                <span className={`badge ${getTicketTypeBadge(ticket.type)} fs-5`}>
                  {getTicketTypeText(ticket.type)}
                </span>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-muted small mb-1">Status</div>
              <div>
                <span className={`badge ${getStatusBadge(ticket.status)} fs-5`}>
                  {getStatusText(ticket.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-6">
          {/* Coluna Esquerda */}
          <div className="col-md-6">
            {/* Informações do Participante */}
            <div className="card mb-5">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <KTIcon iconName="profile-user" className="fs-2 me-2" />
                  Participante
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <label className="fw-bold text-muted mb-2">Nome</label>
                  <div className="fs-5 fw-bold text-gray-900">
                    {ticket.user?.name || "-"}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="fw-bold text-muted mb-2">Email</label>
                  <div className="text-gray-700">{ticket.user?.email || "-"}</div>
                </div>

                <div className="mb-0">
                  <label className="fw-bold text-muted mb-2">WhatsApp</label>
                  <div className="text-gray-700">{ticket.user?.whatsapp || "-"}</div>
                </div>
              </div>
            </div>

            {/* RSVP */}
            {ticket.rsvp && (
              <div className="card mb-5">
                <div className="card-header">
                  <h5 className="card-title mb-0">
                    <KTIcon iconName="calendar-tick" className="fs-2 me-2" />
                    Confirmação de Presença (RSVP)
                  </h5>
                </div>
                <div className="card-body">
                  <div className="mb-4">
                    <label className="fw-bold text-muted mb-2">Status</label>
                    <div>
                      {(ticket.rsvp as any).status === "confirmed" ? (
                        <span className="badge badge-light-success fs-5">
                          <KTIcon iconName="check-circle" className="fs-4 me-1" />
                          Confirmado
                        </span>
                      ) : (
                        <span className="badge badge-light-danger fs-5">
                          <KTIcon iconName="cross-circle" className="fs-4 me-1" />
                          Recusado
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-0">
                    <label className="fw-bold text-muted mb-2">Data da Confirmação</label>
                    <div className="text-gray-700">
                      {MOMENT((ticket.rsvp as any).confirmedAt).format(
                        "DD/MM/YYYY HH:mm"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita */}
          <div className="col-md-6">
            {/* Check-in */}
            <div className="card mb-5">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <KTIcon iconName="verify" className="fs-2 me-2" />
                  Check-in
                </h5>
              </div>
              <div className="card-body">
                {ticket.checkin ? (
                  <>
                    <div className="mb-4">
                      <label className="fw-bold text-muted mb-2">Status</label>
                      <div>
                        <span className="badge badge-light-success fs-5">
                          <KTIcon iconName="double-check" className="fs-4 me-1" />
                          Check-in Realizado
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="fw-bold text-muted mb-2">Data e Hora</label>
                      <div className="text-gray-700">
                        {MOMENT((ticket.checkin as any).checkinAt).format(
                          "DD/MM/YYYY HH:mm"
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="fw-bold text-muted mb-2">Método</label>
                      <div className="text-gray-700">
                        {(ticket.checkin as any).checkinMethod || "-"}
                      </div>
                    </div>

                    {(ticket.checkin as any).checkinLocation && (
                      <div className="mb-0">
                        <label className="fw-bold text-muted mb-2">Local</label>
                        <div className="text-gray-700">
                          {(ticket.checkin as any).checkinLocation}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-5">
                    <KTIcon iconName="cross" className="fs-5x text-muted mb-3" />
                    <div className="text-muted fw-semibold">
                      Check-in ainda não realizado
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Datas */}
            <div className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">
                  <KTIcon iconName="time" className="fs-2 me-2" />
                  Informações de Data
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <label className="fw-bold text-muted mb-2">Criado em</label>
                  <div className="text-gray-700">
                    {ticket.createdAt
                      ? MOMENT(ticket.createdAt).format("DD/MM/YYYY HH:mm")
                      : "-"}
                  </div>
                </div>

                <div className="mb-0">
                  <label className="fw-bold text-muted mb-2">Atualizado em</label>
                  <div className="text-gray-700">
                    {ticket.updatedAt
                      ? MOMENT(ticket.updatedAt).format("DD/MM/YYYY HH:mm")
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          <KTIcon iconName="check" className="fs-3 me-2" />
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TicketDetailsModal;
