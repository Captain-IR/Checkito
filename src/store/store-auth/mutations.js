export function SET_AUTH(state, { token, loggedIn }) {
  state.loggedIn = loggedIn;
  state.token = token;
}
