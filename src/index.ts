import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import connectDB from './config/db';
import apiRoutes from './routes';
import cors from "cors";

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

app.use('/uploads', express.static('uploads'));
app.use('/api', apiRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
