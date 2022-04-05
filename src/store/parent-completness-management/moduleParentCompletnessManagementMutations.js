/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_PARENT_COMPLETNESSES (state, parent_completnesses) {
    state.parent_completnesses = parent_completnesses
  },
  REMOVE_RECORD (state, parentCompletnessID) {
    const parentCompletnessIndex = state.parent_completnesses.findIndex((u) => u.id === parentCompletnessID)
    state.parent_completnesses.splice(parentCompletnessIndex, 1)
  }
}
