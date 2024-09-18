/**
 * Basic NodeJS project to illustrate how to run a "NodeJS + MySQL" project using Docker Compose.
 * https://numericaideas.com/blog/docker-compose-nodejs-mysql
 */
const express = require("express");
const Sequelize = require("sequelize");
const dbConfig = require("./db.config");
const app = express();
const port = 80;

console.log("console : ", process.env.DB_NAME);
console.log("console HOST : ", process.env.DB_HOST);

// Database connection using Sequelize via the mysql2 driver
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    dialect: dbConfig.DIALECT,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize.sync({}).then(
  function () {
    console.log("DB connection sucessful.");
  },
  function (err) {
    // catch error here
    console.log(err);
  }
);

// // Let's define a basic User model
// const User = sequelize.define("User", {
//   email: Sequelize.STRING,
//   firstName: Sequelize.STRING,
//   lastName: Sequelize.STRING,
// });

// // sequelize
// //   .authenticate()
// //   .then(() => {
// //     console.log("Connection has been established successfully.");
// //   })
// //   .catch((error) => {
// //     console.error("Unable to connect to the database: ", error);
// //   });

// // Match the DB state with the actual model definition on the top: https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
// User.sync({ alter: true });

// // Express default body parser

// // Create a new User
// app.post("/users", (req, res) => {
//   const { email, firstName, lastName } = req.body;
//   User.create({ email, firstName, lastName })
//     .then((savedUser) => {
//       res.json(savedUser);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// // Get all users
// app.get("/users", (req, res) => {
//   User.findAll()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

app.use(express.json());

app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    code: 200,
  });
});

app.listen(port, () => {
  console.log(`Docker-Compose-NodeJS-MySQL App listening on port ${port}.`);
});
