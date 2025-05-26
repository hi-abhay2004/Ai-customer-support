// Copilot summary for a ticket (agent view)
import { useState } from "react";

export default function CopilotSummary({ ticketId }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchSummary() {
    setLoading(true);
    setError("");
    setSummary(null);
    try {
      const res = await fetch(`http://192.168.39.76:8000/support/copilot-summary/${ticketId}/`);
      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      setError(err.message || "Error fetching summary");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border rounded p-4 my-4">
      <h3 className="font-bold mb-2">Copilot Summary</h3>
      <button
        className="bg-blue-600 text-white px-3 py-1 rounded mb-2"
        onClick={fetchSummary}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Copilot Summary"}
      </button>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      {summary && (
        <div>
          <div className="mb-2"><b>Summary:</b> {summary.summary}</div>
          <div className="mb-2"><b>Conversation:</b> <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{summary.conversation}</pre></div>
        </div>
      )}
    </div>
  );
}
