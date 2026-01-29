import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import momentDurationFormatSetup from "moment-duration-format";
import { KTIcon } from "../../../../_metronic/helpers";

import { createModuleRequest } from "../../../../store/ducks/dmodule/actions";
import { Module } from "../../../../store/ducks/dmodule/types";
import api from "../../../../services/api";
import SelectImg from "../../crop/SelectImg";

import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
  productId: number;
}

const Create = ({ handleClose, productId }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState<any>("");

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
          const module: Module = {
            name,
            description,
            image: res.data.filename,
            productId,
          };
          dispatch(createModuleRequest(module));
        });
      } else {
        const module: Module = {
          name,
          description,
          productId,
        };
        dispatch(createModuleRequest(module));
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
                Nome do módulo
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
      {/* Deixar o button fora do form.. */}
    </>
  );
};
export default Create;
