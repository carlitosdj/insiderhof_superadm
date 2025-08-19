import {createStore, applyMiddleware, Store} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './ducks/rootReducer'
import rootSaga from './ducks/rootSaga'
import {persistStore} from 'redux-persist'

import {CartsState} from './ducks/carts/types'
import {UsersState} from './ducks/users/types'

import {MeState} from './ducks/me/types'

import {ExtrasState} from './ducks/extras/types'
import {LeadState} from './ducks/lead/types'
import {LeadsState} from './ducks/leads/types'
import {ListsState} from './ducks/lists/types'
import {EmailToListState} from './ducks/massmail/types'
import {AnnotationState} from './ducks/annotation/types'
import {AnnotationsState} from './ducks/annotations/types'
import {SupportState} from './ducks/support/types'
import {WppcampState} from './ducks/wppcamp/types'
import {WppgroupState} from './ducks/wppgroup/types'
import { ContactState } from './ducks/contact/types'
import { CityState } from './ducks/city/types'
import { StateState } from './ducks/state/types'
import { CommentsState } from './ducks/comments/types'
import { OnlineUsersState } from './ducks/onlineusers/types'
import { OffersState } from './ducks/doffer/types'
import { ModuleState } from './ducks/dmodule/types'
import { ClassState } from './ducks/dclass/types'
import { ClassExtraState } from './ducks/dclassextra/types'
import { LaunchsState } from './ducks/dlaunch/types'
import { OfferHasProductsState } from './ducks/dofferhasproduct/types'
import { ProductState } from './ducks/dproduct/types'
import { LaunchHasOffersState } from './ducks/dlaunchhasoffers/types'
import { LaunchPhasesState } from './ducks/dlaunchphase/types'
import { LaunchPhaseExtrasState } from './ducks/dlaunchphaseextras/types'
import { SingleMailState } from './ducks/singlemail/types'
import { LPSessionState } from './ducks/dlpsessions/types'
import { LPFeatureState } from './ducks/dlpfeatures/types'
import { LPState } from './ducks/dlps/types'
import { IdeactionState } from './ducks/ideaction/types'
import { LaunchQuestionState } from './ducks/dlaunchquestion/types'
import { LaunchQuestionOptionState } from './ducks/dlaunchquestionoption/types'


export interface ApplicationState {
  carts: CartsState
  users: UsersState
  

  me: MeState
  extras: ExtrasState
  lead: LeadState
  leads: LeadsState
  lists: ListsState

  emailToList: EmailToListState
  singlemail: SingleMailState

  annotation: AnnotationState
  annotations: AnnotationsState
  comments: CommentsState
  supports: SupportState
  wppcamp: WppcampState
  wppgroup: WppgroupState
  contact: ContactState
  city: CityState
  state: StateState
  onlineusers: OnlineUsersState

  offer: OffersState
  product: ProductState
  
  offerhasproducts: OfferHasProductsState
  module: ModuleState
  dclass: ClassState
  dextraclass: ClassExtraState
  launch: LaunchsState
  launchhasoffers: LaunchHasOffersState
  
  launchphase: LaunchPhasesState
  launchphaseextra: LaunchPhaseExtrasState

  lps: LPState
  lpsessions: LPSessionState
  lpfeatures: LPFeatureState
  ideaction: IdeactionState
  
  launchquestion: LaunchQuestionState
  launchquestionoption: LaunchQuestionOptionState
}

const sagaMiddleware = createSagaMiddleware()
const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)

export default store
