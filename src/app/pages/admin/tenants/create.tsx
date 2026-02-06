import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createTenantRequest } from "../../../../store/ducks/tenants/actions";
import { Tenant } from "../../../../store/ducks/tenants/types";
import { uploadFile } from "../../../../utils/uploadHelper";
import { getTenantFileUrl } from "../../../../utils/getApiUrl";

interface handleCloseProps {
  handleClose: () => void;
}

// Função para gerar slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim();
};

const Create = ({ handleClose }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  // Dados básicos
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  // Domínios
  const [domain, setDomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");

  // Contato
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Plano e status
  const [plan, setPlan] = useState<Tenant['plan']>("starter");
  const [status, setStatus] = useState<Tenant['status']>("trial");

  // Branding
  const [logo, setLogo] = useState("");
  const [logoDark, setLogoDark] = useState("");
  const [logoMini, setLogoMini] = useState("");
  const [logoMiniDark, setLogoMiniDark] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3699FF");
  const [secondaryColor, setSecondaryColor] = useState("#F1416C");

  // Email Configuration
  const [mailResendApiKey, setMailResendApiKey] = useState("");
  const [mailDefaultSender, setMailDefaultSender] = useState("");
  const [mailDefaultSenderName, setMailDefaultSenderName] = useState("");

  // Upload states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDarkFile, setLogoDarkFile] = useState<File | null>(null);
  const [logoMiniFile, setLogoMiniFile] = useState<File | null>(null);
  const [logoMiniDarkFile, setLogoMiniDarkFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    // Auto-gerar slug
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setUploading(true);

    try {
      // Upload logos se arquivos foram selecionados
      let logoUrl = logo;
      let logoDarkUrl = logoDark;
      let logoMiniUrl = logoMini;
      let logoMiniDarkUrl = logoMiniDark;

      if (logoFile) {
        const res = await uploadFile(logoFile, undefined, logoFile.name, slug);
        logoUrl = res.data.filename;
      }
      if (logoDarkFile) {
        const res = await uploadFile(logoDarkFile, undefined, logoDarkFile.name, slug);
        logoDarkUrl = res.data.filename;
      }
      if (logoMiniFile) {
        const res = await uploadFile(logoMiniFile, undefined, logoMiniFile.name, slug);
        logoMiniUrl = res.data.filename;
      }
      if (logoMiniDarkFile) {
        const res = await uploadFile(logoMiniDarkFile, undefined, logoMiniDarkFile.name, slug);
        logoMiniDarkUrl = res.data.filename;
      }

      const newTenant: Tenant = {
        name,
        slug,
        description,
        domain,
        customDomain,
        contactEmail,
        contactPhone,
        plan,
        status,
        logo: logoUrl,
        logoDark: logoDarkUrl,
        logoMini: logoMiniUrl,
        logoMiniDark: logoMiniDarkUrl,
        primaryColor,
        secondaryColor,
        mailResendApiKey,
        mailDefaultSender,
        mailDefaultSenderName,
      };

      dispatch(createTenantRequest(newTenant));
      handleClose();
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao fazer upload dos arquivos. Tente novamente.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="row">
        {/* Coluna Esquerda - Dados Básicos */}
        <div className="col-md-6">
          <h3 className="mb-4">Dados Básicos</h3>

          <Form.Group className="mb-5">
            <Form.Label className="required">Nome do Tenant</Form.Label>
            <Form.Control
              required
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ex: Estética Avançada"
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe o nome do tenant.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label className="required">Slug (URL)</Form.Label>
            <Form.Control
              required
              type="text"
              value={slug}
              onChange={(e) => setSlug(generateSlug(e.target.value))}
              placeholder="estetica-avancada"
            />
            <Form.Text className="text-muted">
              Será usado na URL: {slug}.modelo.com.br
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Por favor, informe o slug.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do tenant..."
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Domínio Padrão</Form.Label>
            <Form.Control
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="estetica.modelo.com.br"
            />
            <Form.Text className="text-muted">
              Domínio no formato: tenant.modelo.com.br
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Domínio Customizado</Form.Label>
            <Form.Control
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="cursos.esteticaavancada.com.br"
            />
            <Form.Text className="text-muted">
              Domínio personalizado do cliente (opcional)
            </Form.Text>
          </Form.Group>

          <hr className="my-5" />
          <h5 className="mb-4">Configurações de Email (Resend)</h5>

          <Form.Group className="mb-5">
            <Form.Label>Resend API Key</Form.Label>
            <Form.Control
              type="password"
              value={mailResendApiKey}
              onChange={(e) => setMailResendApiKey(e.target.value)}
              placeholder="re_xxxxxxxxxxxxx"
            />
            <Form.Text className="text-muted">
              API Key do Resend para envio de emails automáticos. Deixe em branco para usar a chave global.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Email Remetente Padrão</Form.Label>
            <Form.Control
              type="email"
              value={mailDefaultSender}
              onChange={(e) => setMailDefaultSender(e.target.value)}
              placeholder="noreply@meusite.com"
            />
            <Form.Text className="text-muted">
              Email usado como remetente nos emails automáticos do sistema.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Nome do Remetente Padrão</Form.Label>
            <Form.Control
              type="text"
              value={mailDefaultSenderName}
              onChange={(e) => setMailDefaultSenderName(e.target.value)}
              placeholder="Minha Plataforma"
            />
            <Form.Text className="text-muted">
              Nome exibido como remetente nos emails automáticos.
            </Form.Text>
          </Form.Group>
        </div>

        {/* Coluna Direita - Configurações */}
        <div className="col-md-6">
          <h3 className="mb-4">Configurações</h3>

          <Form.Group className="mb-5">
            <Form.Label className="required">Email de Contato</Form.Label>
            <Form.Control
              required
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="contato@esteticaavancada.com.br"
            />
            <Form.Control.Feedback type="invalid">
              Por favor, informe um email válido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Telefone de Contato</Form.Label>
            <Form.Control
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="(11) 99999-9999"
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label className="required">Plano</Form.Label>
            <Form.Select
              required
              value={plan}
              onChange={(e) => setPlan(e.target.value as Tenant['plan'])}
            >
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label className="required">Status Inicial</Form.Label>
            <Form.Select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value as Tenant['status'])}
            >
              <option value="trial">Trial (7 dias)</option>
              <option value="active">Ativo</option>
              <option value="suspended">Suspenso</option>
            </Form.Select>
          </Form.Group>

          <h4 className="mb-3 mt-6">Branding - Logos</h4>
          <p className="text-muted mb-4">
            Faça upload dos logos ou informe URLs. Se deixar vazio, será usado o logo principal como fallback.
          </p>

          {/* Logo Principal */}
          <Form.Group className="mb-5">
            <Form.Label>Logo Principal (Light Mode)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0];
                if (file) setLogoFile(file);
              }}
              className="mb-2"
            />
            <Form.Control
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="Ou cole a URL do logo"
              className="mb-2"
            />
            {(logo || logoFile) && (
              <div className="mt-2">
                <img
                  src={logoFile ? URL.createObjectURL(logoFile) : getTenantFileUrl(logo, { domain, customDomain })}
                  alt="Preview"
                  style={{ maxHeight: '60px', border: '1px solid #ddd', padding: '5px' }}
                />
              </div>
            )}
            <Form.Text className="text-muted">
              Usado por padrão em todos os lugares se os outros estiverem vazios
            </Form.Text>
          </Form.Group>

          {/* Logo Dark */}
          <Form.Group className="mb-5">
            <Form.Label>Logo Dark Mode (opcional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0];
                if (file) setLogoDarkFile(file);
              }}
              className="mb-2"
            />
            <Form.Control
              type="text"
              value={logoDark}
              onChange={(e) => setLogoDark(e.target.value)}
              placeholder="Ou cole a URL do logo dark"
              className="mb-2"
            />
            {(logoDark || logoDarkFile) && (
              <div className="mt-2" style={{ backgroundColor: '#1e1e2d', padding: '10px' }}>
                <img
                  src={logoDarkFile ? URL.createObjectURL(logoDarkFile) : getTenantFileUrl(logoDark, { domain, customDomain })}
                  alt="Preview Dark"
                  style={{ maxHeight: '60px', border: '1px solid #555', padding: '5px' }}
                />
              </div>
            )}
            <Form.Text className="text-muted">
              Se vazio, usa o logo principal
            </Form.Text>
          </Form.Group>

          {/* Logo Mini */}
          <Form.Group className="mb-5">
            <Form.Label>Logo Mini (Sidebar Minimizada - opcional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0];
                if (file) setLogoMiniFile(file);
              }}
              className="mb-2"
            />
            <Form.Control
              type="text"
              value={logoMini}
              onChange={(e) => setLogoMini(e.target.value)}
              placeholder="Ou cole a URL do logo mini"
              className="mb-2"
            />
            {(logoMini || logoMiniFile) && (
              <div className="mt-2">
                <img
                  src={logoMiniFile ? URL.createObjectURL(logoMiniFile) : getTenantFileUrl(logoMini, { domain, customDomain })}
                  alt="Preview Mini"
                  style={{ maxHeight: '40px', border: '1px solid #ddd', padding: '5px' }}
                />
              </div>
            )}
            <Form.Text className="text-muted">
              Se vazio, usa o logo principal
            </Form.Text>
          </Form.Group>

          {/* Logo Mini Dark */}
          <Form.Group className="mb-5">
            <Form.Label>Logo Mini Dark (Sidebar Minimizada Dark Mode - opcional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e: any) => {
                const file = e.target.files?.[0];
                if (file) setLogoMiniDarkFile(file);
              }}
              className="mb-2"
            />
            <Form.Control
              type="text"
              value={logoMiniDark}
              onChange={(e) => setLogoMiniDark(e.target.value)}
              placeholder="Ou cole a URL do logo mini dark"
              className="mb-2"
            />
            {(logoMiniDark || logoMiniDarkFile) && (
              <div className="mt-2" style={{ backgroundColor: '#1e1e2d', padding: '10px' }}>
                <img
                  src={logoMiniDarkFile ? URL.createObjectURL(logoMiniDarkFile) : getTenantFileUrl(logoMiniDark, { domain, customDomain })}
                  alt="Preview Mini Dark"
                  style={{ maxHeight: '40px', border: '1px solid #555', padding: '5px' }}
                />
              </div>
            )}
            <Form.Text className="text-muted">
              Fallback: logoMini → logoDark → logo
            </Form.Text>
          </Form.Group>

          <h4 className="mb-3 mt-6">Cores</h4>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-5">
                <Form.Label>Cor Primária</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="me-2"
                    style={{ width: '60px' }}
                  />
                  <Form.Control
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#3699FF"
                  />
                </div>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-5">
                <Form.Label>Cor Secundária</Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="me-2"
                    style={{ width: '60px' }}
                  />
                  <Form.Control
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    placeholder="#F1416C"
                  />
                </div>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-6">
        <Button variant="light" onClick={handleClose} className="me-3" disabled={uploading}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit" disabled={uploading}>
          {uploading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Fazendo upload...
            </>
          ) : (
            "Criar Tenant"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default Create;
