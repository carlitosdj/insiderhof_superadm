import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { createComponentRequest } from "../../../../store/ducks/component/actions";
import { Component as Comp } from "../../../../store/ducks/component/types";
import { ApplicationState } from "../../../../store";
import { CKEditor } from "ckeditor4-react";
import momentDurationFormatSetup from "moment-duration-format";
import { KTIcon } from "../../../../_metronic/helpers";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string;
};

interface handleCloseProps {
  handleClose: () => void;
}

const Create = ({ handleClose }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState("");
  const [orderby, setOrderby] = useState("");
  const [tags, setTags] = useState("");
  const [duration, setDuration] = useState("00:00:00");
  const [ckEditor, setCkEditor] = useState(false);

  const [validated, setValidated] = useState(false);
  const { id } = useParams<ParamTypes>();
  // const history = useHistory();
  const dispatch = useDispatch();
  const component = useSelector((state: ApplicationState) => state.component);

  console.log("Component inside - create", component);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (name) {
      var data = new Date();
      const component: Comp = {
        name,
        description,
        order,
        componentId: +id!,
        //createdAt: (data.getTime() / 1000).toString(),
        status: "1",
        duration: MOMENT.duration(duration).asSeconds(),
        tags,
        orderby,
      };
      console.log("component to save:", component);
      dispatch(createComponentRequest(component));
      handleClose();
      // history.goBack()
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do componente
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Button
              size="sm"
              className="btn btn-light-primary"
              onClick={() => setCkEditor(!ckEditor)}
            >
              <KTIcon iconName="arrow-mix" className="fs-2" />
              Trocar editor
            </Button>
            <br />
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Descrição</Form.Label>
              {!ckEditor ? (
                <Form.Control
                  placeholder=""
                  //required
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                  as="textarea"
                  rows={8}
                  className="form-control form-control-lg form-control-solid"
                />
              ) : (
                <CKEditor
                  config={{ versionCheck: false }}
                  initData={description}
                  onChange={(e: any) => setDescription(e.editor.getData())}
                />
              )}
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder=""
                value={order}
                onChange={(e: any) => setOrder(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Duração</Form.Label>
              <Form.Control
                placeholder=""
                value={duration}
                onChange={(e: any) => setDuration(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a duração
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Tags</Form.Label>
              <Form.Control
                placeholder=""
                value={tags}
                onChange={(e: any) => setTags(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a duração
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Orderby</Form.Label>
              <Form.Control
                placeholder=""
                value={orderby}
                onChange={(e: any) => setOrderby(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Informe o Orderby
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
      {/* Deixar o button fora do form.. */}
    </>
  );
};
export default Create;
