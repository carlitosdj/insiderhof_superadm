import React from 'react'
import { UtmAdBreakdown as UtmAdBreakdownType } from '../../../../store/ducks/dlaunchphase/types'

interface CompactUtmBreakdownProps {
  utmBreakdown: UtmAdBreakdownType
  scoreClass: string
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
    label: 'Meta'
  },
  google: {
    icon: '🔍', 
    color: '#4285F4',
    label: 'Google'
  },
  linkedin: {
    icon: '💼',
    color: '#0A66C2', 
    label: 'LinkedIn'
  },
  tiktok: {
    icon: '🎵',
    color: '#FF0050',
    label: 'TikTok'
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

interface AdData {
  name: string
  count: number
  percentage: number
  source: string
  campaign: string
  platform: PlatformConfig
}

const CompactUtmBreakdown: React.FC<CompactUtmBreakdownProps> = ({ 
  utmBreakdown, 
  scoreClass, 
  totalCount 
}) => {
  const classData = utmBreakdown[scoreClass]
  
  if (!classData || Object.keys(classData).length === 0) {
    return (
      <div className="compact-utm mt-2">
        <div className="text-muted text-center" style={{ fontSize: '0.75rem' }}>
          <i className="fas fa-info-circle me-1"></i>
          Sem dados de origem
        </div>
      </div>
    )
  }

  // Flatten all ads from all sources/campaigns into a single array
  const allAds: AdData[] = []
  
  Object.entries(classData).forEach(([source, sourceData]) => {
    const platform = platformConfigs[source.toLowerCase()] || getDefaultPlatform(source)
    
    Object.entries(sourceData.campaigns).forEach(([campaign, campaignData]) => {
      Object.entries(campaignData.ads).forEach(([adName, adData]) => {
        allAds.push({
          name: adName,
          count: adData.count,
          percentage: adData.classPercentage, // Percentage of total class
          source,
          campaign,
          platform
        })
      })
    })
  })

  // Sort by count and take top 5
  const topAds = allAds
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  if (topAds.length === 0) {
    return (
      <div className="compact-utm mt-2">
        <div className="text-muted text-center" style={{ fontSize: '0.75rem' }}>
          <i className="fas fa-info-circle me-1"></i>
          Sem dados de anúncios
        </div>
      </div>
    )
  }

  return (
    <div className="compact-utm mt-3">
      <div className="mb-2">
        <div className="text-muted fw-bold" style={{ fontSize: '0.75rem' }}>
          <i className="fas fa-chart-pie me-1"></i>
          TOP 5 ANÚNCIOS
        </div>
      </div>
      
      <div className="ads-list">
        {topAds.map((ad, index) => (
          <div key={`${ad.source}_${ad.campaign}_${ad.name}`} className="ad-item d-flex align-items-center justify-content-between mb-1 p-1" 
               style={{ 
                 backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'transparent',
                 borderRadius: '3px',
                 fontSize: '0.7rem'
               }}>
            <div className="d-flex align-items-center flex-grow-1 me-2">
              <span className="me-1" style={{ fontSize: '0.8rem' }}>{ad.platform.icon}</span>
              <div className="flex-grow-1" style={{ minWidth: 0 }}>
                <div className="text-truncate fw-semibold" style={{ maxWidth: '120px' }} title={ad.name}>
                  {ad.name === 'Sem identificação' ? 'Sem ID' : ad.name.replace(/_/g, ' ')}
                </div>
                <div className="text-muted" style={{ fontSize: '0.6rem' }}>
                  {ad.platform.label}
                </div>
              </div>
            </div>
            
            <div className="d-flex align-items-center">
              <div className="text-end me-2">
                <div className="fw-bold text-primary" style={{ fontSize: '0.7rem' }}>
                  {ad.percentage.toFixed(1)}%
                </div>
                <div className="text-muted" style={{ fontSize: '0.6rem' }}>
                  {ad.count} leads
                </div>
              </div>
              
              <div className="progress" style={{ width: '25px', height: '3px' }}>
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${Math.min(ad.percentage, 100)}%`,
                    backgroundColor: ad.platform.color 
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {allAds.length > 5 && (
        <div className="text-center mt-1">
          <small className="text-muted" style={{ fontSize: '0.6rem' }}>
            +{allAds.length - 5} outros anúncios
          </small>
        </div>
      )}
    </div>
  )
}

export default CompactUtmBreakdown