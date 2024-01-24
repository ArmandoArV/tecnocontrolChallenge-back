const mysql = require("mysql2/promise");

const localConfig = {
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  database: "tecnocontrol",
  debug: false,
  port: 3306,
};

const connection = mysql.createPool(localConfig);

connection.getConnection((err, connec) => {
  if (err) {
    console.log("Error connecting to Db");
    return;
  } else {
    console.log("Connection established");
    connec.release();
  }
});

module.exports = connection;