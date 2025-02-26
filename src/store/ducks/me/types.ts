import { City } from "../city/types"
import { Completed } from "../component/types"
import { State } from "../state/types"

/**
 * Action types
 */
export enum MeTypes {
  //Login
  LOGIN_USER_REQUEST = '@me/LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = '@me/LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = '@me/LOGIN_USER_FAILURE',
  AUTH_FROM_COOKIE = '@me/AUTH_FROM_COOKIE',

  //Recovery
  RECOVERY_USER_REQUEST = '@me/RECOVERY_USER_REQUEST',
  RECOVERY_USER_SUCCESS = '@me/RECOVERY_USER_SUCCESS',
  RECOVERY_USER_FAILURE = '@me/RECOVERY_USER_FAILURE',

  //Load me
  LOAD_ME_REQUEST = '@me/LOAD_ME_REQUEST',
  LOAD_ME_SUCCESS = '@me/LOAD_ME_SUCCESS',
  LOAD_ME_FAILURE = '@me/LOAD_ME_FAILURE',

  //Create
  CREATE_USER_REQUEST = '@me/CREATE_USER_REQUEST',
  CREATE_USER_SUCCESS = '@me/CREATE_USER_SUCCESS',
  CREATE_USER_FAILURE = '@me/CREATE_USER_FAILURE',

  //Update
  UPDATE_USER_REQUEST = '@me/UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = '@me/UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILURE = '@me/UPDATE_USER_FAILURE',

  //Delete
  DELETE_USER_REQUEST = '@me/DELETE_USER_REQUEST',
  DELETE_USER_SUCCESS = '@me/DELETE_USER_SUCCESS',
  DELETE_USER_FAILURE = '@me/DELETE_USER_FAILURE',

  //Logout
  LOGOUT_USER = '@me/LOGOUT_USER',
}

/**
 * Data types
 */
export interface User {
  id?: number
  username?: string
  email?: string
  password_hash?: string
  newPassword?: string
  auth_key?: string
  confirmedAt?: number
  unconfirmed_email?: string
  blocked_at?: number
  registration_ip?: string
  createdAt?: number
  updated_at?: number
  flags?: number
  lastLoginAt?: number
  origin?: string
  numTurma?: number
  
  //profile:
  //profile?: Profile
  name?: string
  bio?: string
  timezone?: string
  whatsapp?: string
  type?: string
  cpf?: string
  endereco?: string
  address?: string
  addressNumber?: string
  addressDistrict?: string
  addressCity?: string
  addressState?: string
  addressCountry?: string
  addressComplement?: string
  image?: string
  profileUserId?: number
  postalCode?:string

  completed?: Completed[]

  city?: City
  state?: State
  data?: any
  cityId?: string
  stateId?: string
  roles?: string

  cart?: any
  access?: any
  onlineUsers?: any
  comments?: any
  /*  */
}

// export interface Profile {
//   user_id?: number
//   name?: string
//   public_email?: string
//   gravatar_email?: string
//   gravatar_id?: string
//   location?: string
//   website?: string
//   bio?: string
//   timezone?: string
//   whatsapp?: string
//   cpf?: string
//   endereco?: string
//   address?: string
//   addressNumber?: string
//   addressDistrict?: string
//   addressCity?: string
//   addressState?: string
//   addressCountry?: string
//   image?: string
//   profileUserId?: number
//   postalCode?:string
// }

export interface Login {
  email: string
  password: string
}

/**
 * State type
 */
export interface MeState {
  readonly me: User
  readonly loading: boolean
  error: any //Nao pode ser readonly pq na página de login estou setando error..
  readonly token?: string 
  readonly logged: boolean
  readonly message?: string
  readonly data?: any
}
