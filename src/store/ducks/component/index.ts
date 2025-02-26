import {Reducer} from 'redux'
import {ComponentState, ComponentTypes} from './types'

const INITIAL_STATE: ComponentState = {
  data: {},
  modules: [],
  classes: [],
  error: false,
  loading: true,
  loadingAulaConcluida: false,
}

const reducer: Reducer<ComponentState> = (state = INITIAL_STATE, action: any) => {
  // console.log('################################Reducer inside Component: ' + action.type + ':', action)
  switch (action.type) {

    case ComponentTypes.REORDER_COMPONENT:
      console.log("BATEU", action.payload
        
      )
      return {...state, data: { ...state.data, children: action.payload } }

    //all users:
    case ComponentTypes.LOAD_COMPONENT_REQUEST:
      return {...state, loading: true, data: {}}
    case ComponentTypes.LOAD_COMPONENT_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ComponentTypes.LOAD_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //all users:
    case ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_REQUEST:
      return {...state, loading: true, loadingAccess: true}
    case ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAccess: false,
        error: false,
        data: action.payload.data,
      }
    case ComponentTypes.LOAD_COMPONENT_WITH_ACCESS_FAILURE:
      return {...state, loading: false, loadingAccess: false, error: action.payload, data: {}}

    case ComponentTypes.LOAD_LASTCLASS_REQUEST:
      return {...state, loadingLastClass: true}
    case ComponentTypes.LOAD_LASTCLASS_SUCCESS:
      return {...state, loadingLastClass: false, error: false, lastclass: action.payload.data}
    case ComponentTypes.LOAD_LASTCLASS_FAILURE:
      return {...state, loadingLastClass: false, error: action.payload, lastclass: {}}

    //load modules
    case ComponentTypes.LOAD_MODULES_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_MODULES_SUCCESS:
      return {...state, loading: false, error: false, modules: action.payload.data}
    case ComponentTypes.LOAD_MODULES_FAILURE:
      return {...state, loading: false, error: action.payload, modules: []}

    case ComponentTypes.LOAD_CLASSES_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_CLASSES_SUCCESS:
      return {...state, loading: false, error: false, classes: action.payload.data}
    case ComponentTypes.LOAD_CLASSES_FAILURE:
      return {...state, loading: false, error: action.payload, classes: []}
    //Course:
    // case ComponentTypes.LOAD_COURSE_REQUEST:
    //     return { ...state, loading: true, }
    // case ComponentTypes.LOAD_COURSE_SUCCESS:
    //     return { ...state, loading: false, error: false, data: action.payload.data }
    // case ComponentTypes.LOAD_COURSE_FAILURE:
    //     return { ...state, loading: false, error:true, data: {} }

    case ComponentTypes.LOAD_COMPONENT_BY_DESC_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_SUCCESS:
      return {...state, loading: false, error: false, data: action.payload.data}
    case ComponentTypes.LOAD_COMPONENT_BY_DESC_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //Success children:
    case ComponentTypes.LOAD_COMPONENT_CHILDREN_SUCCESS:
      return {...state, data: {...state.data, children: action.payload.data.data}}
    //Success Extras:
    case ComponentTypes.LOAD_COMPONENT_EXTRAS_SUCCESS:
      return {...state, loading: false, data: {...state.data, extras: action.payload.data.data}}

    //create component inside children:
    case ComponentTypes.CREATE_COMPONENT_REQUEST:
      return {...state, loading: true}
    case ComponentTypes.CREATE_COMPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {...state.data, children: [ ...state.data.children!, action.payload.data]},
      }
    case ComponentTypes.CREATE_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //create component inside children:
    case ComponentTypes.CREATE_LAUNCH_REQUEST:
      return {...state, loadingNewLaunch: true}
    case ComponentTypes.CREATE_LAUNCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        loadingNewLaunch: false,
        data: {...state.data, children: state.data.children?.concat(action.payload.data)},
      }
    case ComponentTypes.CREATE_LAUNCH_FAILURE:
      return {...state, loading: false, loadingNewLaunch: false, error: action.payload}

    //create access
    case ComponentTypes.CREATE_COMPONENTACCESS_REQUEST:
      return {...state, loadingAccess: true}
    case ComponentTypes.CREATE_COMPONENTACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAccess: false,
        error: false,
        data: {
          ...state.data,
          children: Object.assign([], state.data.children, {
            ...state.data.children?.map((child) => {
              if (child.id === action.payload.data.componentId) {
                child.access = [action.payload.data]
              }
              return child
            }),
          }),
        },
      }
    case ComponentTypes.CREATE_COMPONENTACCESS_FAILURE:
      return {...state, loading: false, loadingAccess: false, error: action.payload}

    //##update component:
    case ComponentTypes.UPDATE_COMPONENT_REQUEST:
      return {...state}
    case ComponentTypes.UPDATE_COMPONENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          children: state.data.children?.map((child) =>
            child.id === action.payload.data.id ? action.payload.data : child
          ),
        },
      } //update data?
    case ComponentTypes.UPDATE_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //##update component:
    case ComponentTypes.UPDATE_COMPONENTACCESS_REQUEST:
      return {...state}
    case ComponentTypes.UPDATE_COMPONENTACCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          // children: state.data.children?.map((child) =>
          //   child.id === action.payload.data.id ? action.payload.data : child
          // ),
          children: Object.assign([], state.data.children, {
            ...state.data.children?.map((child) => {
              if (child.id === action.payload.data.componentId) {
                child.access = [action.payload.data]
              }
              return child
            }),
          }),
        },
      } //update data?
    case ComponentTypes.UPDATE_COMPONENTACCESS_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //delete user:
    case ComponentTypes.DELETE_COMPONENT_REQUEST:
      return {...state}
    case ComponentTypes.DELETE_COMPONENT_SUCCESS:
      console.log('PAYLOAD', action.payload)
      console.log('PAYLOAD data', action.payload.data)
      console.log('PAYLOAD data id', action.payload.data.id)
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          children: state.data.children?.filter((item) => item.id !== action.payload.data.id),
        },
      }
    case ComponentTypes.DELETE_COMPONENT_FAILURE:
      return {...state, loading: false, error: action.payload}

    //create extra inside component: & Upload
    case ComponentTypes.UPLOAD_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.CREATE_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.CREATE_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {...state.data, extras: state.data.extras?.concat(action.payload.data)},
        children: Object.assign([], state.data.children, {
          ...state.data.children?.map((child) => {
            if (child.id === action.payload.data.componentId) {
              const extras = child.extras?.concat(action.payload.data)
              child.extras = extras
            }
            return child
          }),
        }),
      }
    case ComponentTypes.CREATE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload}

    //##update extra:
    case ComponentTypes.UPDATE_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.UPDATE_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          extras: state.data.extras?.map((child) =>
            child.id === action.payload.data.id ? action.payload.data : child
          ),
          children: Object.assign([], state.data.children, {
            ...state.data.children?.map((child) => {
              if (child.id === action.payload.data.componentId) {
                console.log("ACHEI ID :D", action.payload.data.componentId)
                console.log("DATA:", action.payload.data)
                console.log("child:", child)

                const extras = child.extras?.map((extra) => {
                  if (extra.id === action.payload.data.id) {
                    return action.payload.data
                  }
                  return extra
                })
                child.extras = extras
              }
              return child
            }),
          }),
        },
      } //update data?
    case ComponentTypes.UPDATE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload, data: {}}

    //delete extra:
    case ComponentTypes.DELETE_EXTRA_REQUEST:
      return {...state}
    case ComponentTypes.DELETE_EXTRA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: {
          ...state.data,
          extras: state.data.extras?.filter((item) => item.id !== action.payload.data.id),
          children: Object.assign([], state.data.children, {
            ...state.data.children?.map((child) => {
              if (child.id === action.payload.data.componentId) {
                console.log("ACHEI ID :D", action.payload.data.componentId)
                console.log("DATA:", action.payload.data)
                console.log("child:", child)

                const extras = child.extras?.filter((extra) => extra.id !== action.payload.data.id)
                child.extras = extras
                
              }
              return child
            }),
          }),
        },
      }
    case ComponentTypes.DELETE_EXTRA_FAILURE:
      return {...state, loading: false, error: action.payload}

    //single:
    case ComponentTypes.CREATE_AULACONCLUIDA_REQUEST:
      return {
        ...state,
        loadingAulaConcluida: true,
        loadingAulaConcluidaId: action.payload.componentId,
      }
    case ComponentTypes.CREATE_AULACONCLUIDA_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAulaConcluida: false,
        error: {},
        modules: Object.assign([], state.modules, {
          ...state.modules.map((modulo) => {
            // console.log("Payload", action.payload)
            // console.log("Payload", action.payload.data.data.parent_id)
            // console.log("Modulo", modulo.id)
            if (modulo.id === action.payload.data.data.parent_id) {
              // console.log("Achei", modulo)
              //modulo.aulaconcluida = [action.payload.data]
              modulo.children?.map((aula) => {
                if (aula.id === action.payload.data.data.componentId) {
                  // console.log("achei de novo", aula)
                  aula.aulaconcluida = [action.payload.data.data]
                }
                return aula
              })
            }
            return modulo
          }),
        }),
        classes: Object.assign([], state.classes, {
          ...state.classes.map((aula) => {
            // console.log("Payload", action.payload.data.data.componentId)
            // console.log("Aula", aula.id)
            if (aula.id === action.payload.data.data.componentId) {
              // console.log("Achei")
              aula.aulaconcluida = [action.payload.data.data]
            }
            return aula
          }),
        }),
      }

    case ComponentTypes.CREATE_AULACONCLUIDA_FAILURE:
      return {...state, loading: false, loadingAulaConcluida: false, error: action.payload}

    //create user:
    case ComponentTypes.DELETE_AULACONCLUIDA_REQUEST:
      return {...state, loadingAulaConcluida: true, loadingAulaConcluidaId: action.payload.aula.id}
    case ComponentTypes.DELETE_AULACONCLUIDA_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAulaConcluida: false,
        error: {},
        modules: Object.assign([], state.modules, {
          ...state.modules.map((modulo) => {
            // console.log("Payload", action.payload)
            // console.log("Modulo", modulo.id)
            // console.log("Payload", action.payload.data.data.parent_id)
            if (modulo.id === action.payload.aula.parent.id) {
              // console.log("Achei", modulo)
              modulo.children?.map((aula) => {
                console.log('Aula: ', aula.id)
                console.log('Aulax: ', action.payload)
                if (aula.id === action.payload.aula.id) {
                  console.log('achei de novo', aula)
                  aula.aulaconcluida = []
                }
                return aula
              })
            }
            return modulo
          }),
        }),
        classes: Object.assign([], state.classes, {
          ...state.classes.map((aula) => {
            if (aula.aulaconcluida?.length) {
              // console.log("aulaaa", aula.aulaconcluida![0].id)
              // console.log("payload", action.payload.id.data)
              if (aula.aulaconcluida![0].id === action.payload.id.data) {
                // console.log("Achei!", aula)
                aula.aulaconcluida = []
              }
            }
            return aula
          }),
        }),
      }
    case ComponentTypes.DELETE_AULACONCLUIDA_FAILURE:
      return {...state, loading: false, loadingAulaConcluida: false, error: action.payload}

    default:
      return state
  }
}

export default reducer
