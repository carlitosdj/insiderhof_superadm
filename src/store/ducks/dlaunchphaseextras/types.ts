/**
 * Action types
 */
export enum LaunchPhaseExtrasTypes {
  REORDER_LAUNCHPHASEEXTRA = "@extras/REORDER_LAUNCHPHASEEXTRA",
  //Load
  LOAD_MYLAUNCHPHASEEXTRA_REQUEST = "@extras/LOAD_MYLAUNCHPHASEEXTRA_REQUEST",
  LOAD_MYLAUNCHPHASEEXTRA_SUCCESS = "@extras/LOAD_MYLAUNCHPHASEEXTRA_SUCCESS",
  LOAD_MYLAUNCHPHASEEXTRA_FAILURE = "@extras/LOAD_MYLAUNCHPHASEEXTRA_FAILURE",

  //Load
  LOAD_LAUNCHPHASEEXTRA_REQUEST = "@extras/LOAD_LAUNCHPHASEEXTRA_REQUEST",
  LOAD_LAUNCHPHASEEXTRA_SUCCESS = "@extras/LOAD_LAUNCHPHASEEXTRA_SUCCESS",
  LOAD_LAUNCHPHASEEXTRA_FAILURE = "@extras/LOAD_LAUNCHPHASEEXTRA_FAILURE",

  //Create
  CREATE_LAUNCHPHASEEXTRA_REQUEST = "@extras/CREATE_LAUNCHPHASEEXTRA_REQUEST",
  CREATE_LAUNCHPHASEEXTRA_SUCCESS = "@extras/CREATE_LAUNCHPHASEEXTRA_SUCCESS",
  CREATE_LAUNCHPHASEEXTRA_FAILURE = "@extras/CREATE_LAUNCHPHASEEXTRA_FAILURE",

  //Update
  UPDATE_LAUNCHPHASEEXTRA_REQUEST = "@extras/UPDATE_LAUNCHPHASEEXTRA_REQUEST",
  UPDATE_LAUNCHPHASEEXTRA_SUCCESS = "@extras/UPDATE_LAUNCHPHASEEXTRA_SUCCESS",
  UPDATE_LAUNCHPHASEEXTRA_FAILURE = "@extras/UPDATE_LAUNCHPHASEEXTRA_FAILURE",

  //Delete
  DELETE_LAUNCHPHASEEXTRA_REQUEST = "@extras/DELETE_LAUNCHPHASEEXTRA_REQUEST",
  DELETE_LAUNCHPHASEEXTRA_SUCCESS = "@extras/DELETE_LAUNCHPHASEEXTRA_SUCCESS",
  DELETE_LAUNCHPHASEEXTRA_FAILURE = "@extras/DELETE_LAUNCHPHASEEXTRA_FAILURE",
}

/**
 * Data types
 */
// User Imported from Me
export type LaunchPhaseExtraType = 'text' | 'link' | 'datetime' | 'image' | 'template';

export interface LaunchPhaseExtras {
  id?: number | undefined;
  key?: string | undefined;
  value?: string | undefined;
  name?: string | undefined;
  type?: LaunchPhaseExtraType | undefined;
  order?: number | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  status?: string | undefined;
  launchPhaseId?: number | undefined;
  extras?: any
}
/**
 * State type
 */
export interface LaunchPhaseExtrasState {
  readonly myLaunchPhaseExtras: LaunchPhaseExtras[];
  readonly launchPhase: LaunchPhaseExtras;
  readonly loading: boolean;
  readonly error: boolean;
}
