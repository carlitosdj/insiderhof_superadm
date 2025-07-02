import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";

type Props = {
  show: boolean;
  onHide: () => void;
};

const HowItWorks: React.FC<Props> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered scrollable>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bolder">
          <KTIcon iconName="calculator" className="fs-1 text-primary me-3" />
          <span className="d-none d-sm-inline">Decifrando o Score de Potencial</span>
          <span className="d-sm-none">Score de Potencial</span>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="py-4 px-3 px-lg-10 px-6">
        <div className="mb-5">
          <p className="fs-6 fs-lg-5 text-muted lh-lg">
            Bem-vindo ao nosso centro de ideação! Aqui, acreditamos que toda grande ideia merece ser ouvida. Mas com tantas ideias incríveis e recursos limitados, como decidimos em quais focar nossa energia?
            <br /><br />
            Para nos ajudar nessa jornada, criamos o <strong>Score de Potencial</strong>. Pense nele como uma <strong>bússola estratégica</strong>: uma ferramenta que nos ajuda a avaliar as oportunidades de forma objetiva, justa e inteligente.
          </p>
        </div>

        <div className="mb-9">
          <h3 className="fw-bold mb-4 fs-4 fs-lg-3">A Fórmula: Potencial vs. Realidade</h3>
          <div className="text-center mb-5 p-3 p-lg-10">
            <code className="fs-4 fs-lg-2 fw-bold p-3 p-lg-5 bg-light rounded-3 text-dark-50 d-block">
              Score = (Paixão × Habilidade × Demanda) / (Esforço + Risco)
            </code>
          </div>

          <Row className="g-4">
            {/* --- COLUNA DO NUMERADOR --- */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="p-3 p-lg-4 bg-light-primary rounded-3 h-100">
                <h4 className="fw-bold text-primary mb-4 mb-lg-5 fs-5 fs-lg-4">
                  A Força da Oportunidade (o que impulsiona ▲)
                </h4>
                <div className="d-flex flex-column gap-4 gap-lg-5">
                  <div className="d-flex align-items-start">
                    <KTIcon iconName="heart" className="fs-1 fs-lg-2x text-primary me-3 me-lg-4 mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1 fs-6">P - Paixão</h6>
                      <p className="text-muted fs-7 mb-0">
                        É o "brilho nos olhos". O quanto a ideia nos energiza e se alinha com nossa missão? Equipes apaixonadas superam qualquer obstáculo.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <KTIcon iconName="medal-star" className="fs-1 fs-lg-2x text-primary me-3 me-lg-4 mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1 fs-6">S - Habilidade (Skill)</h6>
                      <p className="text-muted fs-7 mb-0">
                        Nossa "vantagem secreta". Temos o talento e a tecnologia para executar com maestria? É onde nosso talento encontra a oportunidade.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <KTIcon iconName="people" className="fs-1 fs-lg-2x text-primary me-3 me-lg-4 mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1 fs-6">D - Demanda</h6>
                      <p className="text-muted fs-7 mb-0">
                        A "voz do mercado". Existe um problema real que estamos resolvendo? Alguém precisa e pagaria por isso?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* --- COLUNA DO DENOMINADOR --- */}
            <Col lg={6}>
              <div className="p-3 p-lg-4 bg-light-danger rounded-3 h-100">
                <h4 className="fw-bold text-danger mb-4 mb-lg-5 fs-5 fs-lg-4">
                  O Custo da Realidade (o que freia ▼)
                </h4>
                <div className="d-flex flex-column gap-4 gap-lg-5">
                  <div className="d-flex align-items-start">
                    <KTIcon iconName="time" className="fs-1 fs-lg-2x text-danger me-3 me-lg-4 mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1 fs-6">E - Esforço</h6>
                      <p className="text-muted fs-7 mb-0">
                        O custo em tempo, pessoas e recursos. Qual o tamanho da montanha que precisamos escalar?
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-start">
                    <KTIcon iconName="shield-cross" className="fs-1 fs-lg-2x text-danger me-3 me-lg-4 mt-1" />
                    <div>
                      <h6 className="fw-bold mb-1 fs-6">R - Risco</h6>
                      <p className="text-muted fs-7 mb-0">
                        O custo da incerteza. Quais as chances de algo dar errado (tecnologia, mercado, etc.)?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="mb-5">
          <h3 className="fw-bold mb-4 fs-4 fs-lg-3">As 5 Zonas de Potencial: Entendendo o Resultado</h3>
          <div className="d-flex flex-column gap-3">
            {/* Zona Excepcional */}
            <div className="d-flex align-items-start p-3 rounded-3 bg-light-primary border-primary border-3 border-start">
              <span className="fs-2 fs-lg-1 me-3 me-lg-4 mt-1">🚀</span>
              <div>
                <h6 className="fw-bold text-primary mb-1 fs-6">Excepcional (Score 120 ou mais)</h6>
                <p className="text-muted fs-7 mb-0">
                  Esta é uma joia rara, uma ideia com potencial transformador e com um caminho relativamente claro. Ela combina uma visão poderosa com uma execução viável. <br/><strong>Ação Recomendada: Aceleração máxima!</strong>
                </p>
              </div>
            </div>

            {/* Zona Prioridade Alta */}
            <div className="d-flex align-items-start p-3 rounded-3 bg-light-success border-success border-3 border-start">
              <span className="fs-2 fs-lg-1 me-3 me-lg-4 mt-1">🟢</span>
              <div>
                <h6 className="fw-bold text-success mb-1 fs-6">Prioridade Alta (Score 70 a 119.9)</h6>
                <p className="text-muted fs-7 mb-0">
                  São as vitórias estratégicas. Ideias muito fortes, bem fundamentadas e com um balanço extremamente positivo entre potencial e custo. <br/><strong>Ação Recomendada: Planejar e executar.</strong>
                </p>
              </div>
            </div>

            {/* Zona Potencial a Discutir */}
            <div className="d-flex align-items-start p-3 rounded-3 bg-light-warning border-warning border-3 border-start">
              <span className="fs-2 fs-lg-1 me-3 me-lg-4 mt-1">🟡</span>
              <div>
                <h6 className="fw-bold text-warning mb-1 fs-6">Potencial a Discutir (Score 30 a 69.9)</h6>
                <p className="text-muted fs-7 mb-0">
                  Esta é a zona do "talvez". A ideia tem méritos claros, mas também possui um esforço ou risco considerável. <br/><strong>Ação Recomendada: Análise e debate.</strong>
                </p>
              </div>
            </div>

            {/* Zona Análise Crítica */}
            <div className="d-flex align-items-start p-3 rounded-3 bg-light-info border-info border-3 border-start">
              <span className="fs-2 fs-lg-1 me-3 me-lg-4 mt-1">🔵</span>
              <div>
                <h6 className="fw-bold text-info mb-1 fs-6">Análise Crítica (Score 10 a 29.9)</h6>
                <p className="text-muted fs-7 mb-0">
                  Aqui, um sinal de alerta é levantado. A ideia pode ter um núcleo interessante, mas apresenta falhas significativas. <br/><strong>Ação Recomendada: Refinamento ou pivô.</strong>
                </p>
              </div>
            </div>

            {/* Zona Repensar ou Descartar */}
            <div className="d-flex align-items-start p-3 rounded-3 bg-light-danger border-danger border-3 border-start">
              <span className="fs-2 fs-lg-1 me-3 me-lg-4 mt-1">🔴</span>
              <div>
                <h6 className="fw-bold text-danger mb-1 fs-6">Repensar ou Descartar (Score abaixo de 10)</h6>
                <p className="text-muted fs-7 mb-0">
                  Ideias nesta zona possuem falhas fundamentais. O potencial é baixo e/ou os custos e riscos são proibitivos. <br/><strong>Ação Recomendada: Honestidade radical e descarte.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="notice d-flex bg-light-secondary rounded border-secondary border border-dashed p-4 p-lg-6 mt-9">
          <KTIcon iconName="information-5" className="fs-1 fs-lg-2tx text-gray-700 me-3 me-lg-4 mt-1" />
          <div className="d-flex flex-stack flex-grow-1">
            <div className="fw-semibold">
              <div className="fs-7 fs-lg-6 text-gray-800">
                <strong>Lembre-se:</strong> O score é o <strong>início da conversa</strong>, não o fim. Use esta ferramenta para guiar discussões, desafiar suas premissas e, juntos, vamos transformar as melhores ideias em realidade!
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button variant="primary" onClick={onHide} className="px-4 px-lg-6">
          Entendido!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { HowItWorks };