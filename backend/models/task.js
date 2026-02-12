
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM("Todo","In Progress","Completed"),
    defaultValue: "Todo"
  }
});

module.exports = Task;
