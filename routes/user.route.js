import express from "express";
import { getAllUserList, Login, Logout, Register } from "../controllers/userController.js";
import { validateresult, validationFields } from "../utils/inputValidations.js";

const router = express.Router();


// user routes 
router.post("/register",validationFields(["username","name","email","password"]),validateresult,Register);
router.post("/login",validationFields(["email","password"]),validateresult,Login);
router.post("/logout",Logout);


// AlluserList without authmiddleware, you can see only name,username,eamil
router.get("/allUsers",getAllUserList);

export default router;