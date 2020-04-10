export const state = () => ({
  user: {},
  messages: [],

});/*state единтсвенная константа которая должна быть функцией*/

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
  }
};

export const actions = {
  /*пакет  socket io будет автоматически вызывать этот action */
  SOCKET_newMessage(ctx, data) {
    console.log('Message received', data) /*Сработает если сервер нам чтото отпавит*/
  }
};
