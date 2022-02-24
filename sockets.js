const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("leave-room", (room) => {
    socket.leave(room);
  });

  socket.on("add-upvote", (upvote, room) => {
    if (room) {
      socket.to(room).emit("receive-upvote", upvote);
    }
  });

  socket.on("get", (upvote, room) => {
    console.log("get fired");
  });
});

const [socket, setSocket] = useState();
const [socketConnected, setSocketConnected] = useState(false);

//establish socket connection
useEffect(() => {
  setSocket(io("http://localhost:8080"));
}, []);

//subscribe to the socket event
useEffect(() => {
  if (!socket) return;

  socket.on("connect", () => {
    console.log(`you connected with id : ${socket.id}`);
    socket.emit("join-room", feedback._id);
    setSocketConnected(socket.connected);
  });
  socket.on("disconnnect", () => {
    console.log(`you disconnected with id : ${socket.id}`);
    socket.emit("leave-room", feedback._id);
    setSocketConnected(socket.connected);
  });
  socket.on("receive-upvote", (upvote) => {
    setUpvotesState((upvotesState) => [...upvotesState, upvote]);
  });
  socket.on("get", (posts) => {
    console.log("get fired client");
  });
}, [socket]);
