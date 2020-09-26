import Vue from "vue";

export function GET_TASKS(state, tasks) {
  state.tasks = [...tasks];
}

export function ADD_TASK(state, payload) {
  const { id, task } = payload;
  Vue.set(state.tasks, id, task);
}

export function UPDATE_TASK(state, { id, updates }) {
  // state.tasks[id] = { ...state.tasks[id], ...updates };
  Object.assign(state.tasks[id], updates)
}

export function DELETE_TASK(state, id) {
  Vue.delete(state.tasks, id);
}

export function SET_SEARCH(state, value) {
  state.search = value;
}

export function SET_SORT(state, value) {
  state.sort = value;
}
