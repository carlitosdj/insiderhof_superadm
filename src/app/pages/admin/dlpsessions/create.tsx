import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";


import momentDurationFormatSetup from "moment-duration-format";
import { LPSession } from "../../../../store/ducks/dlpsessions/types";
import { createLPSessionRequest } from "../../../../store/ducks/dlpsessions/actions";


const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  lpId: number;
}

const Create = ({ handleClose, lpId }: handleCloseProps) => {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [delay, setDelay] = useState("");
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

    //if (title) {
      const item: LPSession = {
        lpId,
        type,
        name,
        title,
        subtitle,
        delay,
        order,
        status
      };
      console.log("item", item);
      dispatch(createLPSessionRequest(item));
      handleClose();
    //}
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
            
            <Form.Group controlId="formName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o nome da sessão"
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formTitle">
              <Form.Label className="fw-bold fs-6 mb-5">
                Título
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder="Digite o título da sessão"
                //required
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o título
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formSubtitle">
              <Form.Label className="fw-bold fs-6 mb-5">Subtítulo</Form.Label>
              <Form.Control
                placeholder="Digite o subtítulo da sessão"
                value={subtitle}
                onChange={(e: any) => setSubtitle(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                as="textarea"
                rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o subtítulo
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formType">
              <Form.Label className="fw-bold fs-6 mb-5">Tipo</Form.Label>
              <Form.Control
                placeholder="Digite o tipo da sessão"
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o tipo
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDelay">
              <Form.Label className="fw-bold fs-6 mb-5">Delay (ms)</Form.Label>
              <Form.Control
                placeholder="Digite o delay em milissegundos"
                value={delay}
                onChange={(e: any) => setDelay(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                type="text"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o delay
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formOrder">
              <Form.Label className="fw-bold fs-6 mb-5">Ordem</Form.Label>
              <Form.Control
                placeholder="Digite a ordem da sessão"
                value={order}
                onChange={(e: any) => setOrder(Number(e.target.value))}
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
      {/* Deixar o button fora do form.. */}
    </>
  );
};
export default Create;
