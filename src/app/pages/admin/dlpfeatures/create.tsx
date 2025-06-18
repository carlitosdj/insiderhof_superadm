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
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    // Remove keys with empty values from config
    const filteredConfig = Object.fromEntries(
      Object.entries(config).filter(([_, value]) => value && value !== "")
    );

    const item: LPFeature = {
      lpSessionId,
      order,
      status,
      config: JSON.stringify(filteredConfig),
    };
    dispatch(createLPFeatureRequest(item));
    handleClose();
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
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
                  onChange={(e) => handleConfigChange("description", e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                  as="textarea"
                  rows={3}
                />
              ) : (
                <CKEditor
                  config={{ versionCheck: false }}
                  initData={config.description}
                  onChange={(e: any) => handleConfigChange("description", e.editor.getData())}
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
