const express = require("express");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
const port = 9000;

const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);

const userRouter = require("./routes/Reservation");
app.use("/reservation", userRouter);

const staffRouter = require("./routes/Staff");
app.use("/staff", staffRouter);

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("server is run on port 9000");
  });
});
