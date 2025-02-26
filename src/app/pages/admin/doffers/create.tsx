import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import { Offer } from "../../../../store/ducks/doffer/types";
import { createOfferRequest } from "../../../../store/ducks/doffer/actions";
import SelectImg from "../../crop/SelectImg";
import api from "../../../../services/api";

import momentDurationFormatSetup from "moment-duration-format";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
}

const Create = ({ handleClose }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [validated, setValidated] = useState(false);
  
  const [price, setPrice] = useState("");
  const [type, setType] = useState("curso");
  const [oldPrice, setOldPrice] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState<any>("");

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
      if (selectedFile) {
        const formdata = new FormData();
        formdata.append("file", croppedImage, "dfl.jpg"); //selectedFile.name
        api.post("/upload", formdata, {}).then((res: any) => {
          const offer: Offer = {
            name,
            description,
            price: Number(price),
            oldPrice: Number(oldPrice),
            type,
            image: res.data.filename,
            ownerId: me.me.id,
          };
          dispatch(createOfferRequest(offer));
        });
      } else {
        const offer: Offer = {
          name,
          description,
          price: Number(price),
          oldPrice: Number(oldPrice),
          type,
          ownerId: me.me.id,
        };
        dispatch(createOfferRequest(offer));
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
            
          </div>
          <div className="col-lg-6 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">
                Preço Antigo
              </Form.Label>
              <Form.Control
                placeholder=""
                value={oldPrice}
                onChange={(e: any) => setOldPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br />

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

            <SelectImg
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              image={image}
              setImage={setImage}
            />

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
