import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./DB/connectToDB.js";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());


connectToDB();

app.use("/api/user",userRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(8080);
