import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { ApplicationState } from "../../../../store";

import momentDurationFormatSetup from "moment-duration-format";
import { KTIcon } from "../../../../_metronic/helpers";

import { createClassRequest } from "../../../../store/ducks/dclass/actions";
import { Class } from "../../../../store/ducks/dclass/types";

import moment from "moment";
momentDurationFormatSetup(moment);

// import { Modal } from 'react-bootstrap'
type ParamTypes = {
  id: string;
};

interface handleCloseProps {
  handleClose: () => void;
  moduleId: number;
}

const Create = ({ handleClose, moduleId }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("00:00:00");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [tags, setTags] = useState("");

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
      const classe: Class = {
        name,
        description,
        image,
        duration: moment.duration(duration).asSeconds(),
        moduleId,
        video,
        tags,
      };

      // console.log("classe: ", classe);
      dispatch(createClassRequest(classe));
      handleClose();
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome da aula
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
          </div>
          <div className="col-lg-6 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Video</Form.Label>
              <Form.Control
                placeholder=""
                value={video}
                onChange={(e: any) => setVideo(e.target.value)}
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
