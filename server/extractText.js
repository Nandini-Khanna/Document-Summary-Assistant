import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import Tesseract from "tesseract.js";

export async function extractTextFromFile(path, mimetype) {
  if (mimetype === "application/pdf") {
    const data = await pdfParse(fs.readFileSync(path));
    return data.text;
  }
  if (mimetype.startsWith("image/")) {
    const { data: { text } } = await Tesseract.recognize(path, "eng");
    return text;
  }
  return "";
}
