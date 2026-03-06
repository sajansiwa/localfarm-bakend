const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LocalFarm Admin API",
      version: "1.0.0",
      description: "API documentation for Admin routes",
    },
    tags: [
      {
        name: "Website",
        description: "Website related APIs",
      },
      {
        name: "Admin",
        description: "Coffee Beans App",
      },
      {
        name: "Products",
        description: "Product management APIs"
      }
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Swagger reads comments from routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
