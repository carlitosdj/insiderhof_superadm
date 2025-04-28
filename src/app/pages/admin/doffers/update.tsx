import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import { Offer } from "../../../../store/ducks/doffer/types";
import { updateOfferRequest } from "../../../../store/ducks/doffer/actions";
import SelectImg from "../../crop/SelectImg";
import api from "../../../../services/api";

import momentDurationFormatSetup from "moment-duration-format";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: Offer;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  //const component = useSelector((state: ApplicationState) => state.component);

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [type, setType] = useState("");

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState("");

  const [selectedFileLogo, setSelectedFileLogo] = useState<any>();
  const [logoCertificate, setLogoCertificate] = useState<any>("");
  useEffect(() => {
    setName(child.name);
    setDescription(child.description);
    setOldPrice(child.oldPrice!.toString());
    setPrice(child.price!.toString());
    setType(child.type!);
    setImage(child.image!);
    setStatus(child.status!);
    setLogoCertificate(child.logoCertificate!);
  }, [child.name, child.description]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (name) {
      let imageFilename = child.image; // Se não trocar a imagem, mantém a atual
      let logoFilename = child.logoCertificate; // <- ATENÇÃO: você precisa ter o campo "logo" no Offer

      // Se selecionou nova imagem principal
      if (selectedFile && croppedImage) {
        console.log("Tem imagem!")
        const formdata = new FormData();
        formdata.append("file", croppedImage, "dfl.jpg");

        const res = await api.post("/upload", formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageFilename = res.data.filename;
      }

      // Se selecionou novo logo
      if (selectedFileLogo) {
        console.log("Tem logo!")
        const formdataLogo = new FormData();
        formdataLogo.append("file", selectedFileLogo);

        const resLogo = await api.post("/upload", formdataLogo, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        logoFilename = resLogo.data.filename;
      }

      const componentToUpdate: Offer = {
        id: child.id,
        name,
        description,
        price: Number(price),
        oldPrice: Number(oldPrice),
        type,
        image: imageFilename, // novo ou atual
        logoCertificate: logoFilename, // novo ou atual
        status: status!,
      };

      dispatch(updateOfferRequest(componentToUpdate));
      handleClose();
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
                placeholder=""
                required
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                name="name"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe o nome do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />

            <Form.Group controlId="formDescription">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Descrição
              </Form.Label>
              <Form.Control
                placeholder=""
                //required
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                as="textarea"
                rows={8}
                name="description"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe a descrição do produto
              </Form.Control.Feedback>
            </Form.Group>
            <br />
          </div>
          <div className="col-lg-6">
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Preço Antigo
              </Form.Label>
              <Form.Control
                placeholder=""
                value={oldPrice.toString()}
                onChange={(e: any) => setOldPrice(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Preço
              </Form.Label>
              <Form.Control
                placeholder=""
                value={price.toString()}
                onChange={(e: any) => setPrice(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            {/* <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Image
              </Form.Label>
              <Form.Control
                placeholder=""
                value={image.toString()}
                onChange={(e: any) => setImage(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group> */}
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
            {logoCertificate && (
              <div style={{ marginBottom: "10px" }}>
                <img
                  src={`https://app.insiderhof.com.br/files/${logoCertificate}`}
                  alt="Logo Atual"
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
            )}
            <Form.Group>
              <Form.Label>Selecione um logo para o certificado</Form.Label>
              <Form.Control
                name="image"
                id="image"
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
