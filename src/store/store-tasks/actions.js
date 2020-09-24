import { uid } from 'quasar'


export function addTask({ commit }, task) {
  let taskId = uid()
  let payload = {
    id: taskId,
    task
  }
  commit("ADD_TASK", payload);
}

export function updateTask({ commit }, payload) {
  commit("UPDATE_TASK", payload);
}

export function deleteTask({ commit }, id) {
  commit("DELETE_TASK", id);
}

export function setSearch({commit}, value) {
  commit('SET_SEARCH', value)
}