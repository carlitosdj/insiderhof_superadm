import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { ApplicationState } from "../../../../store";
import momentDurationFormatSetup from "moment-duration-format";
import { KTIcon } from "../../../../_metronic/helpers";

import api from "../../../../services/api";
import SelectImg from "../../crop/SelectImg";
import { Product } from "../../../../store/ducks/dproduct/types";
import { createProductRequest } from "../../../../store/ducks/dproduct/actions";


import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
}

const Create = ({ handleClose }: handleCloseProps) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const [price, setPrice] = useState("");
  const [type, setType] = useState("curso");


  const [duration, setDuration] = useState(0);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState<any>("");

  const me = useSelector((state: ApplicationState) => state.me);

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
          const course: Product = {
            name,
            description,
            image: res.data.filename,
            ownerId: me.me.id,
            price: Number(price),
            type,
            duration: Number(duration),
          };
          dispatch(createProductRequest(course));
        });
      } else {
        const course: Product = {
          name,
          description,
          ownerId: me.me.id,
          price: Number(price),
          type,
          duration: Number(duration),
        };
        dispatch(createProductRequest(course));
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
                Nome do produto
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

            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Tipo
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                Por favor informe o papel
              </Form.Control.Feedback>
              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="curso"
                    onChange={(e: any) => setType("curso")}
                    name="curso"
                    checked={type === "curso"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="curso">
                    <div className="fw-bolder text-gray-800">Curso</div>
                    <div className="text-gray-600">Treinamento online</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>

              <div className="separator separator-dashed my-5"></div>

              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="ebook"
                    onChange={(e: any) => setType("ebook")}
                    name="ebook"
                    checked={type === "ebook"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="ebook">
                    <div className="fw-bolder text-gray-800">E-book</div>
                    <div className="text-gray-600">Livro digital</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>

              <div className="separator separator-dashed my-5"></div>

              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="mentoria"
                    onChange={(e: any) => setType("mentoria")}
                    name="mentoria"
                    checked={type === "mentoria"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="mentoria">
                    <div className="fw-bolder text-gray-800">Mentoria</div>
                    <div className="text-gray-600">Mentoria ao vivo</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>
              <div className="separator separator-dashed my-5"></div>

              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="audiobook"
                    onChange={(e: any) => setType("audiobook")}
                    name="audiobook"
                    checked={type === "audiobook"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="audiobook">
                    <div className="fw-bolder text-gray-800">Audiobook</div>
                    <div className="text-gray-600">Livro em audio</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>
              <div className="separator separator-dashed my-5"></div>

              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="event"
                    onChange={(e: any) => setType("event")}
                    name="event"
                    checked={type === "event"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="event">
                    <div className="fw-bolder text-gray-800">Evento</div>
                    <div className="text-gray-600">Presencial</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>
            </Form.Group>
          </div>
          <div className="col-lg-6 py-lg-2 px-lg-6">

            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Preço</Form.Label>
              <Form.Control
                placeholder=""
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
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
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <SelectImg
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              image={image}
              setImage={setImage}
            />
            {/* <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Status</Form.Label>
              <Form.Control
                placeholder=""
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a duração
              </Form.Control.Feedback>
            </Form.Group> */}
          </div>
        </div>
        <br/>
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
