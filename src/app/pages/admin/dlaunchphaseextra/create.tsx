import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";


import momentDurationFormatSetup from "moment-duration-format";
import { LaunchPhaseExtras } from "../../../../store/ducks/dlaunchphaseextras/types";
import { createLaunchPhaseExtrasRequest } from "../../../../store/ducks/dlaunchphaseextras/actions";


const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  launchPhaseId: number;
}

const Create = ({ handleClose, launchPhaseId }: handleCloseProps) => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
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

    if (key) {
      const item: LaunchPhaseExtras = {
        key,
        value,
        launchPhaseId
      };
      console.log("item", item);
      dispatch(createLaunchPhaseExtrasRequest(item));
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
              <Form.Label className="fw-bold fs-6 mb-5">Value</Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                as="textarea"
                rows={8}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
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
