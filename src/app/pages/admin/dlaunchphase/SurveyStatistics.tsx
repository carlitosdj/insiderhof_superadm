import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../../store'
import { loadPhaseStatisticsRequest } from '../../../../store/ducks/dlaunchphase/actions'
import { PhaseStatistics, QuestionStatistics } from '../../../../store/ducks/dlaunchphase/types'
import UtmAdBreakdown from './UtmAdBreakdown'
import CompactUtmBreakdown from './CompactUtmBreakdown'
import AdStatistics from './AdStatistics'

interface SurveyStatisticsProps {
  phaseId: number
}

const SurveyStatistics: React.FC<SurveyStatisticsProps> = ({ phaseId }) => {
  const dispatch = useDispatch()
  
  // Simplificar o selector para evitar re-renders
  const launchPhaseState = useSelector((state: ApplicationState) => state?.launchphase)
  
  // Usar useMemo para evitar recalcular os valores a cada render
  const { phaseStatistics, loadingStatistics } = useMemo(() => {
    if (!launchPhaseState) {
      return { phaseStatistics: null, loadingStatistics: false }
    }
    return {
      phaseStatistics: launchPhaseState.phaseStatistics || null,
      loadingStatistics: launchPhaseState.loadingStatistics || false
    }
  }, [launchPhaseState])

  useEffect(() => {
    console.log('SurveyStatistics: phaseId received:', phaseId)
    if (phaseId && dispatch) {
      console.log('SurveyStatistics: Dispatching loadPhaseStatisticsRequest for phaseId:', phaseId)
      dispatch(loadPhaseStatisticsRequest(phaseId))
    } else {
      console.log('SurveyStatistics: Not dispatching request. phaseId:', phaseId, 'dispatch:', !!dispatch)
    }
  }, [dispatch, phaseId])

  console.log("🔍 SurveyStats: launchPhaseState", launchPhaseState)
  console.log("📊 SurveyStats: phaseStatistics", phaseStatistics)
  console.log("🎯 SurveyStats: UTM data?", phaseStatistics?.utmAdBreakdown)

  const renderQuestionStatistic = (question: QuestionStatistics) => {
    return (
      <div key={question.questionId} className="card mb-4">
        <div className="card-body">
          <h6 className="card-title">{question?.question || 'Pergunta não informada'}</h6>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Tipo:</span>
                <span className="badge badge-light-primary">{question?.type || 'N/A'}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Total de Respostas:</span>
                <span className="fw-bold">{question?.totalResponses || 0}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-muted">Score Médio:</span>
                <span className="fw-bold text-primary">{(question.averageScore || 0).toFixed(1)}%</span>
              </div>
            </div>
            <div className="col-md-6">
              <h6 className="text-muted">Distribuição das Respostas:</h6>
              {(question?.distribution || []).map((item, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center mb-1">
                  <span className="text-sm">{item?.optionText || 'N/A'}</span>
                  <div className="d-flex align-items-center">
                    <div className="progress me-2" style={{ width: '100px', height: '6px' }}>
                      <div 
                        className="progress-bar bg-primary" 
                        style={{ width: `${item?.percentage || 0}%` }}
                      ></div>
                    </div>
                    <span className="text-muted text-sm">{item?.count || 0} ({item?.percentage || 0}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Early return se não há phaseId
  if (!phaseId) {
    return (
      <div className="alert alert-info">
        <div className="alert-text">
          ID da fase não fornecido para carregar as estatísticas.
        </div>
      </div>
    )
  }

  // Adicionar verificação inicial se o estado não está disponível
  if (!launchPhaseState) {
    return (
      <div className="alert alert-warning">
        <div className="alert-text">
          Estado do sistema não encontrado. Recarregue a página para tentar novamente.
        </div>
      </div>
    )
  }

  const renderScoreDistribution = (statistics: PhaseStatistics) => {
    const getClassLabel = (range: string) => {
      if (range.includes('76-100')) return 'A';
      if (range.includes('51-75')) return 'B';  
      if (range.includes('26-50')) return 'C';
      if (range.includes('0-25')) return 'D';
      return range;
    }

    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Distribuição de Scores dos Leads</h6>
          <div className="row">
            {(statistics?.leadScoreDistribution?.scoreRanges || [])
              .sort((a, b) => {
                const classA = getClassLabel(a.range || '');
                const classB = getClassLabel(b.range || '');
                const order = { 'A': 1, 'B': 2, 'C': 3, 'D': 4 };
                return (order[classA as keyof typeof order] || 5) - (order[classB as keyof typeof order] || 5);
              })
              .map((range, index) => {
              const classLabel = getClassLabel(range.range || '');
              
              return (
                <div key={index} className="col-12 col-lg-6 col-xl-3 mb-4">
                  <div className="card h-100 border">
                    <div className="card-body text-center">
                      <div className="fs-2x fw-bold text-primary mb-2">{range?.count || 0}</div>
                      <div className="text-muted">{range?.range || 'N/A'} ({classLabel})</div>
                      <div className="text-muted text-sm mb-3">({range?.percentage || 0}%)</div>
                      
                      {/* Compact UTM Breakdown for this score class */}
                      {statistics?.utmAdBreakdown && (
                        <CompactUtmBreakdown 
                          utmBreakdown={statistics.utmAdBreakdown}
                          scoreClass={classLabel}
                          totalCount={range?.count || 0}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  if (loadingStatistics) {
    return (
      <div className="text-center py-10">
        <div className="spinner-border spinner-border-lg text-primary" role="status">
          <span className="sr-only">Carregando estatísticas...</span>
        </div>
      </div>
    )
  }

  if (!phaseStatistics || (phaseStatistics.totalResponses || 0) === 0) {
    return (
      <div className="alert alert-info">
        <div className="alert-text">
          Nenhuma resposta encontrada para esta fase. As estatísticas aparecerão quando os leads começarem a responder as pesquisas.
        </div>
      </div>
    )
  }

  return (
    <div className="survey-statistics">
      {/* Header com estatísticas gerais */}
      <div className="row mb-6">
        <div className="col-md-4">
          <div className="card card-flush">
            <div className="card-body text-center">
              <div className="fs-2x fw-bold text-primary">{phaseStatistics?.totalResponses || 0}</div>
              <div className="text-muted">Total de Respostas</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-flush">
            <div className="card-body text-center">
              <div className="fs-2x fw-bold text-success">{(phaseStatistics?.leadScoreAverage || 0).toFixed(1)}%</div>
              <div className="text-muted">Lead Score Médio</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-flush">
            <div className="card-body text-center">
              <div className="fs-2x fw-bold text-warning">{phaseStatistics?.questionStatistics?.length || 0}</div>
              <div className="text-muted">Perguntas na Pesquisa</div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribuição de Scores */}
      <div className="mb-6">
        {renderScoreDistribution(phaseStatistics)}
      </div>

      {/* Estatísticas dos Anúncios */}
      {phaseStatistics?.utmAdBreakdown && (
        <div className="mb-6">
          <div className="card">
            <div className="card-body">
              <AdStatistics 
                utmBreakdown={phaseStatistics.utmAdBreakdown}
                totalResponses={phaseStatistics.totalResponses}
              />
            </div>
          </div>
        </div>
      )}

      {/* Leads Não Classificados com UTM Data */}
      {phaseStatistics?.utmAdBreakdown && phaseStatistics.utmAdBreakdown['Não classificado'] && (
        <div className="mb-6">
          <div className="card border-warning">
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="text-center">
                    <div className="fs-2x fw-bold text-warning mb-2">
                      {Object.values(phaseStatistics.utmAdBreakdown['Não classificado'] || {})
                        .reduce((total, source) => total + source.totalCount, 0)}
                    </div>
                    <div className="text-muted">Leads Não Classificados</div>
                    <div className="text-muted text-sm">com dados UTM</div>
                  </div>
                </div>
                <div className="col-md-8">
                  <h6 className="card-title">
                    <i className="fas fa-users-slash text-warning me-2"></i>
                    Anúncios Gerando Leads Não Classificados
                  </h6>
                  <div className="alert alert-warning mb-3" style={{ fontSize: '0.8rem' }}>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Leads de campanhas UTM que ainda não responderam o questionário ou não foram classificados.
                  </div>
                  <CompactUtmBreakdown 
                    utmBreakdown={phaseStatistics.utmAdBreakdown}
                    scoreClass="Não classificado"
                    totalCount={Object.values(phaseStatistics.utmAdBreakdown['Não classificado'] || {})
                      .reduce((total, source) => total + source.totalCount, 0)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas por pergunta */}
      <div>
        <h5 className="mb-4">Estatísticas por Pergunta</h5>
        {(phaseStatistics?.questionStatistics || []).map(renderQuestionStatistic)}
      </div>
    </div>
  )
}

export default SurveyStatistics