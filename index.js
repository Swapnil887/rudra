const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./routers/user.route");
const { flightRouter } = require("./routers/flight.route");
const { authenticate } = require("./middleware/authentication");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  try {
    res.send("hello");
  } catch (error) {
    console.log("err", error);
    res.send("not getting");
  }
});

app.use("/users", userRouter);
app.use("/flights", authenticate, flightRouter);
// app.use("/bookings", authenticate, bookingRouter);
app.listen(6500, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log("Some problem while connecting Database");
  }
  console.log("running at 6500");
});
