import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { KTIcon } from "../../../../_metronic/helpers";
import { Class } from "../../../../store/ducks/dclass/types";
import { ClassExtra } from "../../../../store/ducks/dclassextra/types";
import { createClassExtraRequest } from "../../../../store/ducks/dclassextra/actions";

interface createLinkProps {
  handleClose: () => void;
  classId: number;
}

const CreateLink = ({ handleClose, classId }: createLinkProps) => {
  const [key, setKey] = useState("link");
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (key && value) {
      const extra: ClassExtra = {
        key,
        value,
        classId,
        name,
      };
      console.log("extra to save:", extra);
      dispatch(createClassExtraRequest(extra));
      handleClose();
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
          <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome de exibição
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do link
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={key}
                onChange={(e: any) => setKey(e.target.value)}
                disabled
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Link (url)
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                // as="textarea" rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
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
export default CreateLink;
