import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { updateSupportRequest } from "../../../../store/ducks/support/actions";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

interface handleCloseProps {
  handleClose: () => void;
  child: any;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const [status, setStatus] = useState<string | undefined>("");
  const [reply, setReply] = useState<string | undefined>("");
  const [validated, setValidated] = useState<boolean>(false);

  const me = useSelector((state: ApplicationState) => state.me);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    console.log("handle submit");
    setValidated(true);
    // if(reply){
    var data = new Date();
    const supportToUpdate: any = {};
    supportToUpdate.id = child.id;
    supportToUpdate.reply = reply;
    supportToUpdate.status = Number(status);
    supportToUpdate.adminId = me.me.id!;
    //supportToUpdate.repliedAt = data

    console.log("support", supportToUpdate);
    dispatch(updateSupportRequest(supportToUpdate));
    handleClose();

    // }
  };

  useEffect(() => {
    setStatus(child.status);
    setReply(child.reply);
  }, []);

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <h3>{child.parentUser.name}:</h3>
            {child.message}
            <br/><br/>
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Resposta
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder=""
                value={reply}
                onChange={(e: any) => setReply(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor o reply
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Status
              </Form.Label>
              <Form.Control
                placeholder=""
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o endereço
              </Form.Control.Feedback>
            </Form.Group>
            
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
export default Update;
