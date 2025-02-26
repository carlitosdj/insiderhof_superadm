import {action} from 'typesafe-actions'
import {ModulesTypes, Module} from './types'

export const reorderModulesRequest = (data: Module[]) => action(ModulesTypes.REORDER_MODULES, data)

//Load
export const loadModulesRequest = (courseId: number) => action(ModulesTypes.LOAD_MODULES_REQUEST, courseId)
export const loadModulesSuccess = (data: Module[]) => action(ModulesTypes.LOAD_MODULES_SUCCESS, data)
export const loadModulesFailure = (err: any[]) => action(ModulesTypes.LOAD_MODULES_FAILURE, err)

//Load
export const loadModuleRequest = (moduleID: number) => action(ModulesTypes.LOAD_MODULE_REQUEST, moduleID)
export const loadModuleSuccess = (data: Module) => action(ModulesTypes.LOAD_MODULE_SUCCESS, data)
export const loadModuleFailure = (err: any[]) => action(ModulesTypes.LOAD_MODULE_FAILURE, err)

//Create
export const createModuleRequest = (data: Module) => action(ModulesTypes.CREATE_MODULE_REQUEST, data)
export const createModuleSuccess = (data: Module) => action(ModulesTypes.CREATE_MODULE_SUCCESS, data)
export const createModuleFailure = (err: any[]) => action(ModulesTypes.CREATE_MODULE_FAILURE, err)

//Update
export const updateModuleRequest = (data: Module) => action(ModulesTypes.UPDATE_MODULE_REQUEST, data)
export const updateModuleSuccess = (data: Module) => action(ModulesTypes.UPDATE_MODULE_SUCCESS, data)
export const updateModuleFailure = (err: any[]) => action(ModulesTypes.UPDATE_MODULE_FAILURE, err)

//Delete
export const deleteModuleRequest = (id: number) => action(ModulesTypes.DELETE_MODULE_REQUEST, id)
export const deleteModuleSuccess = (data: Module) => action(ModulesTypes.DELETE_MODULE_SUCCESS, data)
export const deleteModuleFailure = (err: any[]) => action(ModulesTypes.DELETE_MODULE_FAILURE, err)
