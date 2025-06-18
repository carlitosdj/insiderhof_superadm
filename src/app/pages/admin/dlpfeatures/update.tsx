import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { LPFeature } from "../../../../store/ducks/dlpfeatures/types";
import { updateLPFeatureRequest } from "../../../../store/ducks/dlpfeatures/actions";
import { CKEditor } from "ckeditor4-react";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: LPFeature;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const editorRef = useRef(null);
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [config, setConfig] = useState({
    number: "",
    title: "",
    description: "",
    delay: "",
    image: "",
    video: "",
  });
  const [order, setOrder] = useState<number>(0);
  const [status, setStatus] = useState<string>("1");
  const [ckEditor, setCkEditor] = useState(true);
  const [shouldRenderEditor, setShouldRenderEditor] = useState(false);

  useEffect(() => {
    if (ckEditor) {
      const timer = setTimeout(() => {
        setShouldRenderEditor(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShouldRenderEditor(false);
    }
  }, [ckEditor]);

  useEffect(() => {
    if (child) {
      let configObj: any = {};
      if (child.config) {
        try {
          configObj = typeof child.config === 'string' ? JSON.parse(child.config) : child.config;
        } catch (e) {
          configObj = {};
        }
      }
      setConfig({
        number: configObj.number ?? "",
        title: configObj.title ?? "",
        description: configObj.description ?? "",
        delay: configObj.delay ?? "",
        image: configObj.image ?? "",
        video: configObj.video ?? "",
      });
      setOrder(child.order || 0);
      setStatus(child.status || "1");
    }
  }, [child]);

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

    const componentToUpdate: LPFeature = {
      id: child.id,
      order,
      status,
      config: JSON.stringify(filteredConfig),
    };
    dispatch(updateLPFeatureRequest(componentToUpdate));
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
                Por favor informe o número da feature
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formTitle">
              <Form.Label className="fw-bold fs-6 mb-5">Título</Form.Label>
              <Form.Control
                placeholder="Digite o título da feature"
                value={config.title}
                onChange={(e) => handleConfigChange("title", e.target.value)}
                name="title"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o título da feature
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
              ) : shouldRenderEditor ? (
                <div ref={editorRef}>
                  <CKEditor
                    key={`editor-${child?.id || "new"}`}
                    config={{
                      versionCheck: false,
                      startupFocus: false,
                      forcePasteAsPlainText: false,
                      removeDialogTabs: "link:advanced;link:target",
                    }}
                    initData={config.description}
                    onChange={(e: any) => handleConfigChange("description", e.editor.getData())}
                  />
                </div>
              ) : (
                <div>Carregando editor...</div>
              )}
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição da feature
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDelay">
              <Form.Label className="fw-bold fs-6 mb-5">Delay (ms)</Form.Label>
              <Form.Control
                placeholder="Digite o delay em milissegundos"
                value={config.delay}
                onChange={(e) => handleConfigChange("delay", e.target.value)}
                name="delay"
                className="form-control form-control-lg form-control-solid"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o delay da feature
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formImage">
              <Form.Label className="fw-bold fs-6 mb-5">Imagem</Form.Label>
              <Form.Control
                placeholder="Digite o caminho da imagem"
                value={config.image}
                onChange={(e) => handleConfigChange("image", e.target.value)}
                name="image"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a imagem da feature
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formVideo">
              <Form.Label className="fw-bold fs-6 mb-5">Vídeo</Form.Label>
              <Form.Control
                placeholder="Digite o caminho do vídeo"
                value={config.video}
                onChange={(e) => handleConfigChange("video", e.target.value)}
                name="video"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o vídeo da feature
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formOrder">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder="Digite a ordem da feature"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value) || 0)}
                name="order"
                className="form-control form-control-lg form-control-solid"
                type="number"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem da feature
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

export default Update;