import mrgn from "morgan";
import fs from "fs";
import path from "path";

export const morgan = () => {
  return mrgn("common", {
    stream: fs.createWriteStream(path.resolve(__dirname, "..", "access.log"), {
      flags: "a",
    }),
  });
};
