/**
 * Action types
 */
export enum LaunchQuestionTypes {
  // Load by launch phase
  LOAD_LAUNCHQUESTIONS_REQUEST = "@launchquestion/LOAD_LAUNCHQUESTIONS_REQUEST",
  LOAD_LAUNCHQUESTIONS_SUCCESS = "@launchquestion/LOAD_LAUNCHQUESTIONS_SUCCESS",
  LOAD_LAUNCHQUESTIONS_FAILURE = "@launchquestion/LOAD_LAUNCHQUESTIONS_FAILURE",

  // Load single
  LOAD_LAUNCHQUESTION_REQUEST = "@launchquestion/LOAD_LAUNCHQUESTION_REQUEST",
  LOAD_LAUNCHQUESTION_SUCCESS = "@launchquestion/LOAD_LAUNCHQUESTION_SUCCESS",
  LOAD_LAUNCHQUESTION_FAILURE = "@launchquestion/LOAD_LAUNCHQUESTION_FAILURE",

  // Create
  CREATE_LAUNCHQUESTION_REQUEST = "@launchquestion/CREATE_LAUNCHQUESTION_REQUEST",
  CREATE_LAUNCHQUESTION_SUCCESS = "@launchquestion/CREATE_LAUNCHQUESTION_SUCCESS",
  CREATE_LAUNCHQUESTION_FAILURE = "@launchquestion/CREATE_LAUNCHQUESTION_FAILURE",

  // Update
  UPDATE_LAUNCHQUESTION_REQUEST = "@launchquestion/UPDATE_LAUNCHQUESTION_REQUEST",
  UPDATE_LAUNCHQUESTION_SUCCESS = "@launchquestion/UPDATE_LAUNCHQUESTION_SUCCESS",
  UPDATE_LAUNCHQUESTION_FAILURE = "@launchquestion/UPDATE_LAUNCHQUESTION_FAILURE",

  // Delete
  DELETE_LAUNCHQUESTION_REQUEST = "@launchquestion/DELETE_LAUNCHQUESTION_REQUEST",
  DELETE_LAUNCHQUESTION_SUCCESS = "@launchquestion/DELETE_LAUNCHQUESTION_SUCCESS",
  DELETE_LAUNCHQUESTION_FAILURE = "@launchquestion/DELETE_LAUNCHQUESTION_FAILURE",

  // Reorder questions
  REORDER_LAUNCHQUESTIONS_REQUEST = "@launchquestion/REORDER_LAUNCHQUESTIONS_REQUEST",
  REORDER_LAUNCHQUESTIONS_SUCCESS = "@launchquestion/REORDER_LAUNCHQUESTIONS_SUCCESS",
  REORDER_LAUNCHQUESTIONS_FAILURE = "@launchquestion/REORDER_LAUNCHQUESTIONS_FAILURE",

  // Clear state
  CLEAR_LAUNCHQUESTION_STATE = "@launchquestion/CLEAR_LAUNCHQUESTION_STATE",
}

/**
 * Data types
 */
export interface LaunchQuestion {
  id?: number;
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  required: boolean;
  weight: number;
  order: number;
  launchPhaseId: number;
  createdAt?: Date;
  updatedAt?: Date;
  // Relations - using backend schema names
  options?: LaunchQuestionOption[];
}

export interface LaunchQuestionOption {
  id?: number;
  optionText: string; // Backend uses optionText not option
  weight: number;
  order: number;
  questionId: number; // Backend uses questionId not launchQuestionId
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateLaunchQuestionDto {
  question: string;
  type: 'multiple_choice' | 'scale' | 'text';
  required: boolean;
  weight: string; // Backend expects string
  order: number;
  launchPhaseId: number;
  options?: CreateLaunchQuestionOptionDto[];
}

export interface CreateLaunchQuestionOptionDto {
  optionText: string; // Backend uses optionText
  weight: string; // Backend expects string
  order: number;
}

export interface UpdateLaunchQuestionDto {
  id: number;
  question?: string;
  type?: 'multiple_choice' | 'scale' | 'text';
  required?: boolean;
  weight?: string; // Backend expects string
  order?: number;
  launchPhaseId?: number;
}

export interface ReorderQuestionsDto {
  questions: Array<{
    id: number;
    order: number;
  }>;
}

/**
 * State type
 */
export interface LaunchQuestionState {
  readonly questions: LaunchQuestion[];
  readonly question: LaunchQuestion | null;
  readonly loading: boolean;
  readonly error: boolean;
}