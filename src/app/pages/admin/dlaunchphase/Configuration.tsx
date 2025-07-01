import React, { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Alert, Modal, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ApplicationState } from "../../../../store";
import { KTIcon } from "../../../../_metronic/helpers";

import momentDurationFormatSetup from "moment-duration-format";
import { Launch } from "../../../../store/ducks/dlaunch/types";
import { updateLaunchRequest } from "../../../../store/ducks/dlaunch/actions";
import { useParams } from "react-router-dom";
import Manage from "../dlaunchhasoffers/Manage";

const MOMENT = require("moment");
momentDurationFormatSetup(MOMENT);

// Estilos CSS customizados inspirados no Resume copy.tsx
const configurationStyles = `
  .configuration-container {
    padding: 2rem;
    /*background: #f8f9fa;*/
    min-height: 100vh;
  }
  
  .config-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }
  
  .config-header h2 {
    margin: 0;
    font-weight: 700;
  }
  
  .config-header .subtitle {
    opacity: 0.9;
    margin-top: 0.5rem;
  }
  
  .form-section {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    overflow: hidden;
  }
  
  .section-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e1e5e9;
    background: #f8f9fa;
  }
  
  .section-header h5 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .section-body {
    padding: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-label {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  .form-control {
    border: 1px solid #e1e5e9;
    border-radius: 6px;
    padding: 0.75rem;
    transition: border-color 0.2s ease;
  }
  
  .form-control:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }
  
  .form-text {
    color: #7f8c8d;
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
  
  .price-indicator {
    background: #f8f9fa;
    border: 1px solid #e1e5e9;
    border-radius: 6px;
    padding: 0.75rem;
    margin-top: 0.5rem;
    text-align: center;
    font-weight: 600;
  }
  
  .price-difference {
    background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
    border: 1px solid #f39c12;
    border-radius: 6px;
    padding: 1rem;
    margin-top: 1rem;
  }
  
  .price-difference .difference-label {
    color: #e67e22;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .price-difference .difference-value {
    color: #d35400;
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  .action-buttons {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 1.5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    transition: transform 0.2s ease;
  }
  
  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
  
  .btn-secondary {
    background: #95a5a6;
    border: none;
    padding: 0.75rem 2rem;
    border-radius: 6px;
    font-weight: 600;
    transition: transform 0.2s ease;
  }
  
  .btn-secondary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(149, 165, 166, 0.3);
  }
  
  .alert-success {
    background: linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 100%);
    border: none;
    border-radius: 8px;
    color: #2c3e50;
    font-weight: 600;
  }
  
  .loading-spinner {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid #ffffff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s ease-in-out infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
  
  .info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #f1f3f4;
  }
  
  .info-item:last-child {
    border-bottom: none;
  }
  
  .info-label {
    color: #7f8c8d;
    font-weight: 500;
  }
  
  .info-value {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const Configuration = () => {
  const dispatch = useDispatch();
  const { launchId } = useParams();
  
  // Get launch data from Redux state
  const launch = useSelector((state: ApplicationState) => 
    state.launch.myLaunchs.find(l => l.id === Number(launchId))
  );

  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showOffersModal, setShowOffersModal] = useState(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("1");
  const [price, setPrice] = useState(0);
  // const [oldPrice, setOldPrice] = useState(0);
  const [type, setType] = useState("");
  const [installments, setInstallments] = useState("");
  const [renovationTime, setRenovationTime] = useState(0);
  const [renovationPrice, setRenovationPrice] = useState(0);
  const [antecipateRenovationPrice, setAntecipateRenovationPrice] = useState(0);
  const [renovationDescription, setRenovationDescription] = useState("");
  const [renovationInstallments, setRenovationInstallments] = useState("");

  // Load launch data when component mounts or launch changes
  useEffect(() => {
    if (launch) {
      setName(launch.name || "");
      setDescription(launch.description || "");
      setStatus(launch.status || "1");
      setPrice(launch.price || 0);
      // setOldPrice(launch.oldPrice || 0);
      setType(launch.type || "");
      setInstallments(launch.installments || "");
      setRenovationTime(launch.renovationTime || 0);
      setRenovationPrice(launch.renovationPrice || 0);
      setAntecipateRenovationPrice(launch.antecipateRenovationPrice || 0);
      setRenovationDescription(launch.renovationDescription || "");
      setRenovationInstallments(launch.renovationInstallments || "");
    }
  }, [launch]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);
    setIsSubmitting(true);
    
    if (name && launch) {
      const componentToUpdate: Launch = {
        id: launch.id,
        name,
        description,
        status: status,
        price: Number(price),
        // oldPrice: Number(oldPrice),
        type,
        installments,
        renovationTime: Number(renovationTime),
        renovationPrice: Number(renovationPrice),
        antecipateRenovationPrice: Number(antecipateRenovationPrice),
        renovationDescription,
        renovationInstallments
      };
      
      try {
        await dispatch(updateLaunchRequest(componentToUpdate));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } catch (error) {
        console.error('Erro ao salvar:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleRestore = () => {
    if (launch) {
      setName(launch.name || "");
      setDescription(launch.description || "");
      setStatus(launch.status || "1");
      setPrice(launch.price || 0);
      // setOldPrice(launch.oldPrice || 0);
      setType(launch.type || "");
      setInstallments(launch.installments || "");
      setRenovationTime(launch.renovationTime || 0);
      setRenovationPrice(launch.renovationPrice || 0);
      setAntecipateRenovationPrice(launch.antecipateRenovationPrice || 0);
      setRenovationDescription(launch.renovationDescription || "");
      setRenovationInstallments(launch.renovationInstallments || "");
      setValidated(false);
    }
  };

  const handleCloseOffersModal = () => {
    setShowOffersModal(false);
  };

  const openHasLaunchs = () => {
    setShowOffersModal(true);
  };

  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  if (!launch) {
    return (
      <div className="configuration-container">
        <div className="text-center py-8">
          <div className="symbol symbol-100px mx-auto mb-6">
            <div className="symbol-label bg-light-danger">
              <KTIcon iconName="exclamation-triangle" className="fs-2x text-danger" />
            </div>
          </div>
          <h3 className="text-dark fw-bold mb-2">Lançamento não encontrado</h3>
          <p className="text-muted fs-6">
            O lançamento selecionado não foi encontrado no sistema.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{configurationStyles}</style>
      
      {/* Modal para Gerenciar Ofertas */}
      <Modal
        id="kt_modal_manage_offers"
        tabIndex={-1}
        aria-hidden="true"
        dialogClassName="modal-dialog modal-dialog-centered mw-900px"
        show={showOffersModal}
        onHide={handleCloseOffersModal}
        backdrop={true}
      >
        <div className="modal-header">
          <h2>Gerenciar Ofertas</h2>
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            onClick={handleCloseOffersModal}
          >
            <KTIcon className="fs-1" iconName="cross" />
          </div>
        </div>

        <div className="modal-body py-lg-10 px-lg-10">
          {launch && <Manage handleClose={handleCloseOffersModal} child={launch} />}
        </div>
      </Modal>
      
      <div className="configuration-container">
        {/* Header */}
        {/* <div className="config-header">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>Configurações do Lançamento</h2>
              <div className="subtitle">
                Gerencie as configurações do lançamento <strong>{launch.name}</strong>
              </div>
            </div>
            {/* <div className="d-flex gap-3">
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={openHasLaunchs}
                className="d-flex align-items-center gap-2"
              >
                <KTIcon iconName="gear" className="fs-5" />
                Gerenciar Ofertas
              </Button>
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={handleRestore}
                disabled={isSubmitting}
              >
                <KTIcon iconName="refresh" className="fs-5 me-2" />
                Restaurar
              </Button>
            </div> *x/}
          </div>
        </div> */}

        {/* Success Alert */}
        {showSuccess && (
          <Alert variant="success" className="alert-success" dismissible onClose={() => setShowSuccess(false)}>
            <div className="d-flex align-items-center">
              <KTIcon iconName="check-circle" className="fs-2 me-3" />
              <div>
                <h6 className="fw-bold mb-1">Configurações salvas com sucesso!</h6>
                <p className="mb-0">As alterações foram aplicadas ao lançamento.</p>
              </div>
            </div>
          </Alert>
        )}

        {/* Ofertas Associadas */}
        {launch?.launchhasoffers && launch.launchhasoffers.length > 0 && (
          <div className="form-section mb-4">
            <div className="section-header">
              <h5>
                <KTIcon iconName="gift" className="fs-5" />
                Ofertas Associadas ({launch.launchhasoffers.length})
              </h5>
            </div>
            <div className="section-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fs-7 fw-semibold text-dark">Ofertas configuradas para este lançamento</span>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={openHasLaunchs}
                  className="btn-sm"
                >
                  <KTIcon iconName="gear" className="fs-6 me-1" />
                  Gerenciar
                </Button>
              </div>
              <div className="d-flex flex-wrap gap-2">
                {launch.launchhasoffers.slice(0, 6).map((hasoffer) => (
                  <div key={hasoffer.id} className="d-flex align-items-center bg-light rounded p-3 border">
                    {hasoffer.offer?.image && (
                      <img
                        className="rounded me-3"
                        width={32}
                        height={32}
                        src={
                          hasoffer.offer?.image.includes("https://")
                            ? hasoffer.offer?.image
                            : "https://app.insiderhof.com.br/files/" + hasoffer.offer?.image
                        }
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                        }}
                        alt={hasoffer.offer?.name}
                      />
                    )}
                    <div>
                      <div className="fs-7 fw-semibold text-dark mb-1">
                        {hasoffer.offer?.name}
                      </div>
                      <div className="fs-8 text-muted">
                        {hasoffer.offer?.price ? `R$ ${hasoffer.offer.price}` : 'Preço não informado'}
                      </div>
                    </div>
                  </div>
                ))}
                {launch.launchhasoffers.length > 6 && (
                  <div className="bg-light rounded p-3 border">
                    <div className="text-center">
                      <div className="fs-6 fw-bold text-muted mb-1">
                        +{launch.launchhasoffers.length - 6}
                      </div>
                      <div className="fs-8 text-muted">mais ofertas</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <Form validated={validated} onSubmit={handleSubmit}>
          <Row>
            {/* Informações Básicas */}
            <Col lg={6}>
              <div className="form-section">
                <div className="section-header">
                  <h5>
                    <KTIcon iconName="information" className="fs-5" />
                    Informações Básicas
                  </h5>
                </div>
                <div className="section-body">
                  <div className="form-group">
                    <Form.Label className="form-label required">
                      Nome do Lançamento
                    </Form.Label>
                    <Form.Control
                      placeholder="Digite o nome do lançamento"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="form-control"
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor informe o nome do lançamento
                    </Form.Control.Feedback>
                  </div>

                  <div className="form-group">
                    <Form.Label className="form-label">
                      Descrição
                    </Form.Label>
                    <Form.Control
                      placeholder="Descreva o lançamento..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      as="textarea"
                      rows={4}
                      className="form-control"
                    />
                  </div>

                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Tipo
                        </Form.Label>
                        <Form.Control
                          placeholder="Ex: Curso, Produto, Serviço"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Status
                        </Form.Label>
                        <Form.Select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="form-control"
                        >
                          <option value="1">🟢 Ativo</option>
                          <option value="0">🔴 Inativo</option>
                        </Form.Select>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>

            {/* Preços e Valores */}
            <Col lg={6}>
              <div className="form-section">
                <div className="section-header">
                  <h5>
                    <KTIcon iconName="dollar" className="fs-5" />
                    Preços e Valores
                  </h5>
                </div>
                <div className="section-body">
                  <Row>
                    {/* <Col md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Preço Original
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>R$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="0,00"
                            value={oldPrice}
                            onChange={(e) => setOldPrice(Number(e.target.value))}
                            className="form-control"
                          />
                        </InputGroup>
                        <div className="price-indicator text-success">
                          {formatCurrency(oldPrice)}
                        </div>
                      </div>
                    </Col> */}
                    <Col md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Preço Atual
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>R$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="0,00"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="form-control"
                          />
                        </InputGroup>
                        <div className="price-indicator text-primary">
                          {formatCurrency(price)}
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group">
                    <Form.Label className="form-label">
                      Parcelas
                    </Form.Label>
                    <Form.Control
                      placeholder="Ex: 12x sem juros de R$ 97,00"
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  {/* Price Difference Indicator */}
                  {/* {oldPrice > 0 && price > 0 && (
                    <div className="price-difference">
                      <div className="d-flex align-items-center">
                        <KTIcon iconName="chart-line" className="fs-3 me-2" />
                        <div>
                          <div className="difference-label">
                            {oldPrice > price ? 'Desconto Aplicado' : 'Acréscimo'}
                          </div>
                          <div className="difference-value">
                            {formatCurrency(Math.abs(oldPrice - price))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </Col>

            {/* Configurações de Renovação */}
            <Col lg={12}>
              <div className="form-section">
                <div className="section-header">
                  <h5>
                    <KTIcon iconName="refresh" className="fs-5" />
                    Configurações de Renovação
                  </h5>
                </div>
                <div className="section-body">
                  <Row className="g-4">
                    <Col lg={3} md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Tempo de Renovação
                        </Form.Label>
                        <div className="position-relative">
                          <Form.Control
                            type="number"
                            placeholder="30"
                            value={renovationTime}
                            onChange={(e) => setRenovationTime(Number(e.target.value))}
                            className="form-control"
                          />
                          <span className="position-absolute end-0 top-50 translate-middle-y me-3 text-muted">dias</span>
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Preço de Renovação
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>R$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="0,00"
                            value={renovationPrice}
                            onChange={(e) => setRenovationPrice(Number(e.target.value))}
                            className="form-control"
                          />
                        </InputGroup>
                        <div className="price-indicator text-warning">
                          {formatCurrency(renovationPrice)}
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Renovação Antecipada
                        </Form.Label>
                        <InputGroup>
                          <InputGroup.Text>R$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            placeholder="0,00"
                            value={antecipateRenovationPrice}
                            onChange={(e) => setAntecipateRenovationPrice(Number(e.target.value))}
                            className="form-control"
                          />
                        </InputGroup>
                        <div className="price-indicator text-info">
                          {formatCurrency(antecipateRenovationPrice)}
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={6}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Parcelas de Renovação
                        </Form.Label>
                        <Form.Control
                          placeholder="Ex: 12x sem juros"
                          value={renovationInstallments}
                          onChange={(e) => setRenovationInstallments(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </Col>
                    <Col lg={12}>
                      <div className="form-group">
                        <Form.Label className="form-label">
                          Descrição da Renovação
                        </Form.Label>
                        <Form.Control
                          placeholder="Descreva os benefícios da renovação..."
                          value={renovationDescription}
                          onChange={(e) => setRenovationDescription(e.target.value)}
                          as="textarea"
                          rows={3}
                          className="form-control"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="action-buttons">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={handleRestore}
              disabled={isSubmitting}
            >
              <KTIcon iconName="cross" className="fs-5 me-2" />
              Cancelar
            </Button>
            <Button 
              variant="primary" 
              size="lg" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loading-spinner me-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <KTIcon iconName="check" className="fs-5 me-2" />
                  Salvar Configurações
                </>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Configuration; 