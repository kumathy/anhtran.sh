import { createHash } from "node:crypto";
import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUTPUT_DIR = path.join(process.cwd(), "public", "generated");

export async function smallImage(
  url: string,
  size: number,
  fit: "cover" | "contain",
) {
  const name = `${createHash("sha1").update(url).digest("hex").slice(0, 16)}-${size}.webp`;
  const file = path.join(OUTPUT_DIR, name);
  const src = `${process.env.BASE_PATH ?? ""}/generated/${name}`;

  try {
    await access(file);
    return src;
  } catch {}

  try {
    const response = await fetch(url);
    if (!response.ok) return url;

    const image = await sharp(Buffer.from(await response.arrayBuffer()))
      .resize(size, size, {
        fit,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 85 })
      .toBuffer();

    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(file, image);
    return src;
  } catch {
    return url;
  }
}
