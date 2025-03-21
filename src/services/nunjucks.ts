import nj from "nunjucks";
import path from "path";

import { Express } from "express";

export const nunjucks = (app: Express) => {
  const env = nj.configure(path.join(__dirname, "../views"), {
    autoescape: true,
    express: app,
    watch: true,
  });

  env.addGlobal("BUCKET_URL", process.env.BUCKET_URL);
  env.addGlobal("NODE_ENV", process.env.NODE_ENV || "production");

  env.addFilter("formatDate", function (input) {
    if (!input) {
      return "--";
    }

    const formattedDate = new Date(input).toLocaleDateString();

    return formattedDate;
  });
};
