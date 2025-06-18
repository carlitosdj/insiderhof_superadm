import React, { useState, useCallback, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { LPSession } from "../../../../store/ducks/dlpsessions/types";
import { createLPSessionRequest } from "../../../../store/ducks/dlpsessions/actions";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Session type enum
enum SessionType {
  HERO = "hero",
  FEATURE = "feature",
  PRODUCTS = "products",
  INVESTMENT = "investment",
  FAQ = "faq",
  ABOUT = "about",
  BUTTON = "button",
}

// Config key enum
enum ConfigKey {
  TITLE = "title",
  SUBTITLE = "subtitle",
  BTN_TEXT = "btnText",
  BTNTALK_TEXT = "btntalkText",
  BTNTALK_URL = "btntalkUrl",
  VIDEO_URL = "videoUrl",
}

// Session type options for select
const SESSION_TYPE_OPTIONS = [
  { value: SessionType.HERO, label: "Hero" },
  { value: SessionType.FEATURE, label: "Recursos" },
  { value: SessionType.PRODUCTS, label: "Produtos" },
  { value: SessionType.INVESTMENT, label: "Investimento" },
  { value: SessionType.FAQ, label: "FAQ" },
  { value: SessionType.ABOUT, label: "Sobre" },
  { value: SessionType.BUTTON, label: "Botão" },
];

// Mapping of allowed configurations per session type
const ALLOWED_CONFIGS_PER_TYPE: Record<SessionType, ConfigKey[]> = {
  [SessionType.HERO]: [
    ConfigKey.TITLE,
    ConfigKey.SUBTITLE,
    ConfigKey.BTN_TEXT,
    ConfigKey.BTNTALK_TEXT,
    ConfigKey.BTNTALK_URL,
    ConfigKey.VIDEO_URL,
  ],
  [SessionType.FEATURE]: [ConfigKey.TITLE, ConfigKey.SUBTITLE],
  [SessionType.PRODUCTS]: [ConfigKey.TITLE, ConfigKey.SUBTITLE],
  [SessionType.INVESTMENT]: [ConfigKey.TITLE, ConfigKey.SUBTITLE],
  [SessionType.FAQ]: [ConfigKey.TITLE, ConfigKey.SUBTITLE],
  [SessionType.ABOUT]: [ConfigKey.TITLE, ConfigKey.SUBTITLE],
  [SessionType.BUTTON]: [ConfigKey.BTN_TEXT, ConfigKey.BTNTALK_TEXT, ConfigKey.BTNTALK_URL],
};

// Mapping of required fields per session type
const REQUIRED_CONFIGS_PER_TYPE: Record<SessionType, ConfigKey[]> = {
  [SessionType.HERO]: [
    ConfigKey.TITLE,
    ConfigKey.SUBTITLE,
    ConfigKey.BTN_TEXT,
  ],
  [SessionType.FEATURE]: [ConfigKey.TITLE],
  [SessionType.PRODUCTS]: [ConfigKey.TITLE],
  [SessionType.INVESTMENT]: [ConfigKey.TITLE],
  [SessionType.FAQ]: [ConfigKey.TITLE],
  [SessionType.ABOUT]: [ConfigKey.TITLE],
  [SessionType.BUTTON]: [ConfigKey.BTN_TEXT],
};

// Config key options mapping
const CONFIG_KEY_LABELS: Record<ConfigKey, string> = {
  [ConfigKey.TITLE]: "Título",
  [ConfigKey.SUBTITLE]: "Subtítulo",
  [ConfigKey.BTN_TEXT]: "Texto do Botão CTA",
  [ConfigKey.BTNTALK_TEXT]: "Texto do Botão Falar Conosco",
  [ConfigKey.BTNTALK_URL]: "URL do Botão Falar Conosco",
  [ConfigKey.VIDEO_URL]: "URL do Vídeo",
};

interface handleCloseProps {
  handleClose: () => void;
  lpId: number;
}

interface ConfigItem {
  key: ConfigKey;
  value: string;
}

interface ConfigKeyOption {
  value: ConfigKey;
  label: string;
}

const Create = ({ handleClose, lpId }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState<SessionType | "">("");
  const [status, setStatus] = useState("1");
  const [validated, setValidated] = useState(false);
  const [configValues, setConfigValues] = useState<Record<ConfigKey, string>>({
    [ConfigKey.TITLE]: "",
    [ConfigKey.SUBTITLE]: "",
    [ConfigKey.BTN_TEXT]: "",
    [ConfigKey.BTNTALK_TEXT]: "",
    [ConfigKey.BTNTALK_URL]: "",
    [ConfigKey.VIDEO_URL]: "",
  });

  // Cache para armazenar as configurações de cada tipo
  const [configCache, setConfigCache] = useState<
    Record<SessionType, Record<ConfigKey, string>>
  >({
    [SessionType.HERO]: {} as Record<ConfigKey, string>,
    [SessionType.FEATURE]: {} as Record<ConfigKey, string>,
    [SessionType.PRODUCTS]: {} as Record<ConfigKey, string>,
    [SessionType.INVESTMENT]: {} as Record<ConfigKey, string>,
    [SessionType.FAQ]: {} as Record<ConfigKey, string>,
    [SessionType.ABOUT]: {} as Record<ConfigKey, string>,
    [SessionType.BUTTON]: {} as Record<ConfigKey, string>,
  });

  // Handler para mudança de tipo
  const handleTypeChange = (newType: SessionType | "") => {
    console.log("=== handleTypeChange ===");
    console.log("Current type:", type);
    console.log("New type:", newType);
    console.log("Current values:", configValues);

    // Se não selecionou tipo, limpa os valores mas mantém o cache
    if (!newType) {
      const emptyValues: Record<ConfigKey, string> = {
        [ConfigKey.TITLE]: "",
        [ConfigKey.SUBTITLE]: "",
        [ConfigKey.BTN_TEXT]: "",
        [ConfigKey.BTNTALK_TEXT]: "",
        [ConfigKey.BTNTALK_URL]: "",
        [ConfigKey.VIDEO_URL]: "",
      };

      setConfigValues(emptyValues);
      console.log("Cleared values but kept cache");
      setType("");
      return;
    }

    // Salva os valores atuais no cache antes de mudar
    if (type) {
      setConfigCache((prev) => ({
        ...prev,
        [type]: { ...configValues },
      }));
      console.log("Salvou no cache do tipo", type, ":", configValues);
    }

    // Pega os valores permitidos para o novo tipo
    const allowedKeys = ALLOWED_CONFIGS_PER_TYPE[newType];
    console.log("Campos permitidos para", newType, ":", allowedKeys);

    // Pega os valores do cache do novo tipo
    const cachedValues = configCache[newType] || {};
    console.log("Valores em cache para", newType, ":", cachedValues);

    // Prepara os novos valores
    const newConfigs: Record<ConfigKey, string> = {
      [ConfigKey.TITLE]: "",
      [ConfigKey.SUBTITLE]: "",
      [ConfigKey.BTN_TEXT]: "",
      [ConfigKey.BTNTALK_TEXT]: "",
      [ConfigKey.BTNTALK_URL]: "",
      [ConfigKey.VIDEO_URL]: "",
    };

    // Para cada campo permitido no novo tipo
    allowedKeys.forEach((key) => {
      if (cachedValues[key]) {
        // Se tem valor no cache, usa ele
        newConfigs[key] = cachedValues[key];
        console.log("Usando valor do cache para", key, ":", cachedValues[key]);
      } else if (configValues[key]) {
        // Se não tem no cache mas tem valor atual, mantém
        newConfigs[key] = configValues[key];
        console.log("Mantendo valor atual para", key, ":", configValues[key]);
      }
    });

    console.log("Novos valores:", newConfigs);

    // Atualiza os valores
    setConfigValues(newConfigs);
    setType(newType);
  };

  // Função para atualizar um valor de configuração
  const handleConfigChange = (key: ConfigKey, value: string) => {
    const newValues = {
      ...configValues,
      [key]: value,
    };
    setConfigValues(newValues);

    // Atualiza o cache imediatamente se houver um tipo selecionado
    if (type && type in SessionType) {
      const updatedCache = {
        ...configCache,
        [type]: {
          ...configCache[type as SessionType],
          [key]: value,
        },
      };
      setConfigCache(updatedCache);
      console.log(
        "Updated cache for",
        type,
        ":",
        updatedCache[type as SessionType]
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log("=== handleSubmit ===");
    console.log("Form validity:", form.checkValidity());
    console.log("Type:", type);
    console.log("Name:", name);
    console.log("Config Values:", configValues);

    // Primeiro seta o validated para mostrar os erros
    setValidated(true);

    // Verifica se tem tipo selecionado e se o form é válido
    if (!type || form.checkValidity() === false) {
      console.log("Form validation failed - type or form invalid");
      event.stopPropagation();
      return;
    }

    // Verifica se tem nome
    if (!name || name.trim() === '') {
      console.log("Form validation failed - name is required");
      event.stopPropagation();
      return;
    }

    // Verifica se todos os campos obrigatórios do tipo atual estão preenchidos
    const requiredKeys = REQUIRED_CONFIGS_PER_TYPE[type as SessionType];
    console.log("Required keys for type", type, ":", requiredKeys);
    
    const missingRequired = requiredKeys.filter(key => !configValues[key]);
    console.log("Missing required fields:", missingRequired);
    
    if (missingRequired.length > 0) {
      console.log("Form validation failed - missing required fields");
      event.stopPropagation();
      return;
    }

    // Filtra apenas as configurações permitidas para o tipo selecionado
    const allowedKeys = ALLOWED_CONFIGS_PER_TYPE[type as SessionType];
    console.log("Allowed keys for type", type, ":", allowedKeys);
    
    const filteredConfig = Object.entries(configValues)
      .filter(([key]) => allowedKeys.includes(key as ConfigKey))
      .filter(([key, value]) => value && value.trim() !== '') // Remove campos vazios
      .reduce((acc, [key, value]) => {
        acc[key as ConfigKey] = value;
        return acc;
      }, {} as Record<ConfigKey, string>);

    console.log("Filtered config:", filteredConfig);

    const item: LPSession = {
      lpId,
      name,
      order: 0,
      type: type as SessionType,
      status,
      config: JSON.stringify(filteredConfig),
    };

    console.log("Dispatching item:", item);
    
    try {
      dispatch(createLPSessionRequest(item));
      console.log("Dispatch completed");
      handleClose();
    } catch (error) {
      console.error("Error dispatching action:", error);
    }
  };

  // Função para renderizar os campos de configuração baseado no tipo selecionado
  const renderConfigFields = () => {
    if (!type) return null;

    const allowedKeys = ALLOWED_CONFIGS_PER_TYPE[type as SessionType];
    const requiredKeys = REQUIRED_CONFIGS_PER_TYPE[type as SessionType];
    console.log("Rendering fields for type", type);
    console.log("Current values:", configValues);

    return allowedKeys.map((key) => (
      <Form.Group key={key} className="mb-4">
        <Form.Label className={requiredKeys.includes(key) ? "required fw-bold fs-6" : "fw-bold fs-6"}>
          {CONFIG_KEY_LABELS[key]}
        </Form.Label>
        <Form.Control
          className="form-control form-control-lg form-control-solid"
          placeholder={`Digite ${CONFIG_KEY_LABELS[key].toLowerCase()}`}
          value={configValues[key] || ""}
          onChange={(e) => handleConfigChange(key, e.target.value)}
          required={requiredKeys.includes(key)}
        />
        <Form.Control.Feedback type="invalid">
          Por favor informe {CONFIG_KEY_LABELS[key].toLowerCase()}
        </Form.Control.Feedback>
      </Form.Group>
    ));
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
            <Form.Group controlId="formName" className="mb-4">
              <Form.Label className="required fw-bold fs-6">Nome</Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o nome da sessão"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formType" className="mb-4">
              <Form.Label className="required fw-bold fs-6">Tipo</Form.Label>
              <Form.Select
                value={type}
                onChange={(e) =>
                  handleTypeChange(e.target.value as SessionType | "")
                }
                className="form-control form-control-lg form-control-solid"
                required
              >
                <option value="">Selecione o tipo da sessão</option>
                {SESSION_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor selecione o tipo
              </Form.Control.Feedback>
            </Form.Group>

            {type && (
              <>
                <br />
                <div className="config-fields">
                  <h4 className="fw-bold fs-6 mb-4">Configurações</h4>
                  {renderConfigFields()}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="d-flex flex-stack pt-2 justify-content-start py-lg-2 px-lg-6">
          <Button
            size="sm"
            variant="primary"
            type="submit"
            className="btn btn-lg btn-primary"
          >
            Salvar
            <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
          </Button>
        </div>
      </Form>
    </>
  );
};
export default Create;
