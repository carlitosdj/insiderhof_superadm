import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import { ClassExtra } from "../../../../store/ducks/dclassextra/types";
import { createClassExtraRequest } from "../../../../store/ducks/dclassextra/actions";

import momentDurationFormatSetup from "moment-duration-format";
import { Class } from "../../../../store/ducks/dclass/types";
import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
  classId: number;
}

const Create = ({ handleClose, classId }: handleCloseProps) => {
  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [validated, setValidated] = useState(false);
  console.log("classItem", classId);

  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (key && value) {
      const classextra: ClassExtra = {
        key,
        value,
        name,
        classId,
      };
      dispatch(createClassExtraRequest(classextra));
      handleClose();
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Key
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder=""
                required
                value={key}
                onChange={(e: any) => setKey(e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Value
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                as="textarea"
                rows={8}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br />
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
          </div>
        </div>
        <div className="py-lg-2 px-lg-6">
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
