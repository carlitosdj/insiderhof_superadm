import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createEventRequest } from "../../../../store/ducks/events/actions";
import { loadMyProductsRequest } from "../../../../store/ducks/dproduct/actions";
import { Event } from "../../../../store/ducks/events/types";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";

import moment from "moment";

interface handleCloseProps {
  handleClose: () => void;
}

// Função para gerar slug
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim();
};

const Create = ({ handleClose }: handleCloseProps) => {
  const dispatch = useDispatch();
  const currentProject = useSelector((state: ApplicationState) => state.projects.currentProject);
  const products = useSelector((state: ApplicationState) => state.product);

  const [validated, setValidated] = useState(false);

  // Produto
  const [productOption, setProductOption] = useState<"existing" | "new">("existing");
  const [selectedProductId, setSelectedProductId] = useState<number | "">("");
  const [newProductName, setNewProductName] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState<number>(0);

  // Evento
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState<number>(100);
  const [status, setStatus] = useState<Event['status']>("draft");

  // Carregar produtos do projeto ao montar
  useEffect(() => {
    if (currentProject?.id) {
      dispatch(loadMyProductsRequest(currentProject.id));
    }
  }, [dispatch, currentProject?.id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Validações customizadas
    if (productOption === "existing" && !selectedProductId) {
      alert("Por favor, selecione um produto existente ou escolha criar um novo produto.");
      return;
    }

    if (productOption === "new" && !newProductName.trim()) {
      alert("Por favor, informe o nome do novo produto.");
      return;
    }

    setValidated(true);

    const slug = generateSlug(name);

    const newEvent: any = {
      name,
      description,
      slug,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      location,
      address,
      capacity,
      status,
      projectId: currentProject?.id,
    };

    // Se for produto existente, adiciona o productId
    if (productOption === "existing") {
      newEvent.productId = selectedProductId;
    } else {
      // Se for novo produto, envia os dados do produto para criar junto
      newEvent.newProduct = {
        name: newProductName,
        description: newProductDescription,
        price: newProductPrice,
        type: "event",
        projectId: currentProject?.id,
      };
    }

    dispatch(createEventRequest(newEvent));
    handleClose();
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex flex-column">
        <div className="flex-row-fluid py-lg-2 px-lg-6">

          {/* Seção: Produto */}
          <div className="mb-8">
            <h4 className="fw-bold mb-5">1. Produto Relacionado</h4>
            <Alert variant="info" className="d-flex align-items-center p-5">
              <KTIcon iconName="information-5" className="fs-2hx text-info me-4" />
              <div className="d-flex flex-column">
                <span className="fw-bold">Todo evento precisa estar vinculado a um produto.</span>
                <span className="text-muted fs-7">
                  Você pode selecionar um produto existente ou criar um novo produto junto com este evento.
                </span>
              </div>
            </Alert>

            {/* Opção: Produto Existente ou Novo */}
            <div className="mb-5">
              <label className="form-check form-check-custom form-check-solid mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="productOption"
                  checked={productOption === "existing"}
                  onChange={() => setProductOption("existing")}
                />
                <span className="form-check-label fw-bold">
                  Selecionar produto existente
                </span>
              </label>

              <label className="form-check form-check-custom form-check-solid">
                <input
                  className="form-check-input"
                  type="radio"
                  name="productOption"
                  checked={productOption === "new"}
                  onChange={() => setProductOption("new")}
                />
                <span className="form-check-label fw-bold">
                  Criar novo produto junto com o evento
                </span>
              </label>
            </div>

            {/* Dropdown: Produto Existente */}
            {productOption === "existing" && (
              <Form.Group controlId="formProduct">
                <Form.Label className="required fw-bold fs-6 mb-2">
                  Selecione o Produto
                </Form.Label>
                <Form.Control
                  as="select"
                  required
                  value={selectedProductId}
                  onChange={(e: any) => setSelectedProductId(e.target.value ? parseInt(e.target.value) : "")}
                  className="form-control form-control-lg form-control-solid"
                >
                  <option value="">Selecione um produto...</option>
                  {products.myProducts?.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} {product.type ? `(${product.type})` : ""}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Por favor selecione um produto
                </Form.Control.Feedback>
                {products.myProducts?.length === 0 && (
                  <div className="text-muted fs-7 mt-2">
                    Nenhum produto encontrado. Você pode criar um novo produto abaixo.
                  </div>
                )}
              </Form.Group>
            )}

            {/* Campos: Novo Produto */}
            {productOption === "new" && (
              <div className="border border-dashed border-gray-300 rounded p-5 bg-light-primary">
                <h5 className="fw-bold mb-4 text-primary">Novo Produto</h5>

                <Form.Group controlId="formNewProductName" className="mb-4">
                  <Form.Label className="required fw-bold fs-6 mb-2">
                    Nome do Produto
                  </Form.Label>
                  <Form.Control
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Ex: Workshop de Harmonização Facial - Turma Janeiro/2026"
                    required={productOption === "new"}
                    value={newProductName}
                    onChange={(e: any) => setNewProductName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor informe o nome do produto
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formNewProductDescription" className="mb-4">
                  <Form.Label className="fw-bold fs-6 mb-2">
                    Descrição do Produto
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Descrição do produto..."
                    value={newProductDescription}
                    onChange={(e: any) => setNewProductDescription(e.target.value)}
                    className="form-control form-control-lg form-control-solid"
                  />
                </Form.Group>

                <Form.Group controlId="formNewProductPrice">
                  <Form.Label className="fw-bold fs-6 mb-2">
                    Preço (R$)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={newProductPrice}
                    onChange={(e: any) => setNewProductPrice(parseFloat(e.target.value) || 0)}
                    className="form-control form-control-lg form-control-solid"
                  />
                </Form.Group>
              </div>
            )}
          </div>

          <div className="separator separator-dashed my-8"></div>

          {/* Seção: Informações do Evento */}
          <h4 className="fw-bold mb-5">2. Informações do Evento</h4>

          <Form.Group controlId="formName">
            <Form.Label className="required fw-bold fs-6 mb-2">
              Nome do Evento
            </Form.Label>
            <Form.Control
              className="form-control form-control-lg form-control-solid"
              placeholder="Ex: Workshop de Harmonização Facial"
              required
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              autoFocus
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o nome do evento
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="formDescription">
            <Form.Label className="fw-bold fs-6 mb-2">Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Descreva o evento..."
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
          </Form.Group>
          <br />

          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formEventDate">
                <Form.Label className="required fw-bold fs-6 mb-2">
                  Data e Hora de Início
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe a data e hora de início
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formEventEndDate">
                <Form.Label className="fw-bold fs-6 mb-2">
                  Data e Hora de Término
                </Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={endDate}
                  onChange={(e: any) => setEndDate(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                />
              </Form.Group>
            </div>
          </div>
          <br />

          <Form.Group controlId="formLocation">
            <Form.Label className="required fw-bold fs-6 mb-2">
              Local
            </Form.Label>
            <Form.Control
              placeholder="Ex: Hotel XYZ - Salão Principal"
              required
              value={location}
              onChange={(e: any) => setLocation(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
            <Form.Control.Feedback type="invalid">
              Por favor informe o local do evento
            </Form.Control.Feedback>
          </Form.Group>
          <br />

          <Form.Group controlId="formAddress">
            <Form.Label className="fw-bold fs-6 mb-2">
              Endereço Completo
            </Form.Label>
            <Form.Control
              placeholder="Rua, número, bairro, cidade - UF"
              value={address}
              onChange={(e: any) => setAddress(e.target.value)}
              className="form-control form-control-lg form-control-solid"
            />
          </Form.Group>
          <br />

          <div className="row">
            <div className="col-md-6">
              <Form.Group controlId="formMaxTickets">
                <Form.Label className="required fw-bold fs-6 mb-2">
                  Limite de Ingressos
                </Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  required
                  value={capacity}
                  onChange={(e: any) => setCapacity(parseInt(e.target.value))}
                  className="form-control form-control-lg form-control-solid"
                />
                <Form.Control.Feedback type="invalid">
                  Por favor informe o limite de ingressos
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group controlId="formStatus">
                <Form.Label className="required fw-bold fs-6 mb-2">
                  Status
                </Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="form-control form-control-lg form-control-solid"
                >
                  <option value="draft">Rascunho</option>
                  <option value="open">Aberto</option>
                  <option value="full">Lotado</option>
                  <option value="closed">Fechado</option>
                  <option value="in_progress">Em Andamento</option>
                  <option value="finished">Finalizado</option>
                  <option value="cancelled">Cancelado</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-stack pt-10 justify-content-start py-lg-2 px-lg-6">
        <Button
          size="sm"
          variant="primary"
          type="submit"
          className="btn btn-lg btn-primary"
        >
          Criar Evento
          <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
        </Button>
      </div>
    </Form>
  );
};

export default Create;
