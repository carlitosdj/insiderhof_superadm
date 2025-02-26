import React from "react";
const MOMENT = require("moment");

interface Props {
  data: any[];
}
// Using a class component, everything works without issue
export class ComponentToPrint extends React.Component<Props> {
  render() {
    var now = MOMENT(Date()).utc().format("DD/MM/YYYY HH:mm");
    return (
      <div style={{ color: "black" }}>
        <h1 style={{ color: "black" }}>Relatório Defelícibus Soluções</h1>
        <br />
        <h2 style={{ color: "black" }}>InsiderHOF</h2>
        <span style={{ color: "black" }}>
          Quantidade de dados: {this.props.data.length}
        </span>
        <br />
        <span style={{ color: "black" }}>{now}</span>

        <br />
        <br />
        {this.props.data.map((user) => {
          // var data = new Date(apiResponse.createdAt*1000);
          let createdAt = MOMENT(Number(user.createdAt) * 1000).utc(); //.format('DD/MM/YYYY HH:mm')
          var now = MOMENT(Date()).utc(); //.format('DD/MM/YYYY HH:mm')
          var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
          var dst = "$1.$2.$3-$4";
          var cpfformat = user.cpf?.replace(src, dst);
          return (
            <div>
              <h2 style={{ color: "black" }}>{user?.name}</h2>
              <span style={{ color: "black" }}>
                Referência Id: {"EL" + user.id}
              </span>
              <br />
              <span style={{ color: "black" }}>Email: {user.email}</span>
              <br />
              <span style={{ color: "black" }}>Whatsapp: {user.whatsapp}</span>
              <br />
              <span style={{ color: "black" }}>CPF: {cpfformat}</span>
              <br />
              <span style={{ color: "black" }}>
                Endereço: {user.address}, {user.addressNumber},{" "}
                {user.addressDistrict} - {user.city?.name} / {user.state?.name}{" "}
                - {user.postalCode}
              </span>
              <br />
              <span style={{ color: "black" }}>
                Última renovação:{" "}
                {MOMENT(user.createdAt).utc().format("DD/MM/YYYY HH:mm")}
              </span>
              <span className="text-gray-900 fw-bold fs-6">Turma: </span>
                <span className="text-gray-900 fs-6">{user.numTurma}</span>
              <div>
                {user.cart?.map((item: any) => (
                  <div className="p-4">
                    <span className="text-gray-900 fw-bold fs-6">Data: </span>
                    <span className="text-gray-900 fs-6">
                      {MOMENT(item.createdAt).format("DD/MM/YYYY HH:mm")}
                    </span>
                    <br />
                    <span className="text-gray-900 fw-bold fs-6">Método: </span>
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
              <br />

              {/* Última renovação: {createdAt.format('DD/MM/YYYY HH:mm')} */}
            </div>
          );
        })}
      </div>
    );
  }
}
