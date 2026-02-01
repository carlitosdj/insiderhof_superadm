/**
 * Action types
 */
export enum TenantsTypes {
  // Load all
  LOAD_TENANTS_REQUEST = '@tenants/LOAD_TENANTS_REQUEST',
  LOAD_TENANTS_SUCCESS = '@tenants/LOAD_TENANTS_SUCCESS',
  LOAD_TENANTS_FAILURE = '@tenants/LOAD_TENANTS_FAILURE',

  // Load one
  LOAD_TENANT_REQUEST = '@tenants/LOAD_TENANT_REQUEST',
  LOAD_TENANT_SUCCESS = '@tenants/LOAD_TENANT_SUCCESS',
  LOAD_TENANT_FAILURE = '@tenants/LOAD_TENANT_FAILURE',

  // Create
  CREATE_TENANT_REQUEST = '@tenants/CREATE_TENANT_REQUEST',
  CREATE_TENANT_SUCCESS = '@tenants/CREATE_TENANT_SUCCESS',
  CREATE_TENANT_FAILURE = '@tenants/CREATE_TENANT_FAILURE',

  // Update
  UPDATE_TENANT_REQUEST = '@tenants/UPDATE_TENANT_REQUEST',
  UPDATE_TENANT_SUCCESS = '@tenants/UPDATE_TENANT_SUCCESS',
  UPDATE_TENANT_FAILURE = '@tenants/UPDATE_TENANT_FAILURE',

  // Delete
  DELETE_TENANT_REQUEST = '@tenants/DELETE_TENANT_REQUEST',
  DELETE_TENANT_SUCCESS = '@tenants/DELETE_TENANT_SUCCESS',
  DELETE_TENANT_FAILURE = '@tenants/DELETE_TENANT_FAILURE',

  // Metrics
  LOAD_TENANT_METRICS_REQUEST = '@tenants/LOAD_TENANT_METRICS_REQUEST',
  LOAD_TENANT_METRICS_SUCCESS = '@tenants/LOAD_TENANT_METRICS_SUCCESS',
  LOAD_TENANT_METRICS_FAILURE = '@tenants/LOAD_TENANT_METRICS_FAILURE',

  // Set selected tenant
  SET_SELECTED_TENANT = '@tenants/SET_SELECTED_TENANT',

  // Tenant Users
  LOAD_TENANT_USERS_REQUEST = '@tenants/LOAD_TENANT_USERS_REQUEST',
  LOAD_TENANT_USERS_SUCCESS = '@tenants/LOAD_TENANT_USERS_SUCCESS',
  LOAD_TENANT_USERS_FAILURE = '@tenants/LOAD_TENANT_USERS_FAILURE',

  ADD_TENANT_USER_REQUEST = '@tenants/ADD_TENANT_USER_REQUEST',
  ADD_TENANT_USER_SUCCESS = '@tenants/ADD_TENANT_USER_SUCCESS',
  ADD_TENANT_USER_FAILURE = '@tenants/ADD_TENANT_USER_FAILURE',

  UPDATE_TENANT_USER_REQUEST = '@tenants/UPDATE_TENANT_USER_REQUEST',
  UPDATE_TENANT_USER_SUCCESS = '@tenants/UPDATE_TENANT_USER_SUCCESS',
  UPDATE_TENANT_USER_FAILURE = '@tenants/UPDATE_TENANT_USER_FAILURE',

  REMOVE_TENANT_USER_REQUEST = '@tenants/REMOVE_TENANT_USER_REQUEST',
  REMOVE_TENANT_USER_SUCCESS = '@tenants/REMOVE_TENANT_USER_SUCCESS',
  REMOVE_TENANT_USER_FAILURE = '@tenants/REMOVE_TENANT_USER_FAILURE',

  // Tenant Settings
  LOAD_TENANT_SETTINGS_REQUEST = '@tenants/LOAD_TENANT_SETTINGS_REQUEST',
  LOAD_TENANT_SETTINGS_SUCCESS = '@tenants/LOAD_TENANT_SETTINGS_SUCCESS',
  LOAD_TENANT_SETTINGS_FAILURE = '@tenants/LOAD_TENANT_SETTINGS_FAILURE',

  UPDATE_TENANT_SETTINGS_REQUEST = '@tenants/UPDATE_TENANT_SETTINGS_REQUEST',
  UPDATE_TENANT_SETTINGS_SUCCESS = '@tenants/UPDATE_TENANT_SETTINGS_SUCCESS',
  UPDATE_TENANT_SETTINGS_FAILURE = '@tenants/UPDATE_TENANT_SETTINGS_FAILURE',
}

/**
 * Data types
 */
export interface Tenant {
  id?: number
  name: string
  slug: string
  domain?: string
  customDomain?: string
  plan: 'starter' | 'pro' | 'enterprise'
  status: 'trial' | 'active' | 'suspended' | 'cancelled'

  // Contact
  contactEmail: string
  contactPhone?: string

  // Branding
  description?: string
  logo?: string
  logoDark?: string
  logoMini?: string
  logoMiniDark?: string
  primaryColor?: string
  secondaryColor?: string

  // Dates
  trialEndsAt?: string
  createdAt?: string
  updatedAt?: string
  createdBy?: number

  // Limits
  maxProjects?: number
  maxUsers?: number
  maxStorage?: number

  // Relations (when populated)
  settings?: TenantSettings
  users?: TenantUser[]
  totalProjects?: number
  totalUsers?: number
  totalProducts?: number
}

export interface TenantSettings {
  id?: number
  tenantId: number

  // Features
  enableComments?: boolean
  enableCertificates?: boolean
  enableSupport?: boolean
  enableEvents?: boolean
  enableLaunches?: boolean
  enableMassMail?: boolean
  enableWhatsapp?: boolean
  enableEcommerce?: boolean

  // Branding
  logo?: string
  favicon?: string
  primaryColor?: string
  secondaryColor?: string
  customCss?: string
  customJs?: string
  customHeadHtml?: string
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
  fromEmail?: string
  fromName?: string
  emailFromName?: string
  emailFromAddress?: string

  // Limits
  maxProjects?: number
  maxUsers?: number
  maxStorage?: number
  maxEmailsPerMonth?: number

  createdAt?: string
  updatedAt?: string
}

export interface TenantUser {
  id?: number
  tenantId: number
  userId: number
  role: 'owner' | 'admin' | 'member' | 'viewer'
  status: 'pending' | 'active' | 'inactive'
  permissions?: any
  invitedAt?: string
  acceptedAt?: string
  invitedBy?: number
  createdAt?: string
  updatedAt?: string

  // User data (when populated)
  user?: {
    id: number
    name: string
    email: string
    image?: string
  }
  userName?: string
  userEmail?: string
  userImage?: string
}

export interface TenantMetrics {
  totalProjects: number
  totalUsers: number
  totalProducts: number
  totalSales: number
  totalLeads: number
  storageUsed?: number
}

/**
 * State type
 */
export interface TenantsState {
  readonly data: Tenant[]
  readonly selectedTenant: Tenant | null
  readonly metrics: TenantMetrics | null
  readonly tenantUsers: TenantUser[]
  readonly settings: TenantSettings | null
  readonly loading: boolean
  readonly loadingTenant: boolean
  readonly loadingMetrics: boolean
  readonly loadingUsers: boolean
  readonly loadingSettings: boolean
  readonly error: any
  readonly total: number
  readonly totalUsers?: number
  readonly totalProducts?: number
  readonly storageUsed?: number
}
