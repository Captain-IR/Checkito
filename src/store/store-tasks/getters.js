export function tasksSorted(state) {
  let tasksSorted = {};
  let keysOrdered = Object.keys(state.tasks);
  keysOrdered.sort((a, b) => {
    let taskAProp = state.tasks[a][state.sort].toLowerCase();
    let taskBProp = state.tasks[b][state.sort].toLowerCase();

    if (taskAProp > taskBProp) return 1
    else if (taskAProp < taskBProp) return -1
    else return 0

  });

  keysOrdered.forEach((key => {
    tasksSorted[key] = state.tasks[key]
  }))

  return tasksSorted;
}

export function tasksFiltered(state, getters) {
  let tasksSorted = getters.tasksSorted
  let tasksFiltered = {};
  if (state.search) {
    // populate empty object
    Object.keys(tasksSorted).forEach(function(key) {
      const task = tasksSorted[key],
        taskNameLower = task.name.toLowerCase(),
        stateSearchLower = state.search.toLowerCase();

      if (taskNameLower.includes(stateSearchLower)) {
        tasksFiltered[key] = task;
      }
    });
    return tasksFiltered;
  }
  return tasksSorted;
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
