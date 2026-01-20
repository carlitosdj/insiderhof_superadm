import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { KTIcon } from "../../../_metronic/helpers";
import api from "../../../services/api";

interface EventCreationModalProps {
  show: boolean;
  productId: number;
  productName: string;
  onClose: () => void;
  onSuccess?: () => void;
}

interface PreviewData {
  product: {
    id: number;
    name: string;
    type: string;
  };
  event: {
    id: number;
    name: string;
    capacity: number | null;
  } | null;
  needsEventCreation: boolean;
  totalPurchases: number;
  existingTicketsCount: number;
  ticketsToCreate: number;
  buyers: Array<{
    cartId: number;
    userId: number;
    userName: string;
    userEmail: string;
    purchaseDate: string;
  }>;
  capacityWarning: boolean;
}

const EventCreationModal: React.FC<EventCreationModalProps> = ({
  show,
  productId,
  productName,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [step, setStep] = useState<'loading' | 'preview' | 'create-event' | 'success'>('loading');

  // Event form data
  const [eventName, setEventName] = useState("");
  const [eventSlug, setEventSlug] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventCapacity, setEventCapacity] = useState("");

  // Load preview data when modal opens
  useEffect(() => {
    if (show && productId) {
      console.log('🎯 [EventCreationModal] Modal aberto para productId:', productId);
      loadPreview();
    }
  }, [show, productId]);

  const loadPreview = async () => {
    console.log('📡 [EventCreationModal] Chamando API preview...');
    setLoading(true);
    setStep('loading');

    try {
      const response = await api.get(`/events/preview-auto-create/${productId}`);
      console.log('✅ [EventCreationModal] Preview recebido:', response.data);
      setPreviewData(response.data);

      // Se já existir um evento, vai direto para preview
      // Se não existir, vai para o form de criação
      if (response.data.needsEventCreation) {
        console.log('🆕 [EventCreationModal] Evento NÃO existe - mostrando form de criação');
        // Pré-preencher campos com dados do produto
        setEventName(productName);
        setEventSlug(productName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, ''));
        setStep('create-event');
      } else {
        console.log('📅 [EventCreationModal] Evento JÁ existe - mostrando preview');
        setStep('preview');
      }
    } catch (error: any) {
      console.error("❌ [EventCreationModal] Erro ao carregar preview:", error);
      console.error("❌ [EventCreationModal] Response data:", error.response?.data);
      alert("Erro ao carregar preview: " + (error.response?.data?.message || error.message));
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCreateTickets = async () => {
    if (!previewData) return;

    console.log('🎫 [EventCreationModal] Criando tickets apenas (evento já existe)...');
    setLoading(true);

    try {
      const payload = {
        createEvent: false,
        projectId: 1, // TODO: Get from context/props
      };
      console.log('📤 [EventCreationModal] Enviando payload:', payload);

      // Event already exists, just create tickets
      const response = await api.post(`/events/auto-create/${productId}`, payload);

      console.log('✅ [EventCreationModal] Tickets criados com sucesso:', response.data);
      setStep('success');

      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (error: any) {
      console.error("❌ [EventCreationModal] Erro ao criar tickets:", error);
      console.error("❌ [EventCreationModal] Response data:", error.response?.data);
      alert("Erro ao criar tickets: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmCreateEventAndTickets = async () => {
    if (!eventName || !eventSlug || !eventStartDate || !eventEndDate) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    console.log('🚀 [EventCreationModal] Criando evento E tickets...');
    setLoading(true);

    try {
      const payload = {
        createEvent: true,
        eventData: {
          name: eventName,
          slug: eventSlug,
          description: eventDescription || undefined,
          location: eventLocation || undefined,
          startDate: eventStartDate,
          endDate: eventEndDate,
          capacity: eventCapacity ? parseInt(eventCapacity) : undefined,
        },
        projectId: 1, // TODO: Get from context/props
      };
      console.log('📤 [EventCreationModal] Enviando payload:', payload);

      const response = await api.post(`/events/auto-create/${productId}`, payload);

      console.log('✅ [EventCreationModal] Evento e tickets criados com sucesso:', response.data);
      setStep('success');

      setTimeout(() => {
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      }, 2000);
    } catch (error: any) {
      console.error("❌ [EventCreationModal] Erro ao criar evento e tickets:", error);
      console.error("❌ [EventCreationModal] Response data:", error.response?.data);
      alert("Erro ao criar evento e tickets: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('loading');
    setPreviewData(null);
    onClose();
  };

  return (
    <Modal size="lg" show={show} onHide={handleClose} centered>
      <div className="modal-header">
        <h2>
          <KTIcon iconName="calendar-add" className="fs-1 me-2 text-primary" />
          Converter para Evento
        </h2>
        <div
          className="btn btn-sm btn-icon btn-active-color-primary"
          onClick={handleClose}
        >
          <KTIcon className="fs-1" iconName="cross" />
        </div>
      </div>

      <div className="modal-body">
        {/* LOADING STATE */}
        {step === 'loading' && (
          <div className="text-center py-10">
            <span className="spinner-border spinner-border-lg text-primary" />
            <p className="mt-4 text-muted">Carregando informações...</p>
          </div>
        )}

        {/* PREVIEW STATE (evento já existe) */}
        {step === 'preview' && previewData && (
          <>
            {/* Informações do Produto */}
            <div className="mb-5">
              <h4 className="text-gray-900 mb-3">Produto:</h4>
              <div className="bg-light rounded p-4">
                <p className="fs-5 fw-semibold text-gray-800 mb-1">
                  {previewData.product.name}
                </p>
                <p className="text-muted mb-0">ID: {previewData.product.id}</p>
              </div>
            </div>

            {/* Informações do Evento Existente */}
            {previewData.event && (
              <div className="mb-5">
                <h4 className="text-gray-900 mb-3">Evento Existente:</h4>
                <div className="bg-light-success rounded p-4">
                  <p className="fs-5 fw-semibold text-gray-800 mb-1">
                    {previewData.event.name}
                  </p>
                  <p className="text-muted mb-0">
                    ID: {previewData.event.id}
                    {previewData.event.capacity && ` | Capacidade: ${previewData.event.capacity}`}
                  </p>
                </div>
              </div>
            )}

            <div className="separator my-5"></div>

            {/* Estatísticas */}
            <div className="bg-light-primary rounded p-4 mb-5">
              <h5 className="text-primary mb-3">
                <KTIcon iconName="chart-line" className="fs-3 me-2" />
                Estatísticas:
              </h5>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <span className="fs-2 fw-bold text-gray-800">
                      {previewData.totalPurchases}
                    </span>
                    <span className="text-muted">Compras Totais</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <span className="fs-2 fw-bold text-success">
                      {previewData.existingTicketsCount}
                    </span>
                    <span className="text-muted">Tickets Existentes</span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex flex-column">
                    <span className="fs-2 fw-bold text-warning">
                      {previewData.ticketsToCreate}
                    </span>
                    <span className="text-muted">Tickets a Criar</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Aviso de Capacidade */}
            {previewData.capacityWarning && (
              <div className="alert alert-warning d-flex align-items-center mb-5">
                <KTIcon iconName="shield-tick" className="fs-2x text-warning me-4" />
                <div className="flex-grow-1">
                  <p className="mb-0">
                    <strong>Atenção:</strong> O total de tickets excederá a capacidade do evento.
                    Os tickets serão criados mesmo assim (conforme configuração).
                  </p>
                </div>
              </div>
            )}

            {/* Lista de Compradores */}
            {previewData.ticketsToCreate > 0 && (
              <div className="mb-5">
                <h5 className="text-gray-900 mb-3">
                  Compradores que receberão tickets ({previewData.buyers.length}):
                </h5>
                <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  <table className="table table-sm table-row-bordered">
                    <thead>
                      <tr className="fw-bold text-muted bg-light">
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Data da Compra</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.buyers.map((buyer) => (
                        <tr key={buyer.cartId}>
                          <td>{buyer.userName}</td>
                          <td className="text-muted">{buyer.userEmail}</td>
                          <td className="text-muted">
                            {new Date(buyer.purchaseDate).toLocaleDateString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {previewData.ticketsToCreate === 0 && (
              <div className="alert alert-info d-flex align-items-center">
                <KTIcon iconName="information-2" className="fs-2x text-info me-4" />
                <div className="flex-grow-1">
                  <p className="mb-0">
                    Todos os compradores já possuem tickets para este evento.
                    Nenhum ticket será criado.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {/* CREATE EVENT FORM STATE */}
        {step === 'create-event' && previewData && (
          <>
            {/* Info */}
            <div className="alert alert-info d-flex align-items-start mb-5">
              <KTIcon iconName="information-2" className="fs-2x text-info me-4 mt-1" />
              <div className="flex-grow-1">
                <h5 className="text-info mb-3">
                  <strong>Novo Evento</strong>
                </h5>
                <p className="mb-0">
                  Este produto ainda não tem um evento vinculado. Preencha os dados abaixo
                  para criar o evento e os tickets para <strong>{previewData.ticketsToCreate} compradores</strong>.
                </p>
              </div>
            </div>

            {/* Form */}
            <Form>
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="required fw-bold">Nome do Evento</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                      placeholder="Ex: Workshop de Harmonização Facial"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group>
                    <Form.Label className="required fw-bold">Slug (URL)</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventSlug}
                      onChange={(e) => setEventSlug(e.target.value)}
                      placeholder="workshop-harmonizacao-facial"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group>
                    <Form.Label className="fw-bold">Descrição</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      placeholder="Descrição do evento..."
                    />
                  </Form.Group>
                </div>

                <div className="col-md-12">
                  <Form.Group>
                    <Form.Label className="fw-bold">Localização</Form.Label>
                    <Form.Control
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="Ex: Centro de Convenções - São Paulo"
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label className="required fw-bold">Data de Início</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={eventStartDate}
                      onChange={(e) => setEventStartDate(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label className="required fw-bold">Data de Término</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      value={eventEndDate}
                      onChange={(e) => setEventEndDate(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-4">
                  <Form.Group>
                    <Form.Label className="fw-bold">Capacidade</Form.Label>
                    <Form.Control
                      type="number"
                      value={eventCapacity}
                      onChange={(e) => setEventCapacity(e.target.value)}
                      placeholder="Ex: 100"
                    />
                  </Form.Group>
                </div>
              </div>
            </Form>
          </>
        )}

        {/* SUCCESS STATE */}
        {step === 'success' && (
          <div className="alert alert-success d-flex align-items-center">
            <KTIcon iconName="check-circle" className="fs-2x text-success me-4" />
            <div className="flex-grow-1">
              <p className="mb-0 fw-semibold">
                Evento e tickets criados com sucesso!
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
          {step === 'success' ? "Fechar" : "Cancelar"}
        </button>

        {step === 'preview' && previewData && previewData.ticketsToCreate > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirmCreateTickets}
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
                Criar {previewData.ticketsToCreate} Tickets
              </>
            )}
          </button>
        )}

        {step === 'create-event' && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirmCreateEventAndTickets}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Criando Evento e Tickets...
              </>
            ) : (
              <>
                <KTIcon iconName="calendar-add" className="fs-3 me-2" />
                Criar Evento e Tickets
              </>
            )}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default EventCreationModal;
