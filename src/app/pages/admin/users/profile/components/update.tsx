import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../../../store";
import { Cart } from "../../../../../../store/ducks/carts/types";
import { updateCartRequest } from "../../../../../../store/ducks/carts/actions";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { User } from "../../../../../../store/ducks/me/types";

interface handleCloseProps {
  handleClose: () => void;
  child: Cart;
  user: User;
}

const Update = ({ handleClose, child, user }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<string>("1");
  const [gateway, setGateway] = useState<string>("1");
  const [paymentmethod, setPaymentmethod] = useState<string>("1");
  const [installments, setInstallments] = useState<number>(1);
  const [price, setPrice] = useState<string>("1");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("test");
  const [idreference, setIdreference] = useState<string>("0");
  const [notafiscal, setNotafiscal] = useState<string>("0");
  const [launchId, setLaunchId] = useState<number>(2);
  const [total_paid_amount, setTotal_paid_amount] = useState<string>("1");
  const [net_received_amount, setNet_received_amount] = useState<string>("1");
  const [installment_amount, setInstallment_amount] = useState<string>("1");
  const [mercadopago_fee, setMercadopago_fee] = useState<string>("1");
  const [financing_fee, setFinancing_fee] = useState<string>("1");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    // setOrder(child.order)
    setStatus(child.status!);
    setGateway(child.gateway!);
    setPaymentmethod(child.paymentmethod!);
    setInstallments(child.installments!);
    setPrice(child.price!);
    setQuantity(child.quantity!);
    setDescription(child.description!);
    setIdreference(child.idreference!);
    setNotafiscal(child.notafiscal!);
    setLaunchId(child.launchId!);
    setTotal_paid_amount(child.total_paid_amount!);
    setNet_received_amount(child.net_received_amount!);
    setInstallment_amount(child.installment_amount!);
    setMercadopago_fee(child.mercadopago_fee!);
    setFinancing_fee(child.financing_fee!);

  }, [child]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }
      setValidated(true);
  
      if (status && gateway) {
        var data = new Date();
        const component: Cart = {
          id: child.id,
          status,
          gateway,
          paymentmethod,
          installments,
          price,
          quantity,
          description,
          idreference,
          notafiscal,
          launchId,
          total_paid_amount,
          net_received_amount,
          installment_amount,
          mercadopago_fee,
          financing_fee,
          userId: user.id
          
        };
        console.log("component to save:", component);
        dispatch(updateCartRequest(component));
        handleClose();
        // history.goBack()
      }
    };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Status
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Gateway
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={gateway}
                onChange={(e: any) => setGateway(e.target.value)}
                as="textarea"
                rows={3}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromSlug">
              <Form.Label className="required fw-bold fs-6 mb-5">
                PaymentMethod
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={paymentmethod}
                onChange={(e: any) => setPaymentmethod(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o slug
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Installments
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={installments}
                onChange={(e: any) => setInstallments(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o max clicks
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Price
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o price
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Quantity
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={quantity}
                onChange={(e: any) => setQuantity(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o price
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Description
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Idreference
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={idreference}
                onChange={(e: any) => setIdreference(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Notafiscal
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={notafiscal}
                onChange={(e: any) => setNotafiscal(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                launchId
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={launchId}
                onChange={(e: any) => setLaunchId(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Total paid amount
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={total_paid_amount}
                onChange={(e: any) => setTotal_paid_amount(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Net received amount
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={net_received_amount}
                onChange={(e: any) => setNet_received_amount(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Instalment amount
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={installment_amount}
                onChange={(e: any) => setInstallment_amount(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Mercado pago fee
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={mercadopago_fee}
                onChange={(e: any) => setMercadopago_fee(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Financing fee
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={financing_fee}
                onChange={(e: any) => setFinancing_fee(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe description
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
export default Update;
