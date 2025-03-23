import mysql from "mysql2/promise";

export const createConnection = async () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: "root",
    password: "opencart",
    database: "opencart",
  });
};
export default createConnection;
