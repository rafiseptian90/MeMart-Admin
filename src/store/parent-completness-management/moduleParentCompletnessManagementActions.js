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
  fetchParentCompletnesses({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`parent-completness`)
        .then(({ data: response }) => {
          commit("SET_PARENT_COMPLETNESSES", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchParentCompletness(context, parentCompletnessID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`parent-completness/${parentCompletnessID}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  storeParentCompletness(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`parent-completness`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateParentCompletness(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`parent-completness/${payload.id}`, payload.body)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  destroyParentCompletness({ commit }, parentCompletnessID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`parent-completness/${parentCompletnessID}`)
        .then((response) => {
          commit("REMOVE_RECORD", parentCompletnessID);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
