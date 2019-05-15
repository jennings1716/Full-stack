const noteReq = require("../dao/notes.dao");

module.exports = function (io){
  console.log("Before connection")
  //------------SOCKET-CONNECTION--------------------------------------------------
  var people = {}
  io.on('connection', (socket) => {
    console.log('new connection made',socket.id);
    socket.on('register', (data) => {
      people[data.user] = socket.id;
      console.log("PEOPLE",people)
    });
    socket.on('notify',(data)=>{
      data.receiver.forEach(rec=>{
        console.log("Emitting notification",people[rec])
        io.to(people[rec]).emit('notification',data.msg);
      }) 
    })
  });
}