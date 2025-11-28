import  express  from "express";
import user from "./routes/user";

const app=express()




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",user)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});