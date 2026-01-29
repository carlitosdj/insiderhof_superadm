import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { LP } from "../../../../store/ducks/dlps/types";
import { createLPRequest } from "../../../../store/ducks/dlps/actions";

import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
  launchPhaseId: number;
}

const Create = ({ handleClose, launchPhaseId }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [layout, setLayout] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("1");
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (name) {
      const item: LP = {
        launchPhaseId,
        name,
        slug,
        description,
        layout,
        order,
        status,
      };
      console.log("item", item);
      dispatch(createLPRequest(item));
      handleClose();
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
            <Form.Group controlId="formName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o nome da landing page"
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formSlug">
              <Form.Label className="fw-bold fs-6 mb-5">Slug</Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o slug da landing page"
                value={slug}
                onChange={(e: any) => setSlug(e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o slug
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Descrição</Form.Label>
              <Form.Control
                placeholder="Digite a descrição da landing page"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                as="textarea"
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formOrder">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder="Digite a ordem da landing page"
                value={order}
                onChange={(e: any) => setOrder(Number(e.target.value))}
                className="form-control form-control-lg form-control-solid"
                type="number"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formLayout">
              <Form.Label className="fw-bold fs-6 mb-5">Layout</Form.Label>
              <Form.Control
                as="select"
                value={layout}
                onChange={(e: any) => setLayout(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              >
                <option value="">Selecione um layout</option>
                <option value="halo">Halo (padrão)</option>
                <option value="halo-wise">Halo Wise (Sábio)</option>
                <option value="halo-amber">Halo Amber</option>
                <option value="halo-green">Halo Green</option>
                <option value="halo-orange">Halo Orange</option>
                <option value="halo-rose">Halo Rose</option>
                <option value="halo-sky">Halo Sky</option>
                <option value="halo-slate">Halo Slate</option>
                <option value="clean">Clean</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Por favor selecione um layout
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
