import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTenantRequest } from "../../../../store/ducks/tenants/actions";
import { Tenant } from "../../../../store/ducks/tenants/types";
import { uploadFile } from "../../../../utils/uploadHelper";
import { getTenantFileUrl } from "../../../../utils/getApiUrl";

interface UpdateProps {
  handleClose: () => void;
  child: Tenant;
}

// Função para gerar slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const Update = ({ handleClose, child }: UpdateProps) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  console.log('🖼️ [Update] Tenant data:', {
    id: child.id,
    name: child.name,
    logo: child.logo,
    logoDark: child.logoDark,
    logoMini: child.logoMini,
    logoMiniDark: child.logoMiniDark,
  });

  // Dados básicos
  const [name, setName] = useState(child.name || "");
  const [slug, setSlug] = useState(child.slug || "");
  const [description, setDescription] = useState(child.description || "");

  // Domínios
  const [domain, setDomain] = useState(child.domain || "");
  const [customDomain, setCustomDomain] = useState(child.customDomain || "");

  // Contato
  const [contactEmail, setContactEmail] = useState(child.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(child.contactPhone || "");

  // Plano e status
  const [plan, setPlan] = useState<Tenant['plan']>(child.plan);
  const [status, setStatus] = useState<Tenant['status']>(child.status);

  // Branding
  const [logo, setLogo] = useState(child.logo || "");
  const [logoDark, setLogoDark] = useState(child.logoDark || "");
  const [logoMini, setLogoMini] = useState(child.logoMini || "");
  const [logoMiniDark, setLogoMiniDark] = useState(child.logoMiniDark || "");
  const [primaryColor, setPrimaryColor] = useState(child.primaryColor || "#3699FF");
  const [secondaryColor, setSecondaryColor] = useState(child.secondaryColor || "#F1416C");

  // Email Configuration
  const [mailResendApiKey, setMailResendApiKey] = useState(child.mailResendApiKey || "");
  const [mailDefaultSender, setMailDefaultSender] = useState(child.mailDefaultSender || "");
  const [mailDefaultSenderName, setMailDefaultSenderName] = useState(child.mailDefaultSenderName || "");

  // Upload states
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDarkFile, setLogoDarkFile] = useState<File | null>(null);
  const [logoMiniFile, setLogoMiniFile] = useState<File | null>(null);
  const [logoMiniDarkFile, setLogoMiniDarkFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
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
      // Upload logos se arquivos foram selecionados (com deleção automática dos antigos)
      let logoUrl = logo;
      let logoDarkUrl = logoDark;
      let logoMiniUrl = logoMini;
      let logoMiniDarkUrl = logoMiniDark;

      if (logoFile) {
        console.log('📤 Uploading logo...', { oldFile: child.logo, newFile: logoFile.name, tenantSlug: slug });
        const res = await uploadFile(logoFile, child.logo, logoFile.name, slug);
        console.log('✅ Logo uploaded:', res.data);
        logoUrl = res.data.filename;
      }
      if (logoDarkFile) {
        console.log('📤 Uploading logoDark...', { oldFile: child.logoDark, newFile: logoDarkFile.name, tenantSlug: slug });
        const res = await uploadFile(logoDarkFile, child.logoDark, logoDarkFile.name, slug);
        console.log('✅ LogoDark uploaded:', res.data);
        logoDarkUrl = res.data.filename;
      }
      if (logoMiniFile) {
        console.log('📤 Uploading logoMini...', { oldFile: child.logoMini, newFile: logoMiniFile.name, tenantSlug: slug });
        const res = await uploadFile(logoMiniFile, child.logoMini, logoMiniFile.name, slug);
        console.log('✅ LogoMini uploaded:', res.data);
        logoMiniUrl = res.data.filename;
      }
      if (logoMiniDarkFile) {
        console.log('📤 Uploading logoMiniDark...', { oldFile: child.logoMiniDark, newFile: logoMiniDarkFile.name, tenantSlug: slug });
        const res = await uploadFile(logoMiniDarkFile, child.logoMiniDark, logoMiniDarkFile.name, slug);
        console.log('✅ LogoMiniDark uploaded:', res.data);
        logoMiniDarkUrl = res.data.filename;
      }

      const updatedTenant: Tenant = {
        ...child,
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

      console.log('📝 Dispatching update:', updatedTenant);
      dispatch(updateTenantRequest(updatedTenant));
      handleClose();
    } catch (error: any) {
      console.error("❌ Erro completo:", error);
      console.error("❌ Erro response:", error.response);
      console.error("❌ Erro message:", error.message);
      console.error("❌ Erro stack:", error.stack);
      alert(`Erro ao fazer upload dos arquivos: ${error.response?.data?.message || error.message || 'Erro desconhecido'}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {child.id === 1 && (
        <Alert variant="warning" className="mb-5">
          <strong>Atenção:</strong> Este é o tenant InsiderHOF (ID=1). Algumas configurações críticas não podem ser alteradas.
        </Alert>
      )}

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
              disabled={child.id === 1}
            />
            <Form.Text className="text-muted">
              {child.id === 1
                ? "O slug do tenant principal não pode ser alterado"
                : `Será usado na URL: ${slug}.modelo.com.br`
              }
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
            <Form.Label className="required">Status</Form.Label>
            <Form.Select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value as Tenant['status'])}
              disabled={child.id === 1}
            >
              <option value="trial">Trial</option>
              <option value="active">Ativo</option>
              <option value="suspended">Suspenso</option>
              <option value="cancelled">Cancelado</option>
            </Form.Select>
            {child.id === 1 && (
              <Form.Text className="text-muted">
                O status do tenant principal não pode ser alterado
              </Form.Text>
            )}
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
                  src={logoFile ? URL.createObjectURL(logoFile) : getTenantFileUrl(logo, child)}
                  alt="Preview"
                  style={{ maxHeight: '60px', border: '1px solid #ddd', padding: '5px' }}
                  onLoad={() => console.log('✅ Logo image loaded:', logoFile ? 'from file' : getTenantFileUrl(logo, child))}
                  onError={(e) => console.error('❌ Logo image failed to load:', logoFile ? 'from file' : getTenantFileUrl(logo, child), e)}
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
                  src={logoDarkFile ? URL.createObjectURL(logoDarkFile) : getTenantFileUrl(logoDark, child)}
                  alt="Preview Dark"
                  style={{ maxHeight: '60px', border: '1px solid #555', padding: '5px' }}
                  onLoad={() => console.log('✅ LogoDark image loaded:', logoDarkFile ? 'from file' : getTenantFileUrl(logoDark, child))}
                  onError={(e) => console.error('❌ LogoDark image failed to load:', logoDarkFile ? 'from file' : getTenantFileUrl(logoDark, child), e)}
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
                  src={logoMiniFile ? URL.createObjectURL(logoMiniFile) : getTenantFileUrl(logoMini, child)}
                  alt="Preview Mini"
                  style={{ maxHeight: '40px', border: '1px solid #ddd', padding: '5px' }}
                  onLoad={() => console.log('✅ LogoMini image loaded:', logoMiniFile ? 'from file' : getTenantFileUrl(logoMini, child))}
                  onError={(e) => console.error('❌ LogoMini image failed to load:', logoMiniFile ? 'from file' : getTenantFileUrl(logoMini, child), e)}
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
                  src={logoMiniDarkFile ? URL.createObjectURL(logoMiniDarkFile) : getTenantFileUrl(logoMiniDark, child)}
                  alt="Preview Mini Dark"
                  style={{ maxHeight: '40px', border: '1px solid #555', padding: '5px' }}
                  onLoad={() => console.log('✅ LogoMiniDark image loaded:', logoMiniDarkFile ? 'from file' : getTenantFileUrl(logoMiniDark, child))}
                  onError={(e) => console.error('❌ LogoMiniDark image failed to load:', logoMiniDarkFile ? 'from file' : getTenantFileUrl(logoMiniDark, child), e)}
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
            "Salvar Alterações"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default Update;
