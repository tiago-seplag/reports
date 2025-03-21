import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { routes } from "./routes";
import { AppError } from "./errors/AppError";
import { nunjucks } from "./services/nunjucks";
import path from "path";

import "express-async-errors";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 8080;

nunjucks(app);

app.set("view engine", ".njk");
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "views/public")));

app.get("/", (_, response) => {
  response.json({ api: "confia!" });
});

app.use("/", routes);

app.use((err: Error, _: Request, response: Response, __: NextFunction) => {
  console.log(err);
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .render("errors/error", { ...err, code: err.statusCode });
  }

  return response.status(500).render("errors/error", {
    error: true,
    message: "Internal server error.",
    code: 500,
  });
});

app.listen(PORT, () => {
  console.log("Server started!", PORT);
});
