import axios from "axios";

axios.defaults.baseURL = process.env.DEV ? process.env.LOCAL : process.env.API;
axios.defaults.headers.post["Content-Type"] = "application/json";

export function setAxiosAuthorization(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default axios;
