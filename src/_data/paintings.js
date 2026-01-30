import fs from "fs";
import path from "path";

export default function () {
  const dir = path.join("src", "images", "paintings");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .sort();
}
