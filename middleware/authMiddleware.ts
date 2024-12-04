import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/userLoginInterface"; 
import { JWT_SECRET } from "../config";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    const verified = jwt.verify(
      token,
      JWT_SECRET as string
    ) as AuthRequest["user"];
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.rol !== "admin") {
    res.status(403).json({
      message: "Access denied. Only admins can perform this action",
    });
    return;
  }

  next();
};