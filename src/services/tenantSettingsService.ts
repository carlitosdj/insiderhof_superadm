import api from './api'

export interface UpdateTenantSettingsData {
  // Features
  enableEvents?: number
  enableLaunches?: number
  enableMassMail?: number
  enableWhatsapp?: number
  enableEcommerce?: number
  enableCertificates?: number

  // Branding
  customCss?: string
  customJs?: string
  customHeaderHtml?: string
  customFooterHtml?: string

  // SEO
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  seoImage?: string

  // Integrations
  googleAnalyticsId?: string
  facebookPixelId?: string
  hotjarId?: string

  // Email
  smtpHost?: string
  smtpPort?: number
  smtpUser?: string
  smtpPassword?: string
  emailFromName?: string
  emailFromAddress?: string

  // Limits
  maxProjects?: number
  maxUsers?: number
  maxStorage?: number
  maxEmailsPerMonth?: number
}

// Get tenant settings
export const getTenantSettings = (tenantId: number) => {
  return api.get(`/tenant-settings/${tenantId}`)
}

// Update tenant settings
export const updateTenantSettings = (tenantId: number, data: any) => {
  return api.patch(`/tenant-settings/${tenantId}`, data)
}
