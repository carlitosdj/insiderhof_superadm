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

  const users = useSelector((state: ApplicationState) => state.users);
  console.log("user", users);

  const toExcel = () => {
    const MYdata = users.selectedUsers.map((user): any => {
      return {
        "Referência Id": "EL" + user.id,
        Nome: user.name,
        Endereço: user.address,
        Número: user.addressNumber,
        Bairro: user.addressDistrict,
        Cidade: user.city?.name,
        Estado: user.state?.name,
        "Código Postal": user.postalCode,
        "Data do registro": MOMENT(user.createdAt).format("DD/MM/YYYY HH:mm"),
        Email: user.email,
        Turma: user.numTurma,
        "Tipo Documento": user.type,
        "Número do Doc.": user.cpf,
        WhatsApp: user.whatsapp,
        "Meio de pagamento": user.cart.length
          ? user.cart[0].paymentmethod
          : "-",
        Parcelas: user.cart.length ? user.cart[0].installments : "-",
        "Preço base": user.cart.length ? user.cart[0].price : "-",
        "Mercado pago": user.cart.length ? user.cart[0].idreference : "-",
      };
    });

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
        <ComponentToPrint ref={componentRef} data={users.selectedUsers} />
      </div>
      <br />
      <div className="row g-5 gx-xxl-12">
        <div className="col-xxl-12">
          <span>Dados: {users.selectedUsers.length}</span>
          <br />
          <br />
          {/* <span className='text-dark fw-bolder fs-6'>Última renovação: {createdAt!.format('DD/MM/YYYY HH:mm')}</span>
          <br/> */}
          {users.selectedUsers.map((user) => {
            // var data = new Date(apiResponse.createdAt*1000);
            // let createdAt = MOMENT(Number(user.createdAt) * 1000) //.format('DD/MM/YYYY HH:mm')
            // var now = MOMENT(Date()) //.format('DD/MM/YYYY HH:mm')
            var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
            var dst = "$1.$2.$3-$4";
            var cpfformat = user.cpf?.replace(src, dst);
            return (
              <div>
                <h1>{user?.name}</h1>
                <span className="text-gray-900 fw-bold fs-6">
                  Referência Id:{" "}
                </span>
                <span className="text-gray-900 fs-6">{"EL" + user.id}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Email: </span>
                <span className="text-gray-900 fs-6">{user.email}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Whatsapp: </span>
                <span className="text-gray-900 fs-6">{user.whatsapp}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">CPF: </span>
                <span className="text-gray-900 fs-6">{cpfformat}</span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Endereço: </span>
                <span className="text-gray-900 fs-6">
                  Endereço: {user.address}, {user.addressNumber},{" "}
                  {user.addressDistrict} - {user.city?.name} /{" "}
                  {user.state?.name} - {user.postalCode}
                </span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">
                  Última renovação:{" "}
                </span>
                <span className="text-gray-900 fs-6">
                  {MOMENT(user.createdAt).format("DD/MM/YYYY HH:mm")}
                </span>
                <br />
                <span className="text-gray-900 fw-bold fs-6">Turma: </span>
                <span className="text-gray-900 fs-6">{user.numTurma}</span>
                <br />
                <div>
                  {user.cart?.map((item: any) => (
                    <div className="p-4">
                      <span className="text-gray-900 fw-bold fs-6">Data: </span>
                      <span className="text-gray-900 fs-6">
                        {MOMENT(item.createdAt).format("DD/MM/YYYY HH:mm")}
                      </span>
                      <br />
                      <span className="text-gray-900 fw-bold fs-6">
                        Método:{" "}
                      </span>
                      <span className="text-gray-900 fs-6">
                        {item.paymentmethod}
                      </span>
                      <br />
                      <span className="text-gray-900 fw-bold fs-6">
                        Parcelas:{" "}
                      </span>
                      <span className="text-gray-900 fs-6">
                        {item.installments}
                      </span>
                      <br />
                      <span className="text-gray-900 fw-bold fs-6">
                        Preço base:{" "}
                      </span>
                      <span className="text-gray-900  fs-6">{item.price}</span>
                      <br />
                      <span className="text-gray-900 fw-bold fs-6">
                        Mercado pago:{" "}
                      </span>
                      <span className="text-gray-900  fs-6">
                        {item.idreference}
                      </span>
                      <br />
                    </div>
                  ))}
                </div>
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
