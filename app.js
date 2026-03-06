const express = require("express");
const adminRoutes = require("./routes/adminRoute");
const testRoutes = require("./routes/testRoute");
const productRoutes = require("./routes/productsRoute");
const path = require("path");

const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();

app.use(express.json());

// Swagger route
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(adminRoutes);
app.use(testRoutes);
app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
