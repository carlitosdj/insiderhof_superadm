import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";

// Estilos CSS padronizados como o header de CAPTAÇÃO
const headerCardStyles = `
  .launch-header-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
  }
  
  .launch-header-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    transform: translate(50%, -50%);
  }
  
  .launch-header-card h2 {
    margin: 0;
    font-weight: 700;
  }
  
  .launch-header-card .subtitle {
    opacity: 0.9;
    margin-top: 0.5rem;
  }
  
  /* Responsividade */
  @media (max-width: 768px) {
    .launch-header-card {
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .launch-header-card h2 {
      font-size: 1.5rem;
    }
  }
`;

interface LaunchHeaderCardProps {
  activeTab?: string;
  phaseName?: string;
}

const LaunchHeaderCard: React.FC<LaunchHeaderCardProps> = ({ activeTab, phaseName }) => {
  const { launchId } = useParams();

  // Redux state
  const launch = useSelector((state: ApplicationState) =>
    state.launch.myLaunchs.find(l => l.id === Number(launchId))
  );

  if (!launch) {
    return (
      <>
        <style>{headerCardStyles}</style>
        <div className="launch-header-card">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>
                <div className="spinner-border spinner-border-sm me-2" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
                Carregando lançamento...
              </h2>
              <div className="subtitle">
                Aguarde enquanto carregamos as informações
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Determinar o título baseado na aba ativa
  const getTitle = () => {
    if (phaseName) {
      return `${launch.name} - ${phaseName}`;
    }
    
    switch (activeTab) {
      case 'resumo':
        return `${launch.name} - Resumo`;
      case 'configuracao':
        return `${launch.name} - Configuração`;
      case 'landing-page-captacao':
        return `${launch.name} - Landing Page Captação`;
      case 'landing-page-vendas':
        return `${launch.name} - Landing Page Vendas`;
      default:
        return `${launch.name} - Gerenciador de Fases`;
    }
  };

  const getSubtitle = () => {
    if (phaseName) {
      return `Gerenciamento de itens da fase`;
    }
    
    switch (activeTab) {
      case 'resumo':
        return 'Visão geral e métricas do lançamento';
      case 'configuracao':
        return 'Configurações e propriedades do lançamento';
      case 'landing-page-captacao':
        return 'Gerenciamento da landing page de captação';
      case 'landing-page-vendas':
        return 'Gerenciamento da landing page de vendas';
      default:
        return 'Gerencie todas as fases do seu lançamento';
    }
  };

  return (
    <>
      <style>{headerCardStyles}</style>
      <div className="launch-header-card">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h2>{getTitle()}</h2>
            <div className="subtitle">
              {getSubtitle()} • {launch.type || 'Lançamento'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { LaunchHeaderCard };