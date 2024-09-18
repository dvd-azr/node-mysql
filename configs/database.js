const Sequelize = require("sequelize");
// const dbConfig = require("./db.config");
import dbConfig from "../db.config";
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
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
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
  await sequelize.sync({ force: false, alter: false }).then(() => {
    console.log("Re-Sync Database");
  });
}

export { connectDatabase, connection, sequelize };
