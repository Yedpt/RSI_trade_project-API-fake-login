import { body } from "express-validator";

export const validateLogIn = [
  body("password")
    .notEmpty()
    .withMessage("🚨La contraseña es obligatoria🚨")
    .isString()
    .withMessage("🚨La contraseña debe ser un texto🚨"),
  body("email")
    .notEmpty()
    .withMessage("🚨El email es obligatorio🚨")
    .isString()
    .withMessage("🚨Los tags deben ser un texto🚨")
    .isEmail()
    .withMessage("🚨El email debe ser un correo válido🚨")
    .normalizeEmail(),
];

export const validateSignUp = [
  body("name")
    .notEmpty()
    .withMessage("🚨El nombre es obligatorio🚨")
    .isString()
    .withMessage("🚨El nombre debe ser un texto🚨"),
  body("password")
    .notEmpty()
    .withMessage("🚨La contraseña es obligatoria🚨")
    .isString()
    .withMessage("🚨La contraseña debe ser un texto🚨")
    .isLength({ min: 8 })
    .withMessage("🚨La contraseña debe tener al menos 8 caracteres🚨"),
  body("email")
    .notEmpty()
    .withMessage("🚨El email es obligatorio🚨")
    .isString()
    .withMessage("🚨El email debe ser un texto🚨")
    .isEmail()
    .withMessage("🚨El email debe ser un correo válido🚨")
    .normalizeEmail(),
  body("confirmPassword")
    .optional() // Hacer opcional
    .custom((value, { req }) => {
      if (value && value !== req.body.password) {
        throw new Error("🚨Las contraseñas no coinciden🚨");
      }
      return true;
    }),
];
