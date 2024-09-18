/**
 * Basic NodeJS project to illustrate how to run a "NodeJS + MySQL" project using Docker Compose.
 * https://numericaideas.com/blog/docker-compose-nodejs-mysql
 */
import express from "express";
// const express = require("express");
const app = express();
const port = 80;

import { connectDatabase } from "./configs/database";
console.log("console : ", process.env.DB_NAME);
console.log("console HOST : ", process.env.DB_HOST);

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

app.listen(port, async () => {
  console.log(`Docker-Compose-NodeJS-MySQL App listening on port ${port}.`);
  await connectDatabase();
});
