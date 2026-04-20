const express = require("express");
const path = require("path");
const cors = require("cors");
const catRoutes = require("./routes/productCategoryRoute");
const adminRoutes = require("./routes/adminRoute");
const testRoutes = require("./routes/testRoute");
const productRoutes = require("./routes/productsRoute");
const blogRoutes = require("./routes/BlogsRoute");
const orderRoutes = require("./routes/ordersRoute");
const eventRoutes = require("./routes/eventRoute");
const contactRoutes = require("./routes/contactRoute");
const { swaggerUi, swaggerSpec } = require("./swagger");
const staffRoute = require("./routes/staffRoute");

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV !== "production") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(adminRoutes);
app.use(testRoutes);
app.use(productRoutes);
app.use(blogRoutes);
app.use(orderRoutes);
app.use(eventRoutes);
app.use(contactRoutes);
app.use(catRoutes);
app.use(staffRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

module.exports = app;
