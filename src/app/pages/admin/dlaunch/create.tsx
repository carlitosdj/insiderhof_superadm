import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
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
  const [oldPrice, setOldPrice] = useState(0);
  const [type, setType] = useState("");

  const [slug, setSlug] = useState("jan25");

  const [eventName, setEventName] = useState("Semana InsiderHOF 2025");
  const [eventHeadline, setEventHeadline] = useState(
    "COMO PREENCHER E INTERVIR EM TODOS OS TIPOS DE LÁBIOS, DESDE OS MAIS SIMPLES AOS MAIS COMPLEXOS"
  );
  const [eventDescription, setEventDescription] = useState(
    "Os primeiros passos para você entender o momento certo de preencher, as diversas formas de tratamento, os desafios para intervir em todos os tipos de lábios. Leve sua carreira para o próximo nível."
  );

  const [eventImg, setEventImg] = useState("1686071778354-Logo-preconexao.png");
  const [eventBtn, setEventBtn] = useState(
    "Quero participar da Semana InsiderHOF"
  );
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
  const [productHeadline, setProductHeadline] = useState(
    "COMO PREENCHER E INTERVIR EM TODOS OS TIPOS DE LÁBIOS, DESDE OS MAIS SIMPLES AOS MAIS COMPLEXOS"
  );
  const [productDescription, setProductDescription] = useState(
    "Do básico ao avançado. O passo a passo para entender o momento certo de preencher, as diversas formas de tratamento, os desafios e como faturar 4x mais na sua clínica. Eleve o nível da sua carreira!"
  );

  const [productVideo, setProductVideo] = useState("");

  const [productWaitLink, setProductWaitLink] = useState(
    "https://insiderhof.com.br/viawhats/espera"
  );

  const [productBtn, setProductBtn] = useState(
    "QUERO MATRICULAR NO INSIDERHOF"
  );

  const [talktousLink, setTalktousLink] = useState(
    "https://wa.me/5534996325424?text=Ol%C3%A1%2C+tudo+bem%3F+Tenho+d%C3%BAvidas+sobre+o+treinamento+InsiderHOF.+Pode+me+ajudar%3F"
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
        oldPrice: Number(oldPrice),
        type,

        slug,
        eventName,
        eventHeadline,
        eventDescription,

        eventImg,
        eventBtn,
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
        productHeadline,
        productDescription,
        //productPrice,
        //productInstallments,
        productVideo,
        //productDiscount,
        //productDiscountText,
        productWaitLink,
        productBtn,
        talktousLink,

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
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row py-lg-2 px-lg-6" style={{ flex: 1 }}>
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do lançamento
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
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
                Descrição
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                // as='textarea'
                // rows={2}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Slug. Ex: mai23
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={slug}
                onChange={(e: any) => setSlug(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o slug
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do evento
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={eventName}
                onChange={(e: any) => setEventName(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do evento
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Headline do evento
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={eventHeadline}
                onChange={(e: any) => setEventHeadline(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do evento
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Descrição do evento
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={eventDescription}
                onChange={(e: any) => setEventDescription(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do evento
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Imagem
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={eventImg}
                onChange={(e: any) => setEventImg(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o eventImg
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Botão de cadastro
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={eventBtn}
                onChange={(e: any) => setEventBtn(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o eventBtn
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Link do Grupo do WhatsApp
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={eventGroupLink}
                onChange={(e: any) => setEventGroupLink(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o eventGroupLink
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do Expert
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={expertName}
                onChange={(e: any) => setExpertName(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do expert
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                CPL1
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={cpl1}
                onChange={(e: any) => setCpl1(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o CPL1
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                CPL2
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={cpl2}
                onChange={(e: any) => setCpl2(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o CPL2
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                CPL3
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={cpl3}
                onChange={(e: any) => setCpl3(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o CPL3
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Data de abertura do carrinho
              </Form.Label>
              <DatePicker
                locale="ptBR"
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                //dateFormat="dd/MM/yyyy hh:mm"
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
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Data de fechamento do carrinho
              </Form.Label>
              <DatePicker
                locale="ptBR"
                showTimeSelect
                //dateFormat="Pp"
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
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Formulário do lead
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={leadForm}
                onChange={(e: any) => setLeadForm(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o formulário
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Domínio
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={domain}
                onChange={(e: any) => setDomain(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o domínio
              </Form.Control.Feedback>
            </Form.Group>
            <br />
          </div>
          <div className="flex-row py-lg-2 px-lg-6" style={{ flex: 1 }}>
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do produto
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productName}
                onChange={(e: any) => setProductName(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productName
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Headline do produto
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productHeadline}
                onChange={(e: any) => setProductHeadline(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productHeadline
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Descrição do produto
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productDescription}
                onChange={(e: any) => setProductDescription(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productDescription
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            {/* <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">Preço base</Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productPrice}
                onChange={(e: any) => setProductPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productPrice
              </Form.Control.Feedback>
            </Form.Group>
            <br /> */}
            {/* <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">Parcelas</Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productInstallments}
                onChange={(e: any) => setProductInstallments(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productInstallments
              </Form.Control.Feedback>
            </Form.Group>
            <br /> */}
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Video de vendas (opcional)
              </Form.Label>
              <Form.Control
                placeholder=""
                value={productVideo}
                onChange={(e: any) => setProductVideo(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productVideo
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            {/* <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">Desconto</Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productDiscount}
                onChange={(e: any) => setProductDiscount(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productDiscount
              </Form.Control.Feedback>
            </Form.Group>
            <br /> */}
            {/* <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">Texto do desconto</Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productDiscountText}
                onChange={(e: any) => setProductDiscountText(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productDiscountText
              </Form.Control.Feedback>
            </Form.Group>
            <br /> */}
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Grupo de espera
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productWaitLink}
                onChange={(e: any) => setProductWaitLink(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productWaitLink
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Botão de compra
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={productBtn}
                onChange={(e: any) => setProductBtn(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o productBtn
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Fale conosco
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={talktousLink}
                onChange={(e: any) => setTalktousLink(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o talktousLink
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Grupo da turma
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={paidGroup}
                onChange={(e: any) => setPaidGroup(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o paidGroup
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Vídeo onboarding (opcional)
              </Form.Label>
              <Form.Control
                placeholder=""
                value={onboardingVideo}
                onChange={(e: any) => setOnboardingVideo(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o onboardingVideo
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Página de checkout externa (opcional)
              </Form.Label>
              <Form.Control
                placeholder=""
                value={checkoutPage}
                onChange={(e: any) => setCheckoutPage(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o checkoutPage
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Parcelas
              </Form.Label>
              <Form.Control
                placeholder=""
                value={installments}
                onChange={(e: any) => setInstallments(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as Parcelas
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                renovationTime
              </Form.Label>
              <Form.Control
                placeholder=""
                value={renovationTime}
                onChange={(e: any) => setRenovationTime(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as Parcelas
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                renovationPrice
              </Form.Label>
              <Form.Control
                placeholder=""
                value={renovationPrice}
                onChange={(e: any) => setRenovationPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as Parcelas
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
              antecipateRenovationPrice
              </Form.Label>
              <Form.Control
                placeholder=""
                value={antecipateRenovationPrice}
                onChange={(e: any) => setAntecipateRenovationPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as Parcelas
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                renovationDescriptionxxx
              </Form.Label>
              <Form.Control
                placeholder=""
                value={renovationDescription}
                onChange={(e: any) => setRenovationDescription(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as Parcelas
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                renovationInstallmentsyyy
              </Form.Label>
              <Form.Control
                placeholder=""
                value={renovationInstallments}
                onChange={(e: any) => setRenovationInstallments(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as Parcelas
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Aviso: Ex: REFERENTE À ENTRADA PARA MATRÍCULA, O RESTANTE NO DIA
                DO CURSO.
              </Form.Label>
              <Form.Control
                placeholder=""
                value={aviso}
                onChange={(e: any) => setAviso(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o aviso
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            Início Inscrição Lead:{" "}
            {MOMENT(leadSignUpStartDate).format("DD/MM/YYYY")}
            <br />
            Fechamento Inscrição Lead:{" "}
            {MOMENT(leadSignUpEndDate).format("DD/MM/YYYY")}
            <br />
            <br />
            CPL1: {MOMENT(dateCpl1).format("DD/MM/YYYY")}
            <br />
            CPL2: {MOMENT(dateCpl2).format("DD/MM/YYYY")}
            <br />
            CPL3: {MOMENT(dateCpl3).format("DD/MM/YYYY")}
            <br />
            <br />
            Abertura Carrinho: {MOMENT(cartOpenDate).format(
              "DD/MM/YYYY HH:mm"
            )}{" "}
            <br />
            Fechamento Carrinho:{" "}
            {MOMENT(cartCloseDate).format("DD/MM/YYYY HH:mm")}
            <br />
          </div>
        </div>
        <div className="d-flex flex-stack pt-2 justify-content-start py-lg-2 px-lg-6">
          <Button
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
