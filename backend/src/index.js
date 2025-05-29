import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDB } from "./config/db.js";
import authenticationRoutes from "./routes/authentication.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authenticationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
