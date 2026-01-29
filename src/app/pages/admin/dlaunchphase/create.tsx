import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";


import momentDurationFormatSetup from "moment-duration-format";


import { LaunchPhases } from "../../../../store/ducks/dlaunchphase/types";
import { createLaunchPhasesRequest } from "../../../../store/ducks/dlaunchphase/actions";


import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
  launchId: number;
}

const Create = ({ handleClose, launchId }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
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
      const item: LaunchPhases = {
        name,
        description,
        launchId,
        slug
      };
      console.log()
      dispatch(createLaunchPhasesRequest(item));
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
                Nome da launch
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

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Descrição</Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                as="textarea"
                rows={8}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Slug</Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={slug}
                onChange={(e: any) => setSlug(e.target.value)}
                className="form-control form-control-lg form-control-solid"
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
