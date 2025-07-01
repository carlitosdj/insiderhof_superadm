import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { LPFeature } from "../../../../store/ducks/dlpfeatures/types";
import { createLPFeatureRequest } from "../../../../store/ducks/dlpfeatures/actions";
import { CKEditor } from "ckeditor4-react";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  lpSessionId: number;
}

const Create = ({ handleClose, lpSessionId }: handleCloseProps) => {
  console.log("Create LPFeature component mounted with lpSessionId:", lpSessionId);
  
  const [config, setConfig] = useState({
    number: "",
    title: "",
    description: "",
    delay: "",
    image: "",
    video: "",
  });
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("1");
  const [validated, setValidated] = useState(false);
  const [ckEditor, setCkEditor] = useState(true);

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  const handleConfigChange = (key: string, value: string) => {
    console.log(`handleConfigChange: ${key} = "${value}"`);
    setConfig((prev) => {
      const newConfig = { ...prev, [key]: value };
      console.log("New config:", newConfig);
      return newConfig;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    console.log("=== handleSubmit LPFeature ===");
    console.log("Form validity:", form.checkValidity());
    console.log("lpSessionId:", lpSessionId);
    console.log("Config:", config);
    console.log("Order:", order);
    console.log("Status:", status);
    
    // Verifica se tem lpSessionId
    if (!lpSessionId) {
      console.log("Form validation failed - lpSessionId is required");
      event.stopPropagation();
      return;
    }
    
    const isValid = form.checkValidity();
    console.log("Form validity check:", isValid);
    if (!isValid) {
      console.log("Form validation failed - HTML5 validation failed");
      event.stopPropagation();
      return;
    }
    setValidated(true);

    // Remove keys with empty values from config
    const filteredConfig = Object.fromEntries(
      Object.entries(config).filter(([_, value]) => value && value !== "")
    );

    console.log("Filtered config:", filteredConfig);

    // Verifica se pelo menos um campo de configuração está preenchido
    if (Object.keys(filteredConfig).length === 0) {
      console.log("Form validation failed - at least one config field is required");
      event.stopPropagation();
      return;
    }

    const item: LPFeature = {
      lpSessionId: Number(lpSessionId),
      order,
      status,
      config: JSON.stringify(filteredConfig),
    };
    
    console.log("Dispatching item:", item);
    console.log("Item JSON:", JSON.stringify(item, null, 2));
    console.log("Item lpSessionId:", item.lpSessionId, "type:", typeof item.lpSessionId);
    console.log("Item order:", item.order, "type:", typeof item.order);
    console.log("Item status:", item.status, "type:", typeof item.status);
    
    try {
      dispatch(createLPFeatureRequest(item));
      console.log("Dispatch completed");
      handleClose();
    } catch (error) {
      console.error("Error dispatching action:", error);
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
            <Form.Group controlId="formStatus">
              <Form.Label className="fw-bold fs-6 mb-5">Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              >
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor informe o status
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formNumber">
              <Form.Label className="fw-bold fs-6 mb-5">Número</Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o número da feature"
                value={config.number}
                onChange={(e) => handleConfigChange("number", e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o número
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formTitle">
              <Form.Label className="fw-bold fs-6 mb-5">Título</Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o título da feature"
                value={config.title}
                onChange={(e) => handleConfigChange("title", e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o título
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Descrição</Form.Label>
              {!ckEditor ? (
                <Form.Control
                  placeholder="Digite a descrição da feature"
                  value={config.description}
                  onChange={(e) =>
                    handleConfigChange("description", e.target.value)
                  }
                  className="form-control form-control-lg form-control-solid"
                  as="textarea"
                  rows={3}
                />
              ) : (
                <CKEditor
                  config={{ versionCheck: false }}
                  initData={config.description}
                  onChange={(e: any) =>
                    handleConfigChange("description", e.editor.getData())
                  }
                />
              )}
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDelay">
              <Form.Label className="fw-bold fs-6 mb-5">Delay (ms)</Form.Label>
              <Form.Control
                placeholder="Digite o delay em milissegundos"
                value={config.delay}
                onChange={(e) => handleConfigChange("delay", e.target.value)}
                className="form-control form-control-lg form-control-solid"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o delay
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formImage">
              <Form.Label className="fw-bold fs-6 mb-5">Imagem</Form.Label>
              <Form.Control
                placeholder="Digite o caminho da imagem"
                value={config.image}
                onChange={(e) => handleConfigChange("image", e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a imagem
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formVideo">
              <Form.Label className="fw-bold fs-6 mb-5">Vídeo</Form.Label>
              <Form.Control
                placeholder="Digite o caminho do vídeo"
                value={config.video}
                onChange={(e) => handleConfigChange("video", e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o vídeo
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formOrder">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder="Digite a ordem da feature"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="form-control form-control-lg form-control-solid"
                type="number"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br />
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
