/**
 * Action types
 */
export enum LaunchQuestionOptionTypes {
  // Load by question
  LOAD_LAUNCHQUESTIONOPTIONS_REQUEST = "@launchquestionoption/LOAD_LAUNCHQUESTIONOPTIONS_REQUEST",
  LOAD_LAUNCHQUESTIONOPTIONS_SUCCESS = "@launchquestionoption/LOAD_LAUNCHQUESTIONOPTIONS_SUCCESS",
  LOAD_LAUNCHQUESTIONOPTIONS_FAILURE = "@launchquestionoption/LOAD_LAUNCHQUESTIONOPTIONS_FAILURE",

  // Load single
  LOAD_LAUNCHQUESTIONOPTION_REQUEST = "@launchquestionoption/LOAD_LAUNCHQUESTIONOPTION_REQUEST",
  LOAD_LAUNCHQUESTIONOPTION_SUCCESS = "@launchquestionoption/LOAD_LAUNCHQUESTIONOPTION_SUCCESS",
  LOAD_LAUNCHQUESTIONOPTION_FAILURE = "@launchquestionoption/LOAD_LAUNCHQUESTIONOPTION_FAILURE",

  // Create
  CREATE_LAUNCHQUESTIONOPTION_REQUEST = "@launchquestionoption/CREATE_LAUNCHQUESTIONOPTION_REQUEST",
  CREATE_LAUNCHQUESTIONOPTION_SUCCESS = "@launchquestionoption/CREATE_LAUNCHQUESTIONOPTION_SUCCESS",
  CREATE_LAUNCHQUESTIONOPTION_FAILURE = "@launchquestionoption/CREATE_LAUNCHQUESTIONOPTION_FAILURE",

  // Update
  UPDATE_LAUNCHQUESTIONOPTION_REQUEST = "@launchquestionoption/UPDATE_LAUNCHQUESTIONOPTION_REQUEST",
  UPDATE_LAUNCHQUESTIONOPTION_SUCCESS = "@launchquestionoption/UPDATE_LAUNCHQUESTIONOPTION_SUCCESS",
  UPDATE_LAUNCHQUESTIONOPTION_FAILURE = "@launchquestionoption/UPDATE_LAUNCHQUESTIONOPTION_FAILURE",

  // Delete
  DELETE_LAUNCHQUESTIONOPTION_REQUEST = "@launchquestionoption/DELETE_LAUNCHQUESTIONOPTION_REQUEST",
  DELETE_LAUNCHQUESTIONOPTION_SUCCESS = "@launchquestionoption/DELETE_LAUNCHQUESTIONOPTION_SUCCESS",
  DELETE_LAUNCHQUESTIONOPTION_FAILURE = "@launchquestionoption/DELETE_LAUNCHQUESTIONOPTION_FAILURE",

  // Reorder options
  REORDER_LAUNCHQUESTIONOPTIONS_REQUEST = "@launchquestionoption/REORDER_LAUNCHQUESTIONOPTIONS_REQUEST",
  REORDER_LAUNCHQUESTIONOPTIONS_SUCCESS = "@launchquestionoption/REORDER_LAUNCHQUESTIONOPTIONS_SUCCESS",
  REORDER_LAUNCHQUESTIONOPTIONS_FAILURE = "@launchquestionoption/REORDER_LAUNCHQUESTIONOPTIONS_FAILURE",

  // Clear state
  CLEAR_LAUNCHQUESTIONOPTION_STATE = "@launchquestionoption/CLEAR_LAUNCHQUESTIONOPTION_STATE",
}

/**
 * Data types
 */
export interface LaunchQuestionOption {
  id?: number;
  optionText: string; // Backend uses optionText not option
  weight: number;
  order: number;
  questionId: number; // Backend uses questionId not launchQuestionId
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateLaunchQuestionOptionDto {
  optionText: string; // Backend uses optionText
  weight: string; // Backend expects string
  order: number;
  questionId: number; // Backend uses questionId
}

export interface UpdateLaunchQuestionOptionDto {
  id: number;
  optionText?: string; // Backend uses optionText
  weight?: string; // Backend expects string
  order?: number;
  questionId?: number; // Backend uses questionId
}

export interface ReorderOptionsDto {
  options: Array<{
    id: number;
    order: number;
  }>;
}

/**
 * State type
 */
export interface LaunchQuestionOptionState {
  readonly options: LaunchQuestionOption[];
  readonly option: LaunchQuestionOption | null;
  readonly loading: boolean;
  readonly error: boolean;
}