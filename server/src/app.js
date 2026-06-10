import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors"
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { authRoutes } from "./routes/authRoutes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 20,
  message: "Too many request!",
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(limiter);
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export { app };
