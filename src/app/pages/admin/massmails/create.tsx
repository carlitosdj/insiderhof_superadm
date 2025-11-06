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

interface handleCloseProps {
  handleClose: () => void;
}

const Leads = ({ handleClose }: handleCloseProps) => {
  const dispatch = useDispatch();
  const lists = useSelector((state: ApplicationState) => state.lists);
  const me = useSelector((state: ApplicationState) => state.me);
  const currentProject = useSelector((state: ApplicationState) => state.projects.currentProject);
  const [list, setList] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ckEditor, setCkEditor] = useState(true);
  const [validated, setValidated] = useState(false);
  const [listCount, setListCount] = useState(0);

  // Carrega listas quando componente monta
  useEffect(() => {
    dispatch(loadListsRequest());
  }, [dispatch]);

  // Atualizar contagem quando lista mudar
  useEffect(() => {
    if (list && list !== "Selecione uma lista" && lists.data) {
      // Procurar nas listas pré-definidas
      const predefined = lists.data.predefinedLists?.find((l) => l.list === list);
      if (predefined) {
        setListCount(predefined.count);
        return;
      }

      // Procurar nas listas customizadas
      const custom = lists.data.customLists?.find((l) => l.list === list);
      if (custom) {
        setListCount(custom.count);
        return;
      }

      setListCount(0);
    } else {
      setListCount(0);
    }
  }, [list, lists.data]);

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
    console.log("list", list);
    console.log("subject", subject);
    console.log("message", message);
    
    const emailToListNew: EmailTolist = {
      list,
      subject,
      message,
      parentUser: me.me.id,
      user_id: me.me.id,
      status: "1",
      //createdAt: (data.getTime() / 1000).toString(),
    };
    dispatch(createEmailToListRequest(emailToListNew));
    handleClose();
  };

  return (
    <>
      <Form validated={validated} onSubmit={sendEmail}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <Form.Group>
              <Form.Control
                as="select"
                value={list}
                onChange={(e) => setList(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              >
                <option>Selecione uma lista</option>
                
                <option disabled>--Tudo--</option>
                {lists.data?.predefinedLists?.map((item, index) => (
                  <option key={`predefined-${index}`} value={item.list}>
                    {item.name} ({item.count.toLocaleString('pt-BR')} emails)
                  </option>
                ))}
                
                <option disabled>--Lista específica--</option>
                {lists.data?.customLists?.map((item, index) => (
                  <option key={`custom-${index}`} value={item.list}>
                    {item.list} ({item.count.toLocaleString('pt-BR')} emails)
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Badge informativo com total de disparos */}
            {list && list !== "Selecione uma lista" && (
              <div className="alert alert-info mt-3 d-flex align-items-center">
                <KTIcon iconName="envelope" className="fs-2x me-3" />
                <div>
                  <strong>Total de disparos:</strong>
                  <div className="fs-2 fw-bold text-primary">
                    {listCount.toLocaleString('pt-BR')} emails
                  </div>
                </div>
              </div>
            )}
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
