/*=========================================================================================
  File Name: moduleUserManagement.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleParentCompletnessManagementState.js'
import mutations from './moduleParentCompletnessManagementMutations.js'
import actions from './moduleParentCompletnessManagementActions.js'
import getters from './moduleParentCompletnessManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

