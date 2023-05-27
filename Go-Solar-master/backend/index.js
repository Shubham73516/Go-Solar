const express = require("express");
const app = express();
const port = 5000;

const userRouter = require("./routers/userRouter");
const bookingRouter = require("./routers/bookingRouter");
const expertRouter = require("./routers/expertRouter");
const equipmentRouter = require("./routers/equipmentRouter");
const utilRouter = require("./routers/util");
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());

const stripe = require("stripe")(
  "sk_test_51NAWp1SCPacst9JciaoWD36Y0WYPGGJIdw6FJ66TIMjb34TdqmWEx2yqRL5dEJQ3y4CDlGloD8tWuwil1JKlc66L00hobIvQ3h"
);

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const connectedExperts = {};

io.on("connection", (socket) => {
  console.log("client connected ");
  socket.on("addexpert", (id) => {
    connectedExperts[id] = socket.id;
    console.log(connectedExperts);
  });

  socket.on("checkexpert", (id) => {
    console.log(connectedExperts[id]);
    socket.emit("checkexpertfromserver", {
      status: "online",
      socketId: connectedExperts[id],
    });
  });

  socket.on("sendstudent", (data) => {
    // console.log(data);
    data.sent = false;
    socket.broadcast.emit("recmsg", data);
  });
  socket.on("sendmsg", (data) => {
    console.log(data);
    data.sent = false;
    socket.to(data.socketId).emit("recmsg", data);
  });
});



app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



app.use("/user", userRouter);
app.use("/booking", bookingRouter);
app.use("/expert", expertRouter);
app.use("/equipment", equipmentRouter);
app.use("/util", utilRouter);

app.use(express.static("./static/uploads"));

// routes
app.get("/", (req, res) => {
  res.send("Working Perfectly");
});

app.get("/home", (req, res) => {
  res.send("Response from Home");
});

app.get("/add", (req, res) => {
  res.send("Response from Add");
});

app.listen(port, () => {
  console.log("server started");
});
