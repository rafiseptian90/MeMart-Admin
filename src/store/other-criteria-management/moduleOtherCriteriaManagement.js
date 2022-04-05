/*=========================================================================================
  File Name: moduleUserManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleOtherCriteriaManagementState.js'
import mutations from './moduleOtherCriteriaManagementMutations.js'
import actions from './moduleOtherCriteriaManagementActions.js'
import getters from './moduleOtherCriteriaManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

