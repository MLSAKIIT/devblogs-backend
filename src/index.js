import "dotenv/config";
import express from "express";
import authRoute from "./routes/auth.js";
import blogRoute from "./routes/blog.js";
import cors from "cors";
import morgan from "morgan";
import limiter from "./utils/rateLimit.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { notFoundMiddleware } from "./middlewares/notFoundMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {connectDatabase, seedDB} from "./db/dbConnection.js"

const app = express();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DevBlogs",
      version: "1.0.0",
      description: "API documentation for Authentication and Blog routes",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(limiter);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (_, res) => {
  res.status(200).send("Everything is fine");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api", blogRoute);
app.use(notFoundMiddleware)
app.use(errorHandler)

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`> Server is running on http://localhost:${PORT}`);
  console.log(
    `> Swagger API documentation available at http://localhost:${PORT}/api-docs`
  );
});

// Connect database to app
connectDatabase();
// seed the database
seedDB();