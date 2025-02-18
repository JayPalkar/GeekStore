import express from "express";
import dotenv from "dotenv";

import { connectToDB } from "./config/db.js";
import authenticationRoutes from "./routes/authentication.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authenticationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectToDB();
});
