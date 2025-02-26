import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import api from "../../../../services/api";
import { KTIcon } from "../../../../_metronic/helpers";
import { Class } from "../../../../store/ducks/dclass/types";
import { ClassExtra } from "../../../../store/ducks/dclassextra/types";
import { createClassExtraRequest } from "../../../../store/ducks/dclassextra/actions";


interface createImgProps {
  handleClose: () => void;
  classId: number;
}

const CreateImage = ({ handleClose, classId }: createImgProps) => {

  const [validated, setValidated] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isSelected, setIsSelected] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

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

      api.post("/upload", formdata, {}).then((res) => {
        // console.log("RESSSS", res);
        const extra: ClassExtra = {
          key: "img",
          value: res.data.filename,
          classId,
          name,
        };
        console.log("extra to save:", extra);

        dispatch(createClassExtraRequest(extra));
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
          <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome de exibição
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>
            <br/>
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
export default CreateImage;
