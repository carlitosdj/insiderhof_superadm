import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { createCheckinRequest } from "../../../store/ducks/eventcheckins/actions";
import { loadTicketsByEventRequest } from "../../../store/ducks/eventtickets/actions";
import { EventTicket } from "../../../store/ducks/eventtickets/types";
import { KTIcon } from "../../../_metronic/helpers";

import moment from "moment";

interface CheckinModalProps {
  show: boolean;
  onHide: () => void;
  ticket: EventTicket | null;
}

const CheckinModal: React.FC<CheckinModalProps> = ({ show, onHide, ticket }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.eventcheckins.loading);
  const me = useSelector((state: ApplicationState) => state.me.me);

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

  const handleCheckin = () => {
    if (!ticket || !ticket.id) {
      return;
    }

    dispatch(
      createCheckinRequest({
        ticketId: ticket.id,
        checkinMethod: "manual",
        checkinLocation: "Admin Panel",
        checkinBy: me?.id,
      })
    );

    // Reload tickets list after checkin
    setTimeout(() => {
      if (ticket.eventId) {
        dispatch(loadTicketsByEventRequest(ticket.eventId, {}));
      }
      onHide();
    }, 1000);
  };

  if (!ticket) return null;

  const alreadyCheckedIn = !!ticket.checkin;
  const isInactive = ticket.status !== "active";

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header>
        <Modal.Title>
          <KTIcon iconName="verify" className="fs-2 me-2" />
          Check-in do Ticket
        </Modal.Title>
        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={onHide}>
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="row g-5">
          {/* Coluna Esquerda: Informações do Ticket */}
          <div className="col-md-6">
            <div className="mb-7">
              <label className="fw-bold text-muted mb-2">Código do Ticket</label>
              <div className="fs-3 fw-bolder text-gray-900">{ticket.ticketCode}</div>
              <div className="text-muted fs-7">#{ticket.ticketNumber || "-"}</div>
            </div>

            <div className="mb-7">
              <label className="fw-bold text-muted mb-2">Tipo</label>
              <div>
                <span className={`badge ${getTicketTypeBadge(ticket.type)} fs-5`}>
                  {getTicketTypeText(ticket.type)}
                </span>
              </div>
            </div>

            <div className="mb-7">
              <label className="fw-bold text-muted mb-2">Status</label>
              <div>
                <span
                  className={`badge ${
                    ticket.status === "active"
                      ? "badge-light-success"
                      : "badge-light-danger"
                  } fs-6`}
                >
                  {ticket.status === "active" ? "Ativo" : ticket.status}
                </span>
              </div>
            </div>

            <div className="mb-7">
              <label className="fw-bold text-muted mb-2">Status do Check-in</label>
              <div>
                {alreadyCheckedIn ? (
                  <div>
                    <span className="badge badge-light-success fs-5 mb-2">
                      <KTIcon iconName="check" className="fs-3 me-2" />
                      Check-in Realizado
                    </span>
                    <div className="text-muted fs-7">
                      Em {moment((ticket.checkin as any).checkinAt).format("DD/MM/YYYY HH:mm")}
                    </div>
                    <div className="text-muted fs-7">
                      Método: {(ticket.checkin as any).checkinMethod}
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
                {ticket.user?.name || "-"}
              </div>
            </div>

            <div className="mb-7">
              <label className="fw-bold text-muted mb-2">Email</label>
              <div className="fs-6 text-gray-700">{ticket.user?.email || "-"}</div>
            </div>

            <div className="mb-7">
              <label className="fw-bold text-muted mb-2">WhatsApp</label>
              <div className="fs-6 text-gray-700">{ticket.user?.whatsapp || "-"}</div>
            </div>
          </div>
        </div>

        {/* Mensagem de Aviso */}
        {alreadyCheckedIn && (
          <div className="alert alert-info mt-5">
            <KTIcon iconName="information" className="fs-2x me-3" />
            <strong>Este ticket já teve check-in realizado.</strong>
          </div>
        )}

        {isInactive && !alreadyCheckedIn && (
          <div className="alert alert-warning mt-5">
            <KTIcon iconName="shield-cross" className="fs-2x me-3" />
            <strong>Este ticket não está ativo e não pode fazer check-in.</strong>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={onHide}>
          Fechar
        </Button>
        {!alreadyCheckedIn && !isInactive && (
          <Button variant="success" onClick={handleCheckin} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Processando...
              </>
            ) : (
              <>
                <KTIcon iconName="verify" className="fs-3 me-2" />
                Confirmar Check-in
              </>
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CheckinModal;
