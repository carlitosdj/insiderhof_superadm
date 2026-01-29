import React from "react";
import { Cart } from "../../../../store/ducks/carts/types";
import moment from "moment";

interface Props {
  data: Cart[];
}
// Using a class component, everything works without issue
export class ComponentToPrint extends React.Component<Props> {
  render() {
    var now = moment(Date()).utc().format("DD/MM/YYYY HH:mm");
    return (
      <div style={{ color: "black" }}>
        <h1 style={{ color: "black" }}>Relatório de Vendas</h1>
        <br />
        <h2 style={{ color: "black" }}>InsiderHOF</h2>
        <span style={{ color: "black" }}>
          Quantidade de dados: {this.props.data.length}
        </span>
        <br />
        <span style={{ color: "black" }}>{now}</span>

        <br />
        <br />
        {this.props.data.map((cart) => {
          // var data = new Date(apiResponse.createdAt*1000);
          let createdAt = moment(Number(cart.user?.createdAt) * 1000).utc(); //.format('DD/MM/YYYY HH:mm')
          var now = moment(Date()).utc(); //.format('DD/MM/YYYY HH:mm')
          var src = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
          var dst = "$1.$2.$3-$4";
          var cpfformat = cart.user?.cpf?.replace(src, dst);
          return (
            <div>
              <h2 style={{ color: "black" }}>{cart.user?.name}</h2>
              <span style={{ color: "black" }}>
                Id da compra: {cart.user?.id}
              </span>
              <br />
              <span style={{ color: "black" }}>Data: {cart.createdAt}</span>
              <br />
              <span style={{ color: "black" }}>Email: {cart.user?.email}</span>
              <br />
              <span style={{ color: "black" }}>Dpcumento: {cart.user?.type} {cpfformat}</span>
              <br />
              <span style={{ color: "black" }}>
                Endereço: {cart.user?.address}, {cart.user?.addressNumber},{" "}
                {cart.user?.addressDistrict} {cart.user?.addressComplement? ", " + cart.user?.addressComplement : ""} - {cart.user?.city?.name} / {cart.user?.state?.name}{" "}
                - {cart.user?.postalCode}
              </span>
              <br />
              <span style={{ color: "black" }}>Telefone: {cart.user?.whatsapp}</span>
              <br />
              <span style={{ color: "black" }}>Produto: {cart.launch?.name}</span>
              <br />
              <span style={{ color: "black" }}>Preço/base: {cart.price}</span>
              <br />
              <span style={{ color: "black" }}>N/Parcelas: {cart.installments}</span>
              <br />
              <span style={{ color: "black" }}>Parcela: {cart.installment_amount}</span>
              <br />
              <span style={{ color: "black" }}>Gateway: {cart.gateway}</span>
              <br />
              <span style={{ color: "black" }}>Método: {cart.paymentmethod}</span>
              <br />
              <span style={{ color: "black" }}>REF: {cart.idreference}</span>
              <br />
              <span style={{ color: "black" }}>Preço/pago: {cart.total_paid_amount}</span>
              <br />
              <span style={{ color: "black" }}>Recebido: {cart.net_received_amount}</span>
              <br />
              <span style={{ color: "black" }}>Taxa/Maquina: {cart.mercadopago_fee}</span>
              <br />
              <span style={{ color: "black" }}>Taxa/Parcelamento: {cart.financing_fee}</span>
              <br />

              
             
              {/* <span style={{ color: "black" }}>
                Última renovação:{" "}
                {moment(cart.user?.createdAt).utc().format("DD/MM/YYYY HH:mm")}
              </span> */}
              
            
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
