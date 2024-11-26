import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validate = (req: Request & { fileValidationError?: string }, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  } else if (req.fileValidationError) {
    res.status(400).json({ error: req.fileValidationError });
    return;
  }
  next();
};

