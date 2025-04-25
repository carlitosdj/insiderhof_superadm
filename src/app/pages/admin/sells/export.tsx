import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";

import { User } from "../../../../store/ducks/me/types";
import ReactToPrint, { useReactToPrint } from "react-to-print";

import * as XLSX from "xlsx";
import { Button } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { ComponentToPrint } from "./ComponentToPrint";

const MOMENT = require("moment");

interface handleCloseProps {
  handleClose: () => void;
}

const ExportSell = ({ handleClose }: handleCloseProps) => {
  // const {id} = useParams();
  //const dispatch = useDispatch();
  useEffect(() => {}, []);

  const carts = useSelector((state: ApplicationState) => state.carts);
  console.log("carts", carts);

  const toExcel = () => {
    let precobasetotal = 0;
    let precopagototal = 0;
    let recebidototal = 0;
    let taxamaquinatotal = 0;
    let taxaparcelamentototal = 0;

    const MYdata = carts.selectedCarts.map((cart, index): any => {
      precobasetotal += Number(cart.price)!;
      precopagototal += Number(cart.total_paid_amount)!;
      recebidototal += Number(cart.net_received_amount);
      taxamaquinatotal += Number(cart.mercadopago_fee);
      taxaparcelamentototal += Number(cart.financing_fee);

      return {
        Id: cart.id,
        Data: cart.createdAt,
        Usuário: cart.user?.name,
        Email: cart.user?.email,
        Documento: `${cart.user?.type} ${cart.user?.cpf}`,
        Endereço: `${cart.user?.address}, ${cart.user?.addressNumber}, ${cart.user?.addressDistrict}, ${cart.user?.addressComplement}. ${cart.user?.city?.name}/${cart.user?.state?.state}. ${cart.user?.postalCode}`,
        Telefone: cart.user?.whatsapp,
        Produto: cart.launch?.name,
        "Preço/Base": cart.price,
        "N/Parcelas": cart.installments,
        Parcela: cart.installment_amount,
        Gateway: cart.gateway,
        Método: cart.paymentmethod,
        REF: cart.idreference,
        "Preço/pago": cart.total_paid_amount,
        Recebido: cart.net_received_amount,
        "Taxa/Maquina": cart.mercadopago_fee,
        "Taxa/Parcelamento": cart.financing_fee,
      };
    });

    MYdata.push({
        Id: '',
        Data: '',
        Usuário: '',
        Email: '',
        Documento: '',
        Endereço: '',
        Telefone: '',
        Produto: '',
        "Preço/Base": precobasetotal,
        "N/Parcelas": '',
        Parcela: '',
        Gateway: '',
        Método: '',
        REF: '',
        "Preço/pago": precopagototal,
        Recebido: recebidototal,
        "Taxa/Maquina": taxamaquinatotal,
        "Taxa/Parcelamento": taxaparcelamentototal,
    })


    const worksheet = XLSX.utils.json_to_sheet(MYdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      "InsiderHOF-" + MOMENT(Date()).format("DD_MM_YYYY-HH_mm") + ".xlsx"
    );
  };

  const componentRef = useRef(null);
  const pageStyle = `{ size: 2.5in 4in }`;

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <button type="button" className="btn btn-light-primary me-3">
            <KTIcon iconName="printer" className="fs-2" />
            Imprimir
          </button>
        )}
        content={() => componentRef.current}
        pageStyle={pageStyle}
      />
      &nbsp;&nbsp;
      <button
        type="button"
        onClick={toExcel}
        className="btn btn-light-primary me-3"
      >
        <KTIcon iconName="exit-up" className="fs-2" />
        Exportar para Excel
      </button>
      <br />
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} data={carts.selectedCarts} />
      </div>
      <br />
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <span>Dados: {carts.selectedCarts.length}</span>
          <br />
          <br />
          {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}
          {carts.selectedCarts.map((cart, index) => {
            // var data = new Date(apiResponse.createdAt*1000);
            // let createdAt = MOMENT(Number(user.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
            // var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
            var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
            var dst = "$1.$2.$3-$4";
            var cpfformat = cart.user?.cpf?.replace(src, dst);
            return (
              <div key={index}>
                <h1>{cart.user?.name}</h1>
                <span className="text-gray-900 fw-bold fs-6">
                  Id da compra:{" "}
                </span>
                <span className="text-gray-900 fs-6">{cart.id}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Data: </span>
                <span className="text-gray-900 fs-6">{cart.createdAt}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Email: </span>
                <span className="text-gray-900 fs-6">{cart.user?.email}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Documento: </span>
                <span className="text-gray-900 fs-6">{cart.user?.type} {cart.user?.cpf}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Endereço: </span>
                <span className="text-gray-900 fs-6">
                  Endereço: {cart.user?.address}, {cart.user?.addressNumber},{" "}
                  {cart.user?.addressDistrict} {cart.user?.addressComplement? ", " + cart.user?.addressComplement : ""} - {cart.user?.city?.name} /{" "}
                  {cart.user?.state?.name} - {cart.user?.postalCode}
                </span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Telefone: </span>
                <span className="text-gray-900 fs-6">
                  {cart.user?.whatsapp}
                </span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Produto: </span>
                <span className="text-gray-900 fs-6">{cart.launch?.name}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Preço/base: </span>
                <span className="text-gray-900 fs-6">{cart.price}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">N/Parcelas: </span>
                <span className="text-gray-900 fs-6">{cart.installments}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Parcela: </span>
                <span className="text-gray-900 fs-6">{cart.installment_amount}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Gateway: </span>
                <span className="text-gray-900 fs-6">{cart.gateway}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Método: </span>
                <span className="text-gray-900 fs-6">{cart.paymentmethod}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">REF: </span>
                <span className="text-gray-900 fs-6">{cart.idreference}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Preço/pago: </span>
                <span className="text-gray-900 fs-6">{cart.total_paid_amount}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Recebido: </span>
                <span className="text-gray-900 fs-6">{cart.net_received_amount}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Taxa/Maquina: </span>
                <span className="text-gray-900 fs-6">{cart.mercadopago_fee}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Taxa/Parcelamento: </span>
                <span className="text-gray-900 fs-6">{cart.financing_fee}</span>
                <br />

                <br />


                {/* Última renovação: {createdAt.format('DD/MM/YYYY HH:mm')} */}
              </div>
            );
          })}

          {/* <p></p> */}
          {/* <p>Está em quais cursos: </p> */}
        </div>
      </div>
    </>
  );
};
export default ExportSell;
