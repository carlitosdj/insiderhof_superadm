import {combineReducers} from 'redux'
// import repositories from './repositories';
import carts from './carts'
import users from './users'

import me from './me'

import extras from './extras'
import lead from './lead'
import leads from './leads'

import lists from './lists'
import emailToList from './massmail'

import singlemail from './singlemail'
import annotation from './annotation'
import annotations from './annotations'
import comments from './comments'
import supports from './support'
import wppcamp from './wppcamp'
import wppgroup from './wppgroup'
import contact from './contact'
import city from './city'
import state from './state'
import onlineusers from './onlineusers'

import module from './dmodule'
import dclass from './dclass'
import dextraclass from './dclassextra'

import product from './dproduct'
import offerhasproducts from './dofferhasproduct'
import offer from './doffer'
import launch from './dlaunch'
import launchhasoffers from './dlaunchhasoffers'
import launchphase from './dlaunchphase'
import launchphaseextra from './dlaunchphaseextras'
import lps from './dlps'
import lpsessions from './dlpsessions'
import lpfeatures from './dlpfeatures'
import ideaction from './ideaction'
import launchquestion from './dlaunchquestion'
import launchquestionoption from './dlaunchquestionoption'


export default combineReducers({
  carts,
  users,

  me,

  extras,
  lead,
  leads,
  //course,
  lists,
  emailToList,
  singlemail,
  
  annotation,
  annotations,
  comments,
  supports,
  wppcamp,
  wppgroup,
  contact,
  city,
  state,
  onlineusers,

 
  
  module,
  dclass,
  dextraclass,

  offer,
  product,
  launch,
  offerhasproducts,
  launchhasoffers,
  launchphase,
  launchphaseextra,

  lps,
  lpsessions,
  lpfeatures,
  ideaction,

  launchquestion,
  launchquestionoption,
  
})
