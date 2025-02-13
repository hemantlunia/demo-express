import express from "express";
import { getAllUserList, Login, Logout, Register } from "../controllers/userController.js";
import { validateresult, validationFields } from "../utils/inputValidations.js";

const router = express.Router();


router.post("/register",validationFields(["username","name","email","password"]),validateresult,Register);
router.post("/login",validationFields(["email","password"]),validateresult,Login);
router.get("/allUsers",getAllUserList);
router.post("/logout",Logout);

export default router;