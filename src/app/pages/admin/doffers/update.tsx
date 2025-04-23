import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import { Offer } from "../../../../store/ducks/doffer/types";
import { updateOfferRequest } from "../../../../store/ducks/doffer/actions";
import SelectImg from "../../crop/SelectImg";
import api from "../../../../services/api";

import momentDurationFormatSetup from "moment-duration-format";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: Offer;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  //const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [type, setType] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName(child.name);
    setDescription(child.description);
    setOldPrice(child.oldPrice!.toString());
    setPrice(child.price!.toString());
    setType(child.type!);
    setImage(child.image!);
    setStatus(child.status!);
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

      if (selectedFile) {
        const formdata = new FormData();
        formdata.append("file", croppedImage, "dfl.jpg"); //selectedFile.name

        api.post("/upload", formdata, {}).then((res: any) => {
          const componentToUpdate: Offer = {
            id: child.id,
            name,
            description,
            price: Number(price),
            oldPrice: Number(oldPrice),
            type,
            image: res.data.filename,
            status: status!,
          };
          dispatch(updateOfferRequest(componentToUpdate));
        });
      } else {
        const componentToUpdate: Offer = {
          id: child.id,
          name,
          description,
          price: Number(price),
          oldPrice: Number(oldPrice),
          type,
          status: status!,
        };
        dispatch(updateOfferRequest(componentToUpdate));
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
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
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
            <br />

          </div>
          <div className="col-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Preço Antigo
              </Form.Label>
              <Form.Control
                placeholder=""
                value={oldPrice.toString()}
                onChange={(e: any) => setOldPrice(e.target.value)}
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
                Preço
              </Form.Label>
              <Form.Control
                placeholder=""
                value={price.toString()}
                onChange={(e: any) => setPrice(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group>
            <br />

           

            {/* <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Image
              </Form.Label>
              <Form.Control
                placeholder=""
                value={image.toString()}
                onChange={(e: any) => setImage(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group> */}
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
    </>
  );
};
export default Update;
