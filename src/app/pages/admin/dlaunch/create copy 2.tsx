import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import momentDurationFormatSetup from "moment-duration-format";

import { Launch } from "../../../../store/ducks/dlaunch/types";
import { createLaunchRequest } from "../../../../store/ducks/dlaunch/actions";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
}

const Create = ({ handleClose }: handleCloseProps) => {
  const [name, setName] = useState("INSIDERHOF - ABR2025");
  const [description, setDescription] = useState("InsiderHOF");

  const [validated, setValidated] = useState(false);

  const [price, setPrice] = useState(0);
  // const [oldPrice, setOldPrice] = useState(0);
  const [type, setType] = useState("");

  const [slug, setSlug] = useState("jan25");

  const [eventName, setEventName] = useState("Semana InsiderHOF 2025");
  const [eventGroupLink, setEventGroupLink] = useState(
    "https://insiderhof.com.br/viawhats/insiderhof"
  );

  const [expertName, setExpertName] = useState("Dra. Vanessa Defelícibus");

  const [cartOpenDate, setCartOpenDate] = useState(new Date());
  const [cartCloseDate, setCartCloseDate] = useState(new Date());

  const [leadSignUpStartDate, setLeadSignUpStartDate] = useState(new Date());
  const [leadSignUpEndDate, setLeadSignUpEndDate] = useState(new Date());

  const [leadForm, setLeadForm] = useState(
    "https://forms.gle/pa8KqCmTAyNEdYDb6"
  );
  const [domain, setDomain] = useState("https://insiderhof.com.br");

  const [dateCpl1, setDateCpl1] = useState("");
  const [dateCpl2, setDateCpl2] = useState("");
  const [dateCpl3, setDateCpl3] = useState("");

  const [cpl1, setCpl1] = useState("https://www.youtube.com/embed/am-FQ86mKV0");
  const [cpl2, setCpl2] = useState("https://www.youtube.com/embed/u-6XK1yy3rE");
  const [cpl3, setCpl3] = useState("https://www.youtube.com/embed/BJYpPfyz3ks");

  const [productName, setProductName] = useState(
    "Treinamento InsiderHOF Online 2025"
  );

  const [productWaitLink, setProductWaitLink] = useState(
    "https://insiderhof.com.br/viawhats/espera"
  );

  const [paidGroup, setPaidGroup] = useState(
    "https://chat.whatsapp.com/DA5umaAQoLqL7YiZjH1I3Q"
  );
  const [onboardingVideo, setOnboardingVideo] = useState("");
  const [checkoutPage, setCheckoutPage] = useState("");

  const [installments, setInstallments] = useState("12");
  const [aviso, setAviso] = useState("");

  const [renovationTime, setRenovationTime] = useState(12);
  const [renovationPrice, setRenovationPrice] = useState(0);
  const [antecipateRenovationPrice, setAntecipateRenovationPrice] = useState(0);
  const [renovationDescription, setRenovationDescription] =
    useState("Renovação");
  const [renovationInstallments, setRenovationInstallments] = useState("12");

  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7 || 7)); //next monday
    setDates(d);
  }, []);

  const setDates = (date: Date) => {
    ////////////////START END - CARRINHO////////////////

    var startDate = new Date(date);
    startDate.setDate(date.getDate());
    setCartOpenDate(startDate);

    var endDate = new Date(date);
    endDate.setDate(startDate.getDate() + 4);
    setCartCloseDate(endDate);
    /////////////////CPLS////////////////

    //console.log("Date", date);
    var dateCpl1 = new Date(date);
    dateCpl1.setDate(startDate.getDate() - 7);
    setDateCpl1(dateCpl1.toString());

    var dateCpl2 = new Date(date);
    dateCpl2.setDate(startDate.getDate() - 5);
    setDateCpl2(dateCpl2.toString());

    var dateCpl3 = new Date(date);
    dateCpl3.setDate(startDate.getDate() - 4);
    setDateCpl3(dateCpl3.toString());
    /////////////////SUBSCRIBE////////////////

    var startSubscribeDate = new Date();
    //startSubscribeDate.setDate(startSubscribeDate.getDate() - 21);
    startSubscribeDate.setDate(startSubscribeDate.getDate() - 1);
    setLeadSignUpStartDate(startSubscribeDate);

    var endSubscribeDate = new Date(date);
    endSubscribeDate.setDate(startDate.getDate());
    setLeadSignUpEndDate(endSubscribeDate);

    return new Date();
  };

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
      const product: Launch = {
        name,
        description,
        ownerId: me.me.id,
        price: Number(price),
        // oldPrice: Number(oldPrice),
        type,
        slug,
        eventName,
        eventGroupLink,
        expertName,
        cartOpenDate: MOMENT(cartOpenDate.toString()).format(
          "DD/MM/YYYY HH:mm"
        ),
        cartCloseDate: MOMENT(cartCloseDate.toString()).format(
          "DD/MM/YYYY HH:mm"
        ),
        leadSignUpStartDate:
          MOMENT(leadSignUpStartDate).format("DD/MM/YYYY HH:mm"),
        leadSignUpEndDate: MOMENT(leadSignUpEndDate).format("DD/MM/YYYY HH:mm"),
        dateCpl1: MOMENT(dateCpl1).format("DD/MM/YYYY HH:mm"),
        dateCpl2: MOMENT(dateCpl2).format("DD/MM/YYYY HH:mm"),
        dateCpl3: MOMENT(dateCpl3).format("DD/MM/YYYY HH:mm"),
        cpl1,
        cpl2,
        cpl3,
        productName,
        //productPrice,
        //productInstallments,
        //productDiscount,
        //productDiscountText,
        productWaitLink,
        // productBtn,
        // talktousLink,

        paidGroup,
        onboardingVideo,
        checkoutPage,

        leadForm,
        domain,

        installments,
        renovationTime,
        renovationPrice,
        antecipateRenovationPrice,
        renovationDescription,
        renovationInstallments,
      };

      dispatch(createLaunchRequest(product));
      handleClose();
    }
  };

  return (
    <Container fluid className="p-0">
      <Form validated={validated} onSubmit={handleSubmit}>
        <Row className="g-4">
          {/* Informações Básicas */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <KTIcon iconName="element-11" className="fs-2 me-2" />
                  Informações Básicas
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Nome do lançamento
                  </Form.Label>
                  <Form.Control
                    placeholder="Digite o nome do lançamento"
                    required
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                    className="form-control-lg form-control-solid"
                    autoFocus
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o nome
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold fs-6">Descrição</Form.Label>
                  <Form.Control
                    placeholder="Digite a descrição"
                    value={description}
                    onChange={(e: any) => setDescription(e.target.value)}
                    className="form-control-lg form-control-solid"
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Slug <small className="text-muted">(Ex: mai23)</small>
                  </Form.Label>
                  <Form.Control
                    placeholder="Digite o slug"
                    required
                    value={slug}
                    onChange={(e: any) => setSlug(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o slug
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Nome do Expert
                  </Form.Label>
                  <Form.Control
                    placeholder="Digite o nome do expert"
                    required
                    value={expertName}
                    onChange={(e: any) => setExpertName(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o nome do expert
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">Domínio</Form.Label>
                  <Form.Control
                    placeholder="https://exemplo.com"
                    required
                    value={domain}
                    onChange={(e: any) => setDomain(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o domínio
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Evento e Links */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <KTIcon iconName="calendar" className="fs-2 me-2" />
                  Evento e Links
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Nome do evento
                  </Form.Label>
                  <Form.Control
                    placeholder="Digite o nome do evento"
                    required
                    value={eventName}
                    onChange={(e: any) => setEventName(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o nome do evento
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Link do Grupo do WhatsApp
                  </Form.Label>
                  <Form.Control
                    placeholder="https://chat.whatsapp.com/..."
                    required
                    value={eventGroupLink}
                    onChange={(e: any) => setEventGroupLink(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o link do grupo
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Formulário do lead
                  </Form.Label>
                  <Form.Control
                    placeholder="https://forms.google.com/..."
                    required
                    value={leadForm}
                    onChange={(e: any) => setLeadForm(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o formulário
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Nome do produto
                  </Form.Label>
                  <Form.Control
                    placeholder="Digite o nome do produto"
                    required
                    value={productName}
                    onChange={(e: any) => setProductName(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o nome do produto
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Grupo da turma
                  </Form.Label>
                  <Form.Control
                    placeholder="https://chat.whatsapp.com/..."
                    required
                    value={paidGroup}
                    onChange={(e: any) => setPaidGroup(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o grupo da turma
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Datas e Cronograma */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-info text-white">
                <h5 className="mb-0">
                  <KTIcon iconName="clock" className="fs-2 me-2" />
                  Datas e Cronograma
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Data de abertura do carrinho
                  </Form.Label>
                  <DatePicker
                    locale="ptBR"
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    selected={cartOpenDate}
                    onChange={(date: any) => setDates(date)}
                    className="form-control form-control-lg form-control-solid"
                    wrapperClassName="w-100"
                    minDate={new Date()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe a data de abertura do carrinho
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Data de fechamento do carrinho
                  </Form.Label>
                  <DatePicker
                    locale="ptBR"
                    showTimeSelect
                    dateFormat="dd/MM/yyyy HH:mm"
                    selected={cartCloseDate}
                    onChange={(date: any) => setCartCloseDate(date)}
                    className="form-control form-control-lg form-control-solid"
                    wrapperClassName="w-100"
                    minDate={new Date()}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe a data de encerramento do carrinho
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="bg-light p-3 rounded">
                  <h6 className="fw-bold mb-2">Cronograma Calculado:</h6>
                  <div className="small">
                    <div><strong>Início Inscrição Lead:</strong> {MOMENT(leadSignUpStartDate).format("DD/MM/YYYY")}</div>
                    <div><strong>Fechamento Inscrição Lead:</strong> {MOMENT(leadSignUpEndDate).format("DD/MM/YYYY")}</div>
                    <div><strong>CPL1:</strong> {MOMENT(dateCpl1).format("DD/MM/YYYY")}</div>
                    <div><strong>CPL2:</strong> {MOMENT(dateCpl2).format("DD/MM/YYYY")}</div>
                    <div><strong>CPL3:</strong> {MOMENT(dateCpl3).format("DD/MM/YYYY")}</div>
                    <div><strong>Abertura Carrinho:</strong> {MOMENT(cartOpenDate).format("DD/MM/YYYY HH:mm")}</div>
                    <div><strong>Fechamento Carrinho:</strong> {MOMENT(cartCloseDate).format("DD/MM/YYYY HH:mm")}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Conteúdo e CPLs */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-warning text-dark">
                <h5 className="mb-0">
                  <KTIcon iconName="video" className="fs-2 me-2" />
                  Conteúdo e CPLs
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">CPL1</Form.Label>
                  <Form.Control
                    placeholder="https://www.youtube.com/embed/..."
                    required
                    value={cpl1}
                    onChange={(e: any) => setCpl1(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o CPL1
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">CPL2</Form.Label>
                  <Form.Control
                    placeholder="https://www.youtube.com/embed/..."
                    required
                    value={cpl2}
                    onChange={(e: any) => setCpl2(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o CPL2
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">CPL3</Form.Label>
                  <Form.Control
                    placeholder="https://www.youtube.com/embed/..."
                    required
                    value={cpl3}
                    onChange={(e: any) => setCpl3(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o CPL3
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required fw-bold fs-6">
                    Grupo de espera
                  </Form.Label>
                  <Form.Control
                    placeholder="https://chat.whatsapp.com/..."
                    required
                    value={productWaitLink}
                    onChange={(e: any) => setProductWaitLink(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o grupo de espera
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Configurações de Pagamento */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-secondary text-white">
                <h5 className="mb-0">
                  <KTIcon iconName="dollar" className="fs-2 me-2" />
                  Configurações de Pagamento
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold fs-6">Parcelas</Form.Label>
                  <Form.Control
                    placeholder="12"
                    value={installments}
                    onChange={(e: any) => setInstallments(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold fs-6">
                    Aviso <small className="text-muted">(Ex: REFERENTE À ENTRADA PARA MATRÍCULA, O RESTANTE NO DIA DO CURSO.)</small>
                  </Form.Label>
                  <Form.Control
                    placeholder="Digite o aviso"
                    value={aviso}
                    onChange={(e: any) => setAviso(e.target.value)}
                    className="form-control-lg form-control-solid"
                    as="textarea"
                    rows={2}
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Configurações de Renovação */}
          <Col lg={6}>
            <Card className="h-100 shadow-sm">
              <Card.Header className="bg-dark text-white">
                <h5 className="mb-0">
                  <KTIcon iconName="refresh" className="fs-2 me-2" />
                  Configurações de Renovação
                </h5>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold fs-6">Tempo de Renovação</Form.Label>
                      <Form.Control
                        placeholder="12"
                        value={renovationTime}
                        onChange={(e: any) => setRenovationTime(e.target.value)}
                        className="form-control-lg form-control-solid"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold fs-6">Preço de Renovação</Form.Label>
                      <Form.Control
                        placeholder="0.00"
                        value={renovationPrice}
                        onChange={(e: any) => setRenovationPrice(e.target.value)}
                        className="form-control-lg form-control-solid"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold fs-6">Preço Antecipado de Renovação</Form.Label>
                  <Form.Control
                    placeholder="0.00"
                    value={antecipateRenovationPrice}
                    onChange={(e: any) => setAntecipateRenovationPrice(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold fs-6">Descrição da Renovação</Form.Label>
                  <Form.Control
                    placeholder="Renovação"
                    value={renovationDescription}
                    onChange={(e: any) => setRenovationDescription(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold fs-6">Parcelas da Renovação</Form.Label>
                  <Form.Control
                    placeholder="12"
                    value={renovationInstallments}
                    onChange={(e: any) => setRenovationInstallments(e.target.value)}
                    className="form-control-lg form-control-solid"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Botão de Salvar */}
        <div className="d-flex justify-content-center mt-4 mb-4">
          <Button
            variant="primary"
            type="submit"
            size="lg"
            className="btn btn-primary px-5 py-3"
          >
            <KTIcon iconName="check" className="fs-2 me-2" />
            Salvar Lançamento
            <KTIcon iconName="arrow-right" className="fs-2 ms-2" />
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default Create;
