import { Response } from "express";

export const handleHttpError = (
  res: Response,
  message: string = "Something happened ☠️",
  code: number = 403
): void => {
  res.status(code);
  res.send({ error: message });
};
