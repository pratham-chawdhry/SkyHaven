import React, { useState } from "react";

const FileUpload = ({ onFileEncoded }) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (file) => {
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        onFileEncoded(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("No file chosen");
      onFileEncoded(null);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <input
          type="file"
          id="file"
          name="file"
          required
          style={{ display: "none" }}
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
        <label
          htmlFor="file"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Choose File
        </label>
        <span style={{ fontSize: "14px", color: "#333" }}>{fileName}</span>
      </div>
    </div>
  );
};

export default FileUpload;
