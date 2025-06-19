import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { LP } from "../../../../store/ducks/dlps/types";
import { updateLPRequest } from "../../../../store/ducks/dlps/actions";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: LP;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  // const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [slug, setSlug] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [order, setOrder] = useState<number | undefined>(0);
  const [status, setStatus] = useState<string>("1");
  const [layout, setLayout] = useState<string | undefined>("");

  useEffect(() => {
    setName(child.name);
    setSlug(child.slug);
    setDescription(child.description);
    setOrder(child.order);
    setStatus(child.status!);
    setLayout(child.layout);
  }, [child.name, child.slug, child.description, child.order, child.status, child.layout]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //console.log("submit", component.data.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (name) {
      const componentToUpdate: LP = {
        id: child.id,
        name,
        slug,
        description,
        layout,
        order,
        status: status!,
      };
      console.log("ver", componentToUpdate);
      dispatch(updateLPRequest(componentToUpdate));
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
                Por favor informe o nome da landing page
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formSlug">
              <Form.Label className="fw-bold fs-6 mb-5">Slug</Form.Label>
              <Form.Control
                placeholder="Digite o slug da landing page"
                value={slug}
                onChange={(e: any) => setSlug(e.target.value)}
                name="slug"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o slug da landing page
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Descrição</Form.Label>
              <Form.Control
                placeholder="Digite a descrição da landing page"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
                as="textarea"
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição da landing page
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formOrder">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder="Digite a ordem da landing page"
                value={order}
                onChange={(e: any) => setOrder(Number(e.target.value))}
                name="order"
                className="form-control form-control-lg form-control-solid"
                type="number"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem da landing page
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formLayout">
              <Form.Label className="fw-bold fs-6 mb-5">Layout</Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o slug da landing page"
                value={layout}
                onChange={(e: any) => setLayout(e.target.value)}
                
              />
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
