import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DropZone from "./components/DropZone";
import Contact from "./components/Contact";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";


export default function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [length, setLength] = useState("medium");
  const [showText, setShowText] = useState(false);

  const handleFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(API + "/upload", { method: "POST", body: form });
    const data = await res.json();
    setText(data.text);
    setShowText(false); 
    setSummary(""); 
  };

  const handleSummarize = async () => {
    setSummary("⏳ Generating summary...");
    const res = await fetch(API + "/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, length }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  const handleDownload = async () => {
    const res = await fetch(API + "/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "summary.docx";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Navbar always at top */}
      <Navbar />

      {/* Main content fills available space */}
      <div className="container" style={{ flex: 1 }}>
        <h2>Upload Document</h2>
        <DropZone onFileSelected={handleFile} />

        {text && (
          <button onClick={() => setShowText(!showText)}>
            {showText ? "Hide Extracted Text" : "Show Extracted Text"}
          </button>
        )}

        {showText && (
          <div
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              padding: "15px",
              borderRadius: "var(--radius)",
              marginTop: "10px",
              maxHeight: "300px",
              overflowY: "auto",
              boxShadow: "var(--shadow)",
              textAlign: "left",
            }}
          >
            <h3>Extracted Text</h3>
            <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
          </div>
        )}

        {/* Controls for summary */}
        {text && (
          <div
            style={{
              margin: "20px 0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <select value={length} onChange={(e) => setLength(e.target.value)}>
              <option value="short">Short (~100 words)</option>
              <option value="medium">Medium (~200 words)</option>
              <option value="long">Long (~350 words)</option>
            </select>
            <button onClick={handleSummarize}>Summarize</button>
          </div>
        )}

        {/* Summary output */}
        {summary && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
              textAlign: "left",
            }}
          >
            <h3>Summary</h3>
            <p style={{ whiteSpace: "pre-wrap" }}>{summary}</p>

            {summary && !summary.startsWith("⏳") && (
              <button onClick={handleDownload} style={{ marginTop: "10px" }}>
                Download Summary
              </button>
            )}
          </div>
        )}
      </div>

      <Contact />
      <Footer />
    </div>
  );
}
