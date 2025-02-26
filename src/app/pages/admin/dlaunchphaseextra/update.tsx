import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { LaunchPhaseExtras } from "../../../../store/ducks/dlaunchphaseextras/types";
import { updateLaunchPhaseExtrasRequest } from "../../../../store/ducks/dlaunchphaseextras/actions";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: LaunchPhaseExtras;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [key, setKey] = useState<string | undefined>("");
  const [value, setValue] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");

  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    setKey(child.key);
    setValue(child.value);
    setStatus(child.status!);
  }, [child.key, child.value]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit", component.data.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (key) {
      const componentToUpdate: LaunchPhaseExtras = {
        id: child.id,
        key,
        value,
        status: status!,
      };
      console.log("ver", componentToUpdate);
      dispatch(updateLaunchPhaseExtrasRequest(componentToUpdate));
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
                placeholder=""
                required
                value={key}
                onChange={(e: any) => setKey(e.target.value)}
                name="name"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Value
              </Form.Label>
              <Form.Control
                placeholder=""
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
                as="textarea"
                rows={8}
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
