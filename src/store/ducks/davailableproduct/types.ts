/**
 * Action types
 */
export enum availableProductTypes {}

export interface availableProduct {
  id?: number | undefined
  availableDate?: any | undefined
  launchId?: any | undefined
  productId?: any | undefined
  deadline?: any | undefined
}

export interface Error {
  error?: string
}
