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
  fetchOtherCriterias({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`other-criteria`)
        .then(({ data: response }) => {
          commit("SET_OTHER_CRITERIAS", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchOtherCriteria(context, otherCriteriaID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`other-criteria/${otherCriteriaID}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  storeOtherCriteria(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`other-criteria`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateOtherCriteria(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`other-criteria/${payload.id}`, payload.body)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  destroyOtherCriteria({ commit }, otherCriteriaID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`other-criteria/${otherCriteriaID}`)
        .then((response) => {
          commit("REMOVE_RECORD", otherCriteriaID);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
