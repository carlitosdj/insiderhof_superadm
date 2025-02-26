import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";

import { Wppgroup } from "../../../../store/ducks/wppgroup/types";

import { updateWppgroupRequest } from "../../../../store/ducks/wppgroup/actions";
import { KTIcon } from "../../../../_metronic/helpers";

interface handleCloseProps {
  handleClose: () => void;
  child: Wppgroup;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const wppgroup = useSelector((state: ApplicationState) => state.wppgroup);
  const [name, setName] = useState<string | undefined>("");
  const [url, setUrl] = useState<string | undefined>("");
  const [clicks, setClicks] = useState<number | undefined>(0);

  useEffect(() => {
    console.log("CHILD", child);
    setName(child.name);
    setUrl(child.url);
    setClicks(child.clicks);
    // setOrder(child.order)
  }, [child]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("submit", wppgroup);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (name && url) {
      var data = new Date();
      const componentToUpdate: Wppgroup = {
        id: child.id,
        name,
        url,
        //createdAt: data.getTime() / 1000, //updated_at
        status: "1",
        clicks,
      };

      console.log("------------------ COMPONENT TO UPDATE", componentToUpdate);
      dispatch(updateWppgroupRequest(componentToUpdate));
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
                Nome do grupo
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                name="name"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do grupo
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Url
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={url}
                onChange={(e: any) => setUrl(e.target.value)}
                // as="textarea" rows={3}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a url do grupo
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Cliques
              </Form.Label>
              <Form.Control
                placeholder=""
                required
                value={clicks}
                onChange={(e: any) => setClicks(+e.target.value)}
                // as="textarea" rows={3}
                name="clicks"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o numero de cliques
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
    </>
  );
};
export default Update;
