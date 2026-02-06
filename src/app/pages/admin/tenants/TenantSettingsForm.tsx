import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateTenantSettingsRequest } from "../../../../store/ducks/tenants/actions";
import { TenantSettings } from "../../../../store/ducks/tenants/types";

interface TenantSettingsFormProps {
  tenantId: number;
  settings: TenantSettings | null;
}

const TenantSettingsForm: React.FC<TenantSettingsFormProps> = ({
  tenantId,
  settings,
}) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Branding
  const [primaryColor, setPrimaryColor] = useState(settings?.primaryColor || '#3699FF');
  const [secondaryColor, setSecondaryColor] = useState(settings?.secondaryColor || '#F1416C');
  const [logo, setLogo] = useState(settings?.logo || '');
  const [favicon, setFavicon] = useState(settings?.favicon || '');

  // SEO
  const [seoTitle, setSeoTitle] = useState(settings?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(settings?.seoDescription || '');
  const [seoImage, setSeoImage] = useState(settings?.seoImage || '');
  const [seoKeywords, setSeoKeywords] = useState(settings?.seoKeywords || '');

  // Features
  const [enableComments, setEnableComments] = useState(settings?.enableComments ?? true);
  const [enableCertificates, setEnableCertificates] = useState(settings?.enableCertificates ?? true);
  const [enableSupport, setEnableSupport] = useState(settings?.enableSupport ?? true);
  const [enableEvents, setEnableEvents] = useState(settings?.enableEvents ?? false);

  // Custom Code
  const [customCss, setCustomCss] = useState(settings?.customCss || '');
  const [customJs, setCustomJs] = useState(settings?.customJs || '');
  const [customHeadHtml, setCustomHeadHtml] = useState(settings?.customHeadHtml || '');

  // Email
  const [smtpHost, setSmtpHost] = useState(settings?.smtpHost || '');
  const [smtpPort, setSmtpPort] = useState(settings?.smtpPort || 587);
  const [smtpUser, setSmtpUser] = useState(settings?.smtpUser || '');
  const [smtpPassword, setSmtpPassword] = useState('');
  const [fromEmail, setFromEmail] = useState(settings?.fromEmail || '');
  const [fromName, setFromName] = useState(settings?.fromName || '');
  const [mailResendApiKey, setMailResendApiKey] = useState(settings?.mailResendApiKey || '');
  const [mailDefaultSender, setMailDefaultSender] = useState(settings?.mailDefaultSender || '');
  const [mailDefaultSenderName, setMailDefaultSenderName] = useState(settings?.mailDefaultSenderName || '');

  useEffect(() => {
    if (settings) {
      setPrimaryColor(settings.primaryColor || '#3699FF');
      setSecondaryColor(settings.secondaryColor || '#F1416C');
      setLogo(settings.logo || '');
      setFavicon(settings.favicon || '');
      setSeoTitle(settings.seoTitle || '');
      setSeoDescription(settings.seoDescription || '');
      setSeoImage(settings.seoImage || '');
      setSeoKeywords(settings.seoKeywords || '');
      setEnableComments(settings.enableComments ?? true);
      setEnableCertificates(settings.enableCertificates ?? true);
      setEnableSupport(settings.enableSupport ?? true);
      setEnableEvents(settings.enableEvents ?? false);
      setCustomCss(settings.customCss || '');
      setCustomJs(settings.customJs || '');
      setCustomHeadHtml(settings.customHeadHtml || '');
      setSmtpHost(settings.smtpHost || '');
      setSmtpPort(settings.smtpPort || 587);
      setSmtpUser(settings.smtpUser || '');
      setFromEmail(settings.fromEmail || '');
      setFromName(settings.fromName || '');
      setMailResendApiKey(settings.mailResendApiKey || '');
      setMailDefaultSender(settings.mailDefaultSender || '');
      setMailDefaultSenderName(settings.mailDefaultSenderName || '');
    }
  }, [settings]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const updatedSettings: Partial<TenantSettings> = {
      primaryColor,
      secondaryColor,
      logo,
      favicon,
      seoTitle,
      seoDescription,
      seoImage,
      seoKeywords,
      enableComments,
      enableCertificates,
      enableSupport,
      enableEvents,
      customCss,
      customJs,
      customHeadHtml,
      smtpHost,
      smtpPort,
      smtpUser,
      fromEmail,
      fromName,
      mailDefaultSender,
      mailDefaultSenderName,
    };

    if (smtpPassword) {
      updatedSettings.smtpPassword = smtpPassword;
    }

    if (mailResendApiKey) {
      updatedSettings.mailResendApiKey = mailResendApiKey;
    }

    dispatch(updateTenantSettingsRequest(tenantId, updatedSettings));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      {saveSuccess && (
        <Alert variant="success" dismissible onClose={() => setSaveSuccess(false)}>
          Configurações salvas com sucesso!
        </Alert>
      )}

      {/* Branding */}
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="card-title">Branding</h3>
        </div>
        <div className="card-body">
          <Form.Group className="mb-5">
            <Form.Label>URL do Logo</Form.Label>
            <Form.Control
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://..."
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>URL do Favicon</Form.Label>
            <Form.Control
              type="url"
              value={favicon}
              onChange={(e) => setFavicon(e.target.value)}
              placeholder="https://..."
            />
          </Form.Group>

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

      {/* SEO */}
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="card-title">SEO</h3>
        </div>
        <div className="card-body">
          <Form.Group className="mb-5">
            <Form.Label>Título SEO</Form.Label>
            <Form.Control
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Meu Curso Online"
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Descrição SEO</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Descrição para motores de busca..."
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Imagem SEO (URL)</Form.Label>
            <Form.Control
              type="url"
              value={seoImage}
              onChange={(e) => setSeoImage(e.target.value)}
              placeholder="https://..."
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Keywords (separadas por vírgula)</Form.Label>
            <Form.Control
              type="text"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="curso, online, educação"
            />
          </Form.Group>
        </div>
      </div>

      {/* Features */}
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="card-title">Features Habilitadas</h3>
        </div>
        <div className="card-body">
          <Form.Check
            type="switch"
            label="Comentários"
            checked={enableComments}
            onChange={(e) => setEnableComments(e.target.checked)}
            className="mb-3"
          />
          <Form.Check
            type="switch"
            label="Certificados"
            checked={enableCertificates}
            onChange={(e) => setEnableCertificates(e.target.checked)}
            className="mb-3"
          />
          <Form.Check
            type="switch"
            label="Suporte"
            checked={enableSupport}
            onChange={(e) => setEnableSupport(e.target.checked)}
            className="mb-3"
          />
          <Form.Check
            type="switch"
            label="Eventos Presenciais"
            checked={enableEvents}
            onChange={(e) => setEnableEvents(e.target.checked)}
            className="mb-3"
          />
        </div>
      </div>

      {/* Email SMTP */}
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="card-title">Configurações de Email</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <Form.Group className="mb-5">
                <Form.Label>SMTP Host</Form.Label>
                <Form.Control
                  type="text"
                  value={smtpHost}
                  onChange={(e) => setSmtpHost(e.target.value)}
                  placeholder="smtp.gmail.com"
                />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-5">
                <Form.Label>SMTP Port</Form.Label>
                <Form.Control
                  type="number"
                  value={smtpPort}
                  onChange={(e) => setSmtpPort(Number(e.target.value))}
                  placeholder="587"
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-5">
            <Form.Label>SMTP User</Form.Label>
            <Form.Control
              type="text"
              value={smtpUser}
              onChange={(e) => setSmtpUser(e.target.value)}
              placeholder="usuario@gmail.com"
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>SMTP Password</Form.Label>
            <Form.Control
              type="password"
              value={smtpPassword}
              onChange={(e) => setSmtpPassword(e.target.value)}
              placeholder="Deixe em branco para manter a senha atual"
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Email De (From Email)</Form.Label>
            <Form.Control
              type="email"
              value={fromEmail}
              onChange={(e) => setFromEmail(e.target.value)}
              placeholder="noreply@meusite.com"
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Nome De (From Name)</Form.Label>
            <Form.Control
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              placeholder="Meu Curso Online"
            />
          </Form.Group>

          <hr className="my-5" />

          <h5 className="mb-4">Resend API Configuration</h5>
          <p className="text-muted mb-5">
            Configurações para envio de emails automáticos do sistema (recuperação de senha, comentários, etc).
          </p>

          <Form.Group className="mb-5">
            <Form.Label>Resend API Key</Form.Label>
            <Form.Control
              type="password"
              value={mailResendApiKey}
              onChange={(e) => setMailResendApiKey(e.target.value)}
              placeholder="re_xxxxxxxxxxxxx"
            />
            <Form.Text className="text-muted">
              Chave API do Resend. Deixe em branco para usar a chave global do sistema.
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
              Email usado como remetente nos emails automáticos (recuperação de senha, notificações, etc).
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
      </div>

      {/* Custom Code */}
      <div className="card mb-5">
        <div className="card-header">
          <h3 className="card-title">Código Customizado</h3>
        </div>
        <div className="card-body">
          <Alert variant="warning">
            <strong>Atenção:</strong> Apenas adicione código customizado se você souber o que está fazendo.
            Código malicioso pode comprometer a segurança do tenant.
          </Alert>

          <Form.Group className="mb-5">
            <Form.Label>Custom CSS</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={customCss}
              onChange={(e) => setCustomCss(e.target.value)}
              placeholder=".custom-class { color: red; }"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Custom JavaScript</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={customJs}
              onChange={(e) => setCustomJs(e.target.value)}
              placeholder="console.log('Custom JS');"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Group>

          <Form.Group className="mb-5">
            <Form.Label>Custom HTML no &lt;head&gt;</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={customHeadHtml}
              onChange={(e) => setCustomHeadHtml(e.target.value)}
              placeholder="<meta name='custom' content='value'>"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Group>
        </div>
      </div>

      {/* Botões */}
      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit" size="lg">
          Salvar Configurações
        </Button>
      </div>
    </Form>
  );
};

export default TenantSettingsForm;
