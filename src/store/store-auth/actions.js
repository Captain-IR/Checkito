import { LocalStorage, Loading } from "quasar";
import axios from "axios";
import {showErrorMessage} from 'src/functions/show-error-msg';

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function registerUser({ commit }, { email, password }) {
  Loading.show()
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
    console.log(res);
  } catch (error) {
    showErrorMessage(error.response.data.errors[0].message)
  }
}

export async function loginUser({ commit, dispatch }, { email, password }) {
  Loading.show()
  const graphqlQuery = {
    query: `
          {
        loginUser(userInput: {email: "${email}", password: "${password}"})
      }
    `
  };
  try {
    const res = await axios.post("/graphql", JSON.stringify(graphqlQuery));    
    dispatch('handleAuthStateChange', res.data.data.loginUser)
    this.$router.push("/");
  } catch (error) {
    showErrorMessage(error.response.data.errors[0].message)
  }
}

export function logoutUser({ commit }) {
  console.log("logoutUser");
  commit("SET_LOGGED_IN", false);
  LocalStorage.remove("token");
  LocalStorage.remove("loggedIn");
  this.$router.replace("/auth");
}

export async function handleAuthStateChange({ commit }, token) {
  const graphqlQuery = {
    query: `
    query {
      me
    }
    `
  };
  try {
    LocalStorage.set("token", token);
    LocalStorage.set("loggedIn", true);
    commit("SET_LOGGED_IN", true);
    setAxiosAuthorization(LocalStorage.getItem("token"));
    const res = await axios.post("/graphql", graphqlQuery);
    Loading.hide()
  } catch (error) {
    console.log(error);
    commit("SET_LOGGED_IN", false);
    LocalStorage.remove("token");
    LocalStorage.remove("loggedIn");
    this.$router.replace("/auth");
  }
}

function setAxiosAuthorization(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
