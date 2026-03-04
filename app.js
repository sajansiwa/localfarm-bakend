const express = require("express");
const adminRoutes = require("./routes/adminRoute");
const testRoutes = require("./routes/testRoute");

const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();

app.use(express.json());

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(adminRoutes);
app.use(testRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;