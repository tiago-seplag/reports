import { Router } from "express";
import { generate } from "./controllers/reports";

export const routes = Router();

routes.use("/reports/*", generate);
