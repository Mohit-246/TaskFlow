import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoConnect.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Running Fine");
});

app.use("/v1/user", userRoutes);
app.use("/v1/task", taskRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running fine at http://localhost:${PORT}`);
});
