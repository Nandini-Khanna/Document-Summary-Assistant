import { useState } from "react";

export default function DropZone({ onFileSelected }) {
  const [dragOver, setDragOver] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileInfo(file);
      onFileSelected(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileInfo(file);
      onFileSelected(file);
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div style={{ textAlign: "center" }}>
      
      <div
        className={`dropzone ${dragOver ? "drag-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <label
          htmlFor="fileInput"
          style={{
            cursor: "pointer",
            color: dragOver ? "var(--primary)" : "var(--secondary)",
            textAlign: "center",
          }}
        >
          Drag & drop a file here, or{" "}
          <span style={{ color: "blue", fontWeight: "600" }}>click</span> to upload
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* File Info */}
      {fileInfo && (
        <div
          style={{
            marginTop: "10px",
            padding: "10px",
            borderRadius: "8px",
            background: "#f9fbff",
            border: "1px solid #e2e8f0",
            fontSize: "0.9rem",
            textAlign: "left",
            maxWidth: "400px",
            marginInline: "auto",
          }}
        >
          <p><strong>Name:</strong> {fileInfo.name}</p>
          <p><strong>Type:</strong> {fileInfo.type || "Unknown"}</p>
          <p><strong>Size:</strong> {formatFileSize(fileInfo.size)}</p>
        </div>
      )}
    </div>
  );
}
