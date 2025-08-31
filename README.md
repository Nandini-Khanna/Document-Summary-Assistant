# 📑 AI-Powered Document Summarizer

An end-to-end web application that allows users to **upload PDFs or images**, extract text using **Tesseract OCR** / **pdf-parse**, and generate **summaries (Short, Medium, Long)** using **Groq API**. Summaries can also be **downloaded as Word (.docx) files**.

---

## 🚀 Features
- 📂 **File Upload** – Upload PDF or image files (JPG, PNG).
- 🔍 **Text Extraction** – 
  - PDFs → `pdf-parse`
  - Images → `tesseract.js`
- 🤖 **Summarization** – Uses **Groq API** for high-quality text summarization.
- 📜 **Summary Options** – Choose between:
  - Short (~100 words)  
  - Medium (~200 words)  
  - Long (~350 words)
- 💾 **Export** – Download the summary as a `.docx` file.
- 🎨 **Modern UI** – Built with **React**, responsive and clean design.

---

## 🛠️ Tech Stack
**Frontend:**
- React.js  
- Modern CSS (custom UI)

**Backend:**
- Node.js + Express.js  
- Groq API for summarization  
- pdf-parse for PDF extraction  
- Tesseract.js for OCR (images)  
- docx for generating downloadable Word files  

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/document-summarizer.git
cd document-summarizer
```

### 2.Install dependencies
#### backend
```bash
cd backend
npm install
```
#### frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Variable
Create a .env file inside backend/ with:
GROQ_API_KEY=your_api_key_here
PORT=5000

Create a .env file inside client/ with:
VITE_API_URL=your_url_of_backend

### 4. Run the project
#### Start backend

``` bash
cd backend
npm start
```
#### Start Frontend
```bash
cd ../frontend
npm start
```


