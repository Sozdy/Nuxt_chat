/*Натройка сокетов*/
const app = require('express')();                   /*Имортируем express в переменную app и вызываем функцию которую получаем*/
const server = require('http').createServer(app);   /*получпем модуль http  и сразу получаем от этого модуля функцию createServer и передем ей объет app*/
const io = require('socket.io')(server);            /*Далее необходимо обернуть в сокеты полученный сервер. requare вернет функцию которой передаем переменную http*/

io.on('connection', socket => {
  console.log('IO connected');

  socket.on('createMessage', data => {  /* доббавляем прослушку события createMessage с ним получаем некоторые*/
       setTimeout(() => {         /*данные и через небольшую щадержку эмитим новое сообщение при помощи экшена   */
        socket.emit('newMessage', {
        text: data.text + ' Server'
      })}
    ,500)
  });
});


module.exports = {
  app,
  server
};/*'эекспортируем 2 переменные app и http*/
