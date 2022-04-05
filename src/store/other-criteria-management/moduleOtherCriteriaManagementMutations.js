/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_OTHER_CRITERIAS (state, other_criterias) {
    state.other_criterias = other_criterias
  },
  REMOVE_RECORD (state, otherCriteriaID) {
    const otherCriteriaIndex = state.other_criterias.findIndex((u) => u.id === otherCriteriaID)
    state.other_criterias.splice(otherCriteriaIndex, 1)
  }
}
