import { Router } from "express";
import { generate } from "./controllers/reports";

export const routes = Router();

routes.post("/reports/*", generate);
