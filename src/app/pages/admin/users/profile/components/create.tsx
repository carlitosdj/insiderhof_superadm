import React, { useEffect, useMemo, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../../../../../store/ducks/carts/types";
import { createCartRequest } from "../../../../../../store/ducks/carts/actions";
import { loadMyLaunchsRequest } from "../../../../../../store/ducks/dlaunch/actions";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { ApplicationState } from "../../../../../../store";
import { User } from "../../../../../../store/ducks/me/types";

interface handleCloseProps {
  handleClose: () => void;
  user: User;
}

const Create = ({ handleClose, user }: handleCloseProps) => {
  const dispatch = useDispatch();
  const { myLaunchs, loading: launchesLoading } = useSelector(
    (state: ApplicationState) => state.launch,
  );
  const me = useSelector((state: ApplicationState) => state.me);

  const ownerId = me.me?.id ?? user?.id;

  const [status, setStatus] = useState<string>("1");
  const [gateway, setGateway] = useState<string>("equipe");
  const [paymentmethod, setPaymentmethod] = useState<string>("visa");
  const [installments, setInstallments] = useState<number>(10);
  const [price, setPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("Escultura Labial");
  const [idreference, setIdreference] = useState<string>("--");
  const [notafiscal, setNotafiscal] = useState<string>("--");
  const [launchId, setLaunchId] = useState<number>(46);
  const [total_paid_amount, setTotal_paid_amount] = useState<string>("1");
  const [net_received_amount, setNet_received_amount] = useState<string>("1");
  const [installment_amount, setInstallment_amount] = useState<string>("1");
  const [mercadopago_fee, setMercadopago_fee] = useState<string>("");
  const [financing_fee, setFinancing_fee] = useState<string>("");

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (ownerId && myLaunchs.length === 0) {
      dispatch(loadMyLaunchsRequest(ownerId));
    }
  }, [dispatch, ownerId, myLaunchs.length]);

  useEffect(() => {
    if (
      myLaunchs.length > 0 &&
      !myLaunchs.some((launch) => launch.id === launchId)
    ) {
      const fallbackId = myLaunchs[0]?.id;
      if (fallbackId) {
        setLaunchId(fallbackId);
      }
    }
  }, [myLaunchs, launchId]);

  const launchOptions = useMemo(
    () =>
      myLaunchs.map((launch) => ({
        id: launch.id ?? 0,
        name: launch.name ?? `Lançamento #${launch.id}`,
      })),
    [myLaunchs],
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    setValidated(true);

    if (status && gateway) {
      const component: Cart = {
        status,
        gateway,
        paymentmethod,
        installments: Number(installments),
        price,
        quantity: Number(quantity),
        description,
        idreference,
        notafiscal,
        launchId: Number(launchId),
        total_paid_amount,
        net_received_amount,
        installment_amount,
        mercadopago_fee,
        financing_fee,
        userId: user.id,
      };
      dispatch(createCartRequest(component));
      handleClose();
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-6">
          <Row className="g-6">
            <Col md={6}>
              <Form.Group controlId="createStatus" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Status
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={status}
                  placeholder="Ex.: 1"
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                  autoFocus
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o status.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createPaymentMethod" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Meio de pagamento
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={paymentmethod}
                  placeholder="Ex.: visa, pix..."
                  onChange={(e) => setPaymentmethod(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o meio de pagamento.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createGateway" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Gateway
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  required
                  value={gateway}
                  placeholder="Informe o gateway utilizado"
                  onChange={(e) => setGateway(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o gateway.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createInstallments" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Parcelas
                </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  required
                  value={installments}
                  placeholder="Quantidade de parcelas"
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o número de parcelas.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createPrice" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Valor da compra
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={price}
                  placeholder="Ex.: 997.00"
                  onChange={(e) => setPrice(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o valor da compra.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createQuantity" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Quantidade
                </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  required
                  value={quantity}
                  placeholder="Quantidade adquirida"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a quantidade.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="createDescription" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Descrição
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={description}
                  placeholder="Resumo da compra"
                  onChange={(e) => setDescription(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe uma descrição.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createIdReference" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Referência
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={idreference}
                  placeholder="ID de referência externa"
                  onChange={(e) => setIdreference(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a referência.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createNotaFiscal" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Nota fiscal
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={notafiscal}
                  placeholder="Código da nota fiscal"
                  onChange={(e) => setNotafiscal(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a nota fiscal.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createTotalPaid" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Total pago
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={total_paid_amount}
                  placeholder="Valor total pago"
                  onChange={(e) => setTotal_paid_amount(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o total pago.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createNetReceived" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Total líquido recebido
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={net_received_amount}
                  placeholder="Valor líquido após taxas"
                  onChange={(e) => setNet_received_amount(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o valor líquido recebido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createInstallmentAmount" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Valor da parcela
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={installment_amount}
                  placeholder="Valor de cada parcela"
                  onChange={(e) => setInstallment_amount(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o valor por parcela.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createMercadoPagoFee" className="mb-6">
                <Form.Label className="fw-semibold fs-7 text-gray-700">
                  Taxa Mercado Pago
                </Form.Label>
                <Form.Control
                  type="text"
                  value={mercadopago_fee}
                  placeholder="Valor da taxa Mercado Pago"
                  onChange={(e) => setMercadopago_fee(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createFinancingFee" className="mb-6">
                <Form.Label className="fw-semibold fs-7 text-gray-700">
                  Taxa de financiamento
                </Form.Label>
                <Form.Control
                  type="text"
                  value={financing_fee}
                  placeholder="Valor da taxa de financiamento"
                  onChange={(e) => setFinancing_fee(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="createLaunch" className="mb-6">
                <Form.Label className="required fw-semibold fs-7 text-gray-700">
                  Lançamento associado
                </Form.Label>
                <Form.Select
                  required
                  value={launchId}
                  onChange={(e) => setLaunchId(Number(e.target.value))}
                  className="form-select form-select-lg form-select-solid"
                >
                  <option value="">Selecione um lançamento</option>
                  {launchOptions.map((launch) => (
                    <option key={launch.id} value={launch.id}>
                      {launch.name}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor selecione um lançamento.
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  {launchesLoading
                    ? "Carregando lançamentos vinculados ao projeto..."
                    : myLaunchs.length === 0
                    ? "Nenhum lançamento disponível para este projeto."
                    : "Escolha o lançamento relacionado a esse carrinho."}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-end border-0 pt-0 px-6 pb-6">
          <Button
            size="lg"
            variant="primary"
            type="submit"
            className="btn btn-lg btn-primary"
          >
            Salvar
            <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
};

export default Create;
