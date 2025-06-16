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
  // ✅ Removido undefined dos tipos - sempre strings/números
  const [number, setNumber] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [delay, setDelay] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");
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

  // ✅ Garantindo que todos os valores sejam sempre definidos
  useEffect(() => {
    if (child) {
      setNumber(child.number || "");
      setTitle(child.title || "");
      setDescription(child.description || "");
      setDelay(child.delay || "");
      setImage(child.image || "");
      setVideo(child.video || "");
      setOrder(child.order || 0);
      setStatus(child.status || "1");
    }
  }, [child]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const componentToUpdate: LPFeature = {
      id: child.id,
      number,
      title,
      description,
      delay,
      image,
      video,
      order,
      status,
    };
    console.log("ver", componentToUpdate);
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
                value={number} // ✅ Sempre string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.target.value)}
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
                value={title} // ✅ Sempre string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
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
                  value={description} // ✅ Sempre string
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
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
                    initData={description}
                    onChange={(e: any) => setDescription(e.editor.getData())}
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
                value={delay} // ✅ Sempre string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDelay(e.target.value)}
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
                value={image} // ✅ Sempre string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
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
                value={video} // ✅ Sempre string
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVideo(e.target.value)}
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
                value={order} // ✅ Sempre number
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrder(Number(e.target.value) || 0)}
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