import dotenv from "dotenv";
import { connectDb } from "./src/db/db.js";
import { app } from "./src/app.js";

dotenv.config();

await connectDb();

export default app;