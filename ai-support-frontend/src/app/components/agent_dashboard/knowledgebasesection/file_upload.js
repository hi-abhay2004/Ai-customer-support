// File upload for knowledge base (admin/agent)
import { useState } from "react";
import { uploadFile } from "../../../lib/api";

export default function FileUpload({ companyId, onUpload }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleUpload(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (!file) throw new Error("Please select a file.");
      await uploadFile(companyId, file);
      setSuccess("File uploaded and processed successfully.");
      setFile(null);
      if (onUpload) onUpload();
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleUpload} className="flex flex-col gap-2 border p-4 rounded mb-4">
      <label className="font-semibold">Upload Knowledge Base File</label>
      <input
        type="file"
        accept=".txt,.pdf,.json,.docx,.jpg,.jpeg,.png,.bmp,.gif,.webp"
        onChange={e => setFile(e.target.files?.[0] || null)}
        disabled={loading}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
      {success && <div className="bg-green-100 text-green-800 p-2 rounded">{success}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 rounded">{error}</div>}
    </form>
  );
}
