import {all, takeLatest} from 'redux-saga/effects'

import {CartsTypes} from './carts/types'
import {loadCarts, createCart, loadCart} from './carts/sagas'

import {UsersTypes} from './users/types'
import {
  loadUsers,
  // findUserId,
  searchUser,
  createUser,
  updateUser,
  deleteUser,
  selectUsersAdd,
  selectUsersRemove,
  filterUser,
  loadUser,
} from './users/sagas'

import {MeTypes} from './me/types'
import {loginUser, createMe, updateMe, deleteMe, recoveryUser, loadMe} from './me/sagas'




import {LeadTypes} from './lead/types'
import {loadLead, createLead, confirmLead, notDisturbLead} from './lead/sagas'

import {LeadsTypes} from './leads/types'
import {loadLeads, searchLeads} from './leads/sagas'



import {ListsTypes} from './lists/types'
import {loadLists} from './lists/sagas'

import {EmailToListTypes} from './email/types'
import {createEmailToList, loadEmailToList} from './email/sagas'

import {AnnotationTypes} from './annotation/types'
import {loadAnnotationsSingle, createAnnotation} from './annotation/sagas'
import {AnnotationsTypes} from './annotations/types'
import {loadMyAnnotations} from './annotations/sagas'

import {SupportsTypes} from './support/types'
import {createSupport, loadAllsupports, loadSupports, updateSupport} from './support/sagas'

import {
  createWppcamp,
  deleteWppcamp,
  loadAllwppcamps,
  loadWppcamps,
  loadWppgroupavailable,
  updateWppcamp,
} from './wppcamp/sagas'
import {WppcampTypes} from './wppcamp/types'
import {WppgroupTypes} from './wppgroup/types'
import {createWppgroup, deleteWppgroup, loadWppgroups, updateWppgroup} from './wppgroup/sagas'
import { createcontact, deletecontact, loadAllcontacts, loadcontacts, updatecontact } from './contact/sagas'
import { ContactsTypes } from './contact/types'
import { StateTypes } from './state/types'
import { CityTypes } from './city/types'
import { loadState } from './state/sagas'
import { loadCity } from './city/sagas'
import { CommentsTypes } from './comments/types'
import { loadComments } from './comments/sagas'
import { OnlineUsersTypes } from './onlineusers/types'
import { loadconnectedTimeGroupedByHour, loadconnectedTimeGroupedByHourById, loadconnectedTimeGroupedByWeekDay, loadconnectedTimeGroupedByWeekDayById, loadconnectedUsers } from './onlineusers/sagas'




import { ModulesTypes } from './dmodule/types'
import { createModule, loadModules as loadDmodules, updateModule, deleteModule, loadModule, } from './dmodule/sagas'
import { ClassesTypes } from './dclass/types'
import { createClass, deleteClass, updateClass, loadClasses as loadDClasses } from './dclass/sagas'
import { ClassExtrasTypes } from './dclassextra/types'
import { createClassExtra, deleteClassExtra, loadClassExtra, loadClassExtras, updateClassExtra } from './dclassextra/sagas'
import { LaunchsTypes } from './dlaunch/types'
import { OffersTypes } from './doffer/types'
import { createOffer, deleteOffer, loadMyOffers, loadOffer, updateOffer } from './doffer/sagas'
import { ProductsTypes } from './dproduct/types'
import { createProduct, deleteProduct, loadMyProducts, loadProduct, updateProduct } from './dproduct/sagas'
import { OfferHasProductsTypes } from './dofferhasproduct/types'
import { createOfferHasProducts, deleteOfferHasProducts, loadOfferHasProducts, updateOfferHasProducts } from './dofferhasproduct/sagas'
import { createLaunch as dcreateLaunch, deleteLaunch, loadLaunch, loadMyLaunchs, updateLaunch } from './dlaunch/sagas'
import { LaunchHasOfferTypes } from './dlaunchhasoffers/types'
import { createLaunchHasOffers, deleteLaunchHasOffers, loadLaunchHasOffers, updateLaunchHasOffers } from './dlaunchhasoffers/sagas'
import { LaunchPhasesTypes } from './dlaunchphase/types'
import { createLaunchPhase, deleteLaunchPhase, loadLaunchPhase, loadMyLaunchPhase, updateLaunchPhase } from './dlaunchphase/sagas'
import { LaunchPhaseExtrasTypes } from './dlaunchphaseextras/types'
import { createLaunchPhaseExtra, deleteLaunchPhaseExtra, loadLaunchPhaseExtra, loadMyLaunchPhaseExtra, updateLaunchPhaseExtra } from './dlaunchphaseextras/sagas'





export default function* rootSaga() {
  yield all([
    takeLatest(CartsTypes.LOAD_CARTS_REQUEST, loadCarts),
    takeLatest(CartsTypes.LOAD_CART_REQUEST, loadCart),
    takeLatest(CartsTypes.CREATE_CART_REQUEST, createCart),
    //takeLatest(UsersTypes.CREATE_USER_REQUEST, createUser),

    //Me
    takeLatest(MeTypes.LOGIN_USER_REQUEST, loginUser),
    takeLatest(MeTypes.UPDATE_USER_REQUEST, updateMe),
    takeLatest(MeTypes.CREATE_USER_REQUEST, createMe),
    takeLatest(MeTypes.DELETE_USER_REQUEST, deleteMe),
    takeLatest(MeTypes.RECOVERY_USER_REQUEST, recoveryUser),
    takeLatest(MeTypes.LOAD_ME_REQUEST, loadMe),

    //Users
    takeLatest(UsersTypes.LOAD_USERS_REQUEST, loadUsers),
    takeLatest(UsersTypes.LOAD_USER_REQUEST, loadUser),
    takeLatest(UsersTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(UsersTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(UsersTypes.DELETE_USER_REQUEST, deleteUser),
    takeLatest(UsersTypes.SEARCH_USERS_REQUEST, searchUser),
    takeLatest(UsersTypes.FILTER_USERS_REQUEST, filterUser),
    takeLatest(UsersTypes.SELECTED_USER_ADD, selectUsersAdd),
    takeLatest(UsersTypes.SELECTED_USER_REMOVE, selectUsersRemove),


    //Lead
    takeLatest(LeadTypes.LOAD_LEAD_REQUEST, loadLead),
    takeLatest(LeadTypes.CREATE_LEAD_REQUEST, createLead),
    takeLatest(LeadTypes.CONFIRM_LEAD_REQUEST, confirmLead),
    takeLatest(LeadTypes.NOTDISTURB_LEAD_REQUEST, notDisturbLead),

    //EmailToList
    takeLatest(EmailToListTypes.LOAD_EMAIL_TO_LIST_REQUEST, loadEmailToList),
    takeLatest(EmailToListTypes.CREATE_EMAIL_TO_LIST_REQUEST, createEmailToList),

    //All leads
    takeLatest(LeadsTypes.LOAD_LEAD_REQUEST, loadLeads),
    takeLatest(LeadsTypes.SEARCH_LEADS_REQUEST, searchLeads),

    //All lists
    takeLatest(ListsTypes.LOAD_LISTS_REQUEST, loadLists),

    //Annotations
    takeLatest(AnnotationTypes.LOAD_ANNOTATION_SINGLE_REQUEST, loadAnnotationsSingle),
    takeLatest(AnnotationTypes.CREATE_ANNOTATION_REQUEST, createAnnotation),

    takeLatest(AnnotationsTypes.LOAD_MY_ANNOTATIONS_REQUEST, loadMyAnnotations),

    //Comments
    takeLatest(CommentsTypes.LOAD_COMMENTS_REQUEST, loadComments),



    //Support
    takeLatest(SupportsTypes.LOAD_ALLSUPPORT_REQUEST, loadAllsupports),
    takeLatest(SupportsTypes.LOAD_SUPPORT_REQUEST, loadSupports),
    takeLatest(SupportsTypes.CREATE_SUPPORT_REQUEST, createSupport),
    takeLatest(SupportsTypes.UPDATE_SUPPORT_REQUEST, updateSupport),

    //Wppcamp
    takeLatest(WppcampTypes.LOAD_ALLCAMP_REQUEST, loadAllwppcamps),
    takeLatest(WppcampTypes.LOAD_CAMP_REQUEST, loadWppcamps),
    takeLatest(WppcampTypes.CREATE_CAMP_REQUEST, createWppcamp),
    takeLatest(WppcampTypes.UPDATE_CAMP_REQUEST, updateWppcamp),
    takeLatest(WppcampTypes.DELETE_CAMP_REQUEST, deleteWppcamp),
    takeLatest(WppcampTypes.LOAD_WPPGROUPAVAILABLE_REQUEST, loadWppgroupavailable),

    //Wppgroup
    takeLatest(WppgroupTypes.LOAD_WPPGROUPS_REQUEST, loadWppgroups),
    takeLatest(WppgroupTypes.CREATE_WPPGROUP_REQUEST, createWppgroup),
    takeLatest(WppgroupTypes.UPDATE_WPPGROUP_REQUEST, updateWppgroup),
    takeLatest(WppgroupTypes.DELETE_WPPGROUP_REQUEST, deleteWppgroup),

    //Contact
    takeLatest(ContactsTypes.LOAD_ALLCONTACT_REQUEST, loadAllcontacts),
    takeLatest(ContactsTypes.LOAD_CONTACT_REQUEST, loadcontacts),
    takeLatest(ContactsTypes.CREATE_CONTACT_REQUEST, createcontact),
    takeLatest(ContactsTypes.UPDATE_CONTACT_REQUEST, updatecontact),
    takeLatest(ContactsTypes.DELETE_CONTACT_REQUEST, deletecontact),

    takeLatest(StateTypes.LOAD_STATES_REQUEST, loadState),
    takeLatest(CityTypes.LOAD_CITIES_REQUEST, loadCity),

    //OnlineUsers
    takeLatest(OnlineUsersTypes.LOAD_CONNECTEDUSERS_REQUEST, loadconnectedUsers),
    takeLatest(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOUR_REQUEST, loadconnectedTimeGroupedByHour),
    takeLatest(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYHOURBYID_REQUEST, loadconnectedTimeGroupedByHourById),
    takeLatest(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAY_REQUEST, loadconnectedTimeGroupedByWeekDay),
    takeLatest(OnlineUsersTypes.LOAD_CONNECTEDTIMEGROUPEDBYWEEKDAYBYID_REQUEST, loadconnectedTimeGroupedByWeekDayById),

    //Offer
    takeLatest(OffersTypes.LOAD_OFFER_REQUEST, loadOffer),
    takeLatest(OffersTypes.LOAD_MYOFFERS_REQUEST, loadMyOffers),
    takeLatest(OffersTypes.CREATE_OFFER_REQUEST, createOffer),
    takeLatest(OffersTypes.UPDATE_OFFER_REQUEST, updateOffer),
    takeLatest(OffersTypes.DELETE_OFFER_REQUEST, deleteOffer),

    //Product
    takeLatest(ProductsTypes.LOAD_MYPRODUCTS_REQUEST, loadMyProducts),
    takeLatest(ProductsTypes.LOAD_PRODUCT_REQUEST, loadProduct),
    takeLatest(ProductsTypes.CREATE_PRODUCT_REQUEST, createProduct),
    takeLatest(ProductsTypes.UPDATE_PRODUCT_REQUEST, updateProduct),
    takeLatest(ProductsTypes.DELETE_PRODUCT_REQUEST, deleteProduct),

    //OfferHasProducts
    takeLatest(OfferHasProductsTypes.LOAD_OFFERHASPRODUCTS_REQUEST, loadOfferHasProducts),
    takeLatest(OfferHasProductsTypes.CREATE_OFFERHASPRODUCTS_REQUEST, createOfferHasProducts),
    takeLatest(OfferHasProductsTypes.UPDATE_OFFERHASPRODUCTS_REQUEST, updateOfferHasProducts),
    takeLatest(OfferHasProductsTypes.DELETE_OFFERHASPRODUCTS_REQUEST, deleteOfferHasProducts),

    //Module
    takeLatest(ModulesTypes.LOAD_MODULES_REQUEST, loadDmodules),
    takeLatest(ModulesTypes.LOAD_MODULE_REQUEST, loadModule),
    takeLatest(ModulesTypes.CREATE_MODULE_REQUEST, createModule),
    takeLatest(ModulesTypes.UPDATE_MODULE_REQUEST, updateModule),
    takeLatest(ModulesTypes.DELETE_MODULE_REQUEST, deleteModule),

    //Class
    takeLatest(ClassesTypes.LOAD_CLASSES_REQUEST, loadDClasses),
    takeLatest(ClassesTypes.CREATE_CLASS_REQUEST, createClass),
    takeLatest(ClassesTypes.UPDATE_CLASS_REQUEST, updateClass),
    takeLatest(ClassesTypes.DELETE_CLASS_REQUEST, deleteClass),

    //ExtraClass
    takeLatest(ClassExtrasTypes.LOAD_CLASSEXTRAS_REQUEST, loadClassExtras),
    takeLatest(ClassExtrasTypes.LOAD_CLASSEXTRA_REQUEST, loadClassExtra),
    takeLatest(ClassExtrasTypes.CREATE_CLASSEXTRA_REQUEST, createClassExtra),
    takeLatest(ClassExtrasTypes.UPDATE_CLASSEXTRA_REQUEST, updateClassExtra),
    takeLatest(ClassExtrasTypes.DELETE_CLASSEXTRA_REQUEST, deleteClassExtra),

    //Launch
    takeLatest(LaunchsTypes.LOAD_LAUNCH_REQUEST, loadLaunch),
    takeLatest(LaunchsTypes.LOAD_MYLAUNCHS_REQUEST, loadMyLaunchs),
    takeLatest(LaunchsTypes.CREATE_LAUNCH_REQUEST, dcreateLaunch),
    takeLatest(LaunchsTypes.UPDATE_LAUNCH_REQUEST, updateLaunch),
    takeLatest(LaunchsTypes.DELETE_LAUNCH_REQUEST, deleteLaunch),

    //LaunchHasOffers
    takeLatest(LaunchHasOfferTypes.LOAD_LAUNCHHASOFFERS_REQUEST, loadLaunchHasOffers),
    takeLatest(LaunchHasOfferTypes.CREATE_LAUNCHHASOFFERS_REQUEST, createLaunchHasOffers),
    takeLatest(LaunchHasOfferTypes.UPDATE_LAUNCHHASOFFERS_REQUEST, updateLaunchHasOffers),
    takeLatest(LaunchHasOfferTypes.DELETE_LAUNCHHASOFFERS_REQUEST, deleteLaunchHasOffers),

    //LaunchPhase
    takeLatest(LaunchPhasesTypes.LOAD_LAUNCHPHASES_REQUEST, loadLaunchPhase),
    takeLatest(LaunchPhasesTypes.LOAD_MYLAUNCHPHASES_REQUEST, loadMyLaunchPhase),
    takeLatest(LaunchPhasesTypes.CREATE_LAUNCHPHASES_REQUEST, createLaunchPhase),
    takeLatest(LaunchPhasesTypes.UPDATE_LAUNCHPHASES_REQUEST, updateLaunchPhase),
    takeLatest(LaunchPhasesTypes.DELETE_LAUNCHPHASES_REQUEST, deleteLaunchPhase),

    //LaunchPhaseExtra
    takeLatest(LaunchPhaseExtrasTypes.LOAD_LAUNCHPHASEEXTRA_REQUEST, loadLaunchPhaseExtra),
    takeLatest(LaunchPhaseExtrasTypes.LOAD_MYLAUNCHPHASEEXTRA_REQUEST, loadMyLaunchPhaseExtra),
    takeLatest(LaunchPhaseExtrasTypes.CREATE_LAUNCHPHASEEXTRA_REQUEST, createLaunchPhaseExtra),
    takeLatest(LaunchPhaseExtrasTypes.UPDATE_LAUNCHPHASEEXTRA_REQUEST, updateLaunchPhaseExtra),
    takeLatest(LaunchPhaseExtrasTypes.DELETE_LAUNCHPHASEEXTRA_REQUEST, deleteLaunchPhaseExtra),

  ])
  // console.log('mounting saga...')
}
