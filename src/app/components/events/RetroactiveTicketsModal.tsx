import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { createRetroactiveTicketsRequest } from "../../../store/ducks/events/actions";
import { KTIcon } from "../../../_metronic/helpers";

interface RetroactiveTicketsModalProps {
  show: boolean;
  eventId: number;
  eventName: string;
  productId: number;
  onClose: () => void;
  onSuccess?: () => void;
}

const RetroactiveTicketsModal: React.FC<RetroactiveTicketsModalProps> = ({
  show,
  eventId,
  eventName,
  productId,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.events.loading);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    dispatch(createRetroactiveTicketsRequest(eventId));

    // Fechar modal após sucesso (delay para permitir feedback)
    setTimeout(() => {
      setIsConfirmed(false);
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    }, 2000);
  };

  const handleClose = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <div className="modal-header">
        <h2>
          <KTIcon iconName="ticket" className="fs-1 me-2 text-primary" />
          Criar Tickets Retroativos
        </h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        {/* Informações do Evento */}
        <div className="mb-5">
          <h4 className="text-gray-900 mb-3">Evento:</h4>
          <div className="bg-light rounded p-4">
            <p className="fs-5 fw-semibold text-gray-800 mb-1">
              {eventName}
            </p>
            <p className="text-muted mb-0">
              ID do Evento: {eventId} | ID do Produto: {productId}
            </p>
          </div>
        </div>

        <div className="separator my-5"></div>

        {/* Explicação */}
        <div className="mb-5">
          <div className="alert alert-info d-flex align-items-start">
            <KTIcon iconName="information-2" className="fs-2x text-info me-4 mt-1" />
            <div className="flex-grow-1">
              <h5 className="text-info mb-3">
                <strong>Como funciona:</strong>
              </h5>
              <p className="mb-2">
                Esta ação criará tickets automaticamente para todas as compras aprovadas
                do produto vinculado a este evento.
              </p>
              <p className="mb-0 text-gray-700">
                O sistema buscará todas as compras com status "aprovado" e criará
                <strong> 1 ticket por compra</strong>, evitando duplicações.
              </p>
            </div>
          </div>
        </div>

        {/* O que será feito */}
        <div className="bg-light-primary rounded p-4 mb-5">
          <h5 className="text-primary mb-3">
            <KTIcon iconName="check-circle" className="fs-3 me-2" />
            O que será criado:
          </h5>
          <ul className="text-gray-700 mb-0">
            <li>Buscar todas as compras aprovadas do produto #{productId}</li>
            <li>Criar 1 ticket por compra (verificando duplicação por cartId)</li>
            <li>Todos os tickets criados terão tipo inicial: <strong>"Normal"</strong></li>
            <li>Status do ticket: <strong>"Ativo"</strong></li>
            <li>Código único (UUID) será gerado automaticamente</li>
          </ul>
        </div>

        {/* Aviso */}
        <div className="alert alert-warning d-flex align-items-center mb-5">
          <KTIcon iconName="shield-tick" className="fs-2x text-warning me-4" />
          <div className="flex-grow-1">
            <p className="mb-0">
              <strong>Nota:</strong> Tickets já existentes não serão duplicados.
              O sistema verifica automaticamente se já existe um ticket para cada compra.
            </p>
          </div>
        </div>

        {/* Resultado (após confirmação) */}
        {isConfirmed && (
          <div className="alert alert-success d-flex align-items-center">
            <KTIcon iconName="check-circle" className="fs-2x text-success me-4" />
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold">
                Tickets retroativos criados com sucesso!
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-light"
          onClick={handleClose}
          disabled={loading}
        >
          {isConfirmed ? "Fechar" : "Cancelar"}
        </button>

        {!isConfirmed && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Criando Tickets...
              </>
            ) : (
              <>
                <KTIcon iconName="ticket" className="fs-3 me-2" />
                Confirmar Criação
              </>
            )}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default RetroactiveTicketsModal;
