import * as express from "express";
import * as http from "http";
import * as socketIO from "socket.io";

const app = express();
const server = http.createServer(app);
server.listen(8002);
const io = socketIO(server);

app.use((req: any, res: any, next: any) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8001');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

io.on("connection", function (socket) {
  console.log(socket.id);

  // const interval = setInterval(() => { socket.emit("switchPage", { onlineNum: 1 })}, 3000 );
  // socket.on("disconnect", () => {
  //   clearInterval(interval);
  // });
  // socket.on("waitingForRouting", () => {
  socket.emit("switchPage", { onlineNum: 1 });
  // });
});
