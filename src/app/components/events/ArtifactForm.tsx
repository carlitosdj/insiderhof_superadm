import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store";
import {
  createArtifactRequest,
  updateArtifactRequest,
} from "../../../store/ducks/eventsessions/actions";
import { EventArtifact } from "../../../store/ducks/eventsessions/types";
import { KTIcon } from "../../../_metronic/helpers";

interface ArtifactFormProps {
  eventId: number;
  artifact?: EventArtifact | null;
  show: boolean;
  onClose: () => void;
}

const ArtifactForm: React.FC<ArtifactFormProps> = ({
  eventId,
  artifact,
  show,
  onClose,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: ApplicationState) => state.eventsessions.loadingArtifacts);

  const [formData, setFormData] = useState<EventArtifact>({
    eventId,
    name: "",
    description: "",
    type: "hotel",
    image: "",
    logo: "",
    gallery: [],
    address: "",
    phone: "",
    email: "",
    website: "",
    priceInfo: "",
    discount: "",
    observations: "",
    status: "active",
  });

  // Gallery URLs (simplificado para 3 campos)
  const [galleryUrl1, setGalleryUrl1] = useState("");
  const [galleryUrl2, setGalleryUrl2] = useState("");
  const [galleryUrl3, setGalleryUrl3] = useState("");

  useEffect(() => {
    if (artifact) {
      setFormData({
        ...artifact,
      });
      // Preencher gallery URLs se existirem
      if (artifact.gallery && Array.isArray(artifact.gallery)) {
        setGalleryUrl1(artifact.gallery[0] || "");
        setGalleryUrl2(artifact.gallery[1] || "");
        setGalleryUrl3(artifact.gallery[2] || "");
      }
    } else {
      // Reset form when creating new
      setFormData({
        eventId,
        name: "",
        description: "",
        type: "hotel",
        image: "",
        logo: "",
        gallery: [],
        address: "",
        phone: "",
        email: "",
        website: "",
        priceInfo: "",
        discount: "",
        observations: "",
        status: "active",
      });
      setGalleryUrl1("");
      setGalleryUrl2("");
      setGalleryUrl3("");
    }
  }, [artifact, eventId, show]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare gallery array
    const galleryArray = [galleryUrl1, galleryUrl2, galleryUrl3].filter(url => url.trim() !== "");

    // Prepare data for API
    const dataToSubmit: any = {
      eventId: formData.eventId,
      name: formData.name,
      description: formData.description || undefined,
      type: formData.type || "other",
      image: formData.image || undefined,
      logo: formData.logo || undefined,
      gallery: galleryArray.length > 0 ? galleryArray : undefined,
      address: formData.address || undefined,
      phone: formData.phone || undefined,
      email: formData.email || undefined,
      website: formData.website || undefined,
      priceInfo: formData.priceInfo || undefined,
      discount: formData.discount || undefined,
      observations: formData.observations || undefined,
      status: formData.status || "active",
    };

    // Remove undefined fields
    Object.keys(dataToSubmit).forEach((key) => {
      if (dataToSubmit[key] === undefined || dataToSubmit[key] === "") {
        delete dataToSubmit[key];
      }
    });

    console.log("Data being sent to API:", dataToSubmit);

    if (artifact?.id) {
      // Update
      dispatch(updateArtifactRequest({ ...dataToSubmit, id: artifact.id }));
    } else {
      // Create
      dispatch(createArtifactRequest(dataToSubmit));
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
          <h2>{artifact?.id ? "Editar Recomendação" : "Nova Recomendação"}</h2>
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
                placeholder="Ex: Hotel Ibis, Restaurante Outback, Uber"
                required
              />
            </div>

            {/* Tipo e Status */}
            <div className="col-md-6">
              <label className="form-label fw-bold required">Tipo</label>
              <select
                className="form-select form-select-solid"
                name="type"
                value={formData.type || "hotel"}
                onChange={handleChange}
                required
              >
                <option value="hotel">Hotel</option>
                <option value="food">Alimentação</option>
                <option value="transport">Transporte</option>
                <option value="leisure">Lazer</option>
                <option value="sponsor">Patrocinador</option>
                <option value="partner">Parceiro</option>
                <option value="other">Outro</option>
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

            {/* Descrição */}
            <div className="col-12">
              <label className="form-label fw-bold">Descrição</label>
              <textarea
                className="form-control form-control-solid"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
                placeholder="Descreva os serviços, facilidades, diferenciais..."
              />
            </div>

            {/* Imagens */}
            <div className="col-12">
              <div className="separator my-5"></div>
              <h4 className="mb-5">Imagens</h4>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">URL da Imagem Principal</label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <div className="form-text">Imagem principal do card</div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">URL do Logo</label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="logo"
                value={formData.logo || ""}
                onChange={handleChange}
                placeholder="https://exemplo.com/logo.png"
              />
              <div className="form-text">Logo da empresa/estabelecimento</div>
            </div>

            {/* Galeria */}
            <div className="col-12">
              <label className="form-label fw-bold">Galeria de Imagens</label>
              <div className="form-text mb-3">Adicione até 3 imagens adicionais</div>
            </div>

            <div className="col-md-4">
              <input
                type="url"
                className="form-control form-control-solid"
                value={galleryUrl1}
                onChange={(e) => setGalleryUrl1(e.target.value)}
                placeholder="https://exemplo.com/foto1.jpg"
              />
            </div>

            <div className="col-md-4">
              <input
                type="url"
                className="form-control form-control-solid"
                value={galleryUrl2}
                onChange={(e) => setGalleryUrl2(e.target.value)}
                placeholder="https://exemplo.com/foto2.jpg"
              />
            </div>

            <div className="col-md-4">
              <input
                type="url"
                className="form-control form-control-solid"
                value={galleryUrl3}
                onChange={(e) => setGalleryUrl3(e.target.value)}
                placeholder="https://exemplo.com/foto3.jpg"
              />
            </div>

            {/* Localização e Contato */}
            <div className="col-12">
              <div className="separator my-5"></div>
              <h4 className="mb-5">Localização e Contato</h4>
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Endereço</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                placeholder="Rua Exemplo, 123 - Centro"
              />
            </div>

            <div className="col-md-4">
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

            <div className="col-md-4">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control form-control-solid"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="contato@exemplo.com"
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-bold">Website</label>
              <input
                type="url"
                className="form-control form-control-solid"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                placeholder="https://exemplo.com"
              />
            </div>

            {/* Informações Adicionais */}
            <div className="col-12">
              <div className="separator my-5"></div>
              <h4 className="mb-5">Informações Adicionais</h4>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Informação de Preço</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="priceInfo"
                value={formData.priceInfo || ""}
                onChange={handleChange}
                placeholder="Ex: A partir de R$150/diária"
              />
              <div className="form-text">Apenas informativo, não é preço real</div>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold">Desconto/Promoção</label>
              <input
                type="text"
                className="form-control form-control-solid"
                name="discount"
                value={formData.discount || ""}
                onChange={handleChange}
                placeholder="Ex: 10% de desconto mencionando o evento"
              />
              <div className="form-text">Benefícios para participantes do evento</div>
            </div>

            <div className="col-12">
              <label className="form-label fw-bold">Observações</label>
              <textarea
                className="form-control form-control-solid"
                name="observations"
                value={formData.observations || ""}
                onChange={handleChange}
                rows={3}
                placeholder="Informações adicionais, horários de funcionamento, etc."
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
                {artifact?.id ? "Atualizar Recomendação" : "Criar Recomendação"}
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ArtifactForm;
