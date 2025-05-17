import express from "express";
import http from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req, res) => res.sendFile(join(__dirname, "index.html")));

io.on("connection", (client) => {
  console.log("User connected to (Server)");

  client.emit("welcome", "Welcome to the server");

  client.on("client message", (message) => {
    console.log(message);
  });

  client.on("disconnect", () => {
    console.log("User disconnected from (Server)");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
