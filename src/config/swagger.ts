// import swaggerJsdoc, { Options } from "swagger-jsdoc";

// const swaggerOptions: Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "My E_Commerce Api",
//       version: "1.0.0",
//       description: "API documentation for my E-commerce site",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.ts"], // Scan route files for @openapi comments
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// export default swaggerSpec;

import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API documentation with Swagger & OpenAPI 3.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["name", "email", "token"],
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            token: { type: "string", example: "JWT token here" },
          },
        },
      },
    },
    // ✅ Put security here (root of definition)
    security: [{ bearerAuth: [] }],
  } as any,
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};
const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Express, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

 app.get("/api-docs.json", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(swaggerSpec); // ✅ No return
});
  console.log(`📑 Swagger docs: http://localhost:${port}/api-docs`);
}

export default swaggerSpec;

