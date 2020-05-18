export const state = () => ({
  user: {},
  messages: [],
  users: [],

});/*state единтсвенная константа которая должна быть функцией*/

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },

  SOCKET_newMessage(state, message) {
    state.messages.push(message)
  },

  SOCKET_updateUsers(state, users) {
    state.users = users
  }
};

