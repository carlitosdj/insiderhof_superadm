/**
 * Action types
 */
export enum IdeactionTypes {

  // Reorder ideactions
  REORDER_IDEACTIONS = "@ideaction/REORDER_IDEACTIONS",

  // Load ideactions by owner
  LOAD_MY_IDEACTIONS_REQUEST = "@ideaction/LOAD_MY_IDEACTIONS_REQUEST",
  LOAD_MY_IDEACTIONS_SUCCESS = "@ideaction/LOAD_MY_IDEACTIONS_SUCCESS",
  LOAD_MY_IDEACTIONS_FAILURE = "@ideaction/LOAD_MY_IDEACTIONS_FAILURE",

  // Load single ideaction
  LOAD_IDEACTION_REQUEST = "@ideaction/LOAD_IDEACTION_REQUEST",
  LOAD_IDEACTION_SUCCESS = "@ideaction/LOAD_IDEACTION_SUCCESS",
  LOAD_IDEACTION_FAILURE = "@ideaction/LOAD_IDEACTION_FAILURE",

  // Create ideaction
  CREATE_IDEACTION_REQUEST = "@ideaction/CREATE_IDEACTION_REQUEST",
  CREATE_IDEACTION_SUCCESS = "@ideaction/CREATE_IDEACTION_SUCCESS",
  CREATE_IDEACTION_FAILURE = "@ideaction/CREATE_IDEACTION_FAILURE",

  // Update ideaction
  UPDATE_IDEACTION_REQUEST = "@ideaction/UPDATE_IDEACTION_REQUEST",
  UPDATE_IDEACTION_SUCCESS = "@ideaction/UPDATE_IDEACTION_SUCCESS",
  UPDATE_IDEACTION_FAILURE = "@ideaction/UPDATE_IDEACTION_FAILURE",

  // Delete ideaction
  DELETE_IDEACTION_REQUEST = "@ideaction/DELETE_IDEACTION_REQUEST",
  DELETE_IDEACTION_SUCCESS = "@ideaction/DELETE_IDEACTION_SUCCESS",
  DELETE_IDEACTION_FAILURE = "@ideaction/DELETE_IDEACTION_FAILURE",
}

/**
 * Data types
 */
export interface Ideaction {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  passion?: number;
  skill?: number;
  demand?: number;
  effort?: number;
  risk?: number;
  order?: number;
  status?: string;
  ownerId?: number;
}

/**
 * State type
 */
export interface IdeactionState {
  readonly myIdeactions: Ideaction[];
  readonly ideaction: Ideaction | null;
  readonly loading: boolean;
  readonly error: boolean;
} 