// Feedback form for users
"use client";
import { useState } from "react";
import { submitFeedback } from "../../lib/api";

export default function FeedbackPage() {
  const [company, setCompany] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await submitFeedback({ company, user_email: userEmail, rating, comment });
      setSuccess("Thank you for your feedback!");
      setCompany("");
      setUserEmail("");
      setRating(5);
      setComment("");
    } catch (err) {
      setError(err.message || "Failed to submit feedback.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md mt-8">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
      {success && <div className="bg-green-100 text-green-800 p-2 rounded mb-2">{success}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Company ID"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Your Email"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
          required
        />
        <label className="font-semibold">Rating:</label>
        <select
          className="border p-2 rounded"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
        >
          {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <textarea
          className="border p-2 rounded"
          placeholder="Comments (optional)"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
