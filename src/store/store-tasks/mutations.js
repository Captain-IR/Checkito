import Vue from "vue";

export function GET_TASKS(state, tasks) {
  state.tasks = [...tasks];
}

export function ADD_TODO(state, task) {
  state.tasks.push(task);
}

export function UPDATE_STATUS(state, todo) {
  const tasks = state.tasks.map(task => {
    if (task.id == todo.id) {
      return { ...task, completed: !todo.completed };
    }
    return task;
  });
  state.tasks = [...tasks];
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
