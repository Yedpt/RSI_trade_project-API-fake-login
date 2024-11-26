import express, { Router } from "express";
import { loginController, registerController  } from "../controllers/authController";
import { validateLogIn, validateSignUp } from "../middleware/validators/userValidator";

const authRouter: Router = express.Router();

authRouter.post("/signup", validateSignUp, registerController);
authRouter.post("/login", validateLogIn, loginController);

export default authRouter;
