/*В плагинах помимо того что можно регистрировать  какие либо библиотеки и импортировать Vue мы можем
* создавать плагины как функции и для этого достаточно экспортировать её по дефолту из даннаго файла, затем данный плагин необходимо подключить в nuxtconfig*/


import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

/*Чтобы получить объект store в данном плагине необходимо сначала собрать всесь store Vuex и после этого регистрировать этот плагин */

export default function ({store}) {
  Vue.use(new VueSocketIO({
    debug: false,
    connection: 'http://localhost:3000',
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
  }))
}


