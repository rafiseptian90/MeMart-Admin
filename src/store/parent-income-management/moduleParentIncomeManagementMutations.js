/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_PARENT_INCOMES (state, parent_incomes) {
    state.parent_incomes = parent_incomes
  },
  REMOVE_RECORD (state, parentIncomeID) {
    const parentIncomeIndex = state.parent_incomes.findIndex((u) => u.id === parentIncomeID)
    state.parent_incomes.splice(parentIncomeIndex, 1)
  }
}
