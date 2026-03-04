require("dotenv").config();
const app = require("./app");
const db = require("./models");

const PORT = process.env.PORT || 5000;

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
