import React, { useState, useEffect } from "react";
import { KTIcon } from "../../../../_metronic/helpers";
import {
  getTenantDomains,
  createDomain,
  updateDomain,
  deleteDomain,
  TenantDomain,
} from "../../../../services/tenantDomainsService";
import TenantDomainCard from "./TenantDomainCard";
import AddDomainModal from "./AddDomainModal";

interface TenantDomainsListProps {
  tenantId: number;
}

const TenantDomainsList: React.FC<TenantDomainsListProps> = ({ tenantId }) => {
  const [domains, setDomains] = useState<TenantDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<TenantDomain | null>(
    null
  );

  useEffect(() => {
    if (tenantId) {
      loadDomains();
    }
  }, [tenantId]);

  const loadDomains = async () => {
    try {
      setLoading(true);
      const response = await getTenantDomains(tenantId);
      setDomains(response.data);
    } catch (error: any) {
      console.error("Error loading domains:", error);
      alert(error.response?.data?.message || "Erro ao carregar domínios");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomain = () => {
    setSelectedDomain(null);
    setShowModal(true);
  };

  const handleEditDomain = (domain: TenantDomain) => {
    setSelectedDomain(domain);
    setShowModal(true);
  };

  const handleSubmitDomain = async (data: any) => {
    try {
      if (selectedDomain) {
        // Update
        await updateDomain(selectedDomain.id, data);
        alert("Domínio atualizado com sucesso!");
      } else {
        // Create
        await createDomain(tenantId, data);
        alert("Domínio criado com sucesso!");
      }
      await loadDomains();
    } catch (error: any) {
      console.error("Error submitting domain:", error);
      throw error; // Re-throw para o modal tratar
    }
  };

  const handleDeleteDomain = async (domainId: number) => {
    try {
      await deleteDomain(domainId);
      alert("Domínio excluído com sucesso!");
      await loadDomains();
    } catch (error: any) {
      console.error("Error deleting domain:", error);
      alert(error.response?.data?.message || "Erro ao excluir domínio");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="spinner-border spinner-border-lg align-middle ms-2"></span>
        <p className="mt-3 text-muted">Carregando domínios...</p>
      </div>
    );
  }

  const primaryDomain = domains.find((d) => d.isPrimary);
  const activeDomains = domains.filter((d) => d.isActive).length;

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Domínios do Tenant
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {domains.length} domínio{domains.length !== 1 ? "s" : ""} configurado
            {domains.length !== 1 ? "s" : ""} ({activeDomains} ativo
            {activeDomains !== 1 ? "s" : ""})
          </span>
        </h3>
        <div className="card-toolbar">
          <button className="btn btn-sm btn-primary" onClick={handleAddDomain}>
            <KTIcon iconName="plus" className="fs-3" />
            Adicionar Domínio
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {domains.length === 0 ? (
          <div className="text-center py-10">
            <KTIcon iconName="abstract-41" className="fs-3hx text-muted mb-5" />
            <h3 className="text-gray-600 fs-2 mb-3">Nenhum domínio configurado</h3>
            <p className="text-muted fs-5 mb-6">
              Configure domínios personalizados para este tenant. Os domínios
              serão automaticamente adicionados à whitelist CORS e estarão
              disponíveis para redirecionamento no @mkt.
            </p>
            <button className="btn btn-primary" onClick={handleAddDomain}>
              <KTIcon iconName="plus" className="fs-3" />
              Adicionar Primeiro Domínio
            </button>
          </div>
        ) : (
          <>
            {/* Primary Domain Highlight */}
            {primaryDomain && (
              <div className="alert alert-primary d-flex align-items-center mb-5">
                <KTIcon iconName="star" className="fs-2x me-4" />
                <div>
                  <strong>Domínio Principal:</strong> {primaryDomain.domain}
                  {primaryDomain.redirectPath && (
                    <span className="ms-2">
                      → Redireciona para {primaryDomain.redirectPath}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Domains List */}
            <div className="row g-5">
              {domains.map((domain) => (
                <div key={domain.id} className="col-md-12">
                  <TenantDomainCard
                    domain={domain}
                    onEdit={handleEditDomain}
                    onDelete={handleDeleteDomain}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Alert */}
        {domains.length > 0 && (
          <div className="alert alert-info d-flex align-items-center mt-5">
            <KTIcon iconName="information" className="fs-1 me-3" />
            <div>
              <strong>Gerenciamento Dinâmico:</strong> Todos os domínios
              configurados aqui são automaticamente:
              <ul className="mb-0 mt-2">
                <li>Adicionados à whitelist CORS da API (reiniciar não necessário)</li>
                <li>Disponibilizados para redirecionamento no middleware do @mkt</li>
                <li>
                  Suportados com todas as variações (http/https, www, subdomínios
                  app/adm/mkt/api/gmv)
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <AddDomainModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSubmit={handleSubmitDomain}
        domain={selectedDomain}
      />
    </div>
  );
};

export default TenantDomainsList;
