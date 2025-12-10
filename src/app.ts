import  express  from "express";
import user from "./routes/user";
import cors from "cors";
import cookieParser from "cookie-parser";


const app=express()
app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth",user)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});