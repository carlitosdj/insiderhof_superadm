import React, { useState } from 'react'
import { UtmAdBreakdown as UtmAdBreakdownType, UtmSourceData } from '../../../../store/ducks/dlaunchphase/types'

interface UtmAdBreakdownProps {
  utmBreakdown: UtmAdBreakdownType
  scoreClass: string
  classLabel: string
  totalCount: number
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

const UtmAdBreakdown: React.FC<UtmAdBreakdownProps> = ({ 
  utmBreakdown, 
  scoreClass, 
  classLabel,
  totalCount 
}) => {
  const [expandedSources, setExpandedSources] = useState<{ [key: string]: boolean }>({})
  const [expandedCampaigns, setExpandedCampaigns] = useState<{ [key: string]: boolean }>({})
  
  // DEBUG LOGS
  console.log(`🎯 UtmAdBreakdown: Rendering for class ${scoreClass} (${classLabel})`)
  console.log(`📊 UtmAdBreakdown: Full breakdown data:`, utmBreakdown)
  console.log(`🔍 UtmAdBreakdown: Class data for ${scoreClass}:`, utmBreakdown[scoreClass])
  console.log(`📈 UtmAdBreakdown: Total count: ${totalCount}`)
  
  const classData = utmBreakdown[scoreClass]
  
  if (!classData || Object.keys(classData).length === 0) {
    return (
      <div className="alert alert-info d-flex align-items-center mt-3">
        <i className="fas fa-info-circle fs-4 me-3"></i>
        <div>
          <strong>Sem dados UTM</strong><br/>
          <small className="text-muted">
            Nenhum dado de origem de anúncios disponível para a classe {classLabel}
          </small>
        </div>
      </div>
    )
  }

  const toggleSource = (source: string) => {
    setExpandedSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }))
  }

  const toggleCampaign = (source: string, campaign: string) => {
    const key = `${source}_${campaign}`
    setExpandedCampaigns(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const formatCampaignName = (campaign: string): string => {
    return campaign
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  const formatAdName = (adName: string): string => {
    if (adName === 'Sem identificação') return adName
    return adName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="utm-breakdown mt-3">
      <div className="utm-breakdown-header mb-3">
        <h6 className="text-muted mb-2">
          <i className="fas fa-chart-pie me-2"></i>
          Origem dos Anúncios - Classe {classLabel}
        </h6>
      </div>
      
      <div className="utm-sources">
        {Object.entries(classData)
          .sort(([,a], [,b]) => b.totalCount - a.totalCount)
          .map(([source, sourceData]) => {
            const platform = platformConfigs[source.toLowerCase()] || getDefaultPlatform(source)
            const isExpanded = expandedSources[source]
            
            return (
              <div key={source} className="utm-source-card mb-3">
                <div 
                  className="utm-source-header d-flex align-items-center justify-content-between p-3 bg-light rounded cursor-pointer"
                  onClick={() => toggleSource(source)}
                  style={{ 
                    borderLeft: `4px solid ${platform.color}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2 fs-4">{platform.icon}</span>
                    <div>
                      <div className="fw-bold text-dark">
                        {platform.label} 
                        <span className="badge bg-secondary ms-2">
                          {sourceData.totalCount} leads ({sourceData.totalPercentage}%)
                        </span>
                      </div>
                      <small className="text-muted">
                        {Object.keys(sourceData.campaigns).length} campanha(s)
                      </small>
                    </div>
                  </div>
                  
                  <div className="d-flex align-items-center">
                    <div className="progress me-3" style={{ width: '100px', height: '8px' }}>
                      <div 
                        className="progress-bar"
                        style={{ 
                          width: `${sourceData.totalPercentage}%`,
                          backgroundColor: platform.color 
                        }}
                      />
                    </div>
                    <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-muted`}></i>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="utm-campaigns mt-2 ms-4">
                    {Object.entries(sourceData.campaigns)
                      .sort(([,a], [,b]) => b.campaignCount - a.campaignCount)
                      .map(([campaign, campaignData]) => {
                        const campaignKey = `${source}_${campaign}`
                        const isCampaignExpanded = expandedCampaigns[campaignKey]
                        
                        return (
                          <div key={campaign} className="utm-campaign-card mb-2">
                            <div 
                              className="utm-campaign-header d-flex align-items-center justify-content-between p-2 bg-white border rounded cursor-pointer"
                              onClick={() => toggleCampaign(source, campaign)}
                              style={{ cursor: 'pointer' }}
                            >
                              <div className="d-flex align-items-center">
                                <i className="fas fa-bullseye text-primary me-2"></i>
                                <div>
                                  <div className="fw-semibold text-dark">
                                    {formatCampaignName(campaign)}
                                    <span className="badge bg-primary ms-2" style={{ fontSize: '0.7rem' }}>
                                      {campaignData.campaignCount} leads ({campaignData.campaignPercentage}%)
                                    </span>
                                  </div>
                                  <small className="text-muted">
                                    {Object.keys(campaignData.ads).length} anúncio(s)
                                  </small>
                                </div>
                              </div>
                              
                              <div className="d-flex align-items-center">
                                <div className="progress me-2" style={{ width: '60px', height: '6px' }}>
                                  <div 
                                    className="progress-bar bg-primary"
                                    style={{ width: `${campaignData.campaignPercentage}%` }}
                                  />
                                </div>
                                <i className={`fas fa-chevron-${isCampaignExpanded ? 'up' : 'down'} text-muted fs-7`}></i>
                              </div>
                            </div>
                            
                            {isCampaignExpanded && (
                              <div className="utm-ads mt-2 ms-3">
                                {Object.entries(campaignData.ads)
                                  .sort(([,a], [,b]) => b.count - a.count)
                                  .map(([adName, adData]) => (
                                    <div key={adName} className="utm-ad-item d-flex align-items-center justify-content-between p-2 bg-light rounded mb-1">
                                      <div className="d-flex align-items-center">
                                        <i className="fas fa-ad text-success me-2"></i>
                                        <div>
                                          <div className="fw-medium text-dark">
                                            {formatAdName(adName)}
                                          </div>
                                          <small className="text-muted">
                                            {adData.classPercentage}% do total da classe
                                          </small>
                                        </div>
                                      </div>
                                      
                                      <div className="d-flex align-items-center">
                                        <div className="me-3 text-end">
                                          <div className="fw-bold text-success">{adData.count} leads</div>
                                          <small className="text-muted">{adData.percentage}% da campanha</small>
                                        </div>
                                        <div className="progress" style={{ width: '40px', height: '4px' }}>
                                          <div 
                                            className="progress-bar bg-success"
                                            style={{ width: `${adData.percentage}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                }
                              </div>
                            )}
                          </div>
                        )
                      })
                    }
                  </div>
                )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default UtmAdBreakdown