import express, { Router, Request, Response, NextFunction } from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController";
import {
  validateLogIn,
  validateSignUp,
} from "../middleware/validators/userValidator";

const authRouter: Router = express.Router();

// Ajusta los controladores para manejar correctamente los tipos
authRouter.post(
  "/signup",
  validateSignUp,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerController(req, res);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  "/login",
  validateLogIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginController(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
