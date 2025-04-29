import nj from "nunjucks";
import path from "path";
import { format } from "date-fns";

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

    const formattedDate = format(input, "dd/MM/yyyy");

    return formattedDate;
  });

  env.addFilter("formatPhone", function (input) {
    if (!input) {
      return "--";
    }
    const str = input.replace(/\D/g, ""); // remove caracteres não numéricos

    return str.length <= 10
      ? str.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
      : str
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3")
          .slice(0, 16);
  });
};
