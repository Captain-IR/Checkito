export function tasksFiltered(state) {
  let tasksFiltered = {};
  if (state.search) {
    // populate empty object
    Object.keys(state.tasks).forEach(function(key) {
      const task = state.tasks[key],
        taskNameLower = task.name.toLowerCase(),
        stateSearchLower = state.search.toLowerCase();

      if (taskNameLower.includes(stateSearchLower)) {
        tasksFiltered[key] = task;
      }
    });
    return tasksFiltered;
  }
  return state.tasks;
}

export function tasksTodo(state, getters) {
  let tasksFiltered = getters.tasksFiltered;
  let tasks = {};
  Object.keys(tasksFiltered).forEach(key => {
    let task = tasksFiltered[key];
    if (!task.completed) {
      tasks[key] = { ...task };
    }
  });
  console.log(tasks);
  return tasks;
}

export function tasksCompleted(state, getters) {
  let tasksFiltered = getters.tasksFiltered;
  let tasks = {};
  Object.keys(tasksFiltered).forEach(key => {
    let task = tasksFiltered[key];
    if (task.completed) {
      tasks[key] = { ...task };
    }
  });
  console.log(tasks);
  return tasks;
}
