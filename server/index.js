import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { extractTextFromFile } from "./extractText.js";
import { summarizeText } from "./groq.js";
import { Document, Packer, Paragraph } from "docx";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const text = await extractTextFromFile(req.file.path, req.file.mimetype);
    fs.unlinkSync(req.file.path); // cleanup
    res.json({ text });
  } catch (e) {
    res.status(500).json({ error: "Extraction failed" });
  }
});

app.post("/summarize", async (req, res) => {
  try {
    const { text, length } = req.body;
    const summary = await summarizeText(text, length);
    res.json({ summary });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Summarization failed" });
  }
});

app.post("/download", async (req, res) => {
  const { summary } = req.body;
  const doc = new Document({
    sections: [{ children: [new Paragraph(summary)] }],
  });
  const buffer = await Packer.toBuffer(doc);
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=summary.docx"
  );
  res.send(buffer);
});

app.listen(5000, () => console.log("Server running on 5000"));
