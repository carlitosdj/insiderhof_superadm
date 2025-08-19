import { action } from 'typesafe-actions';
import { 
  LaunchQuestionOptionTypes, 
  LaunchQuestionOption, 
  CreateLaunchQuestionOptionDto, 
  UpdateLaunchQuestionOptionDto,
  ReorderOptionsDto
} from './types';

// Load options by question
export const loadLaunchQuestionOptionsRequest = (launchQuestionId: number) => 
  action(LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTIONS_REQUEST, launchQuestionId);

export const loadLaunchQuestionOptionsSuccess = (data: LaunchQuestionOption[]) => 
  action(LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTIONS_SUCCESS, data);

export const loadLaunchQuestionOptionsFailure = (err: any[]) => 
  action(LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTIONS_FAILURE, err);

// Load single option
export const loadLaunchQuestionOptionRequest = (id: number) => 
  action(LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTION_REQUEST, id);

export const loadLaunchQuestionOptionSuccess = (data: LaunchQuestionOption) => 
  action(LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTION_SUCCESS, data);

export const loadLaunchQuestionOptionFailure = (err: any[]) => 
  action(LaunchQuestionOptionTypes.LOAD_LAUNCHQUESTIONOPTION_FAILURE, err);

// Create
export const createLaunchQuestionOptionRequest = (data: CreateLaunchQuestionOptionDto) => 
  action(LaunchQuestionOptionTypes.CREATE_LAUNCHQUESTIONOPTION_REQUEST, data);

export const createLaunchQuestionOptionSuccess = (data: LaunchQuestionOption) => 
  action(LaunchQuestionOptionTypes.CREATE_LAUNCHQUESTIONOPTION_SUCCESS, data);

export const createLaunchQuestionOptionFailure = (err: any[]) => 
  action(LaunchQuestionOptionTypes.CREATE_LAUNCHQUESTIONOPTION_FAILURE, err);

// Update
export const updateLaunchQuestionOptionRequest = (data: UpdateLaunchQuestionOptionDto) => 
  action(LaunchQuestionOptionTypes.UPDATE_LAUNCHQUESTIONOPTION_REQUEST, data);

export const updateLaunchQuestionOptionSuccess = (data: LaunchQuestionOption) => 
  action(LaunchQuestionOptionTypes.UPDATE_LAUNCHQUESTIONOPTION_SUCCESS, data);

export const updateLaunchQuestionOptionFailure = (err: any[]) => 
  action(LaunchQuestionOptionTypes.UPDATE_LAUNCHQUESTIONOPTION_FAILURE, err);

// Delete
export const deleteLaunchQuestionOptionRequest = (id: number) => 
  action(LaunchQuestionOptionTypes.DELETE_LAUNCHQUESTIONOPTION_REQUEST, id);

export const deleteLaunchQuestionOptionSuccess = (id: number) => 
  action(LaunchQuestionOptionTypes.DELETE_LAUNCHQUESTIONOPTION_SUCCESS, id);

export const deleteLaunchQuestionOptionFailure = (err: any[]) => 
  action(LaunchQuestionOptionTypes.DELETE_LAUNCHQUESTIONOPTION_FAILURE, err);

// Reorder options
export const reorderLaunchQuestionOptionsRequest = (data: ReorderOptionsDto) => 
  action(LaunchQuestionOptionTypes.REORDER_LAUNCHQUESTIONOPTIONS_REQUEST, data);

export const reorderLaunchQuestionOptionsSuccess = (data: LaunchQuestionOption[]) => 
  action(LaunchQuestionOptionTypes.REORDER_LAUNCHQUESTIONOPTIONS_SUCCESS, data);

export const reorderLaunchQuestionOptionsFailure = (err: any[]) => 
  action(LaunchQuestionOptionTypes.REORDER_LAUNCHQUESTIONOPTIONS_FAILURE, err);

// Clear state
export const clearLaunchQuestionOptionState = () => 
  action(LaunchQuestionOptionTypes.CLEAR_LAUNCHQUESTIONOPTION_STATE);