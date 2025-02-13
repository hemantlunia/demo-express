import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./DB/connectToDB.js";
import userRouter from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import expressSanitizer from "express-sanitizer";
import { sanitizeInput } from "./utils/inputValidations.js";

const app = express();
connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(expressSanitizer()); 


app.use("/api/user",sanitizeInput,userRouter);
app.use("/api/post",sanitizeInput,authMiddleware,postRoute);

// app.get("/",authMiddleware, (req, res) => {
//   res.send("home page");
// });

app.listen(8080);