import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { TenantDomain } from "../../../../services/tenantDomainsService";

interface AddDomainModalProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (data: any) => Promise<void>;
  domain: TenantDomain | null;
}

const AddDomainModal: React.FC<AddDomainModalProps> = ({
  show,
  onHide,
  onSubmit,
  domain,
}) => {
  const [formData, setFormData] = useState({
    domain: "",
    redirectPath: "",
    seoTitle: "",
    seoDescription: "",
    seoImage: "",
    facebookDomainVerification: "",
    isPrimary: false,
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (domain) {
      setFormData({
        domain: domain.domain,
        redirectPath: domain.redirectPath || "",
        seoTitle: domain.seoTitle || "",
        seoDescription: domain.seoDescription || "",
        seoImage: domain.seoImage || "",
        facebookDomainVerification: domain.facebookDomainVerification || "",
        isPrimary: domain.isPrimary,
        isActive: domain.isActive,
      });
    } else {
      setFormData({
        domain: "",
        redirectPath: "",
        seoTitle: "",
        seoDescription: "",
        seoImage: "",
        facebookDomainVerification: "",
        isPrimary: false,
        isActive: true,
      });
    }
    setErrors({});
  }, [domain, show]);

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.domain.trim()) {
      newErrors.domain = "Domínio é obrigatório";
    } else {
      // Validação básica de formato de domínio
      const domainRegex = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i;
      if (!domainRegex.test(formData.domain.trim())) {
        newErrors.domain = "Formato de domínio inválido (ex: example.com)";
      }
    }

    if (formData.redirectPath && !formData.redirectPath.startsWith("/")) {
      newErrors.redirectPath = "Caminho deve começar com /";
    }

    if (formData.seoImage.trim() && !/^https?:\/\//i.test(formData.seoImage.trim())) {
      newErrors.seoImage = "Use a URL completa da imagem (https://...)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const submitData = {
        domain: formData.domain.trim().toLowerCase(),
        redirectPath: formData.redirectPath.trim() || undefined,
        // Vazio = usa o SEO do tenant (string vazia permite apagar o valor salvo)
        seoTitle: formData.seoTitle.trim(),
        seoDescription: formData.seoDescription.trim(),
        seoImage: formData.seoImage.trim(),
        facebookDomainVerification: formData.facebookDomainVerification.trim(),
        isPrimary: formData.isPrimary,
        isActive: formData.isActive,
      };

      await onSubmit(submitData);
      onHide();
    } catch (error: any) {
      console.error("Error submitting domain:", error);
      setErrors({
        submit:
          error.response?.data?.message ||
          "Erro ao salvar domínio. Verifique os dados e tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>
            <KTIcon iconName="abstract-41" className="fs-2 me-2" />
            {domain ? "Editar Domínio" : "Adicionar Domínio"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {errors.submit && (
            <div className="alert alert-danger d-flex align-items-center">
              <KTIcon iconName="information-5" className="fs-2hx me-4" />
              <div className="d-flex flex-column">
                <h4 className="mb-1 text-danger">Erro</h4>
                <span>{errors.submit}</span>
              </div>
            </div>
          )}

          {/* Domain */}
          <div className="mb-5">
            <label className="form-label required">Domínio</label>
            <input
              type="text"
              className={`form-control ${errors.domain ? "is-invalid" : ""}`}
              placeholder="exemplo.com.br"
              value={formData.domain}
              onChange={(e) =>
                setFormData({ ...formData, domain: e.target.value })
              }
              disabled={loading}
            />
            {errors.domain && (
              <div className="invalid-feedback">{errors.domain}</div>
            )}
            <div className="form-text">
              Apenas o domínio, sem www, http ou https. Exemplo:
              mentorsergioricardo.com
            </div>
          </div>

          {/* Redirect Path */}
          <div className="mb-5">
            <label className="form-label">Caminho de Redirecionamento</label>
            <input
              type="text"
              className={`form-control ${
                errors.redirectPath ? "is-invalid" : ""
              }`}
              placeholder="/join/nome-da-oferta"
              value={formData.redirectPath}
              onChange={(e) =>
                setFormData({ ...formData, redirectPath: e.target.value })
              }
              disabled={loading}
            />
            {errors.redirectPath && (
              <div className="invalid-feedback">{errors.redirectPath}</div>
            )}
            <div className="form-text">
              Opcional. Se vazio, redireciona para /home. Deve começar com /.
              Exemplo: /subscribe/voz-de-comando-nov-25
            </div>
          </div>

          {/* SEO (prévia de link) */}
          <div className="separator separator-dashed my-8"></div>
          <h4 className="mb-2">Prévia de link (SEO)</h4>
          <div className="form-text mb-5">
            Título, descrição e imagem que aparecem ao divulgar este domínio no
            WhatsApp, Facebook e Instagram. Campos vazios usam o SEO do tenant.
            Páginas de lançamento usam o produto da página (ou os extras
            ogTitle, ogDescription e ogImage da fase) antes destes valores.
          </div>

          <div className="mb-5">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex.: Intercorrências Faciais"
              maxLength={255}
              value={formData.seoTitle}
              onChange={(e) =>
                setFormData({ ...formData, seoTitle: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="mb-5">
            <label className="form-label">Descrição</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="Uma ou duas frases sobre o que este domínio oferece"
              value={formData.seoDescription}
              onChange={(e) =>
                setFormData({ ...formData, seoDescription: e.target.value })
              }
              disabled={loading}
            />
          </div>

          <div className="mb-5">
            <label className="form-label">Imagem (URL)</label>
            <input
              type="url"
              className={`form-control ${errors.seoImage ? "is-invalid" : ""}`}
              placeholder="https://app.seudominio.com.br/files/imagem.jpg"
              maxLength={500}
              value={formData.seoImage}
              onChange={(e) =>
                setFormData({ ...formData, seoImage: e.target.value })
              }
              disabled={loading}
            />
            {errors.seoImage && (
              <div className="invalid-feedback">{errors.seoImage}</div>
            )}
            <div className="form-text">
              Ideal: 1200×630 px (paisagem).
            </div>
            {formData.seoImage && !errors.seoImage && (
              <img
                src={formData.seoImage}
                alt="Prévia"
                className="mt-3 rounded border"
                style={{ maxWidth: 240, maxHeight: 140, objectFit: "cover" }}
              />
            )}
          </div>

          <div className="mb-5">
            <label className="form-label">Verificação de domínio do Facebook</label>
            <input
              type="text"
              className="form-control"
              placeholder="Código da meta tag facebook-domain-verification"
              maxLength={100}
              value={formData.facebookDomainVerification}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  facebookDomainVerification: e.target.value,
                })
              }
              disabled={loading}
            />
          </div>

          <div className="separator separator-dashed my-8"></div>

          {/* Is Primary */}
          <div className="mb-5">
            <div className="form-check form-switch form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                id="isPrimary"
                checked={formData.isPrimary}
                onChange={(e) =>
                  setFormData({ ...formData, isPrimary: e.target.checked })
                }
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="isPrimary">
                Domínio Principal
              </label>
            </div>
            <div className="form-text">
              Apenas um domínio pode ser marcado como principal por tenant. Se
              ativado, os outros domínios serão desmarcados automaticamente.
            </div>
          </div>

          {/* Is Active */}
          <div className="mb-5">
            <div className="form-check form-switch form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="isActive">
                Ativo
              </label>
            </div>
            <div className="form-text">
              Apenas domínios ativos serão incluídos na whitelist CORS e
              estarão disponíveis para redirecionamento.
            </div>
          </div>

          {/* Info Alert */}
          <div className="alert alert-info d-flex align-items-center">
            <KTIcon iconName="information" className="fs-2x me-4" />
            <div>
              <strong>Como funciona:</strong>
              <ul className="mb-0 mt-2">
                <li>
                  O domínio será automaticamente adicionado à whitelist CORS da
                  API
                </li>
                <li>
                  Quando alguém acessar o domínio na raiz (/), será
                  redirecionado para o caminho especificado
                </li>
                <li>
                  O middleware do @mkt detectará automaticamente o tenant pelo
                  domínio
                </li>
                <li>
                  Todas as variações (http, https, www, subdomínios app/adm/mkt
                  etc) são suportadas
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-light"
            onClick={onHide}
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm align-middle me-2"></span>
                Salvando...
              </>
            ) : (
              <>
                <KTIcon iconName="check" className="fs-3" />
                {domain ? "Atualizar Domínio" : "Adicionar Domínio"}
              </>
            )}
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddDomainModal;
