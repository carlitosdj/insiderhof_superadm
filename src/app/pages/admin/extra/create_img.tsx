import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
// import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { createExtraRequest } from "../../../../store/ducks/component/actions";
import { Extras } from "../../../../store/ducks/extras/types";
import axios from "axios";
import api from "../../../../services/api";
import { Component } from "../../../../store/ducks/component/types";
import { KTIcon } from "../../../../_metronic/helpers";

// type ParamTypes = {
//   id: string
// }

interface createImgProps {
  handleClose: () => void;
  component: Component;
}

const Extra = ({ handleClose, component }: createImgProps) => {
  // const [sending, setSending] = useState(false)
  // const [keyExtra, setkeyExtra] = useState('image')
  // const [valueExtra, setvalueExtra] = useState('')
  const [validated, setValidated] = useState(false);

  const [selectedFile, setSelectedFile] = useState<any>();
  // const [isFilePicked, setIsFilePicked] = useState(false)
  const [isSelected, setIsSelected] = useState(false);
  // const {id} = useParams<ParamTypes>()
  // const history = useNavigate()
  const dispatch = useDispatch();
  // const component = useSelector((state: ApplicationState) => state.component)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (selectedFile) {
      const formdata = new FormData();
      formdata.append("file", selectedFile, selectedFile.name);

      console.log("[formData]", formdata);
      console.log("selectedFile", selectedFile);

      // axios
      //   .post('https://institutodefelicibus.com.br/apiviolaofeeling/upload', formdata, {})
      api.post("/upload", formdata, {}).then((res) => {
        // then print response status
        console.log("RESSSS", res);
        var date = new Date();
        const extra: Extras = {
          keyExtra: "img",
          valueExtra: res.data.filename,
          componentId: component.id,
          //createdAt: date.getTime() / 1000,
          status: "1",
        };
        console.log("extra to save:", extra);
        console.log("component:", component);

        dispatch(createExtraRequest(extra));
        handleClose();
      });
    }
  };

  // const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <>
      {/* <Form noValidate validated={validated} onSubmit={handleSubmit} encType={'multipart/form-data'}>  */}
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="d-flex flex-column flex-xl-row flex-row-fluid">
          <div className="flex-row-fluid py-lg-2 px-lg-6">
            <Form.Group>
              <Form.Control
                required
                name="file"
                id="exampleFormControlFile1"
                type="file"
                // label="Selecione um arquivo"
                onChange={changeHandler}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Selecione um arquivo
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
      <br />
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
    </>
  );
};
export default Extra;
