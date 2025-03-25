import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { Launch } from "../../../../store/ducks/dlaunch/types";
import { updateLaunchRequest } from "../../../../store/ducks/dlaunch/actions";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: Launch;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");

  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [type, setType] = useState("");

  const [installments, setInstallments] = useState("");
  const [renovationTime, setRenovationTime] = useState(0);
  const [renovationPrice, setRenovationPrice] = useState(0);
  const [antecipateRenovationPrice, setAntecipateRenovationPrice] = useState(0);
  const [renovationDescription, setRenovationDescription] = useState("");
  const [renovationInstallments, setRenovationInstallments] = useState("");

  useEffect(() => {
    setName(child.name);
    setDescription(child.description);
    setStatus(child.status!);
    setPrice(child.price!);
    setOldPrice(child.oldPrice!);
    setType(child.type!);

    setInstallments(child.installments!);
    setRenovationTime(child.renovationTime!);
    setRenovationPrice(child.renovationPrice!);
    setAntecipateRenovationPrice(child.antecipateRenovationPrice!);
    setRenovationDescription(child.renovationDescription!);
    setRenovationInstallments(child.renovationInstallments!);

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
      const componentToUpdate: Launch = {
        id: child.id,
        name,
        description,
        status: status!,
        price: Number(price),
        oldPrice: Number(oldPrice),
        type,

        installments,
        renovationTime: Number(renovationTime),
        renovationPrice: Number(renovationPrice),
        antecipateRenovationPrice: Number(antecipateRenovationPrice),
        renovationDescription,
        renovationInstallments
      };
      dispatch(updateLaunchRequest(componentToUpdate));
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

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                OldPrice
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={oldPrice}
                onChange={(e: any) => setOldPrice(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Price
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Type
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={type}
                onChange={(e: any) => setType(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />


            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Parcelas
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={installments}
                onChange={(e: any) => setInstallments(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
              renovationTime
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={renovationTime}
                onChange={(e: any) => setRenovationTime(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
              renovationPrice
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={renovationPrice}
                onChange={(e: any) => setRenovationPrice(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
              antecipateRenovationPrice
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={antecipateRenovationPrice}
                onChange={(e: any) => setAntecipateRenovationPrice(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
              renovationDescription
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={renovationDescription}
                onChange={(e: any) => setRenovationDescription(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
              renovationInstallments
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={renovationInstallments}
                onChange={(e: any) => setRenovationInstallments(e.target.value)}
                name="description"
                className="form-control form-control-lg form-control-solid"
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
