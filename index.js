import express from "express";
import cookieParser from "cookie-parser";
import connectToDB from "./DB/connectToDB.js";
import userRouter from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import expressSanitizer from "express-sanitizer";
import { sanitizeInput } from "./utils/inputValidations.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

// connect To Database
connectToDB();

app.use(express.json());
app.use(cookieParser());
app.use(expressSanitizer()); 


// user route
app.use("/api/user",sanitizeInput,userRouter);

// post route
app.use("/api/post",sanitizeInput,authMiddleware,postRoute);


app.listen(8080);