import axios from "../../util/axios";
import { uid } from "quasar";
import { showErrorMessage } from "src/functions/show-error-msg";

export async function getTasks({ commit }) {
  const graphqlQuery = {
    query: `
      query {
        todos {
            id
            title
            completed
            dueDate
            dueTime
        }
      }
    `
  };
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
    console.log(res);
    commit("GET_TASKS", res.data.data.todos);
  } catch (error) {
    showErrorMessage(error.response.data.errors[0].message);
  }
}

export function addTask({ commit }, task) {
  let taskId = uid();
  let payload = {
    id: taskId,
    task
  };
  commit("ADD_TASK", payload);
}

export function updateTask({ commit }, payload) {
  commit("UPDATE_TASK", payload);
}

export function deleteTask({ commit }, id) {
  commit("DELETE_TASK", id);
}

export function setSearch({ commit }, value) {
  commit("SET_SEARCH", value);
}

export function setSort({ commit }, value) {
  commit("SET_SORT", value);
}
