import { Sequelize } from "sequelize";
import mysql from "mysql2";
import dbConfig from "../db.config.js";
// Database connection using Sequelize via the mysql2 driver
const { HOST, PORT, USERNAME, PASSWORD, DB, DIALECT } = dbConfig;

let connection = mysql.createPool({
  waitForConnections: true,
  connectTimeout: 30000,
  host: HOST,
  port: PORT,
  user: USERNAME,
  password: PASSWORD,
});

const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
  dialect: DIALECT,
  host: HOST,
  port: PORT,
  logging: false,
  dialectOptions: {
    connectTimeout: 60000,
  },
});

async function connectDatabase() {
  connection.query(`use \`${DB}\`;`, (err) => {
    if (err) {
      console.log("database conection error : ");
      connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\`;`);
    }
  });

  await sequelize.sync().then(
    function () {
      console.log("DB connection sucessful.");
    },
    function (err) {
      // catch error here
      console.log(err);
    }
  );
  //   await sequelize.sync({ force: false, alter: false }).then(() => {
  //     console.log("Re-Sync Database");
  //   });
}

export { connectDatabase, connection, sequelize };
