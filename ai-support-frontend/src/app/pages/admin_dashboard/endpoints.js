"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://192.168.39.76:8000/support";

export default function EndpointsList() {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEndpoints() {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${BASE_URL}/endpoints/`);
        setEndpoints(res.data);
      } catch (err) {
        setError("Failed to fetch endpoints");
      } finally {
        setLoading(false);
      }
    }
    fetchEndpoints();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Available API Endpoints</h2>
      {loading && <p>Loading endpoints...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {Array.isArray(endpoints) && endpoints.length > 0 ? (
            endpoints.map((ep, idx) => (
              <li key={idx} className="border-b pb-2">
                <span className="font-mono text-blue-700">{ep.path}</span>
                {ep.description && (
                  <span className="ml-2 text-gray-600">- {ep.description}</span>
                )}
              </li>
            ))
          ) : (
            <li>No endpoints found.</li>
          )}
        </ul>
      )}
    </div>
  );
}
