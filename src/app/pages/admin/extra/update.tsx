import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

// import {useParams, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
//import { updateExtraRequest } from "../../../../store/ducks/component/actions";

import { Extras } from "../../../../store/ducks/extras/types";
import { CKEditor } from "ckeditor4-react";
//import { Component } from "../../../../store/ducks/component/types";
import { KTIcon } from "../../../../_metronic/helpers";

interface updateProps {
  handleClose: () => void;
  child: Extras;
  //component: Component;
}

const Update = ({ handleClose, child }: updateProps) => {
  const [validated, setValidated] = useState(false);
  //const component = useSelector((state: ApplicationState) => state.component)
  const [keyExtra, setkeyExtra] = useState<string | undefined>("");
  const [valueExtra, setvalueExtra] = useState<string | undefined>("");
  const [ckEditor, setCkEditor] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setkeyExtra(child.keyExtra);
    setvalueExtra(child.valueExtra);
  }, [child.keyExtra, child.valueExtra]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //console.log("submit", component.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (keyExtra && valueExtra) {
      var data = new Date();
      const extraToUpdate = {
        id: child.id,
        keyExtra,
        valueExtra,
        //createdAt: (data.getTime() / 1000).toString(), //updated_at
        status: "1",
      };
      console.log("------------------ COMPONENT TO UPDATE", extraToUpdate);

      //dispatch(updateExtraRequest(extraToUpdate));
      handleClose();
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
                name="name"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Button
              size="sm"
              className="btn btn-light-primary"
              onClick={() => setCkEditor(!ckEditor)}
            >
              <KTIcon iconName="arrow-mix" className="fs-2" />
              Trocar editor
            </Button>
            <br />
            <br />

            {!ckEditor ? (
              <Form.Group controlId="formDescription">
                <Form.Label className="required fw-bold fs-6 mb-5">
                  Descrição
                </Form.Label>
                <Form.Control
                  placeholder=""
                  //required
                  value={valueExtra}
                  onChange={(e) => setvalueExtra(e.target.value)}
                  as="textarea"
                  rows={3}
                  name="description"
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a descrição do produto
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              <CKEditor
                config={{ versionCheck: false }}
                initData={valueExtra}
                onChange={(e) => setvalueExtra(e.editor.getData())}
              />
            )}

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
