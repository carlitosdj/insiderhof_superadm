import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

//import { createExtraRequest } from "../../../../store/ducks/component/actions";
import { Extras } from "../../../../store/ducks/extras/types";
import { ApplicationState } from "../../../../store";
//import { Component } from "../../../../store/ducks/component/types";
import { KTIcon } from "../../../../_metronic/helpers";

// interface ParamTypes {
//   id: string
// }

interface createVideoProps {
  handleClose: () => void;
  //component: Component;
}

const Create = ({ handleClose }: createVideoProps) => {
  const [keyExtra, setkeyExtra] = useState("url");
  const [valueExtra, setvalueExtra] = useState("");
  const [validated, setValidated] = useState(false);
  // const {id} = useParams<ParamTypes>();
  // const history = useHistory();
  const dispatch = useDispatch();
  // const component = useSelector((state: ApplicationState) => state.component)

  //console.log("Component inside - create", component);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (keyExtra && valueExtra) {
      var data = new Date();
      const extra: Extras = {
        keyExtra,
        valueExtra,
        //componentId: component.id,
        //createdAt: data.getTime() / 1000,
        status: "1",
      };
      console.log("extra to save:", extra);
      //console.log("component:", component);

      //dispatch(createExtraRequest(extra));

      handleClose();
      /* history.goBack() */
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do componente
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={keyExtra}
                onChange={(e: any) => setkeyExtra(e.target.value)}
                disabled
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Endereço (url)
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={valueExtra}
                onChange={(e: any) => setvalueExtra(e.target.value)}
                className="form-control form-control-lg form-control-solid"
                // as="textarea" rows={3}
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
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
export default Create;
