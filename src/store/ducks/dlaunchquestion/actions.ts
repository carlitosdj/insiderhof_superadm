import { action } from 'typesafe-actions';
import { 
  LaunchQuestionTypes, 
  LaunchQuestion, 
  CreateLaunchQuestionDto, 
  UpdateLaunchQuestionDto,
  ReorderQuestionsDto
} from './types';

// Load questions by launch phase
export const loadLaunchQuestionsRequest = (launchPhaseId: number) => 
  action(LaunchQuestionTypes.LOAD_LAUNCHQUESTIONS_REQUEST, launchPhaseId);

export const loadLaunchQuestionsSuccess = (data: LaunchQuestion[]) => 
  action(LaunchQuestionTypes.LOAD_LAUNCHQUESTIONS_SUCCESS, data);

export const loadLaunchQuestionsFailure = (err: any[]) => 
  action(LaunchQuestionTypes.LOAD_LAUNCHQUESTIONS_FAILURE, err);

// Load single question
export const loadLaunchQuestionRequest = (id: number) => 
  action(LaunchQuestionTypes.LOAD_LAUNCHQUESTION_REQUEST, id);

export const loadLaunchQuestionSuccess = (data: LaunchQuestion) => 
  action(LaunchQuestionTypes.LOAD_LAUNCHQUESTION_SUCCESS, data);

export const loadLaunchQuestionFailure = (err: any[]) => 
  action(LaunchQuestionTypes.LOAD_LAUNCHQUESTION_FAILURE, err);

// Create
export const createLaunchQuestionRequest = (data: CreateLaunchQuestionDto) => 
  action(LaunchQuestionTypes.CREATE_LAUNCHQUESTION_REQUEST, data);

export const createLaunchQuestionSuccess = (data: LaunchQuestion) => 
  action(LaunchQuestionTypes.CREATE_LAUNCHQUESTION_SUCCESS, data);

export const createLaunchQuestionFailure = (err: any[]) => 
  action(LaunchQuestionTypes.CREATE_LAUNCHQUESTION_FAILURE, err);

// Update
export const updateLaunchQuestionRequest = (data: UpdateLaunchQuestionDto) => 
  action(LaunchQuestionTypes.UPDATE_LAUNCHQUESTION_REQUEST, data);

export const updateLaunchQuestionSuccess = (data: LaunchQuestion) => 
  action(LaunchQuestionTypes.UPDATE_LAUNCHQUESTION_SUCCESS, data);

export const updateLaunchQuestionFailure = (err: any[]) => 
  action(LaunchQuestionTypes.UPDATE_LAUNCHQUESTION_FAILURE, err);

// Delete
export const deleteLaunchQuestionRequest = (id: number) => 
  action(LaunchQuestionTypes.DELETE_LAUNCHQUESTION_REQUEST, id);

export const deleteLaunchQuestionSuccess = (id: number) => 
  action(LaunchQuestionTypes.DELETE_LAUNCHQUESTION_SUCCESS, id);

export const deleteLaunchQuestionFailure = (err: any[]) => 
  action(LaunchQuestionTypes.DELETE_LAUNCHQUESTION_FAILURE, err);

// Reorder questions
export const reorderLaunchQuestionsRequest = (data: ReorderQuestionsDto) =>
  action(LaunchQuestionTypes.REORDER_LAUNCHQUESTIONS_REQUEST, data);

export const reorderLaunchQuestionsSuccess = (data: LaunchQuestion[]) =>
  action(LaunchQuestionTypes.REORDER_LAUNCHQUESTIONS_SUCCESS, data);

export const reorderLaunchQuestionsFailure = (err: any[]) =>
  action(LaunchQuestionTypes.REORDER_LAUNCHQUESTIONS_FAILURE, err);

// Toggle survey status
export const toggleSurveyStatusRequest = (launchPhaseId: number, enable: boolean) =>
  action(LaunchQuestionTypes.TOGGLE_SURVEY_STATUS_REQUEST, { launchPhaseId, enable });

export const toggleSurveyStatusSuccess = (data: LaunchQuestion[]) =>
  action(LaunchQuestionTypes.TOGGLE_SURVEY_STATUS_SUCCESS, data);

export const toggleSurveyStatusFailure = (err: any[]) =>
  action(LaunchQuestionTypes.TOGGLE_SURVEY_STATUS_FAILURE, err);

// Clear state
export const clearLaunchQuestionState = () =>
  action(LaunchQuestionTypes.CLEAR_LAUNCHQUESTION_STATE);