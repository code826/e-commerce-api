import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecomemrce API",
      description: "API endpoints for a ecommerce api on swagger",
      contact: {
        name: "vikas",
        email: "vikasa@10901.gmail.com",
        url: "https://github.com/",
      },
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:8000/",
        description: "Local server",
      },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./src/resources/*/*.router.js"],
  //apis: ["./src/resources/product/product.router.js"],
};
const swaggerSpec = swaggerJsdoc(options);
function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
export default swaggerDocs;
