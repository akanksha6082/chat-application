var express = require("express"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  cors = require("cors"),
  http = require("http"),
  socketio = require("socket.io");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./src/utils/users");

const router = require("./router");
app = express();
app.use(router);

var PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

mongoose.connect("mongodb://localhost/Auth_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Users = require("./routes/Users");

app.use("/users", Users);

//video call users
users = {};

//video chat room
socketToRoom = {};

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, WELCOME to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("join room", (roomID) => {
    console.log("joined room");
    if (users[roomID]) {
      const length = users[roomID].length;

      if (length == 6) {
        socket.emit("room full");
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }
    socketToRoom[socket.id] = roomID;
    const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

    socket.emit("all users", usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("remove", (payload) => {
    const roomID = socketToRoom[payload.id];
    let room = users[roomID];
   
    if (room) {
        room = room.filter(id => id !== payload.id);
        users[roomID] = room;
        delete socketToRoom[payload.id];
      
        users[roomID].forEach(id => {
          io.to(id).emit("user left", {id: payload.id})
        });
        
     }
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });



});

server.listen(PORT, function () {
  console.log(`server started on ${PORT}`);
});
