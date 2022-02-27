/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "@/axios.js";

export default {
  fetchClassrooms({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`classroom`)
        .then(({ data: response }) => {
          commit("SET_CLASSROOMS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchClassroom(context, classroomID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`classroom/${classroomID}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  storeClassroom(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`classroom`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateClassroom(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`classroom/${payload.id}`, payload.body)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  destroyClassroom({ commit }, classroomID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`classroom/${classroomID}`)
        .then((response) => {
          commit("REMOVE_RECORD", classroomID);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
