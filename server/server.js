const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let crudData = [];

io.on("connection", (socket) => {
  socket.on("data", (data) => {
    crudData.push(data);
    console.log(crudData);
    socket.emit("crudData", crudData);
  });

  setInterval(() => {
    socket.emit("crudData", crudData);
  }, 1000);
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
