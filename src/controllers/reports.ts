import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import axios from "axios";

export async function generate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  new AppError("unknown error");
  try {
    const data = request.body;

    return response.status(201).render("checklist", data);
  } catch (err: any) {
    if (err.response?.data) {
      next(
        new AppError(
          err.response?.data?.message,
          err.response?.data?.status_code
        )
      );
    }

    next(new AppError("unknown error"));
  }
}
