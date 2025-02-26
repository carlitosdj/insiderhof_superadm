/**
 * Action types
 */
export enum availableModuleTypes {}

export interface availableModule {
  id?: number | undefined
  availableDate?: any | undefined
  launchId?: any | undefined
  moduleId?: any | undefined
  deadline?: any | undefined
}

export interface Error {
  error?: string
}
