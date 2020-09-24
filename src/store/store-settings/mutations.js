export function SET_SHOW_12HOUR_FORMAT(state, value) {
  state.settings.show12HourTimeFormat = value;
}

export function SET_SHOW_TASKS_IN_ONE_LIST(state, value) {
  state.settings.showTasksInOneList = value;
}
export function SET_SETTINGS(state, settings) {
  Object.assign(state.settings, settings);
}
