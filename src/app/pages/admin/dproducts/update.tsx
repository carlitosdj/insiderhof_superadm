import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";
import EventCreationModal from "../../../components/products/EventCreationModal";

import momentDurationFormatSetup from "moment-duration-format";
import api from "../../../../services/api";
import SelectImg from "../../crop/SelectImg";
import { Product } from "../../../../store/ducks/dproduct/types";
import { updateProductRequest } from "../../../../store/ducks/dproduct/actions";
const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

interface handleCloseProps {
  handleClose: () => void;
  child: Product;
}

const Update = ({ handleClose, child }: handleCloseProps) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  //const component = useSelector((state: ApplicationState) => state.component);
  const [name, setName] = useState<string | undefined>("");

  const [description, setDescription] = useState<string | undefined>("");
  const [status, setStatus] = useState<string>("1");

  const [duration, setDuration] = useState(0);

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [type, setType] = useState("");
  const previousTypeRef = useRef<string>("");

  const [selectedFile, setSelectedFile] = useState<any>();
  const [croppedImage, setCroppedImage] = useState<any>("");
  const [image, setImage] = useState("");

  // Event Creation Modal
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    setName(child.name);
    setDescription(child.description);
    setImage(child.image!);
    setStatus(child.status!);
    setPrice(child.price!.toString());
    setType(child.type!);
    setDuration(child.duration!);
    previousTypeRef.current = child.type!;
  }, [child.name, child.description]);

  // Detectar mudança de tipo para "event"
  useEffect(() => {
    console.log('🔍 [Update] useEffect - Tipo:', type, '| Anterior:', previousTypeRef.current);

    if (type === "event" && previousTypeRef.current !== "event" && previousTypeRef.current !== "") {
      console.log('✅ [Update] TIPO MUDOU PARA EVENT! Abrindo modal...');
      console.log('📦 [Update] ProductId:', child.id, '| ProductName:', name);
      // Tipo mudou para "event"
      setShowEventModal(true);
    } else if (type === "event" && previousTypeRef.current === "event") {
      console.log('ℹ️ [Update] Tipo já era event, não abre modal');
    } else if (type === "event" && previousTypeRef.current === "") {
      console.log('ℹ️ [Update] Inicialização, não abre modal');
    }

    previousTypeRef.current = type;
  }, [type]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //console.log("submit", component.data.id);
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    if (name) {
      if (selectedFile) {
        const formdata = new FormData();
        formdata.append("file", croppedImage, "dfl.jpg"); //selectedFile.name
        api.post("/upload", formdata, {}).then((res: any) => {
          const componentToUpdate: Product = {
            id: child.id,
            name,
            description,
            image: res.data.filename,
            status: status!,
            price: Number(price),
            type,
            duration: Number(duration)
          };
          dispatch(updateProductRequest(componentToUpdate));
        });
      } else {
        const componentToUpdate: Product = {
          id: child.id,
          name,
          description,
          status: status!,
          price: Number(price),
          type,
          duration: Number(duration)
        };
        dispatch(updateProductRequest(componentToUpdate));
      }
      handleClose();
    }
  };

  return (
    <>
      {/* Event Creation Modal */}
      <EventCreationModal
        show={showEventModal}
        productId={child.id!}
        productName={name || ""}
        onClose={() => setShowEventModal(false)}
        onSuccess={() => {
          // Atualizar lista ou mostrar mensagem de sucesso
          console.log("Evento e tickets criados com sucesso!");
        }}
      />

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
                Por favor informe o nome do curso
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
            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Tipo
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                Por favor informe o papel
              </Form.Control.Feedback>
              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="curso"
                    onChange={(e: any) => setType("curso")}
                    name="curso"
                    checked={type === "curso"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="curso">
                    <div className="fw-bolder text-gray-800">Curso</div>
                    <div className="text-gray-600">Treinamento online</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>

              <div className="separator separator-dashed my-5"></div>

              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="ebook"
                    onChange={(e: any) => setType("ebook")}
                    name="ebook"
                    checked={type === "ebook"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="ebook">
                    <div className="fw-bolder text-gray-800">E-book</div>
                    <div className="text-gray-600">Livro digital</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>

              <div className="separator separator-dashed my-5"></div>

              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="mentoria"
                    onChange={(e: any) => setType("mentoria")}
                    name="mentoria"
                    checked={type === "mentoria"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="mentoria">
                    <div className="fw-bolder text-gray-800">Mentoria</div>
                    <div className="text-gray-600">Mentoria ao vivo</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>
              <div className="separator separator-dashed my-5"></div>
              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="audiobook"
                    onChange={(e: any) => setType("audiobook")}
                    name="audiobook"
                    checked={type === "audiobook"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="audiobook">
                    <div className="fw-bolder text-gray-800">Audiobook</div>
                    <div className="text-gray-600">Livro em audio</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>
              <div className="separator separator-dashed my-5"></div>
              <div className="d-flex fv-row">
                <div className="form-check form-check-custom form-check-solid">
                  {/* begin::Input */}
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    id="event"
                    onChange={(e: any) => setType("event")}
                    name="event"
                    checked={type === "event"}
                  />
                  {/* end::Input */}
                  {/* begin::Label */}
                  <label className="form-check-label" htmlFor="event">
                    <div className="fw-bolder text-gray-800">Evento</div>
                    <div className="text-gray-600">Presencial</div>
                  </label>
                  {/* end::Label */}
                </div>
              </div>
            </Form.Group>
          </div>
          <div className="col-lg-6 py-lg-2 px-lg-6">
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

            <Form.Group controlId="fromName">
              <Form.Label className="required fw-bold fs-6 mb-5">
                Duração
              </Form.Label>
              <Form.Control
                placeholder=""
                value={duration.toString()}
                onChange={(e: any) => setDuration(e.target.value)}
                name="tags"
                className="form-control form-control-lg form-control-solid"
              />
              <Form.Control.Feedback type="invalid">
                Por favor informe as tags
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <SelectImg
              setSelectedFile={setSelectedFile}
              selectedFile={selectedFile}
              croppedImage={croppedImage}
              setCroppedImage={setCroppedImage}
              image={image}
              setImage={setImage}
            />
            <br />
          </div>
        </div>
        <br/>
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
