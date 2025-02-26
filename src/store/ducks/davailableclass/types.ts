/**
 * Action types
 */
export enum availableClassTypes {}

export interface availableClass {
  id?: number | undefined
  availableDate?: any | undefined
  launchId?: any | undefined
  classId?: any | undefined
  deadline?: any | undefined
}

export interface Error {
  error?: string
}
