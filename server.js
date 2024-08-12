const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

require("dotenv").config();
connectDB();

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const bannerRouter = require("./routes/banner.routes");

app.use("/banner", bannerRouter(io));
app.use("/", (req, res) => {
  res.send("You just hit the server!");
});

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
