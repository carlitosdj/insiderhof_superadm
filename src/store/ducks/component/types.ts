import {AulaConcluida} from '../aulaconcluida/types'
// import {available} from '../available/types'
import {Extras} from '../extras/types'
import { User } from '../me/types'
/**
 * Action types
 */
export enum ComponentTypes {

  REORDER_COMPONENT = '@component/REORDER_COMPONENT',

  //Load component and children
  LOAD_COMPONENT_REQUEST = '@component/LOAD_COMPONENT_REQUEST',
  LOAD_COMPONENT_SUCCESS = '@component/LOAD_COMPONENT_SUCCESS',
  LOAD_COMPONENT_FAILURE = '@component/LOAD_COMPONENT_FAILURE',

  LOAD_COMPONENT_WITH_ACCESS_REQUEST = '@component/LOAD_COMPONENT_WITH_ACCESS_REQUEST',
  LOAD_COMPONENT_WITH_ACCESS_SUCCESS = '@component/LOAD_COMPONENT_WITH_ACCESS_SUCCESS',
  LOAD_COMPONENT_WITH_ACCESS_FAILURE = '@component/LOAD_COMPONENT_WITH_ACCESS_FAILURE',

  LOAD_MODULES_REQUEST = '@component/LOAD_MODULES_REQUEST',
  LOAD_MODULES_SUCCESS = '@component/LOAD_MODULES_SUCCESS',
  LOAD_MODULES_FAILURE = '@component/LOAD_MODULES_FAILURE',

  LOAD_CLASSES_REQUEST = '@component/LOAD_CLASSES_REQUEST',
  LOAD_CLASSES_SUCCESS = '@component/LOAD_CLASSES_SUCCESS',
  LOAD_CLASSES_FAILURE = '@component/LOAD_CLASSES_FAILURE',

  LOAD_LASTCLASS_REQUEST = '@component/LOAD_LASTCLASS_REQUEST',
  LOAD_LASTCLASS_SUCCESS = '@component/LOAD_LASTCLASS_SUCCESS',
  LOAD_LASTCLASS_FAILURE = '@component/LOAD_LASTCLASS_FAILURE',

  LOAD_COMPONENT_BY_DESC_REQUEST = '@component/LOAD_COMPONENT_BY_DESC_REQUEST',
  LOAD_COMPONENT_BY_DESC_SUCCESS = '@component/LOAD_COMPONENT_BY_DESC_SUCCESS',
  LOAD_COMPONENT_BY_DESC_FAILURE = '@component/LOAD_COMPONENT_BY_DESC_FAILURE',

  LOAD_COMPONENT_CHILDREN_REQUEST = '@component/LOAD_COMPONENT_CHILDREN_REQUEST',
  LOAD_COMPONENT_CHILDREN_SUCCESS = '@component/LOAD_COMPONENT_CHILDREN_SUCCESS',
  LOAD_COMPONENT_CHILDREN_FAILURE = '@component/LOAD_COMPONENT_CHILDREN_FAILURE',

  LOAD_COMPONENT_EXTRAS_REQUEST = '@component/LOAD_COMPONENT_EXTRAS_REQUEST',
  LOAD_COMPONENT_EXTRAS_SUCCESS = '@component/LOAD_COMPONENT_EXTRAS_SUCCESS',
  LOAD_COMPONENT_EXTRAS_FAILURE = '@component/LOAD_COMPONENT_EXTRAS_FAILURE',

  // //Load course
  // LOAD_COURSE_REQUEST = '@component/LOAD_COURSE_REQUEST',
  // LOAD_COURSE_SUCCESS = '@component/LOAD_COURSE_SUCCESS',
  // LOAD_COURSE_FAILURE = '@component/LOAD_COURSE_FAILURE',

  //Create component
  CREATE_COMPONENT_REQUEST = '@component/CREATE_COMPONENT_REQUEST',
  CREATE_COMPONENT_SUCCESS = '@component/CREATE_COMPONENT_SUCCESS',
  CREATE_COMPONENT_FAILURE = '@component/CREATE_COMPONENT_FAILURE',

  //CREATE_LAUNCH_FAILURE
  CREATE_LAUNCH_REQUEST = '@component/CREATE_LAUNCH_REQUEST',
  CREATE_LAUNCH_SUCCESS = '@component/CREATE_LAUNCH_SUCCESS',
  CREATE_LAUNCH_FAILURE = '@component/CREATE_LAUNCH_FAILURE',

  //Create access
  CREATE_COMPONENTACCESS_REQUEST = '@component/CREATE_COMPONENTACCESS_REQUEST',
  CREATE_COMPONENTACCESS_SUCCESS = '@component/CREATE_COMPONENTACCESS_SUCCESS',
  CREATE_COMPONENTACCESS_FAILURE = '@component/CREATE_COMPONENTACCESS_FAILURE',

  //Update component
  UPDATE_COMPONENT_REQUEST = '@component/UPDATE_COMPONENT_REQUEST',
  UPDATE_COMPONENT_SUCCESS = '@component/UPDATE_COMPONENT_SUCCESS',
  UPDATE_COMPONENT_FAILURE = '@component/UPDATE_COMPONENT_FAILURE',

  //Update access
  UPDATE_COMPONENTACCESS_REQUEST = '@component/UPDATE_COMPONENTACCESS_REQUEST',
  UPDATE_COMPONENTACCESS_SUCCESS = '@component/UPDATE_COMPONENTACCESS_SUCCESS',
  UPDATE_COMPONENTACCESS_FAILURE = '@component/UPDATE_COMPONENTACCESS_FAILURE',

  //Delete component
  DELETE_COMPONENT_REQUEST = '@component/DELETE_COMPONENT_REQUEST',
  DELETE_COMPONENT_SUCCESS = '@component/DELETE_COMPONENT_SUCCESS',
  DELETE_COMPONENT_FAILURE = '@component/DELETE_COMPONENT_FAILURE',

  //Create Extra
  CREATE_EXTRA_REQUEST = '@component/CREATE_EXTRA_REQUEST',
  CREATE_EXTRA_SUCCESS = '@component/CREATE_EXTRA_SUCCESS',
  CREATE_EXTRA_FAILURE = '@component/CREATE_EXTRA_FAILURE',

  //Update Extra
  UPDATE_EXTRA_REQUEST = '@component/UPDATE_EXTRA_REQUEST',
  UPDATE_EXTRA_SUCCESS = '@component/UPDATE_EXTRA_SUCCESS',
  UPDATE_EXTRA_FAILURE = '@component/UPDATE_EXTRA_FAILURE',

  UPLOAD_EXTRA_REQUEST = '@component/UPLOAD_EXTRA_REQUEST',
  UPLOAD_EXTRA_SUCCESS = '@component/UPLOAD_EXTRA_SUCCESS',
  UPLOAD_EXTRA_FAILURE = '@component/UPLOAD_EXTRA_FAILURE',

  //Delete Extra
  DELETE_EXTRA_REQUEST = '@component/DELETE_EXTRA_REQUEST',
  DELETE_EXTRA_SUCCESS = '@component/DELETE_EXTRA_SUCCESS',
  DELETE_EXTRA_FAILURE = '@component/DELETE_EXTRA_FAILURE',

  //Create aulaconcluida
  CREATE_AULACONCLUIDA_REQUEST = '@component/CREATE_AULACONCLUIDA_REQUEST',
  CREATE_AULACONCLUIDA_SUCCESS = '@component/CREATE_AULACONCLUIDA_SUCCESS',
  CREATE_AULACONCLUIDA_FAILURE = '@component/CREATE_AULACONCLUIDA_FAILURE',

  //Delete aulaconcluida
  DELETE_AULACONCLUIDA_REQUEST = '@component/DELETE_AULACONCLUIDA_REQUEST',
  DELETE_AULACONCLUIDA_SUCCESS = '@component/DELETE_AULACONCLUIDA_SUCCESS',
  DELETE_AULACONCLUIDA_FAILURE = '@component/DELETE_AULACONCLUIDA_FAILURE',
}

/**
 * Data types
 */
// User Imported from Me
export interface Component {
  id?: number
  componentId?: number
  name?: string
  description?: string
  createdAt?: string
  status?: string
  order?: string
  duration?: number
  children?: Component[] | undefined
  extras?: Extras[] | undefined
  parent?: Component | undefined
  aulaconcluida?: AulaConcluida[]
  available?: any
  tags?: string
  orderby?: string
  create?: Component[] | undefined
  access?: any
  completed?: Completed[]
}

export interface Completed {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  rate?: number 
  timeWatched?: number
  status?: string
  userId?: number
  componentId?: number
  user?: User
  component?: Component
}

export interface ComponentAccess {
  id?: number
  createdAt?: Date
  updatedAt?: Date
  status?: string
  userId?: number
  componentId?: number
}

export interface Launch {
  name?: string
  description?: string
  slug?: string
  eventName?: string
  eventHeadline?: string
  eventDescription?: string
  eventImg?: string
  eventBtn?: string
  eventGroupLink?: string

  expertName?: string

  leadSignUpStartDate?: string
  leadSignUpEndDate?: string
  dateCpl1?: string
  dateCpl2?: string
  dateCpl3?: string

  cpl1?: string
  cpl2?: string
  cpl3?: string

  cartOpenDate?: string
  cartCloseDate?: string

  productName?: string
  productHeadline?: string
  productDescription?: string
  productPrice?: string
  productInstallments?: string
  productBtn?: string

  productVideo?: string
  productDiscount?: string
  productDiscountText?: string
  productWaitLink?: string
  talktousLink?: string

  paidGroup?: string
  onboardingVideo?: string
  checkoutPage?: string

  componentId?: number
}

/**
 * State type
 */
export interface ComponentState {
  readonly modules: Component[]
  readonly classes: Component[]
  readonly data: Component
  readonly loading: boolean
  readonly error: boolean
  readonly loadingAulaConcluida?: boolean
  readonly loadingAccess?: boolean
  readonly loadingAulaConcluidaId?: number

  readonly lastclass?: Component
  readonly loadingLastClass?: boolean
  readonly loadingNewLaunch?: boolean
}
