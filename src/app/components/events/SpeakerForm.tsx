import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  createSpeakerRequest,
  updateSpeakerRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventSpeaker } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";

interface SpeakerFormProps {
  eventId: number;
  speaker?: EventSpeaker | null;
  show: boolean;
  onClose: () => void;
}

const SpeakerForm: React.FC<SpeakerFormProps> = ({
  eventId,
  speaker,
  show,
  onClose,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingSpeakers);

  const [formData, setFormData] = useState<EventSpeaker>({
    eventId,
    name: "",
    bio: "",
    image: "",
    role: "speaker",
    title: "",
    company: "",
    email: "",
    phone: "",
    socialMedia: {
      instagram: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
    status: "active",
  });

  useEffect(() => {
    if (speaker) {
      setFormData({
        ...speaker,
      });
    } else {
      // Reset form when creating new
      setFormData({
        eventId,
        name: "",
        bio: "",
        image: "",
        role: "speaker",
        title: "",
        company: "",
        email: "",
        phone: "",
        socialMedia: {
          instagram: "",
          linkedin: "",
          twitter: "",
          website: "",
        },
        status: "active",
      });
    }
  }, [speaker, eventId, show]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for API
    const dataToSubmit: any = {
      eventId: formData.eventId,
      name: formData.name,
      bio: formData.bio || undefined,
      image: formData.image || undefined,
      role: formData.role || "speaker",
      title: formData.title || undefined,
      company: formData.company || undefined,
      email: formData.email || undefined,
      phone: formData.phone || undefined,
      socialMedia: formData.socialMedia || undefined,
      status: formData.status || "active",
    };

    // Remove undefined fields
    Object.keys(dataToSubmit).forEach((key) => {
      if (dataToSubmit[key] === undefined || dataToSubmit[key] === "") {
        delete dataToSubmit[key];
      }
    });

    // Clean socialMedia if empty
    if (dataToSubmit.socialMedia) {
      const hasAnyValue = Object.values(dataToSubmit.socialMedia).some((v) => v);
      if (!hasAnyValue) {
        delete dataToSubmit.socialMedia;
      }
    }

    console.log("Data being sent to API:", dataToSubmit);

    if (speaker?.id) {
      // Update
      dispatch(updateSpeakerRequest({ ...dataToSubmit, id: speaker.id }));
    } else {
      // Create
      dispatch(createSpeakerRequest(dataToSubmit));
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
          <h2>{speaker?.id ? "Editar Palestrante" : "Novo Palestrante"}</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={onClose}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          <div className="row g-5">
            {/* Nome */}
            <div className="col-12">
              <label className="form-label fw-bold required">Nome</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                placeholder="Ex: João Silva"
                required
              />
            </div>

            {/* Cargo e Empresa */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Cargo</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                placeholder="Ex: CEO, Especialista, Professor"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Empresa</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="company"
                value={formData.company || ""}
                onChange={handleChange}
                placeholder="Ex: Empresa XYZ"
              />
            </div>

            {/* Função e Status */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Função</label>
              <select
                className="form-select form-select-solid"
                name="role"
                value={formData.role || "speaker"}
                onChange={handleChange}
              >
                <option value="speaker">Palestrante</option>
                <option value="moderator">Moderador</option>
                <option value="panelist">Painelista</option>
                <option value="special_guest">Convidado Especial</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Status</label>
              <select
                className="form-select form-select-solid"
                name="status"
                value={formData.status || "active"}
                onChange={handleChange}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>

            {/* Bio */}
            <div className="col-12">
              <label className="form-label fw-bold">Biografia</label>
              <textarea
                className="form-control form-control-solid"
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva a experiência e qualificações do palestrante..."
              />
            </div>

            {/* Foto */}
            <div className="col-12">
              <label className="form-label fw-bold">URL da Foto</label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                placeholder="https://exemplo.com/foto.jpg"
              />
              <div className="form-text">Cole a URL de uma foto hospedada</div>
            </div>

            {/* Contato */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control form-control-solid"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="email@exemplo.com"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Telefone</label>
              <input
                type="tel"
                className="form-control form-control-solid"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Redes Sociais */}
            <div className="col-12">
              <div className="separator my-5"></div>
              <h4 className="mb-5">Redes Sociais</h4>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">
                <KTIcon iconName="linkedin" className="fs-3 me-2" />
                LinkedIn
              </label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="linkedin"
                value={formData.socialMedia?.linkedin || ""}
                onChange={handleSocialMediaChange}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">
                <KTIcon iconName="instagram" className="fs-3 me-2" />
                Instagram
              </label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="instagram"
                value={formData.socialMedia?.instagram || ""}
                onChange={handleSocialMediaChange}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">
                <KTIcon iconName="twitter" className="fs-3 me-2" />
                Twitter
              </label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="twitter"
                value={formData.socialMedia?.twitter || ""}
                onChange={handleSocialMediaChange}
                placeholder="https://twitter.com/..."
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">
                <KTIcon iconName="globe" className="fs-3 me-2" />
                Website
              </label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="website"
                value={formData.socialMedia?.website || ""}
                onChange={handleSocialMediaChange}
                placeholder="https://seusite.com"
              />
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
                {speaker?.id ? "Atualizar Palestrante" : "Criar Palestrante"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SpeakerForm;
