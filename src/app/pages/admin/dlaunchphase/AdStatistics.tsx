import React, { useMemo } from 'react'
import { UtmAdBreakdown as UtmAdBreakdownType } from '../../../../store/ducks/dlaunchphase/types'

interface AdStatisticsProps {
  utmBreakdown: UtmAdBreakdownType
  totalResponses: number
}

interface AdStatistic {
  adName: string
  platform: string
  campaign: string
  totalLeads: number
  leadsA: number
  leadsB: number  
  leadsC: number
  leadsD: number
  percentageA: number
  percentageB: number
  percentageC: number
  percentageD: number
  platformIcon: string
  platformColor: string
}

interface PlatformConfig {
  icon: string
  color: string
  label: string
}

const platformConfigs: { [key: string]: PlatformConfig } = {
  facebook: {
    icon: '📱',
    color: '#1877F2',
    label: 'Meta/Facebook'
  },
  google: {
    icon: '🔍', 
    color: '#4285F4',
    label: 'Google Ads'
  },
  linkedin: {
    icon: '💼',
    color: '#0A66C2', 
    label: 'LinkedIn Ads'
  },
  tiktok: {
    icon: '🎵',
    color: '#FF0050',
    label: 'TikTok Ads'
  },
  instagram: {
    icon: '📷',
    color: '#E4405F',
    label: 'Instagram'
  }
}

const getDefaultPlatform = (source: string): PlatformConfig => ({
  icon: '📊',
  color: '#6c757d',
  label: source.charAt(0).toUpperCase() + source.slice(1)
})

const AdStatistics: React.FC<AdStatisticsProps> = ({ utmBreakdown, totalResponses }) => {
  
  const adStatistics: AdStatistic[] = useMemo(() => {
    const adMap: { [key: string]: AdStatistic } = {}
    
    // Mapear classes para labels mais claros
    const classMapping: { [key: string]: keyof Pick<AdStatistic, 'leadsA' | 'leadsB' | 'leadsC' | 'leadsD'> } = {
      'A': 'leadsA',
      'B': 'leadsB', 
      'C': 'leadsC',
      'D': 'leadsD'
    }

    // Iterar por todas as classes (A, B, C, D)
    Object.entries(utmBreakdown).forEach(([scoreClass, classData]) => {
      if (scoreClass === 'Não classificado') return // Ignorar não classificados
      
      // Iterar por todas as fontes (facebook, google, etc)
      Object.entries(classData).forEach(([source, sourceData]) => {
        const platform = platformConfigs[source.toLowerCase()] || getDefaultPlatform(source)
        
        // Iterar por todas as campanhas
        Object.entries(sourceData.campaigns).forEach(([campaign, campaignData]) => {
          
          // Iterar por todos os anúncios
          Object.entries(campaignData.ads).forEach(([adName, adData]) => {
            const adKey = `${source}_${campaign}_${adName}`
            
            // Se o anúncio ainda não existe no mapa, criar
            if (!adMap[adKey]) {
              adMap[adKey] = {
                adName,
                platform: platform.label,
                campaign,
                totalLeads: 0,
                leadsA: 0,
                leadsB: 0,
                leadsC: 0,
                leadsD: 0,
                percentageA: 0,
                percentageB: 0,
                percentageC: 0,
                percentageD: 0,
                platformIcon: platform.icon,
                platformColor: platform.color
              }
            }
            
            // Adicionar os leads desta classe ao total
            const leadsField = classMapping[scoreClass]
            if (leadsField) {
              adMap[adKey][leadsField] += adData.count
              adMap[adKey].totalLeads += adData.count
            }
          })
        })
      })
    })

    // Converter mapa para array e calcular porcentagens
    return Object.values(adMap)
      .map(ad => ({
        ...ad,
        percentageA: ad.totalLeads > 0 ? (ad.leadsA / ad.totalLeads) * 100 : 0,
        percentageB: ad.totalLeads > 0 ? (ad.leadsB / ad.totalLeads) * 100 : 0,
        percentageC: ad.totalLeads > 0 ? (ad.leadsC / ad.totalLeads) * 100 : 0,
        percentageD: ad.totalLeads > 0 ? (ad.leadsD / ad.totalLeads) * 100 : 0,
      }))
      .sort((a, b) => b.totalLeads - a.totalLeads) // Ordenar por total de leads
  }, [utmBreakdown])

  const formatAdName = (name: string): string => {
    if (name === 'Sem identificação') return 'Sem ID'
    return name.replace(/_/g, ' ').length > 30 
      ? name.replace(/_/g, ' ').substring(0, 30) + '...'
      : name.replace(/_/g, ' ')
  }

  const formatCampaignName = (name: string): string => {
    return name.replace(/_/g, ' ').length > 20
      ? name.replace(/_/g, ' ').substring(0, 20) + '...'
      : name.replace(/_/g, ' ')
  }

  if (adStatistics.length === 0) {
    return (
      <div className="alert alert-info d-flex align-items-center">
        <i className="fas fa-info-circle fs-4 me-3"></i>
        <div>
          <strong>Sem dados de anúncios</strong><br/>
          <small className="text-muted">
            Nenhum anúncio com dados UTM foi encontrado para este lançamento
          </small>
        </div>
      </div>
    )
  }

  return (
    <div className="ad-statistics">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h6 className="text-dark mb-1">
            <i className="fas fa-chart-bar me-2"></i>
            Estatísticas dos Anúncios por Classificação de Leads
          </h6>
          <p className="text-muted fs-7 mb-0">
            Performance detalhada de cada anúncio na geração de leads qualificados
          </p>
        </div>
        <div className="badge badge-light-primary fs-7">
          {adStatistics.length} anúncios ativos
        </div>
      </div>

      {/* Tabela responsiva */}
      <div className="table-responsive">
        <table className="table table-rounded table-striped border gy-7 gs-7">
          <thead>
            <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
              <th className="min-w-200px">Anúncio</th>
              <th className="min-w-100px text-center">Total</th>
              <th className="min-w-80px text-center">
                <span className="badge badge-light-success">Leads A</span>
              </th>
              <th className="min-w-80px text-center">
                <span className="badge badge-light-primary">Leads B</span>
              </th>
              <th className="min-w-80px text-center">
                <span className="badge badge-light-warning">Leads C</span>
              </th>
              <th className="min-w-80px text-center">
                <span className="badge badge-light-danger">Leads D</span>
              </th>
              <th className="min-w-150px">Distribuição</th>
            </tr>
          </thead>
          <tbody>
            {adStatistics.map((ad, index) => (
              <tr key={`${ad.platform}_${ad.campaign}_${ad.adName}`}>
                {/* Coluna do Anúncio */}
                <td>
                  <div className="d-flex align-items-center">
                    <span 
                      className="me-3 fs-4"
                      title={ad.platform}
                    >
                      {ad.platformIcon}
                    </span>
                    <div>
                      <div className="fw-bold text-dark">
                        {formatAdName(ad.adName)}
                      </div>
                      <div className="text-muted fs-7">
                        <i className="fas fa-bullseye me-1"></i>
                        {formatCampaignName(ad.campaign)}
                      </div>
                      <div className="text-muted fs-8">
                        {ad.platform}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Total de Leads */}
                <td className="text-center">
                  <div className="fw-bold text-primary fs-6">
                    {ad.totalLeads}
                  </div>
                  <div className="text-muted fs-8">
                    leads
                  </div>
                </td>

                {/* Leads A */}
                <td className="text-center">
                  <div className="fw-bold text-success">
                    {ad.leadsA}
                  </div>
                  <div className="text-muted fs-8">
                    {ad.percentageA.toFixed(1)}%
                  </div>
                </td>

                {/* Leads B */}
                <td className="text-center">
                  <div className="fw-bold text-primary">
                    {ad.leadsB}
                  </div>
                  <div className="text-muted fs-8">
                    {ad.percentageB.toFixed(1)}%
                  </div>
                </td>

                {/* Leads C */}
                <td className="text-center">
                  <div className="fw-bold text-warning">
                    {ad.leadsC}
                  </div>
                  <div className="text-muted fs-8">
                    {ad.percentageC.toFixed(1)}%
                  </div>
                </td>

                {/* Leads D */}
                <td className="text-center">
                  <div className="fw-bold text-danger">
                    {ad.leadsD}
                  </div>
                  <div className="text-muted fs-8">
                    {ad.percentageD.toFixed(1)}%
                  </div>
                </td>

                {/* Gráfico de Distribuição */}
                <td>
                  <div className="d-flex align-items-center">
                    <div className="progress flex-grow-1 me-2" style={{ height: '20px' }}>
                      {/* Leads A - Verde */}
                      {ad.percentageA > 0 && (
                        <div 
                          className="progress-bar bg-success"
                          style={{ width: `${ad.percentageA}%` }}
                          title={`Leads A: ${ad.leadsA} (${ad.percentageA.toFixed(1)}%)`}
                        />
                      )}
                      {/* Leads B - Azul */}
                      {ad.percentageB > 0 && (
                        <div 
                          className="progress-bar bg-primary"
                          style={{ width: `${ad.percentageB}%` }}
                          title={`Leads B: ${ad.leadsB} (${ad.percentageB.toFixed(1)}%)`}
                        />
                      )}
                      {/* Leads C - Amarelo */}
                      {ad.percentageC > 0 && (
                        <div 
                          className="progress-bar bg-warning"
                          style={{ width: `${ad.percentageC}%` }}
                          title={`Leads C: ${ad.leadsC} (${ad.percentageC.toFixed(1)}%)`}
                        />
                      )}
                      {/* Leads D - Vermelho */}
                      {ad.percentageD > 0 && (
                        <div 
                          className="progress-bar bg-danger"
                          style={{ width: `${ad.percentageD}%` }}
                          title={`Leads D: ${ad.leadsD} (${ad.percentageD.toFixed(1)}%)`}
                        />
                      )}
                    </div>
                    <div className="text-muted fs-8" style={{ minWidth: '40px' }}>
                      100%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumo no rodapé */}
      <div className="row mt-4">
        <div className="col-md-3">
          <div className="text-center">
            <div className="fw-bold fs-2 text-primary">
              {adStatistics.reduce((sum, ad) => sum + ad.totalLeads, 0)}
            </div>
            <div className="text-muted fs-7">Total de Leads</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="text-center">
            <div className="fw-bold fs-2 text-success">
              {adStatistics.reduce((sum, ad) => sum + ad.leadsA, 0)}
            </div>
            <div className="text-muted fs-7">Leads A (Alta)</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="text-center">
            <div className="fw-bold fs-2 text-primary">
              {adStatistics.reduce((sum, ad) => sum + ad.leadsB, 0)}
            </div>
            <div className="text-muted fs-7">Leads B (Média-Alta)</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="text-center">
            <div className="fw-bold fs-2 text-warning">
              {adStatistics.reduce((sum, ad) => sum + ad.leadsC, 0)} + {adStatistics.reduce((sum, ad) => sum + ad.leadsD, 0)}
            </div>
            <div className="text-muted fs-7">Leads C+D (Baixa)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdStatistics