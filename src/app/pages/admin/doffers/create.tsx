import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import { Offer } from "../../../../store/ducks/doffer/types";
import { createOfferRequest } from "../../../../store/ducks/doffer/actions";
import SelectImg from "../../crop/SelectImg";
import api from "../../../../services/api";

import momentDurationFormatSetup from "moment-duration-format";
import moment from "moment";
momentDurationFormatSetup(moment);

interface handleCloseProps {
  handleClose: () => void;
}

const Create = ({ handleClose }: handleCloseProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const [validated, setValidated] = useState(false);
  
  // const [price, setPrice] = useState("");
  const [type, setType] = useState("curso");

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState<any>("");


  const [selectedFileLogo, setSelectedFileLogo] = useState<any>();
  //const [imageLogo, setImageLogo] = useState<any>("");
  //console.log("selectedFileLogo", selectedFileLogo)
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  
    if (name) {
      try {
        let imageFilename = "";
        let logoFilename = "";
  
        // Se houver imagem principal
        if (selectedFile && croppedImage) {
          const formdata = new FormData();
          formdata.append("file", croppedImage, "dfl.jpg");
          const res = await api.post("/upload", formdata, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          imageFilename = res.data.filename;
        }
  
        // Se houver logo
        if (selectedFileLogo) {
          const formdataLogo = new FormData();
          formdataLogo.append("file", selectedFileLogo);
          const resLogo = await api.post("/upload", formdataLogo, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          logoFilename = resLogo.data.filename;
        }
  
        const offer: Offer = {
          name,
          description,
          //price: Number(price),
          type,
          ownerId: me.me.id,
          image: imageFilename,  // Principal
          logoCertificate: logoFilename,    // Logo
        };
  
        dispatch(createOfferRequest(offer));
        handleClose();
      } catch (error) {
        console.error("Erro no envio:", error);
      }
    }
  };

  return (
    <>
      <Form validated={validated} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 py-lg-2 px-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Nome do produto
              </Form.Label>
              <Form.Control
                className="form-control form-control-lg form-control-solid"
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                autoFocus
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="fw-bold fs-6 mb-5">Descrição</Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                as="textarea"
                rows={8}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição
              </Form.Control.Feedback>
            </Form.Group>

            <br />
            
          </div>
          <div className="col-lg-6 py-lg-2 px-lg-6">
            

            {/* <Form.Group controlId="fromName">
              <Form.Label className="fw-bold fs-6 mb-5">Preço</Form.Label>
              <Form.Control
                placeholder=""
                value={price}
                onChange={(e: any) => setPrice(e.target.value)}
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a ordem
              </Form.Control.Feedback>
            </Form.Group>
            <br /> */}

            <SelectImg
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              image={image}
              setImage={setImage}
            />


            <br />
            Logo:
            <Form.Group>
              <Form.Label>Selecione um logo para o certificado</Form.Label>
              <Form.Control
                name="imageLogo"
                id="imageLogo"
                type="file"
                accept="image/png"
                onChange={(e: any) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFileLogo(e.target.files[0]);
                  }
                }}
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
              />
              <Form.Control.Feedback type="invalid">
                Selecione um arquivo
              </Form.Control.Feedback>
            </Form.Group>
            
            <br/>

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
