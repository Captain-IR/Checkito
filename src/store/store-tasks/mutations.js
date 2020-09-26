import Vue from "vue";

export function GET_TODOS(state, todos) {
  state.tasks = [...todos];
}

export function ADD_TODO(state, task) {
  state.tasks.push(task);
}

export function UPDATE_STATUS(state, todo) {
  const todos = state.tasks.map(task => {
    if (task.id == todo.id) {
      return { ...task, completed: todo.completed };
    }
    return task;
  });
  state.tasks = [...todos];
}

export function UPDATE_TODO(state, todo) {
  // Object.assign(state.tasks[id], updates)
  const todos = state.tasks.map(task => {
    if (task.id == todo.id) {
      return { ...task, ...todo };
    } else {
      return task;
    }
  });
  state.tasks = [...todos];
}

export function DELETE_TODO(state, id) {
  const tasks = state.tasks.filter(task => (task.id !== id ? task : ""));
  state.tasks = [...tasks];
}

export function SET_SEARCH(state, value) {
  state.search = value;
}

export function SET_SORT(state, value) {
  state.sort = value;
}
export function SET_TASKS_DOWNLOADED(state, value) {
  state.tasksDownloaded = value;
}


