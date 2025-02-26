import {action} from 'typesafe-actions'
import {ComponentAccess, ComponentTypes, Launch} from './types'
import {AulaConcluidaTypes, AulaConcluida} from '../aulaconcluida/types'
import {Component} from './types'
import {Extras} from '../extras/types'



export const reorderComponentRequest = (data: Component[]) => action(ComponentTypes.REORDER_COMPONENT, data)

//Load
export const loadComponentRequest = (id: string, sort: string) =>
  action(ComponentTypes.LOAD_COMPONENT_REQUEST, {id, sort})
export const loadComponentSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_SUCCESS, data)
export const loadComponentFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_COMPONENT_FAILURE, err)

//Load
export const loadComponentWithAccessRequest = (id: string, userId: string, sort: string) =>
  action(ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_REQUEST, {id, userId, sort})
export const loadComponentWithAccessSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_SUCCESS, data)
export const loadComponentWithAccessFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_FAILURE, err)

//Load Modules
export const loadModulesRequest = (id: string, user_id: number, numTurma: number) =>
  action(ComponentTypes.LOAD_MODULES_REQUEST, {id, user_id, numTurma})
export const loadModulesSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_MODULES_SUCCESS, data)
export const loadModulesFailure = (err: any[]) => action(ComponentTypes.LOAD_MODULES_FAILURE, err)

//Load Classes
export const loadClassesRequest = (id: string, user_id: number) =>
  action(ComponentTypes.LOAD_CLASSES_REQUEST, {id, user_id})
export const loadClassesSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_CLASSES_SUCCESS, data)
export const loadClassesFailure = (err: any[]) => action(ComponentTypes.LOAD_CLASSES_FAILURE, err)

//Load Last Class
export const loadLastClassRequest = (user_id: number) =>
  action(ComponentTypes.LOAD_LASTCLASS_REQUEST, {user_id})
export const loadLastClassSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_LASTCLASS_SUCCESS, data)
export const loadLastClassFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_LASTCLASS_FAILURE, err)

//Load Component by Description
export const loadComponentByDescriptionRequest = (id: string) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST, id)
export const loadComponentByDescriptionSuccess = (data: Component) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS, data)
export const loadComponentByDescriptionFailure = (err: any[]) =>
  action(ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE, err)

//Create Component
export const createComponentRequest = (newComponent: Component) =>
  action(ComponentTypes.CREATE_COMPONENT_REQUEST, newComponent)
export const createComponentSuccess = (data: Component) =>
  action(ComponentTypes.CREATE_COMPONENT_SUCCESS, data)
export const createComponentFailure = (err: any[]) =>
  action(ComponentTypes.CREATE_COMPONENT_FAILURE, err)

//Create Component
export const createLaunchRequest = (newLaunch: Launch) =>
  action(ComponentTypes.CREATE_LAUNCH_REQUEST, newLaunch)
export const createLaunchSuccess = (data: Component) =>
  action(ComponentTypes.CREATE_LAUNCH_SUCCESS, data)
export const createLaunchFailure = (err: any[]) =>
  action(ComponentTypes.CREATE_LAUNCH_FAILURE, err)

//Create access
export const createComponentAccessRequest = (access: ComponentAccess) =>
  action(ComponentTypes.CREATE_COMPONENTACCESS_REQUEST, access)
export const createComponentAccessSuccess = (data: ComponentAccess) =>
  action(ComponentTypes.CREATE_COMPONENTACCESS_SUCCESS, data)
export const createComponentAccessFailure = (err: any[]) =>
  action(ComponentTypes.CREATE_COMPONENTACCESS_FAILURE, err)

//Update Component
export const updateComponentRequest = (componentToUpdate: Component) =>
  action(ComponentTypes.UPDATE_COMPONENT_REQUEST, componentToUpdate)
export const updateComponentSuccess = (data: Component) =>
  action(ComponentTypes.UPDATE_COMPONENT_SUCCESS, data)
export const updateComponentFailure = (err: any[]) =>
  action(ComponentTypes.UPDATE_COMPONENT_FAILURE, err)

//Update access
export const updateComponentAccessRequest = (access: ComponentAccess) =>
  action(ComponentTypes.UPDATE_COMPONENTACCESS_REQUEST, access)
export const updateComponentAccessSuccess = (data: ComponentAccess) =>
  action(ComponentTypes.UPDATE_COMPONENTACCESS_SUCCESS, data)
export const updateComponenAccesstFailure = (err: any[]) =>
  action(ComponentTypes.UPDATE_COMPONENTACCESS_FAILURE, err)

//Delete Component
export const deleteComponentRequest = (id: number) =>
  action(ComponentTypes.DELETE_COMPONENT_REQUEST, id)
export const deleteComponentSuccess = (id: number) =>
  action(ComponentTypes.DELETE_COMPONENT_SUCCESS, id)
export const deleteComponentFailure = (err: any[]) =>
  action(ComponentTypes.DELETE_COMPONENT_FAILURE, err)

//Create Extra
export const createExtraRequest = (newExtra: Extras) =>
  action(ComponentTypes.CREATE_EXTRA_REQUEST, newExtra)
export const createExtraSuccess = (data: Extras) =>
  action(ComponentTypes.CREATE_EXTRA_SUCCESS, data)
export const createExtraFailure = (err: any[]) => action(ComponentTypes.CREATE_EXTRA_FAILURE, err)

export const uploadExtraRequest = (newExtra: Extras, image: FormData) =>
  action(ComponentTypes.UPLOAD_EXTRA_REQUEST, newExtra, image)
// export const uploadExtraSuccess = (data: Extras) => action(ComponentTypes.UPLOAD_EXTRA_SUCCESS, data)
// export const uploadExtraFailure = (err: any[]) => action(ComponentTypes.UPLOAD_EXTRA_FAILURE, err)

//Update Extra
export const updateExtraRequest = (extraToUpdate: Component) =>
  action(ComponentTypes.UPDATE_EXTRA_REQUEST, extraToUpdate)
export const updateExtraSuccess = (data: Extras) =>
  action(ComponentTypes.UPDATE_EXTRA_SUCCESS, data)
export const updateExtraFailure = (err: any[]) => action(ComponentTypes.UPDATE_EXTRA_FAILURE, err)

//Delete Extra
export const deleteExtraRequest = (id: number) => action(ComponentTypes.DELETE_EXTRA_REQUEST, id)
export const deleteExtraSuccess = (id: number) => action(ComponentTypes.DELETE_EXTRA_SUCCESS, id)
export const deleteExtraFailure = (err: any[]) => action(ComponentTypes.DELETE_EXTRA_FAILURE, err)

//Single Aula Concluida
export const createAulaConcluidaRequest = (
  user_id: number,
  componentId: number,
  parent_id: number
) => action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_REQUEST, {user_id, componentId, parent_id})
export const createAulaConcluidaSuccess = (data: AulaConcluida, parent_id: number) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_SUCCESS, {data, parent_id})
export const createAulaConcluidaFailure = (error: {}) =>
  action(AulaConcluidaTypes.CREATE_AULACONCLUIDA_FAILURE, error)

//Create Aula Concluida
export const deleteAulaConcluidaRequest = (id: number, aula: Component) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_REQUEST, {id, aula})
export const deleteAulaConcluidaSuccess = (id: number, aula: Component) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_SUCCESS, {id, aula})
export const deleteAulaConcluidaFailure = (error: {}) =>
  action(AulaConcluidaTypes.DELETE_AULACONCLUIDA_FAILURE, error)
