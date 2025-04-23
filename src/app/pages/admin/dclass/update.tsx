import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";

import { updateClassRequest } from "../../../../store/ducks/dclass/actions";
import { Class } from "../../../../store/ducks/dclass/types";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: Class;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  //const component = useSelector((state: ApplicationState) => state.component);
  const [name, setName] = useState<string | undefined>("");

  const [description, setDescription] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [tags, setTags] = useState("");
  const [moduleId, setModuleId] = useState(0);

  useEffect(() => {
    setName(child.name);
    setDescription(child.description);
    setImage(child.image!);
    setStatus(child.status!);
    setModuleId(child.moduleId!);
    setDuration(
      MOMENT.duration(child.duration, "seconds").format("hh:mm:ss", {
        trim: false,
      })
    );
    setVideo(child.video!);
    setTags(child.tags!)
  }, [child.name, child.description]);

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
      const componentToUpdate: Class = {
        id: child.id,
        name,
        description,
        image,
        status: status!,
        video,
        tags,
        moduleId,
        duration: MOMENT.duration(duration).asSeconds(),
      };

      console.log("----------------- COMPONENT TO UPDATExx", componentToUpdate);
      dispatch(updateClassRequest(componentToUpdate));
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
                Nome do curso
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
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
                Descrição
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                as="textarea"
                rows={8}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="col-lg-6 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Vídeo
              </Form.Label>
              <Form.Control
                placeholder=""
                value={video}
                onChange={(e: any) => setVideo(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Tags
              </Form.Label>
              <Form.Control
                placeholder=""
                value={tags}
                onChange={(e: any) => setTags(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Duração
              </Form.Label>
              <Form.Control
                placeholder=""
                value={duration.toString()}
                onChange={(e: any) => setDuration(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
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
