import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import connectDB from './config/db';
import apiRoutes from './routes';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import * as OpenApiValidator from "express-openapi-validator";

dotenv.config(); // Load .env first!

const app = express();


// Configure CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }),
)

app.use(express.json());

// Swagger docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const log = `
  PATH :: ${req.path}
    METHOD :: ${req.method}
    PARAMS :: ${JSON.stringify(req.params)}
    QUERY :: ${JSON.stringify(req.query)}
    BODY :: ${JSON.stringify(req.body)}

    `;
  console.debug(log);
  next();
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // Optionally log the error stack
  // console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Validate requests/responses using your OpenAPI spec
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./src/config/swagger.json", // path to your swagger spec JSON
    validateRequests: true, // validate request bodies, params, etc.
    validateResponses: true, // validate responses too
  })
);

app.use('/uploads', express.static('uploads'));
app.use('/api', apiRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
