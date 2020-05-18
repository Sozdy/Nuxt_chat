/*Натройка сокетов*/
const app = require('express')();                   /*Имортируем express в переменную app и вызываем функцию которую получаем*/
const server = require('http').createServer(app);   /*получпем модуль http  и сразу получаем от этого модуля функцию createServer и передем ей объет app*/
const io = require('socket.io')(server);            /*Далее необходимо обернуть в сокеты полученный сервер. requare вернет функцию которой передаем переменную http*/
const m = (name, text, id) => ({name, text, id});
const users = require('./users')();

io.on('connection', socket => {

  socket.on('userJoined', (data, callback) => {
    if (!data.name || !data.room) {
      return callback('Данные некорректны')
    }
    socket.join(data.room);

    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })

    callback({userId: socket.id})
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', m('admin', `Добро пожаловать ${data.name}`));
    socket.broadcast
      .to(data.room)
      .emit('newMessage', m('admin', `Пользователь ${data.name} зашел`))
  });
  socket.on('createMessage', (data, callback) => {  /* доббавляем прослушку события createMessage с ним получаем некоторые*/
    if (!data.text) {
      return callback('Текст не может быть пустым')
    }

    const user = users.get(data.id);
    if (user) {
      io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
    }
    callback()
  });

  socket.on('userLeft', (id, callback) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользоватлеь ${user.name} вышел`))
    }
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', m('admin', `Пользоватлеь ${user.name} вышел`))
    }
  })
});


module.exports = {
  app,
  server
};/*'эекспортируем 2 переменные app и http*/
