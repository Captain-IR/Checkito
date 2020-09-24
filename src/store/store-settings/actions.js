import { LocalStorage } from "quasar";

export function setShow12HourFormat({ commit, dispatch }, value) {
  commit("SET_SHOW_12HOUR_FORMAT", value);
  dispatch("saveSettings");
}

export function setShowTasksInOneList({ commit, dispatch }, value) {
  commit("SET_SHOW_TASKS_IN_ONE_LIST", value);
  dispatch("saveSettings");
}

export function saveSettings({ state }) {
  LocalStorage.set("settings", state.settings);
}

export function getSettings({ commit }) {
  const settings = LocalStorage.getItem('settings')
  if (settings) {
    commit('SET_SETTINGS', settings)
  }
}
