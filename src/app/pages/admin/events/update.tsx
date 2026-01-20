import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateEventRequest } from "../../../../store/ducks/events/actions";
import { Event } from "../../../../store/ducks/events/types";
import { KTIcon } from "../../../../_metronic/helpers";

const MOMENT = require("moment");

interface UpdateProps {
  handleClose: () => void;
  child: Event;
}

const Update = ({ handleClose, child }: UpdateProps) => {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState(child.name || "");
  const [description, setDescription] = useState(child.description || "");
  const [startDate, setStartDate] = useState(
    child.startDate ? MOMENT(child.startDate).format("YYYY-MM-DDTHH:mm") : ""
  );
  const [endDate, setEndDate] = useState(
    child.endDate
      ? MOMENT(child.endDate).format("YYYY-MM-DDTHH:mm")
      : ""
  );
  const [location, setLocation] = useState(child.location || "");
  const [address, setAddress] = useState(child.address || "");
  const [capacity, setCapacity] = useState<number>(child.capacity || 100);
  const [status, setStatus] = useState<Event['status']>(child.status || "draft");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);

    const updatedEvent: Event = {
      ...child,
      name,
      description,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      location,
      address,
      capacity,
      status,
    };

    dispatch(updateEventRequest(updatedEvent));
    handleClose();
  };

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex flex-column">
        <div className="flex-row-fluid py-lg-2 px-lg-6">
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

          {/* Informações adicionais */}
          <div className="separator separator-dashed my-5"></div>
          <div className="row">
            <div className="col-md-4">
              <div className="d-flex flex-column">
                <span className="text-muted fw-bold fs-7">Total de Ingressos</span>
                <span className="text-gray-800 fw-bold fs-6">
                  {child.tickets?.length || 0} / {child.capacity || 0}
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column">
                <span className="text-muted fw-bold fs-7">Capacidade</span>
                <span className="text-gray-800 fw-bold fs-6">
                  {child.capacity || 0}
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="d-flex flex-column">
                <span className="text-muted fw-bold fs-7">Criado em</span>
                <span className="text-gray-800 fw-bold fs-6">
                  {child.createdAt
                    ? MOMENT(child.createdAt).format("DD/MM/YYYY HH:mm")
                    : "-"}
                </span>
              </div>
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
          Atualizar Evento
          <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
        </Button>
      </div>
    </Form>
  );
};

export default Update;
