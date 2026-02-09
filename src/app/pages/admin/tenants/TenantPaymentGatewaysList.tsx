import React, { useState, useEffect } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  getTenantPaymentGateways,
  createPaymentGateway,
  updatePaymentGateway,
  activatePaymentGateway,
  deletePaymentGateway,
  PaymentGateway,
} from "../../../../services/paymentGatewaysService";
import PaymentGatewayCard from "./PaymentGatewayCard";
import AddPaymentGatewayModal from "./AddPaymentGatewayModal";

interface TenantPaymentGatewaysListProps {
  tenantId: number;
}

const TenantPaymentGatewaysList: React.FC<TenantPaymentGatewaysListProps> = ({ tenantId }) => {
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);

  useEffect(() => {
    if (tenantId) {
      loadGateways();
    }
  }, [tenantId]);

  const loadGateways = async () => {
    try {
      setLoading(true);
      const response = await getTenantPaymentGateways(tenantId);
      setGateways(response.data);
    } catch (error: any) {
      console.error("Error loading gateways:", error);
      alert(error.response?.data?.message || "Erro ao carregar gateways");
    } finally {
      setLoading(false);
    }
  };

  const handleAddGateway = () => {
    setSelectedGateway(null);
    setShowModal(true);
  };

  const handleEditGateway = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway);
    setShowModal(true);
  };

  const handleSubmitGateway = async (data: any) => {
    try {
      if (selectedGateway) {
        // Update
        await updatePaymentGateway(selectedGateway.id, data);
        alert("Gateway atualizado com sucesso!");
      } else {
        // Create
        await createPaymentGateway(tenantId, data);
        alert("Gateway criado com sucesso!");
      }
      await loadGateways();
    } catch (error: any) {
      console.error("Error submitting gateway:", error);
      throw error; // Re-throw para o modal tratar
    }
  };

  const handleActivateGateway = async (gatewayId: number) => {
    try {
      if (
        window.confirm(
          "Tem certeza que deseja ativar este gateway?\n\nOs outros gateways serão desativados automaticamente."
        )
      ) {
        await activatePaymentGateway(tenantId, gatewayId);
        alert("Gateway ativado com sucesso!");
        await loadGateways();
      }
    } catch (error: any) {
      console.error("Error activating gateway:", error);
      alert(error.response?.data?.message || "Erro ao ativar gateway");
    }
  };

  const handleDeleteGateway = async (gatewayId: number) => {
    try {
      await deletePaymentGateway(gatewayId);
      alert("Gateway excluído com sucesso!");
      await loadGateways();
    } catch (error: any) {
      console.error("Error deleting gateway:", error);
      alert(error.response?.data?.message || "Erro ao excluir gateway");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="spinner-border spinner-border-lg align-middle ms-2"></span>
        <p className="mt-3 text-muted">Carregando gateways de pagamento...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Gateways de Pagamento
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {gateways.length} gateway{gateways.length !== 1 ? "s" : ""} configurado
            {gateways.length !== 1 ? "s" : ""}
          </span>
        </h3>
        <div className="card-toolbar">
          <button className="btn btn-sm btn-primary" onClick={handleAddGateway}>
            <KTIcon iconName="plus" className="fs-3" />
            Adicionar Gateway
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {gateways.length === 0 ? (
          <div className="text-center py-10">
            <KTIcon iconName="shield-slash" className="fs-3hx text-muted mb-5" />
            <h3 className="text-gray-600 fs-2 mb-3">Nenhum gateway configurado</h3>
            <p className="text-muted fs-5 mb-6">
              Configure um gateway de pagamento para começar a processar transações.
            </p>
            <button className="btn btn-primary" onClick={handleAddGateway}>
              <KTIcon iconName="plus" className="fs-3" />
              Adicionar Primeiro Gateway
            </button>
          </div>
        ) : (
          <div className="row g-5">
            {gateways.map((gateway) => (
              <div key={gateway.id} className="col-md-12">
                <PaymentGatewayCard
                  gateway={gateway}
                  onActivate={handleActivateGateway}
                  onEdit={handleEditGateway}
                  onDelete={handleDeleteGateway}
                />
              </div>
            ))}
          </div>
        )}

        {/* Info Alert */}
        {gateways.length > 0 && (
          <div className="alert alert-info d-flex align-items-center mt-5">
            <KTIcon iconName="information" className="fs-1 me-3" />
            <div>
              <strong>Multi-Gateway:</strong> Você pode configurar múltiplos gateways e trocar entre
              eles a qualquer momento. Apenas um gateway pode estar ativo por vez. Todos os
              pagamentos usarão o gateway marcado como ativo.
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AddPaymentGatewayModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSubmitGateway}
        gateway={selectedGateway}
      />
    </div>
  );
};

export default TenantPaymentGatewaysList;
