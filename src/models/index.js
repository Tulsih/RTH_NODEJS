const connectDatabase = require("../config/dbConfig");

// first load all models before sync
const users = require("./user");

// db sync
connectDatabase
  .sync({ alter: true })
  .then(() => {
    console.log("DB sync successfully...");
  })
  .catch((error) => {
    console.log("Error while db sync: ", error);
  });

exports.module = {
  users,
};
