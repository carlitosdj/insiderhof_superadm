import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PaymentGateway } from "../../../../services/paymentGatewaysService";

interface AddPaymentGatewayModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: any) => Promise<void>;
  gateway?: PaymentGateway | null;
}

const AddPaymentGatewayModal: React.FC<AddPaymentGatewayModalProps> = ({
  show,
  onHide,
  onSubmit,
  gateway,
}) => {
  const [formData, setFormData] = useState({
    gatewayName: "mercadopago",
    displayName: "",
    gatewayPublicKey: "",
    gatewayAccessToken: "",
    gatewayBin: "",
    isActive: false,
  });

  const [loading, setLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    if (gateway) {
      // Editing mode
      setFormData({
        gatewayName: gateway.gatewayName,
        displayName: gateway.displayName,
        gatewayPublicKey: gateway.gatewayPublicKey,
        gatewayAccessToken: gateway.gatewayAccessToken,
        gatewayBin: gateway.gatewayBin || "",
        isActive: gateway.isActive,
      });
    } else {
      // Create mode - reset form
      setFormData({
        gatewayName: "mercadopago",
        displayName: "",
        gatewayPublicKey: "",
        gatewayAccessToken: "",
        gatewayBin: "",
        isActive: false,
      });
    }
  }, [gateway, show]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remove empty gatewayBin if not provided
      const submitData = {
        ...formData,
        gatewayBin: formData.gatewayBin.trim() || undefined,
      };

      await onSubmit(submitData);
      onHide();
    } catch (error: any) {
      console.error("Error submitting gateway:", error);
      alert(error.response?.data?.message || "Erro ao salvar gateway");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            {gateway ? "Editar Gateway de Pagamento" : "Adicionar Gateway de Pagamento"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* Display Name */}
          <Form.Group className="mb-4">
            <Form.Label className="required">Nome de Exibição</Form.Label>
            <Form.Control
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Ex: MercadoPago Principal"
              required
            />
            <Form.Text className="text-muted">
              Nome para identificar este gateway no sistema
            </Form.Text>
          </Form.Group>

          {/* Gateway Type */}
          <Form.Group className="mb-4">
            <Form.Label className="required">Gateway</Form.Label>
            <Form.Select
              name="gatewayName"
              value={formData.gatewayName}
              onChange={handleChange}
              required
            >
              <option value="mercadopago">MercadoPago</option>
              <option value="stripe">Stripe</option>
            </Form.Select>
          </Form.Group>

          {/* Public Key */}
          <Form.Group className="mb-4">
            <Form.Label className="required">Public Key</Form.Label>
            <Form.Control
              type="text"
              name="gatewayPublicKey"
              value={formData.gatewayPublicKey}
              onChange={handleChange}
              placeholder="APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              required
            />
            <Form.Text className="text-muted">
              Chave pública do {formData.gatewayName === "mercadopago" ? "MercadoPago" : "Stripe"}
            </Form.Text>
          </Form.Group>

          {/* Access Token */}
          <Form.Group className="mb-4">
            <Form.Label className="required">Access Token</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showToken ? "text" : "password"}
                name="gatewayAccessToken"
                value={formData.gatewayAccessToken}
                onChange={handleChange}
                placeholder="APP_USR-xxxxxxxx-xxxxxx-xxxx..."
                required
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowToken(!showToken)}
              >
                {showToken ? "👁️‍🗨️ Ocultar" : "👁️ Mostrar"}
              </button>
            </div>
            <Form.Text className="text-danger">
              ⚠️ Este token será criptografado no banco de dados
            </Form.Text>
          </Form.Group>

          {/* BIN (optional, MercadoPago only) */}
          {formData.gatewayName === "mercadopago" && (
            <Form.Group className="mb-4">
              <Form.Label>BIN (opcional)</Form.Label>
              <Form.Control
                type="text"
                name="gatewayBin"
                value={formData.gatewayBin}
                onChange={handleChange}
                placeholder="503143"
              />
              <Form.Text className="text-muted">
                Número BIN específico do MercadoPago (deixe em branco se não aplicável)
              </Form.Text>
            </Form.Group>
          )}

          {/* Is Active */}
          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              label="Definir como gateway ativo"
            />
            <Form.Text className="text-warning d-block mt-2">
              ⚠️ Ao ativar este gateway, os demais serão desativados automaticamente
            </Form.Text>
          </Form.Group>

          {/* Info Box */}
          <div className="alert alert-info d-flex align-items-center">
            <i className="bi bi-info-circle-fill me-2"></i>
            <div>
              <strong>Segurança:</strong> Todas as credenciais sensíveis são criptografadas com
              AES-256-CBC antes de serem armazenadas no banco de dados.
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Salvando..." : gateway ? "Atualizar" : "Adicionar"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPaymentGatewayModal;
