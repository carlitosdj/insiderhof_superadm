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
    border-radius: 8px 8px 0 0;
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
    border: none;
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
  
  .content-section {
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .info-item .alert {
    flex: 1;
    min-width: 0;
  }
  
  .info-item .info-label {
    flex: 1;
    min-width: 0;
  }
  
  .info-item .info-value {
    flex-shrink: 0;
  }
  
  .info-item .btn {
    border: none;
  }
`;

const Configuration = ({ onCancel }: { onCancel?: () => void }) => {
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
        <div className="config-header">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>Configurações do Lançamento</h2>
              <div className="subtitle">
                Gerencie as configurações do lançamento <strong>{name}</strong>
              </div>
            </div>
          </div>
        </div>

        <Form validated={validated} onSubmit={handleSubmit}>
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

          {/* Main Content */}
          <Row className="g-4 align-items-stretch">
            {/* Informações do Lançamento */}
            <Col lg={6} className="h-100">
              <div className="content-section h-100">
                <div className="section-header">
                  <h5>
                    <KTIcon iconName="information" className="fs-5" />
                    Informações do Lançamento
                  </h5>
                </div>
                <div className="section-body">
                  <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="info-item">
                      <span className="info-label">Nome</span>
                      <span className="info-value">
                        <Form.Control
                          placeholder="Digite o nome do lançamento"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Tipo</span>
                      <span className="info-value">
                        <Form.Control
                          placeholder="Ex: Curso, Produto, Serviço"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="form-control"
                        />
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Status</span>
                      <span className="info-value">
                        <Form.Select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="form-control"
                        >
                          <option value="1">🟢 Ativo</option>
                          <option value="0">🔴 Inativo</option>
                        </Form.Select>
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Parcelas</span>
                      <span className="info-value">
                        <Form.Control
                          placeholder="Ex: 12x sem juros de R$ 97,00"
                          value={installments}
                          onChange={(e) => setInstallments(e.target.value)}
                          className="form-control"
                        />
                      </span>
                    </div>
                    {launch?.launchhasoffers && launch.launchhasoffers.length > 0 ? (
                      <div className="info-item">
                        <span className="info-label">
                          <div className="d-flex align-items-center gap-2">
                            {launch.launchhasoffers[0].offer?.image && (
                              <img
                                className="rounded"
                                width={24}
                                height={24}
                                src={
                                  launch.launchhasoffers[0].offer?.image.includes("https://")
                                    ? launch.launchhasoffers[0].offer?.image
                                    : "https://app.insiderhof.com.br/files/" + launch.launchhasoffers[0].offer?.image
                                }
                                onError={({ currentTarget }) => {
                                  currentTarget.onerror = null;
                                  currentTarget.src = "https://app.insiderhof.com.br/files/notfound.jpg";
                                }}
                                alt={launch.launchhasoffers[0].offer?.name}
                              />
                            )}
                            <span className="fs-7 fw-semibold text-dark">
                              {launch.launchhasoffers[0].offer?.name || 'Oferta não encontrada'}
                            </span>
                          </div>
                        </span>
                        <span className="info-value">
                          <Button variant="outline-primary" size="sm" onClick={openHasLaunchs} className="btn-sm">
                            <KTIcon iconName="gear" className="fs-6 me-1" />
                            Gerenciar
                          </Button>
                        </span>
                      </div>
                    ) : (
                      <div className="info-item">
                        <span className="info-label">
                          <div className="alert alert-danger py-2 px-3 mb-0 w-100 text-center">
                            <KTIcon iconName="cross" className="fs-4 me-1" />
                            Nenhuma oferta selecionada
                          </div>
                        </span>
                        <span className="info-value m-1">
                          <Button variant="outline-primary" size="sm" onClick={openHasLaunchs} className="btn-sm">
                            <KTIcon iconName="gear" className="fs-6 me-1" />
                            Gerenciar
                          </Button>
                        </span>
                      </div>
                    )}
                    <div className="info-item">
                      <span className="info-label">Preço dos Produtos da Oferta</span>
                      <span className="info-value text-muted" style={{ textDecoration: 'line-through' }}>
                        {launch?.launchhasoffers && launch.launchhasoffers.length > 0 &&
                          launch.launchhasoffers[0].offer?.dOfferHasProducts &&
                          launch.launchhasoffers[0].offer.dOfferHasProducts.length > 0
                          ? formatCurrency(
                              launch.launchhasoffers[0].offer.dOfferHasProducts.reduce(
                                (total: number, offerProduct: any) => total + (offerProduct.product?.price || 0),
                                0
                              )
                            )
                          : formatCurrency(0)
                        }
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Preço Atual</span>
                      <span className="info-value">
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
                      </span>
                    </div>
                  </div>
                  
                  <div className="form-group mt-4">
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
                  
                  {description && (
                    <div className="mt-4 p-3 bg-light-primary bg-opacity-10 rounded">
                      <div className="d-flex align-items-start">
                        <KTIcon iconName="document" className="fs-2 text-primary me-3 mt-1" />
                        <div>
                          <div className="fw-bold text-dark mb-2">Descrição</div>
                          <div className="text-dark">{description}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>

            {/* Configurações de Renovação */}
            <Col lg={6} className="h-100">
              <div className="content-section h-100">
                <div className="section-header">
                  <h5>
                    <KTIcon iconName="refresh" className="fs-5" />
                    Configurações de Renovação
                  </h5>
                </div>
                <div className="section-body">
                  <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="info-item">
                      <span className="info-label">Tempo de Renovação (dias)</span>
                      <span className="info-value">
                        <Form.Control
                          type="number"
                          placeholder="30"
                          value={renovationTime}
                          onChange={(e) => setRenovationTime(Number(e.target.value))}
                          className="form-control"
                        />
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Preço de Renovação</span>
                      <span className="info-value">
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
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Renovação Antecipada</span>
                      <span className="info-value">
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
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Parcelas de Renovação</span>
                      <span className="info-value">
                        <Form.Control
                          placeholder="Ex: 12x sem juros"
                          value={renovationInstallments}
                          onChange={(e) => setRenovationInstallments(e.target.value)}
                          className="form-control"
                        />
                      </span>
                    </div>
                  </div>
                  
                  <div className="form-group mt-4">
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
                  
                  {renovationDescription && (
                    <div className="mt-4 p-3 bg-light-warning bg-opacity-10 rounded">
                      <div className="d-flex align-items-start">
                        <KTIcon iconName="document" className="fs-2 text-primary me-3 mt-1" />
                        <div>
                          <div className="fw-bold text-dark mb-2">Descrição da Renovação</div>
                          <div className="text-dark">{renovationDescription}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="action-buttons">
            {onCancel && (
              <Button variant="secondary" size="lg" onClick={onCancel} disabled={isSubmitting}>
                <KTIcon iconName="arrow-left" className="fs-5 me-2" />
                Voltar
              </Button>
            )}
            {/* <Button variant="secondary" size="lg" onClick={handleRestore} disabled={isSubmitting}>
              <KTIcon iconName="cross" className="fs-5 me-2" />
              Cancelar
            </Button> */}
            <Button variant="primary" size="lg" type="submit" disabled={isSubmitting}>
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