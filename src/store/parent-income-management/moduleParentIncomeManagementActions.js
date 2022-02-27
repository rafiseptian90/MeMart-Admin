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
  fetchParentIncomes({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`parent-income`)
        .then(({ data: response }) => {
          commit("SET_PARENT_INCOMES", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchParentIncome(context, parentIncomeID) {
    return new Promise((resolve, reject) => {
      axios
        .get(`parent-income/${parentIncomeID}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  storeParentIncome(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`parent-income`, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  updateParentIncome(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`parent-income/${payload.id}`, payload.body)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  destroyParentIncome({ commit }, parentIncomeID) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`parent-income/${parentIncomeID}`)
        .then((response) => {
          commit("REMOVE_RECORD", parentIncomeID);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
