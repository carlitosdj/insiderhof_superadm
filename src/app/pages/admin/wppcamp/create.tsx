import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { createCampRequest } from "../../../../store/ducks/wppcamp/actions";
import { Wppcamp } from "../../../../store/ducks/wppcamp/types";
import { KTIcon } from "../../../../_metronic/helpers";
// import {ApplicationState} from '../../../../store'
// import { Modal } from 'react-bootstrap'
// interface ParamTypes {
//   id: string
// }

interface handleCloseProps {
  handleClose: () => void;
}

const Create = ({ handleClose }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [maxclicks, setMaxclics] = useState<number>(0);

  const [validated, setValidated] = useState(false);
  // const {id} = useParams<ParamTypes>();
  // const history = useHistory();
  const dispatch = useDispatch();
  // const wppcamp = useSelector((state: ApplicationState) => state.wppcamp)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (name && description && slug && maxclicks) {
      var data = new Date();
      const component: Wppcamp = {
        name,
        description,
        //createdAt: data.getTime() / 1000,
        status: "1",
        slug,
        maxclicks: +maxclicks,
      };
      console.log("component to save:", component);
      dispatch(createCampRequest(component));
      handleClose();
      // history.goBack()
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">Nome da campanha</Form.Label>
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
              <Form.Label className="required fw-bold fs-6 mb-5">Descrição</Form.Label>
              <Form.Control
                placeholder=""
                required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                as="textarea"
                rows={3}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromSlug">
              <Form.Label className="required fw-bold fs-6 mb-5">Slug</Form.Label>
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
            <Form.Group controlId="fromMaxclicks">
              <Form.Label className="required fw-bold fs-6 mb-5">Max cliques</Form.Label>
              <Form.Control
                placeholder=""
                required
                value={maxclicks}
                onChange={(e: any) => setMaxclics(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o max clicks
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
