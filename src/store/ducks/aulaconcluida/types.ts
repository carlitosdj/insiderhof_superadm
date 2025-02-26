/**
 * Action types
 */
export enum AulaConcluidaTypes {
  //Create
  CREATE_AULACONCLUIDA_REQUEST = '@component/CREATE_AULACONCLUIDA_REQUEST',
  CREATE_AULACONCLUIDA_SUCCESS = '@component/CREATE_AULACONCLUIDA_SUCCESS',
  CREATE_AULACONCLUIDA_FAILURE = '@component/CREATE_AULACONCLUIDA_FAILURE',
  //Delete
  DELETE_AULACONCLUIDA_REQUEST = '@component/DELETE_AULACONCLUIDA_REQUEST',
  DELETE_AULACONCLUIDA_SUCCESS = '@component/DELETE_AULACONCLUIDA_SUCCESS',
  DELETE_AULACONCLUIDA_FAILURE = '@component/DELETE_AULACONCLUIDA_FAILURE',
}

/**
 * Data types
 */
export interface AulaConcluida {
  id?: number | undefined
  createdAt?: string | undefined
  status?: string
  parentUser?: any | undefined
  parentComponent?: any | undefined
}

export interface Error {
  error?: string
}
// /**
//  * State type
//  */
// export interface AulaConcluidaState {
//     readonly data: AulaConcluida
//     readonly loading: boolean
//     readonly error?: Error
// }
