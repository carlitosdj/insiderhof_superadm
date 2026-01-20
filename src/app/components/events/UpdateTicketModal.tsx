import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import { updateTicketRequest, loadTicketsByEventRequest } from "../../../store/ducks/eventtickets/actions";
import { EventTicket } from "../../../store/ducks/eventtickets/types";
import { KTIcon } from "../../../_metronic/helpers";

interface UpdateTicketModalProps {
  show: boolean;
  onHide: () => void;
  ticket: EventTicket | null;
}

const UpdateTicketModal: React.FC<UpdateTicketModalProps> = ({ show, onHide, ticket }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.eventtickets.loading);

  const [formData, setFormData] = useState({
    type: "",
    status: "",
    requiresValidation: false,
    validationStatus: "",
    validationNotes: "",
  });

  useEffect(() => {
    if (ticket) {
      setFormData({
        type: ticket.type || "",
        status: ticket.status || "",
        requiresValidation: ticket.requiresValidation === 1,
        validationStatus: ticket.validationStatus || "",
        validationNotes: "",
      });
    }
  }, [ticket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!ticket?.id) return;

    const updateData: any = {
      id: ticket.id,
      type: formData.type,
      status: formData.status,
      requiresValidation: formData.requiresValidation,
    };

    // Only include validation fields if they have values
    if (formData.validationStatus) {
      updateData.validationStatus = formData.validationStatus;
    }

    if (formData.validationNotes && formData.validationNotes.trim()) {
      updateData.validationNotes = formData.validationNotes;
    }

    dispatch(updateTicketRequest(updateData));

    // Reload tickets list after update
    setTimeout(() => {
      if (ticket.eventId) {
        dispatch(loadTicketsByEventRequest(ticket.eventId, {}));
      }
      onHide();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      type: "",
      status: "",
      requiresValidation: false,
      validationStatus: "",
      validationNotes: "",
    });
    onHide();
  };

  if (!ticket) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header>
        <Modal.Title>
          <KTIcon iconName="pencil" className="fs-2 me-2" />
          Editar Ticket
        </Modal.Title>
        <div className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          {/* Ticket Info */}
          <div className="mb-6">
            <div className="bg-light-primary rounded p-4">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="text-muted small">Código do Ticket</div>
                  <div className="fw-bold text-gray-800">{ticket.ticketCode}</div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">Número do Ticket</div>
                  <div className="fw-bold text-gray-800">#{ticket.ticketNumber}</div>
                </div>
                <div className="col-md-12">
                  <div className="text-muted small">Participante</div>
                  <div className="fw-bold text-gray-800">
                    {ticket.user?.name || "-"}
                    {ticket.user?.email && (
                      <span className="text-muted fw-normal ms-2">({ticket.user.email})</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Type Selection */}
          <div className="mb-5">
            <label className="form-label fw-bold required">Tipo do Ingresso</label>
            <select
              className="form-select form-select-solid"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="normal">Normal</option>
              <option value="vip">VIP</option>
              <option value="student">Estudante</option>
              <option value="press">Imprensa</option>
              <option value="staff">Staff</option>
              <option value="sponsor">Patrocinador</option>
            </select>
          </div>

          {/* Status Selection */}
          <div className="mb-5">
            <label className="form-label fw-bold required">Status</label>
            <select
              className="form-select form-select-solid"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              <option value="active">Ativo</option>
              <option value="pending">Pendente</option>
              <option value="cancelled">Cancelado</option>
              <option value="transferred">Transferido</option>
              <option value="used">Usado</option>
            </select>
          </div>

          <div className="separator my-6"></div>

          {/* Validation Section */}
          <h5 className="mb-4 text-gray-800">
            <KTIcon iconName="verify" className="fs-2 me-2" />
            Configurações de Validação
          </h5>

          {/* Requires Validation */}
          <div className="mb-5">
            <div className="form-check form-switch form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                name="requiresValidation"
                id="requiresValidation"
                checked={formData.requiresValidation}
                onChange={handleChange}
              />
              <label className="form-check-label fw-semibold text-gray-700" htmlFor="requiresValidation">
                Requer Validação Manual
              </label>
            </div>
            <div className="text-muted small mt-2">
              Se ativado, o ticket precisará ser aprovado manualmente antes de ser válido
            </div>
          </div>

          {/* Validation Status */}
          {formData.requiresValidation && (
            <>
              <div className="mb-5">
                <label className="form-label fw-bold">Status da Validação</label>
                <select
                  className="form-select form-select-solid"
                  name="validationStatus"
                  value={formData.validationStatus}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option value="pending">Pendente</option>
                  <option value="approved">Aprovado</option>
                  <option value="rejected">Rejeitado</option>
                </select>
              </div>

              {/* Validation Notes */}
              <div className="mb-5">
                <label className="form-label fw-bold">Notas da Validação</label>
                <textarea
                  className="form-control form-control-solid"
                  name="validationNotes"
                  rows={3}
                  placeholder="Adicione observações sobre a validação..."
                  value={formData.validationNotes}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="light" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Salvando...
            </>
          ) : (
            <>
              <KTIcon iconName="check" className="fs-3 me-2" />
              Salvar Alterações
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateTicketModal;
