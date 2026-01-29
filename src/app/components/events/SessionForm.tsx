import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  createSessionRequest,
  updateSessionRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventSession } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";

import moment from "moment";

interface SessionFormProps {
  eventId: number;
  session?: EventSession | null;
  show: boolean;
  onClose: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({
  eventId,
  session,
  show,
  onClose,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingSessions);

  const [formData, setFormData] = useState<EventSession>({
    eventId,
    title: "",
    description: "",
    sessionType: "talk",
    startTime: "",
    endTime: "",
    location: "",
    floor: "",
    hasCapacityLimit: 0,
    capacity: 0,
    restrictedToTypes: null,
    status: "active",
  });

  const [restrictedTypes, setRestrictedTypes] = useState<string[]>([]);

  useEffect(() => {
    if (session) {
      setFormData({
        ...session,
        // Convert boolean from API to number for form state
        hasCapacityLimit: session.hasCapacityLimit ? 1 : 0,
      });
      if (session.restrictedToTypes) {
        setRestrictedTypes(session.restrictedToTypes);
      } else {
        setRestrictedTypes([]);
      }
    } else {
      // Reset form when creating new
      setFormData({
        eventId,
        title: "",
        description: "",
        sessionType: "talk",
        startTime: "",
        endTime: "",
        location: "",
        floor: "",
        hasCapacityLimit: 0,
        capacity: 0,
        restrictedToTypes: null,
        status: "active",
      });
      setRestrictedTypes([]);
    }
  }, [session, eventId, show]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? 1 : 0,
    }));
  };

  const handleRestrictedTypeToggle = (type: string) => {
    setRestrictedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Convert data to match API DTO
    const dataToSubmit: any = {
      eventId: formData.eventId,
      title: formData.title,
      description: formData.description || undefined,
      sessionType: formData.sessionType || "talk",
      // Ensure dates are in ISO format
      startTime: formData.startTime ? new Date(formData.startTime).toISOString() : "",
      endTime: formData.endTime ? new Date(formData.endTime).toISOString() : "",
      location: formData.location || undefined,
      floor: formData.floor || undefined,
      // Convert hasCapacityLimit from number (0/1) to boolean
      hasCapacityLimit: formData.hasCapacityLimit === 1,
      // Only send capacity if hasCapacityLimit is true
      capacity: formData.hasCapacityLimit === 1 ? Number(formData.capacity) : undefined,
      // Convert restrictedToTypes to array or null
      restrictedToTypes: restrictedTypes.length > 0 ? restrictedTypes : undefined,
      status: formData.status || "active",
    };

    // Remove undefined fields to avoid validation errors
    Object.keys(dataToSubmit).forEach((key) => {
      if (dataToSubmit[key] === undefined) {
        delete dataToSubmit[key];
      }
    });

    console.log("Data being sent to API:", dataToSubmit);

    if (session?.id) {
      // Update - include ID
      dispatch(updateSessionRequest({ ...dataToSubmit, id: session.id }));
    } else {
      // Create
      dispatch(createSessionRequest(dataToSubmit));
    }

    // Close modal after a short delay
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <Modal size="xl" show={show} onHide={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>{session?.id ? "Editar Sessão" : "Nova Sessão"}</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={onClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          <div className="row g-5">
            {/* Título */}
            <div className="col-12">
              <label className="form-label fw-bold required">Título</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Ex: Abertura do Evento"
                required
              />
            </div>

            {/* Descrição */}
            <div className="col-12">
              <label className="form-label fw-bold">Descrição</label>
              <textarea
                className="form-control form-control-solid"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
                placeholder="Descreva o que será abordado nesta sessão..."
              />
            </div>

            {/* Tipo */}
            <div className="col-md-6">
              <label className="form-label fw-bold required">Tipo</label>
              <select
                className="form-select form-select-solid"
                name="sessionType"
                value={formData.sessionType || "talk"}
                onChange={handleChange}
                required
              >
                <option value="talk">Palestra</option>
                <option value="workshop">Workshop</option>
                <option value="panel">Painel</option>
                <option value="networking">Networking</option>
                <option value="break">Intervalo</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Status</label>
              <select
                className="form-select form-select-solid"
                name="status"
                value={formData.status || "active"}
                onChange={handleChange}
              >
                <option value="active">Ativo</option>
                <option value="cancelled">Cancelado</option>
                <option value="draft">Rascunho</option>
              </select>
            </div>

            {/* Horário de Início */}
            <div className="col-md-6">
              <label className="form-label fw-bold required">Horário de Início</label>
              <input
                type="datetime-local"
                className="form-control form-control-solid"
                name="startTime"
                value={
                  formData.startTime
                    ? moment(formData.startTime).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleChange}
                required
              />
            </div>

            {/* Horário de Término */}
            <div className="col-md-6">
              <label className="form-label fw-bold required">Horário de Término</label>
              <input
                type="datetime-local"
                className="form-control form-control-solid"
                name="endTime"
                value={
                  formData.endTime
                    ? moment(formData.endTime).format("YYYY-MM-DDTHH:mm")
                    : ""
                }
                onChange={handleChange}
                required
              />
            </div>

            {/* Local */}
            <div className="col-md-8">
              <label className="form-label fw-bold">Local/Sala</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="Ex: Auditório Principal, Sala 201"
              />
            </div>

            {/* Andar */}
            <div className="col-md-4">
              <label className="form-label fw-bold">Andar</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="floor"
                value={formData.floor || ""}
                onChange={handleChange}
                placeholder="Ex: 2º andar"
              />
            </div>

            {/* Limite de Capacidade */}
            <div className="col-12">
              <div className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="hasCapacityLimit"
                  name="hasCapacityLimit"
                  checked={formData.hasCapacityLimit === 1}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label fw-bold" htmlFor="hasCapacityLimit">
                  Esta sessão tem limite de capacidade
                </label>
              </div>
            </div>

            {/* Capacidade (condicional) */}
            {formData.hasCapacityLimit === 1 && (
              <div className="col-md-6">
                <label className="form-label fw-bold required">Capacidade Máxima</label>
                <input
                  type="number"
                  className="form-control form-control-solid"
                  name="capacity"
                  value={formData.capacity || ""}
                  onChange={handleChange}
                  placeholder="Ex: 100"
                  min="1"
                  required={formData.hasCapacityLimit === 1}
                />
              </div>
            )}

            {/* Restrição por Tipo de Ticket */}
            <div className="col-12">
              <label className="form-label fw-bold">Restrito a tipos de ticket</label>
              <div className="text-muted fs-7 mb-3">
                Deixe vazio para permitir todos os tipos de ticket
              </div>
              <div className="d-flex flex-wrap gap-3">
                {["vip", "normal", "student", "press", "staff", "sponsor"].map((type) => (
                  <div key={type} className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`type-${type}`}
                      checked={restrictedTypes.includes(type)}
                      onChange={() => handleRestrictedTypeToggle(type)}
                    />
                    <label className="form-check-label" htmlFor={`type-${type}`}>
                      {type === "vip" && "VIP"}
                      {type === "normal" && "Normal"}
                      {type === "student" && "Estudante"}
                      {type === "press" && "Imprensa"}
                      {type === "staff" && "Staff"}
                      {type === "sponsor" && "Patrocinador"}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-light"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Salvando...
              </>
            ) : (
              <>
                <KTIcon iconName="check" className="fs-3 me-2" />
                {session?.id ? "Atualizar Sessão" : "Criar Sessão"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SessionForm;
