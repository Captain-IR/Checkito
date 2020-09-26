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

export async function addTodo({ commit }, task) {
  const { title, completed, dueDate, dueTime } = task;
  const graphqlQuery = {
    query: `
      mutation {
        createTodo(todoInput: {title: "${title}", completed: ${completed}, dueDate: "${dueDate}", dueTime: "${dueTime}"}) {
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
    commit("ADD_TODO", res.data.data.createTodo);
  } catch (err) {
    console.log(err);
  }
}

export async function updateStatus({ commit }, { id, updates }) {
  const graphqlQuery = {
    query: `
        mutation {
          updateTodo(id: ${id}, todoInput: {
            completed: ${updates.completed}
          }) {
            id
            title
            completed
            dueDate
            dueTime
          }
        }
      `
  };
  const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
  commit("UPDATE_STATUS", res.data.data.updateTodo);
}

export function updateTask({ commit }, todo) {
  commit("UPDATE_TASK", todo);
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
