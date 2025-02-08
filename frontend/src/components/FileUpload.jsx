import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");

    try {
      const { data } = await axios.post("http://localhost:5000/api/upload", formData);
      setMessage(`✅ ${data.message}`);
      setFile(null);
    } catch (error) {
      setMessage("❌ Upload failed! Please try again.");
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg text-center w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload XML File</h2>

      {/* File Input */}
      <input
        type="file"
        accept=".xml"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full p-2 mb-4 border border-gray-400 rounded bg-gray-800 text-white"
      />

      {/* Show selected file name */}
      {file && <p className="text-sm text-gray-300 mb-2">📄 {file.name}</p>}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className={`px-6 py-2 rounded text-white font-semibold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {/* Message Display */}
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default FileUpload;
