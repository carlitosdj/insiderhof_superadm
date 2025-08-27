import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import { ApplicationState } from "../../../../store";
import { LaunchPhases } from "../../../../store/ducks/dlaunchphase/types";

interface LaunchSidebarProps {
  activeTab: string;
  onTabClick: (tabId: string) => void;
  isEditing: boolean;
  onEdit: (phase: LaunchPhases) => void;
}

// Estilos CSS inspirados no Metronic SidebarMenuMain
const sidebarStyles = `
  .launch-sidebar {
    width: 280px;
    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
    border-radius: 12px;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(228, 230, 234, 0.6);
    overflow: hidden;
  }
  
  .launch-sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e4e6ea;
    background: #f8f9fa;
    border-radius: 12px 12px 0 0;
  }
  
  .launch-sidebar-header h4 {
    margin: 0;
    color: #181c32;
    font-weight: 600;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .launch-sidebar-header .subtitle {
    color: #7e8299;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }
  
  .launch-sidebar-content {
    flex: 1;
    overflow: visible;
    padding: 0;
  }
  
  .sidebar-section {
    margin-bottom: 0;
  }
  
  .sidebar-section-header {
    padding: 1rem 1.5rem 0.5rem;
    margin: 0;
  }
  
  .sidebar-section-title {
    color: #a1a5b7;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 0;
  }
  
  .sidebar-menu-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    color: #7e8299;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.15s ease;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    position: relative;
  }
  
  .sidebar-menu-item:hover {
    background: rgba(0, 158, 247, 0.06);
    color: #009ef7;
  }
  
  .sidebar-menu-item.active {
    background: linear-gradient(90deg, rgba(0, 158, 247, 0.12) 0%, rgba(0, 158, 247, 0.06) 100%);
    color: #009ef7;
    border-right: 3px solid #009ef7;
    box-shadow: inset 0 0 0 1px rgba(0, 158, 247, 0.1);
  }
  
  .sidebar-menu-item .icon {
    margin-right: 0.75rem;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
  
  .sidebar-menu-item .label {
    flex: 1;
  }
  
  .sidebar-menu-item .edit-btn {
    opacity: 0;
    transition: opacity 0.15s ease;
    background: none;
    border: none;
    padding: 0.25rem;
    border-radius: 4px;
    color: #a1a5b7;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .sidebar-menu-item:hover .edit-btn {
    opacity: 1;
  }
  
  .sidebar-menu-item .edit-btn:hover {
    background: rgba(0, 158, 247, 0.1);
    color: #009ef7;
  }
  
  /* Desktop - sidebar sempre visível */
  @media (min-width: 993px) {
    .launch-sidebar {
      position: relative !important;
      left: 0 !important;
      display: flex !important;
    }
  }

  
  /* Loading state */
  .sidebar-loading {
    padding: 2rem 1.5rem;
    text-align: center;
    color: #a1a5b7;
  }
  
  .sidebar-loading .spinner {
    margin-bottom: 1rem;
  }
`;

const LaunchSidebar: React.FC<LaunchSidebarProps> = ({
  activeTab,
  onTabClick,
  isEditing,
  onEdit
}) => {
  const { launchId } = useParams();
  const navigate = useNavigate();

  // Redux state
  const launch = useSelector((state: ApplicationState) =>
    state.launch.myLaunchs.find(l => l.id === Number(launchId))
  );
  const launchphases = useSelector((state: ApplicationState) => state.launchphase);

  const handleMenuItemClick = (tabId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onTabClick(tabId);
  };

  const handleEditClick = (phase: LaunchPhases, e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(phase);
  };

  return (
    <>
      <style>{sidebarStyles}</style>
      <div className="launch-sidebar">
        {/* Header */}
        <div className="launch-sidebar-header">
          <h4>
            <KTIcon iconName="rocket" className="fs-3 text-primary" />
            Gerenciar Lançamento
          </h4>
          <div className="subtitle">
            {launch?.name || 'Carregando...'}
          </div>
        </div>

        {/* Content */}
        <div className="launch-sidebar-content">
          {/* Seção Principal */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <h6 className="sidebar-section-title">Principal</h6>
            </div>
            
            <button
              className={`sidebar-menu-item ${activeTab === "resumo" ? "active" : ""}`}
              onClick={() => handleMenuItemClick("resumo")}
            >
              <KTIcon iconName="chart-line" className="icon" />
              <span className="label">Resumo</span>
            </button>
            
            <button
              className={`sidebar-menu-item ${activeTab === "lead-score" ? "active" : ""}`}
              onClick={() => handleMenuItemClick("lead-score")}
            >
              <KTIcon iconName="chart-line-up" className="icon" />
              <span className="label">Lead Score</span>
            </button>
            
            {/* <button
              className={`sidebar-menu-item ${activeTab === "configuracao" ? "active" : ""}`}
              onClick={() => handleMenuItemClick("configuracao")}
            >
              <KTIcon iconName="setting" className="icon" />
              <span className="label">Configuração</span>
            </button> */}
          </div>

          {/* Seção Fases */}
          {launchphases.myLaunchPhases && launchphases.myLaunchPhases.length > 0 ? (
            <div className="sidebar-section">
              <div className="sidebar-section-header">
                <h6 className="sidebar-section-title">Fases do Lançamento</h6>
              </div>
              
              {launchphases.myLaunchPhases.map((phase: LaunchPhases) => (
                <button
                  key={phase.id}
                  className={`sidebar-menu-item ${activeTab === phase.id?.toString() ? "active" : ""}`}
                  onClick={() => handleMenuItemClick(phase.id?.toString() || "")}
                >
                  <KTIcon
                    iconName={
                      phase.name === "Captação"
                        ? "user"
                        : phase.name === "Evento"
                        ? "calendar"
                        : phase.name === "Vendas"
                        ? "rocket"
                        : phase.name === "Aquecimento"
                        ? "sun"
                        : phase.name === "Debriefing"
                        ? "chart-simple-3"
                        : "gear"
                    }
                    className="icon"
                  />
                  <span className="label">{phase.name}</span>
                  <div
                    className="edit-btn"
                    onClick={(e) => handleEditClick(phase, e)}
                    title={`Editar fase ${phase.name}`}
                    role="button"
                    tabIndex={0}
                  >
                    <KTIcon iconName="pencil" className="fs-7" />
                  </div>
                </button>
              ))}
            </div>
          ) : launchphases.loading ? (
            <div className="sidebar-loading">
              <div className="spinner-border spinner-border-sm text-primary mb-2" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <div className="fs-7 text-muted">Carregando fases...</div>
            </div>
          ) : null}

          {/* Seção Landing Pages */}
          {launchphases.myLaunchPhases && launchphases.myLaunchPhases.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-header">
                <h6 className="sidebar-section-title">Landing Pages</h6>
              </div>
              
              {/* Landing Page Captação */}
              {launchphases.myLaunchPhases.find(phase => phase.name === "Captação") && (
                <button
                  className={`sidebar-menu-item ${activeTab === "landing-page-captacao" ? "active" : ""}`}
                  onClick={() => handleMenuItemClick("landing-page-captacao")}
                >
                  <KTIcon iconName="rocket" className="icon" />
                  <span className="label">LP Captação</span>
                </button>
              )}
              
              {/* Landing Page Vendas */}
              {launchphases.myLaunchPhases.find(phase => phase.name === "Vendas") && (
                <button
                  className={`sidebar-menu-item ${activeTab === "landing-page-vendas" ? "active" : ""}`}
                  onClick={() => handleMenuItemClick("landing-page-vendas")}
                >
                  <KTIcon iconName="rocket" className="icon" />
                  <span className="label">LP Vendas</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { LaunchSidebar };