export function tasksSorted(state) {
  let tasksSorted = [];
  let tasks = [...state.tasks];
  // let keysOrdered = Object.keys(state.tasks);
  tasks.sort((a, b) => {
    let taskAProp = a[state.sort].toLowerCase();
    let taskBProp = b[state.sort].toLowerCase();

    if (taskAProp > taskBProp) return 1;
    else if (taskAProp < taskBProp) return -1;
    else return 0;
  });

  tasks.forEach(task => {
    tasksSorted.push(task);
  });
  return tasksSorted;
}

export function tasksFiltered(state, getters) {
  let tasksSorted = getters.tasksSorted;
  let tasksFiltered = [];
  if (state.search) {
    // populate empty object
    tasksSorted.forEach(task => {
        taskNameLower = task.title.toLowerCase(),
        stateSearchLower = state.search.toLowerCase();

      if (taskNameLower.includes(stateSearchLower)) {
        tasksFiltered.push(task)
      }
    });
    return tasksFiltered;
  }
  return tasksSorted;
}

export function tasksTodo(state, getters) {
  let tasksFiltered = getters.tasksFiltered;
  let tasks = [];
  tasksFiltered.forEach(task => {
    if (!task.completed) {
      tasks.push(task);
    }
  });
  return tasks;
}

export function tasksCompleted(state, getters) {
  let tasksFiltered = getters.tasksFiltered;
  let tasks = [];
  tasksFiltered.forEach(task => {
    if (task.completed) {
      tasks.push(task);
    }
  });
  return tasks;
}
