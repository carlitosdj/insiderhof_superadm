import React, { useState } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { PaymentGateway } from "../../../../services/paymentGatewaysService";

interface PaymentGatewayCardProps {
  gateway: PaymentGateway;
  onActivate: (gatewayId: number) => void;
  onEdit: (gateway: PaymentGateway) => void;
  onDelete: (gatewayId: number) => void;
}

const PaymentGatewayCard: React.FC<PaymentGatewayCardProps> = ({
  gateway,
  onActivate,
  onEdit,
  onDelete,
}) => {
  const [showToken, setShowToken] = useState(false);

  const getGatewayIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "mercadopago":
        return "💳";
      case "stripe":
        return "💰";
      default:
        return "🏦";
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o gateway "${gateway.displayName}"?\n\nEsta ação não pode ser desfeita.`
      )
    ) {
      onDelete(gateway.id);
    }
  };

  const maskToken = (token: string) => {
    if (token.length <= 20) return token;
    const start = token.substring(0, 10);
    const end = token.substring(token.length - 10);
    return `${start}...${end}`;
  };

  return (
    <div
      className={`card shadow-sm mb-5 ${gateway.isActive ? "border border-success border-2" : ""}`}
    >
      {/* Header */}
      <div className="card-header">
        <div className="card-title">
          <span className="fs-2 me-2">{getGatewayIcon(gateway.gatewayName)}</span>
          <h3 className="fw-bold m-0">{gateway.displayName}</h3>
        </div>
        <div className="card-toolbar">
          {gateway.isActive ? (
            <span className="badge badge-success badge-lg">
              <KTIcon iconName="check-circle" className="fs-5 me-1" />
              Ativo
            </span>
          ) : (
            <span className="badge badge-secondary badge-lg">Inativo</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Gateway Info */}
        <div className="mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label text-muted fw-semibold">Gateway</label>
              <div className="text-gray-800 fw-bold">
                {gateway.gatewayName.charAt(0).toUpperCase() + gateway.gatewayName.slice(1)}
              </div>
            </div>

            <div className="col-md-6">
              <label className="form-label text-muted fw-semibold">Public Key</label>
              <div className="text-gray-800 fw-bold text-truncate">
                {maskToken(gateway.gatewayPublicKey)}
              </div>
            </div>

            {gateway.gatewayBin && (
              <div className="col-md-6">
                <label className="form-label text-muted fw-semibold">BIN</label>
                <div className="text-gray-800 fw-bold">{gateway.gatewayBin}</div>
              </div>
            )}

            <div className="col-md-12">
              <label className="form-label text-muted fw-semibold">Access Token</label>
              <div className="d-flex align-items-center">
                <code className="text-gray-800 flex-grow-1 text-truncate me-2">
                  {showToken ? gateway.gatewayAccessToken : maskToken(gateway.gatewayAccessToken)}
                </code>
                <button
                  className="btn btn-sm btn-light-primary"
                  onClick={() => setShowToken(!showToken)}
                >
                  <KTIcon iconName={showToken ? "eye-slash" : "eye"} className="fs-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="separator separator-dashed my-4"></div>
        <div className="d-flex justify-content-between text-muted fs-7">
          <span>
            Criado: {new Date(gateway.createdAt).toLocaleDateString("pt-BR")}
          </span>
          <span>
            Atualizado: {new Date(gateway.updatedAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
      </div>

      {/* Footer - Actions */}
      <div className="card-footer d-flex justify-content-end gap-2">
        {!gateway.isActive && (
          <button
            className="btn btn-sm btn-light-success"
            onClick={() => onActivate(gateway.id)}
            title="Ativar este gateway"
          >
            <KTIcon iconName="check-circle" className="fs-5 me-1" />
            Ativar
          </button>
        )}

        <button
          className="btn btn-sm btn-light-primary"
          onClick={() => onEdit(gateway)}
          title="Editar gateway"
        >
          <KTIcon iconName="pencil" className="fs-5 me-1" />
          Editar
        </button>

        <button
          className="btn btn-sm btn-light-danger"
          onClick={handleDelete}
          title="Excluir gateway"
        >
          <KTIcon iconName="trash" className="fs-5 me-1" />
          Excluir
        </button>
      </div>
    </div>
  );
};

export default PaymentGatewayCard;
