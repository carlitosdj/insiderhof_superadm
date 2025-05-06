import { useEffect, useState } from "react";
import { InputGroup, FormControl, Form, Button } from "react-bootstrap";
import { ApplicationState } from "../../../../store";
import { useSelector, useDispatch } from "react-redux";
import { loadListsRequest } from "../../../../store/ducks/lists/actions";
import { createEmailToListRequest } from "../../../../store/ducks/massmail/actions";
import { EmailTolist } from "../../../../store/ducks/massmail/types";
import Loading from "../../../loading";
import { CKEditor } from "ckeditor4-react";
import { KTIcon } from "../../../../_metronic/helpers";
import { SingleMail } from "../../../../store/ducks/singlemail/types";
import { createSingleMailRequest } from "../../../../store/ducks/singlemail/actions";

interface handleCloseProps {
  handleClose: () => void;
}

const Leads = ({ handleClose }: handleCloseProps) => {
  const dispatch = useDispatch();
  const lists = useSelector((state: ApplicationState) => state.lists);
  const me = useSelector((state: ApplicationState) => state.me);
  const [to, setTo] = useState("");
  const [userId, setUserId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ckEditor, setCkEditor] = useState(true);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch]);

  // console.log('listsxxx', lists)
  // console.log('emailToList', emailToList)
  // console.log('me', me)

  if (lists.loading) return <Loading />;

  const sendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    console.log("send");
    console.log("to", to);
    console.log("subject", subject);
    console.log("message", message);
    
    const emailToListNew: SingleMail = {
      to,
      subject,
      message,
      status: "1",
      userId: Number(userId),
      //createdAt: (data.getTime() / 1000).toString(),
    };
    dispatch(createSingleMailRequest(emailToListNew));
    handleClose();
  };

  return (
    <>
      <Form validated={validated} onSubmit={sendEmail}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Email"
                aria-label="email"
                aria-describedby="basic-addon2"
                value={to}
                onChange={(e: any) => setTo(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <FormControl
                placeholder="UserId"
                aria-label="userId"
                aria-describedby="basic-addon2"
                value={userId}
                onChange={(e: any) => setUserId(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Assunto"
                aria-label="Assunto"
                aria-describedby="basic-addon2"
                value={subject}
                onChange={(e: any) => setSubject(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
            </InputGroup>

            {/* <Button size='sm' className='btn btn-info' onClick={() => setCkEditor(!ckEditor)}>
          Trocar editor
        </Button> */}
            {/* <br /> */}
            <br />
            {!ckEditor ? (
              <InputGroup>
                {/* <InputGroup.Prepend> */}
                <InputGroup.Text>Mensagem</InputGroup.Text>
                {/* </InputGroup.Prepend> */}
                <FormControl
                  as="textarea"
                  aria-label="With textarea"
                  rows={10}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </InputGroup>
            ) : (
              <CKEditor
                config={{ versionCheck: false }}
                initData={message}
                onChange={(e: any) => setMessage(e.editor.getData())}
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

export default Leads;
