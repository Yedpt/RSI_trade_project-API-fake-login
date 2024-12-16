import UserModel from "../models/userLoginModel";
import { handleHttpError } from "../utils/handleError";
import { compare, encrypt } from "../utils/handlePassword";
import { tokenSign } from "../utils/handleJwt";
import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/userLoginInterface";

export const registerController = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, confirmPassword, created_at } = req.body;
    let { rol } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Las contraseñas no coinciden" });
      return;
    }

    if (rol === undefined) {
      rol = "client";
    } else {
      const authUser = req.user;
      if (rol === "admin" && authUser?.rol !== "admin") {
        res.status(403).json({
          error: "Access denied. Only admins can create other admins.",
        });
        return;
      }
    }

    const passwordHashed = await encrypt(password);

    const newUser = {
      name,
      email,
      password: passwordHashed,
      rol,
      created_at,
    };

    const existingUserByEmail = await UserModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }
    const existingUserByName = await UserModel.findOne({ where: { name } });
    if (existingUserByName) {
      res.status(409).json({ message: "Name already in use" });
      return;
    }

    await UserModel.create(newUser);

    const token = await tokenSign({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      rol: newUser.rol,
    });

    res.status(201).json({ message: "✅ User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error creating user" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;

    if (!userEmail || !loginPassword) {
      handleHttpError(res, "❌ EMAIL_OR_PASSWORD_MISSING", 400);
      return;
    }

    const user = await UserModel.findOne({ where: { email: userEmail } });
    if (!user) {
      handleHttpError(res, "❌ USER_NOT_EXISTS", 422);
      return;
    }

    const passwordHashed = user.password;
    const checkPassword = await compare(loginPassword, passwordHashed);
    if (!checkPassword) {
      handleHttpError(res, "❌ PASSWORD_INVALID", 401);
      return;
    }

    const sessionData = {
      token: await tokenSign(user),
      user: {
        id: user.id,
        name: user.name
      },
    };

    res.status(200).send({ sessionData });
  } catch (error: any) {
    console.error("❌ Error in login process:", error.message || error);

    if (error.name === "SequelizeConnectionError") {
      handleHttpError(res, "❌ DATABASE_CONNECTION_ERROR", 500);
    } else if (error.name === "SequelizeValidationError") {
      handleHttpError(res, "❌ DATABASE_VALIDATION_ERROR", 400);
    } else {
      handleHttpError(res, "❌ ERROR_LOGIN_USER", 500);
    }
  }
};