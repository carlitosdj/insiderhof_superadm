import React from "react";
import { Modal, Button, Row, Col, Badge } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { Ideaction } from "../../../../store/ducks/ideaction/types";

type Props = {
  show: boolean;
  onHide: () => void;
  ideaction: Ideaction;
};

const View: React.FC<Props> = ({ show, onHide, ideaction }) => {
  // Cálculo do score
  const calculateScore = () => {
    const P = Number(ideaction.passion ?? 0);
    const S = Number(ideaction.skill ?? 0);
    const D = Number(ideaction.demand ?? 0);
    const E = Number(ideaction.effort ?? 0);
    const R = Number(ideaction.risk ?? 0);

    const numerator = P * S * D;
    const denominator = E + R;
    const scoreValue = denominator > 0 ? numerator / denominator : 0;

    // Categoria do score
    let category = "";
    let variant = "";
    if (scoreValue >= 120) {
      category = "Excepcional 🚀";
      variant = "primary";
    } else if (scoreValue >= 70) {
      category = "Prioridade Alta";
      variant = "success";
    } else if (scoreValue >= 30) {
      category = "Potencial a Discutir";
      variant = "warning";
    } else if (scoreValue >= 10) {
      category = "Análise Crítica";
      variant = "info";
    } else {
      category = "Repensar ou Descartar";
      variant = "danger";
    }

    return { scoreValue, category, variant };
  };

  const scoreInfo = calculateScore();

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bolder">
          <KTIcon iconName="eye" className="fs-2 text-primary me-3" />
          Visualizar Ideia
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-4 px-3 px-lg-6">
        {/* Nome da Ideia */}
        <div className="mb-4">
          <h3 className="fw-bold text-dark mb-2">{ideaction.name}</h3>
          <Badge bg={scoreInfo.variant} className="fs-7 fw-bold">
            <KTIcon iconName="star" className="fs-8 me-1" />
            SCORE: {scoreInfo.scoreValue.toFixed(2)} ({scoreInfo.category})
          </Badge>
        </div>

        {/* Descrição */}
        <div className="mb-5">
          <h5 className="fw-bold text-dark mb-3">Descrição</h5>
          <p className="text-muted lh-lg fs-6">
            {ideaction.description || "Nenhuma descrição fornecida."}
          </p>
        </div>

        {/* Métricas PSDER */}
        <div className="mb-5">
          <h5 className="fw-bold text-dark mb-4">Avaliação PSDER</h5>
          <Row className="g-4">
            {/* Paixão */}
            <Col sm={6} lg={4}>
              <div className="p-3 bg-light-primary rounded-3 text-center">
                <KTIcon iconName="heart" className="fs-1 text-primary mb-2" />
                <h6 className="fw-bold text-primary mb-1">Paixão</h6>
                <div className="fs-4 fw-bold text-dark">{ideaction.passion || 0}/10</div>
              </div>
            </Col>

            {/* Habilidade */}
            <Col sm={6} lg={4}>
              <div className="p-3 bg-light-primary rounded-3 text-center">
                <KTIcon iconName="medal-star" className="fs-1 text-primary mb-2" />
                <h6 className="fw-bold text-primary mb-1">Habilidade</h6>
                <div className="fs-4 fw-bold text-dark">{ideaction.skill || 0}/10</div>
              </div>
            </Col>

            {/* Demanda */}
            <Col sm={6} lg={4}>
              <div className="p-3 bg-light-primary rounded-3 text-center">
                <KTIcon iconName="people" className="fs-1 text-primary mb-2" />
                <h6 className="fw-bold text-primary mb-1">Demanda</h6>
                <div className="fs-4 fw-bold text-dark">{ideaction.demand || 0}/10</div>
              </div>
            </Col>

            {/* Esforço */}
            <Col sm={6} lg={6}>
              <div className="p-3 bg-light-danger rounded-3 text-center">
                <KTIcon iconName="time" className="fs-1 text-danger mb-2" />
                <h6 className="fw-bold text-danger mb-1">Esforço</h6>
                <div className="fs-4 fw-bold text-dark">{ideaction.effort || 0}/10</div>
              </div>
            </Col>

            {/* Risco */}
            <Col sm={6} lg={6}>
              <div className="p-3 bg-light-danger rounded-3 text-center">
                <KTIcon iconName="shield-cross" className="fs-1 text-danger mb-2" />
                <h6 className="fw-bold text-danger mb-1">Risco</h6>
                <div className="fs-4 fw-bold text-dark">{ideaction.risk || 0}/10</div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Informações Adicionais */}
        <div className="mb-4">
          <h5 className="fw-bold text-dark mb-3">Informações</h5>
          <Row className="g-3">
            <Col sm={6}>
              <div className="d-flex align-items-center p-3 bg-light rounded-3">
                <KTIcon iconName="calendar" className="fs-2 text-muted me-3" />
                <div>
                  <div className="fw-bold text-dark">Criado em</div>
                  <div className="text-muted fs-7">
                    {ideaction.createdAt 
                      ? new Date(ideaction.createdAt).toLocaleDateString('pt-BR')
                      : "Data não disponível"
                    }
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={6}>
              <div className="d-flex align-items-center p-3 bg-light rounded-3">
                <KTIcon iconName="sort" className="fs-2 text-muted me-3" />
                <div>
                  <div className="fw-bold text-dark">Ordem</div>
                  <div className="text-muted fs-7">{ideaction.order || "Não definida"}</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Análise do Score */}
        <div className="notice d-flex bg-light-secondary rounded border-secondary border border-dashed p-4">
          <KTIcon iconName="information-5" className="fs-1 text-gray-700 me-3" />
          <div>
            <div className="fw-semibold text-gray-800 mb-1">Análise do Score</div>
            <div className="text-muted fs-7">
              Esta ideia está na categoria <strong>{scoreInfo.category}</strong>. 
              {scoreInfo.scoreValue >= 70 && " Recomendamos priorizar esta ideia no roadmap."}
              {scoreInfo.scoreValue >= 30 && scoreInfo.scoreValue < 70 && " Esta ideia tem potencial, mas requer análise detalhada."}
              {scoreInfo.scoreValue >= 10 && scoreInfo.scoreValue < 30 && " Esta ideia precisa de refinamento significativo."}
              {scoreInfo.scoreValue < 10 && " Esta ideia pode precisar ser repensada ou descartada."}
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onHide} className="px-4">
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default View; 