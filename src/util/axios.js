import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export function setAxiosAuthorization(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default axios