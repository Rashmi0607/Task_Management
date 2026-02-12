
const sequelize = require("../config/db");
const User = require("./user");
const Task = require("./task");

User.hasMany(Task);
Task.belongsTo(User);

module.exports = { sequelize, User, Task };
