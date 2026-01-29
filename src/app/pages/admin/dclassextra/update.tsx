import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import momentDurationFormatSetup from "moment-duration-format";
import { ClassExtra } from "../../../../store/ducks/dclassextra/types";
import { updateClassExtraRequest } from "../../../../store/ducks/dclassextra/actions";
import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
  child: ClassExtra;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  // const component = useSelector((state: ApplicationState) => state.component);

  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [classId, setClassId] = useState(0);

  useEffect(() => {
    setKey(child.key!);
    setValue(child.value!);
    setName(child.name!);
    setClassId(child.classId!);
  }, [child.key, child.value, child.name, child.classId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //console.log("submit", component.data.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (name) {
      //var data = new Date()
      const componentToUpdate: ClassExtra = {
        id: child.id,
        name,
        key,
        value,
        classId,
      };

      console.log("----------------- COMPONENT TO UPDATExx", componentToUpdate);
      dispatch(updateClassExtraRequest(componentToUpdate));
      handleClose();
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-12 py-lg-2 px-lg-6">
          <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome de exibição
              </Form.Label>
              <Form.Control
                placeholder=""
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Key
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={key}
                onChange={(e: any) => setKey(e.target.value)}
                name="name"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do curso
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
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
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
