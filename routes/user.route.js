import express from "express";
import { Login, Logout, Register } from "../controllers/userController.js";

const router = express.Router();


// user routes
router.post("/register",Register);
router.post("/login",Login);
router.post("/logout",Logout);


export default router;