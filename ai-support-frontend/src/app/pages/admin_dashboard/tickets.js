"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "http://192.168.39.76:8000/support";

export default function TicketsSection() {
  const [tickets, setTickets] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/tickets/`, {
        headers: token ? { Authorization: `Token ${token}` } : {},
      });
      setTickets(res.data);
    } catch (err) {
      setError("Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await axios.post(
        `${BASE_URL}/tickets/`,
        { subject, description },
        { headers: token ? { Authorization: `Token ${token}` } : {} }
      );
      setSuccess("Ticket created successfully!");
      setSubject("");
      setDescription("");
      fetchTickets();
    } catch (err) {
      setError("Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Support Tickets</h2>
      <form onSubmit={handleCreateTicket} className="mb-6 space-y-3">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        {success && <div className="text-green-600 mt-2">{success}</div>}
      </form>
      <h3 className="text-lg font-semibold mb-2">Your Tickets</h3>
      {loading && <p>Loading tickets...</p>}
      <ul className="divide-y">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="py-2">
            <div className="font-medium">{ticket.subject}</div>
            <div className="text-gray-600 text-sm">Status: {ticket.status} | Created: {ticket.created_at?.slice(0, 10)}</div>
          </li>
        ))}
        {tickets.length === 0 && !loading && <li>No tickets found.</li>}
      </ul>
    </div>
  );
}
