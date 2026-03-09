const express = require("express");
const adminRoutes = require("./routes/adminRoute");
const testRoutes = require("./routes/testRoute");
const productRoutes = require("./routes/productsRoute");
const blogRoutes = require("./routes/BlogsRoute");
const path = require("path");
const cors = require('cors')

const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
app.use(cors());

app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(adminRoutes);
app.use(testRoutes);
app.use(productRoutes);
app.use(blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
