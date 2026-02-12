
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () =>
    console.log("Server running on port " + process.env.PORT)
  );
});
