import {createStore, applyMiddleware, Store} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'
import {persistStore} from 'redux-persist'

import {UsersState} from './ducks/users/types'
import {MeState} from './ducks/me/types'

// Tenants
import { TenantsState } from './ducks/tenants/types'

export interface ApplicationState {
  me: MeState
  users: UsersState
  tenants: TenantsState
}

const sagaMiddleware = createSagaMiddleware()
const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store
