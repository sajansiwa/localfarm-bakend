module.exports = {
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
  development: {
    username: "root",
    password: "",
    database: "localfarm_db",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
};
