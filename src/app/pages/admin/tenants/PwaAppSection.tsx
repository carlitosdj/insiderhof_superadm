import React, { useEffect, useMemo, useState } from "react";
import { Form } from "react-bootstrap";

/** Mesmos padrões da API (api/src/pwa/pwa.service.ts) */
export const DEFAULT_PWA_BACKGROUND = "#151521";
const DEFAULT_PWA_THEME = "#0F1014";
const LIGHT_ICON_BACKGROUND = "#FFFFFF";

/**
 * Mesma regra da API para o fundo do ícone sem cor escolhida: mede a
 * luminosidade dos pixels visíveis da logo (logo escura → fundo branco).
 * null = não deu para medir (ex.: imagem de outro domínio sem CORS).
 */
const measureLuminance = (url: string): Promise<number | null> =>
  new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, 64, 64);
        const { data } = ctx.getImageData(0, 0, 64, 64);
        let sum = 0;
        let count = 0;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i + 3] < 128) continue;
          sum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          count++;
        }
        resolve(count ? sum / count : null);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
const SHORT_NAME_MAX = 12;
const MIN_ICON_SIZE = 512;

export interface PwaFields {
  pwaName: string;
  pwaShortName: string;
  pwaBackgroundColor: string;
  pwaThemeColor: string;
}

interface PwaAppSectionProps {
  tenantName: string;
  values: PwaFields;
  onChange: (changes: Partial<PwaFields>) => void;
  /** URL do ícone já salvo; vazio = o app usa a logo mini/logo como reserva */
  savedIconUrl: string;
  /** URL da logo usada como reserva quando não há ícone (só para a prévia) */
  fallbackLogoUrl: string;
  iconFile: File | null;
  onIconFileChange: (file: File | null) => void;
}

/**
 * Seção "App (PWA)" do cadastro do tenant: ícone, nomes e cores do app
 * instalável, com prévia de como fica no Android, no iPhone e na splash.
 * A API gera os ícones finais (api/src/pwa) com as mesmas proporções da prévia.
 */
const PwaAppSection = ({
  tenantName,
  values,
  onChange,
  savedIconUrl,
  fallbackLogoUrl,
  iconFile,
  onIconFileChange,
}: PwaAppSectionProps) => {
  const [iconError, setIconError] = useState("");

  const fileUrl = useMemo(() => (iconFile ? URL.createObjectURL(iconFile) : ""), [iconFile]);
  useEffect(() => () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
  }, [fileUrl]);

  const previewUrl = fileUrl || savedIconUrl || fallbackLogoUrl;
  const usingFallback = !fileUrl && !savedIconUrl;

  // Fundo do ícone: a cor escolhida; vazia, o que dá contraste com a logo (igual à API)
  const [autoIconBackground, setAutoIconBackground] = useState(DEFAULT_PWA_BACKGROUND);
  useEffect(() => {
    if (!previewUrl) return;
    let active = true;
    measureLuminance(previewUrl).then((luminance) => {
      if (active) {
        setAutoIconBackground(luminance !== null && luminance < 0.5 ? LIGHT_ICON_BACKGROUND : DEFAULT_PWA_BACKGROUND);
      }
    });
    return () => {
      active = false;
    };
  }, [previewUrl]);
  const iconBackground = values.pwaBackgroundColor || autoIconBackground;
  // A tela de abertura não muda com a logo: vazia, fica escura
  const splashBackground = values.pwaBackgroundColor || DEFAULT_PWA_BACKGROUND;
  const shortName = values.pwaShortName || tenantName;

  // O ícone precisa ser quadrado e grande o bastante para o 512px do Android
  const handleFile = (file?: File) => {
    setIconError("");
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.naturalWidth !== img.naturalHeight) {
        setIconError(`O ícone precisa ser quadrado (enviado: ${img.naturalWidth}×${img.naturalHeight}).`);
        onIconFileChange(null);
      } else if (img.naturalWidth < MIN_ICON_SIZE) {
        setIconError(`O ícone precisa ter pelo menos ${MIN_ICON_SIZE}×${MIN_ICON_SIZE}px (recomendado 1024).`);
        onIconFileChange(null);
      } else {
        onIconFileChange(file);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      setIconError("Não foi possível ler a imagem.");
      onIconFileChange(null);
    };
    img.src = url;
  };

  const colorField = (
    label: string,
    field: "pwaBackgroundColor" | "pwaThemeColor",
    fallback: string,
    help: string
  ) => (
    <Form.Group className="mb-5">
      <Form.Label>{label}</Form.Label>
      <div className="d-flex align-items-center">
        <Form.Control
          type="color"
          value={values[field] || fallback}
          onChange={(e) => onChange({ [field]: e.target.value })}
          className="me-2"
          style={{ width: "60px" }}
        />
        <Form.Control
          type="text"
          value={values[field]}
          onChange={(e) => onChange({ [field]: e.target.value })}
          placeholder={`Padrão: ${fallback}`}
        />
      </div>
      <Form.Text className="text-muted">{help}</Form.Text>
    </Form.Group>
  );

  const iconImage = (ratio: number) => (
    <img
      src={previewUrl}
      alt=""
      style={{
        width: `${ratio * 100}%`,
        height: `${ratio * 100}%`,
        objectFit: "contain",
      }}
    />
  );

  const label = (text: string) => (
    <div
      className="text-muted fs-8 mt-1 text-center text-truncate"
      style={{ maxWidth: "80px" }}
      title={text}
    >
      {text}
    </div>
  );

  return (
    <>
      <h4 className="mb-3 mt-6">App instalável (PWA)</h4>
      <p className="text-muted mb-4">
        Ícone e nome que o aluno vê ao instalar o portal no celular, tablet ou computador.
        Depois de instalado, o ícone praticamente não muda (no iPhone, só reinstalando):
        confira a prévia antes de divulgar.
      </p>

      <Form.Group className="mb-5">
        <Form.Label>Ícone do app</Form.Label>
        <Form.Control
          type="file"
          accept="image/png,image/webp,image/jpeg"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFile(e.target.files?.[0])}
          isInvalid={!!iconError}
          className="mb-2"
        />
        <Form.Control.Feedback type="invalid">{iconError}</Form.Control.Feedback>
        <Form.Text className="text-muted">
          PNG quadrado, 1024×1024 (mínimo 512). Símbolo centralizado, sem texto pequeno.
          {usingFallback && " Sem ícone cadastrado, o app usa a Logo Mini (ou a Logo principal) como reserva."}
        </Form.Text>
      </Form.Group>

      <div className="row">
        <div className="col-md-6">
          <Form.Group className="mb-5">
            <Form.Label>Nome curto</Form.Label>
            <Form.Control
              type="text"
              value={values.pwaShortName}
              maxLength={SHORT_NAME_MAX}
              onChange={(e) => onChange({ pwaShortName: e.target.value })}
              placeholder={tenantName.slice(0, SHORT_NAME_MAX)}
            />
            <Form.Text className="text-muted">
              Embaixo do ícone · {values.pwaShortName.length}/{SHORT_NAME_MAX}
            </Form.Text>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-5">
            <Form.Label>Nome completo</Form.Label>
            <Form.Control
              type="text"
              value={values.pwaName}
              onChange={(e) => onChange({ pwaName: e.target.value })}
              placeholder={tenantName}
            />
            <Form.Text className="text-muted">Na instalação e na splash. Vazio = nome do tenant.</Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          {colorField(
            "Cor de fundo do app",
            "pwaBackgroundColor",
            DEFAULT_PWA_BACKGROUND,
            "Fundo da splash e do ícone. Vazio: splash escura e ícone com fundo automático (branco para logo escura)"
          )}
        </div>
        <div className="col-md-6">
          {colorField(
            "Cor da barra do sistema (tema escuro)",
            "pwaThemeColor",
            DEFAULT_PWA_THEME,
            "Vazio = preto (cor do header). No tema claro a barra fica branca, como o header"
          )}
        </div>
      </div>

      {previewUrl && (
        <div className="d-flex flex-wrap align-items-end gap-8 p-5 mb-5 rounded bg-light">
          {/* Android: ícone maskable recortado em círculo (zona segura de 60%) */}
          <div className="d-flex flex-column align-items-center">
            <div
              className="d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: 64, height: 64, borderRadius: "50%", backgroundColor: iconBackground }}
            >
              {iconImage(0.6)}
            </div>
            {label(shortName)}
            <div className="fs-9 text-gray-500">Android</div>
          </div>

          {/* iPhone/iPad: cantos arredondados, ícone a 80% */}
          <div className="d-flex flex-column align-items-center">
            <div
              className="d-flex align-items-center justify-content-center overflow-hidden"
              style={{ width: 64, height: 64, borderRadius: "22%", backgroundColor: iconBackground }}
            >
              {iconImage(0.8)}
            </div>
            {label(shortName)}
            <div className="fs-9 text-gray-500">iPhone/iPad</div>
          </div>

          {/* Splash do Android: cor de fundo + ícone + nome */}
          <div className="d-flex flex-column align-items-center">
            <div
              className="d-flex flex-column align-items-center justify-content-center rounded border border-gray-400"
              style={{ width: 90, height: 160, backgroundColor: splashBackground }}
            >
              <div style={{ width: 40, height: 40 }} className="d-flex align-items-center justify-content-center">
                {iconImage(1)}
              </div>
              <div
                className="fs-9 mt-2 text-center text-truncate px-1"
                style={{ color: "#fff", maxWidth: "86px" }}
              >
                {values.pwaName || tenantName}
              </div>
            </div>
            <div className="fs-9 text-gray-500 mt-1">Abertura (Android)</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PwaAppSection;
