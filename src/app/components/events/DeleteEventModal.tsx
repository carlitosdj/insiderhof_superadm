import React from "react";
import { Modal } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";

interface DeleteEventModalProps {
  show: boolean;
  eventId: number;
  eventName: string;
  ticketCount: number;
  checkinCount: number;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

const DeleteEventModal: React.FC<DeleteEventModalProps> = ({
  show,
  eventId,
  eventName,
  ticketCount,
  checkinCount,
  onClose,
  onConfirm,
  loading = false,
}) => {
  // Regra de negócio: BLOQUEIA se houver check-ins
  const hasCheckins = checkinCount > 0;

  // Regra de negócio: AVISA se houver tickets sem check-in
  const hasTickets = ticketCount > 0;
  const hasTicketsWithoutCheckin = hasTickets && !hasCheckins;

  const handleConfirm = () => {
    if (hasCheckins) {
      return; // Bloqueado
    }
    onConfirm();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <div className="modal-header">
        <h2 className="text-danger">
          <KTIcon iconName="warning-2" className="fs-1 me-2" />
          Excluir Evento
        </h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={onClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        {/* Nome do Evento */}
        <div className="mb-5">
          <p className="fs-5 fw-semibold text-gray-800 mb-1">
            Você está prestes a excluir o evento:
          </p>
          <p className="fs-4 fw-bold text-gray-900 mb-0">
            "{eventName}"
          </p>
        </div>

        <div className="separator my-5"></div>

        {/* BLOQUEIO: Check-ins existentes */}
        {hasCheckins && (
          <div className="alert alert-danger d-flex align-items-center mb-5">
            <KTIcon iconName="shield-cross" className="fs-2x text-danger me-4" />
            <div className="flex-grow-1">
              <h4 className="text-danger mb-2">
                <strong>Não é possível excluir este evento!</strong>
              </h4>
              <p className="mb-0">
                Existem <strong>{checkinCount} check-in(s)</strong> registrados.
                Eventos com check-ins não podem ser removidos para preservar o histórico.
              </p>
            </div>
          </div>
        )}

        {/* AVISO: Tickets sem check-in */}
        {!hasCheckins && hasTicketsWithoutCheckin && (
          <div className="alert alert-warning d-flex align-items-center mb-5">
            <KTIcon iconName="information-2" className="fs-2x text-warning me-4" />
            <div className="flex-grow-1">
              <h5 className="text-warning mb-2">
                <strong>Atenção!</strong>
              </h5>
              <p className="mb-2">
                Existem <strong>{ticketCount} ticket(s)</strong> emitidos para este evento.
              </p>
              <p className="mb-0 text-gray-700">
                Ao confirmar a exclusão, todos os tickets serão permanentemente deletados.
              </p>
            </div>
          </div>
        )}

        {/* SUCESSO: Sem tickets e check-ins */}
        {!hasCheckins && !hasTickets && (
          <div className="alert alert-info d-flex align-items-center mb-5">
            <KTIcon iconName="information" className="fs-2x text-info me-4" />
            <div className="flex-grow-1">
              <p className="mb-0">
                Este evento não possui tickets ou check-ins registrados.
              </p>
            </div>
          </div>
        )}

        {/* Informações do que será deletado (CASCADE) */}
        {!hasCheckins && (
          <div className="bg-light-danger rounded p-4 mb-5">
            <h5 className="text-danger mb-3">
              <KTIcon iconName="trash" className="fs-3 me-2" />
              O que será deletado:
            </h5>
            <ul className="text-gray-700 mb-0">
              <li>Dados do evento</li>
              {hasTickets && <li><strong>{ticketCount} ticket(s)</strong></li>}
              <li>Todas as sessões e programação</li>
              <li>Todos os palestrantes</li>
              <li>Todas as recomendações (artifacts)</li>
              <li>Histórico de transferências (se houver)</li>
            </ul>
          </div>
        )}

        {/* Aviso final */}
        {!hasCheckins && (
          <div className="text-center">
            <p className="text-danger fw-bold fs-5 mb-0">
              Esta ação não pode ser desfeita!
            </p>
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={onClose}
          disabled={loading}
        >
          {hasCheckins ? "Fechar" : "Cancelar"}
        </button>

        {!hasCheckins && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Excluindo...
              </>
            ) : (
              <>
                <KTIcon iconName="trash" className="fs-3 me-2" />
                Sim, Excluir Evento
              </>
            )}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default DeleteEventModal;
