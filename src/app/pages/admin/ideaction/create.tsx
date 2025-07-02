import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../store";
import { Ideaction } from "../../../../store/ducks/ideaction/types";
import { createIdeactionRequest } from "../../../../store/ducks/ideaction/actions";

type Props = {
  handleClose: () => void;
};

const Create: React.FC<Props> = ({ handleClose }) => {
  const dispatch = useDispatch();
  const me = useSelector((state: ApplicationState) => state.me);

  const [formData, setFormData] = useState<Partial<Ideaction>>({
    name: "",
    description: "",
    passion: undefined,
    skill: undefined,
    demand: undefined,
    effort: undefined,
    risk: undefined,
    status: "1",
    ownerId: me.me?.id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.ownerId) {
      dispatch(createIdeactionRequest(formData as Ideaction));
      handleClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('passion') || name.includes('skill') || name.includes('demand') || name.includes('effort') || name.includes('risk') 
        ? parseInt(value) || undefined 
        : value
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Nome da Ideação *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Digite o nome da sua ideia"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Form.Group className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Descreva sua ideia de negócio"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Paixão (1-10) *</Form.Label>
            <Form.Control
              type="number"
              name="passion"
              min="1"
              max="10"
              value={formData.passion || ""}
              onChange={handleChange}
              placeholder="Quanto você ama essa ideia?"
              required
            />
            <Form.Text className="text-muted">
              Quanto você ama essa ideia?
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Habilidade (1-10) *</Form.Label>
            <Form.Control
              type="number"
              name="skill"
              min="1"
              max="10"
              value={formData.skill || ""}
              onChange={handleChange}
              placeholder="Quão qualificado você está?"
              required
            />
            <Form.Text className="text-muted">
              Quão qualificado você está?
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Demanda (1-10) *</Form.Label>
            <Form.Control
              type="number"
              name="demand"
              min="1"
              max="10"
              value={formData.demand || ""}
              onChange={handleChange}
              placeholder="Quão grande é o mercado?"
              required
            />
            <Form.Text className="text-muted">
              Quão grande é o mercado?
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Esforço (1-10) *</Form.Label>
            <Form.Control
              type="number"
              name="effort"
              min="1"
              max="10"
              value={formData.effort || ""}
              onChange={handleChange}
              placeholder="Quanto trabalho será necessário?"
              required
            />
            <Form.Text className="text-muted">
              Quanto trabalho será necessário?
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Risco (1-10) *</Form.Label>
            <Form.Control
              type="number"
              name="risk"
              min="1"
              max="10"
              value={formData.risk || ""}
              onChange={handleChange}
              placeholder="Quão arriscado é o projeto?"
              required
            />
            <Form.Text className="text-muted">
              Quão arriscado é o projeto?
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Criar Ideação
        </Button>
      </div>
    </Form>
  );
};

export default Create; 