/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_CLASSROOMS (state, classrooms) {
    state.classrooms = classrooms
  },
  REMOVE_RECORD (state, classroomID) {
    const userIndex = state.classrooms.findIndex((u) => u.id === classroomID)
    state.classrooms.splice(userIndex, 1)
  }
}
