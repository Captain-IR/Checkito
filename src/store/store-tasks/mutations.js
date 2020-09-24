import Vue from 'vue';

export function ADD_TASK(state, payload) {
  const { id, task } = payload;
  Vue.set(state.tasks, id, task)
}

export function UPDATE_TASK(state, payload) {
  const { id, updates } = payload;
  state.tasks[id].completed = updates.completed 
}

export function DELETE_TASK(state, id) {
  Vue.delete(state.tasks, id)
}

export function SET_SEARCH(state, value) {
  state.search = value
}