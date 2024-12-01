import UserModel from "../models/userLoginModel";
import { handleHttpError } from "../utils/handleError";
import { compare, encrypt } from "../utils/handlePassword";
import { tokenSign } from "../utils/handleJwt";
import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/userLoginInterface";
import { validationResult } from "express-validator";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const userEmail = req.body.email;
    const loginPassword = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!userEmail || !loginPassword) {
      return res.status(400).json({ message: "❌ EMAIL_OR_PASSWORD_MISSING" });
    }

    const user = await UserModel.findOne({ where: { email: userEmail } });
    if (!user) {
      return res.status(404).json({ message: "❌ USER_NOT_EXISTS" });
    }

    const passwordHashed = user.password;
    const checkPassword = await compare(loginPassword, passwordHashed);
    if (!checkPassword) {
      return res.status(401).json({ message: "❌ PASSWORD_INVALID" });
    }

    const sessionData = {
      token: await tokenSign(user),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rol: user.rol,
      },
    };

    return res.status(200).json({ sessionData });
  } catch (error: any) {
    console.error("❌ Error in login process:", error.message || error);

    if (error.name === "SequelizeConnectionError") {
      return res.status(500).json({ message: "❌ DATABASE_CONNECTION_ERROR" });
    } else if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: "❌ DATABASE_VALIDATION_ERROR" });
    } else {
      return res.status(500).json({ message: "❌ ERROR_LOGIN_USER" });
    }
  }
};

export const registerController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Los datos ingresados no son válidos",
      errors: errors.array(),
    });
  }

  try {
    const { name, email, password } = req.body;
    let { rol } = req.body;

    rol = rol || "client";

    const existingUserByEmail = await UserModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está en uso" });
    }

    const existingUserByName = await UserModel.findOne({ where: { name } });
    if (existingUserByName) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    const passwordHashed = await encrypt(password);

    const newUser = await UserModel.create({
      name,
      email,
      password: passwordHashed,
      rol,
      created_at: new Date().toISOString(),
    });

    const token = await tokenSign({
      name: newUser.name,
      email: newUser.email,
      rol: newUser.rol,
    });

    return res.status(201).json({
      message: "✅ Usuario creado exitosamente",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "❌ Error al crear el usuario" });
  }
};

export default {
  loginController,
  registerController,
};
