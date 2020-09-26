import { Notify } from 'quasar'
import axios from "../../util/axios";
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
    commit("GET_TODOS", res.data.data.todos);
    commit('SET_TASKS_DOWNLOADED', true)
  } catch (error) {
    showErrorMessage(error);
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
    Notify.create('Task Added!')
  } catch (error) {
    showErrorMessage(error);
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
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
    commit("UPDATE_STATUS", res.data.data.updateTodo);
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function updateTodo({ commit, dispatch }, { id, updates }) {
  const graphqlQuery = {
    query: `
      mutation {
        updateTodo(id: ${id}, todoInput: {
          title: "${updates.title}",
          dueDate: "${updates.dueDate}",
          dueTime: "${updates.dueTime}"
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
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
    commit("UPDATE_TODO", res.data.data.updateTodo);
    Notify.create('Task Updated!')
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function deleteTodo({ commit }, id) {
  const graphqlQuery = {
    query: `
      mutation {
        deleteTodo(id: ${id})
      }
    `
  };
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
    commit("DELETE_TODO", id);
    Notify.create('Task Deleted!')
  } catch (error) {
    showErrorMessage(error);
  }
}

export function setSearch({ commit }, value) {
  commit("SET_SEARCH", value);
}

export function setSort({ commit }, value) {
  commit("SET_SORT", value);
}
