import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";


import momentDurationFormatSetup from "moment-duration-format";
import { updateModuleRequest } from "../../../../store/ducks/dmodule/actions";
import { Module } from "../../../../store/ducks/dmodule/types";
import api from "../../../../services/api";
import SelectImg from "../../crop/SelectImg";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: Module;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");
  const [productId, setPodId] = useState(0);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(child.name);
    setDescription(child.description);
    setImage(child.image!);
    setStatus(child.status!);
    setPodId(child.productId!);
  }, [child.name, child.description]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit", component.data.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (name) {
      if (selectedFile) {
        const formdata = new FormData();
        formdata.append("file", croppedImage, "dfl.jpg"); //selectedFile.name
        api.post("/upload", formdata, {}).then((res: any) => {
          const componentToUpdate: Module = {
            id: child.id,
            name,
            description,
            image: res.data.filename,
            status: status!,
            productId,
          };
          dispatch(updateModuleRequest(componentToUpdate));
        }); 
      } else {
        const componentToUpdate: Module = {
          id: child.id,
          name,
          description,
          status: status!,
          productId,
        };
        dispatch(updateModuleRequest(componentToUpdate));
      }
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
            <SelectImg
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              image={image}
              setImage={setImage}
            />
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
