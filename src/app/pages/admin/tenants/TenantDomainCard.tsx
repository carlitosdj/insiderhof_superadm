import React from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import { TenantDomain } from "../../../../services/tenantDomainsService";

interface TenantDomainCardProps {
  domain: TenantDomain;
  onEdit: (domain: TenantDomain) => void;
  onDelete: (domainId: number) => void;
}

const TenantDomainCard: React.FC<TenantDomainCardProps> = ({
  domain,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir o domínio ${domain.domain}?\n\nEsta ação não pode ser desfeita.`
      )
    ) {
      onDelete(domain.id);
    }
  };

  return (
    <div className="card">
      <div className="card-body p-6">
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center flex-grow-1">
            {/* Domain Icon */}
            <div
              className={`symbol symbol-50px me-5 ${
                domain.isActive ? "bg-light-primary" : "bg-light-secondary"
              }`}
            >
              <span
                className={`symbol-label ${
                  domain.isActive ? "text-primary" : "text-secondary"
                }`}
              >
                <KTIcon iconName="abstract-41" className="fs-2x" />
              </span>
            </div>

            {/* Domain Info */}
            <div className="flex-grow-1">
              <div className="d-flex align-items-center mb-2">
                <span className="fs-5 fw-bold text-gray-900 me-2">
                  {domain.domain}
                </span>
                {domain.isPrimary && (
                  <span className="badge badge-light-primary">Primary</span>
                )}
                {domain.isActive ? (
                  <span className="badge badge-light-success ms-2">Ativo</span>
                ) : (
                  <span className="badge badge-light-secondary ms-2">
                    Inativo
                  </span>
                )}
              </div>

              <div className="d-flex flex-column text-muted fs-7">
                {domain.redirectPath ? (
                  <div className="d-flex align-items-center mb-1">
                    <KTIcon iconName="arrow-right" className="fs-6 me-1" />
                    <span>
                      Redireciona para:{" "}
                      <span className="fw-semibold text-gray-700">
                        {domain.redirectPath}
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="d-flex align-items-center mb-1">
                    <KTIcon iconName="home" className="fs-6 me-1" />
                    <span>Redireciona para: /home</span>
                  </div>
                )}

                <div className="d-flex align-items-center">
                  <KTIcon iconName="calendar" className="fs-6 me-1" />
                  <span>
                    Criado em:{" "}
                    {new Date(domain.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex align-items-center">
            <button
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-2"
              onClick={() => onEdit(domain)}
              title="Editar domínio"
            >
              <KTIcon iconName="pencil" className="fs-3" />
            </button>
            <button
              className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm"
              onClick={handleDelete}
              title="Excluir domínio"
            >
              <KTIcon iconName="trash" className="fs-3" />
            </button>
          </div>
        </div>

        {/* Full Domain URLs Preview */}
        <div className="mt-4 pt-4 border-top border-gray-300">
          <div className="text-muted fs-8 mb-2">
            <KTIcon iconName="information-2" className="fs-6 me-1" />
            URLs disponíveis:
          </div>
          <div className="d-flex flex-wrap gap-2">
            <span className="badge badge-light-info">
              https://{domain.domain}
            </span>
            <span className="badge badge-light-info">
              https://www.{domain.domain}
            </span>
            <span className="badge badge-light-info">
              https://app.{domain.domain}
            </span>
            <span className="badge badge-light-info">
              https://mkt.{domain.domain}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDomainCard;
