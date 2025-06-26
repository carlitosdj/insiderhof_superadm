import { LaunchHasOffers } from "../dlaunchhasoffers/types";
import { LaunchPhases } from "../dlaunchphase/types";

/**
 * Action types
 */
export enum LaunchsTypes {
  REORDER_LAUNCHS = "@extras/REORDER_LAUNCHS",
  //Load
  LOAD_MYLAUNCHS_REQUEST = "@extras/LOAD_MYLAUNCHS_REQUEST",
  LOAD_MYLAUNCHS_SUCCESS = "@extras/LOAD_MYLAUNCHS_SUCCESS",
  LOAD_MYLAUNCHS_FAILURE = "@extras/LOAD_MYLAUNCHS_FAILURE",

  //Load
  LOAD_LAUNCH_REQUEST = "@extras/LOAD_LAUNCH_REQUEST",
  LOAD_LAUNCH_SUCCESS = "@extras/LOAD_LAUNCH_SUCCESS",
  LOAD_LAUNCH_FAILURE = "@extras/LOAD_LAUNCH_FAILURE",

  //Create
  CREATE_LAUNCH_REQUEST = "@extras/CREATE_LAUNCH_REQUEST",
  CREATE_LAUNCH_SUCCESS = "@extras/CREATE_LAUNCH_SUCCESS",
  CREATE_LAUNCH_FAILURE = "@extras/CREATE_LAUNCH_FAILURE",

  //Update
  UPDATE_LAUNCH_REQUEST = "@extras/UPDATE_LAUNCH_REQUEST",
  UPDATE_LAUNCH_SUCCESS = "@extras/UPDATE_LAUNCH_SUCCESS",
  UPDATE_LAUNCH_FAILURE = "@extras/UPDATE_LAUNCH_FAILURE",

  //Delete
  DELETE_LAUNCH_REQUEST = "@extras/DELETE_LAUNCH_REQUEST",
  DELETE_LAUNCH_SUCCESS = "@extras/DELETE_LAUNCH_SUCCESS",
  DELETE_LAUNCH_FAILURE = "@extras/DELETE_LAUNCH_FAILURE",
}

/**
 * Data types
 */
// User Imported from Me
export interface Launch {
  id?: number | undefined;
  name?: string | undefined;
  description?: string | undefined;
  oldPrice?: number | undefined;
  price?: number | undefined;
  type?: string | undefined;
  order?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  status?: string | undefined;
  ownerId?: number | undefined;

  installments?: string | undefined
  renovationTime?: number | undefined;
  renovationPrice?: number | undefined;
  antecipateRenovationPrice?: number | undefined;
  renovationDescription?: string | undefined;
  renovationInstallments?: string | undefined;

  launchhasoffers?: LaunchHasOffers[] | undefined;
  phases? : LaunchPhases[] | undefined;


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

  leadForm?: string
  domain?: string

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
  aviso?: string
}
/**
 * State type
 */
export interface LaunchsState {
  readonly myLaunchs: Launch[];
  readonly launch: Launch;
  readonly loading: boolean;
  readonly error: boolean;
}
