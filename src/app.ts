import express from "express";
import user from "./routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";
import linkRoutes from "./routes/linkRoutes";

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", user);
app.use("/api/v1", linkRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
