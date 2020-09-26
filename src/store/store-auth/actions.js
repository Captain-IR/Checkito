import { LocalStorage, Loading } from "quasar";
import axios, { setAxiosAuthorization } from "../../util/axios";
import { showErrorMessage } from "src/functions/show-error-msg";

export async function registerUser({ commit }, { email, password }) {
  Loading.show();
  const graphqlQuery = {
    query: `
      mutation {
        createUser(userInput: {email: "${email}", password: "${password}"}) {
          id
          email
        }
      }
    `
  };
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function loginUser({ commit, dispatch }, { email, password }) {
  Loading.show();
  const graphqlQuery = {
    query: `
          {
        loginUser(userInput: {email: "${email}", password: "${password}"})
      }
    `
  };
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));
    commit("SET_AUTH", { token: res.data.data.loginUser, loggedIn: true });
    LocalStorage.set("token", res.data.data.loginUser);
    LocalStorage.set("loggedIn", true);
    this.$router.push("/");
    dispatch("authState");
    Loading.hide();
  } catch (error) {
    showErrorMessage(error);
  }
}

export function logoutUser({ commit }) {
  commit("SET_AUTH", { token: null, loggedIn: false });
  LocalStorage.remove("token");
  LocalStorage.remove("loggedIn");
  this.$router.push("/auth");
  commit("tasks/SET_TASKS_DOWNLOADED", false, { root: true });
}

export async function authState({ commit, dispatch }) {
  const token = LocalStorage.getItem("token");
  const graphqlQuery = {
    query: `
    query {
      me
    }
    `
  };
  try {
    if (token) {
      setAxiosAuthorization(token);
      const res = await axios.post("/graphql", graphqlQuery);
      commit("SET_AUTH", { token, loggedIn: res.data.data.me });
      dispatch("tasks/getTasks", null, { root: true });
    }
    Loading.hide();
  } catch (error) {
    dispatch('logoutUser')
    showErrorMessage(error);
  }
}
