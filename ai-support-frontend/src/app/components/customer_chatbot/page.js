"use client";

import { useState, useEffect, useRef } from "react";
import { sendChatbotMessage, getChatMessages } from "../../lib/api";

export default function CustomerChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [image, setImage] = useState(null);
  const [ticketInfo, setTicketInfo] = useState(null);
  const [error, setError] = useState("");
  const [company, setCompany] = useState("yourcompany.com");
  const [userEmail, setUserEmail] = useState("user@example.com");
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!ticketId) return;
    async function fetchMessages() {
      try {
        const data = await getChatMessages(ticketId);
        if (Array.isArray(data) && data.length > 0) {
          setMessages(data.map((msg) => ({ sender: msg.sender, text: msg.message })));
        } else {
          setMessages([{ sender: "bot", text: "No chat history found for this ticket." }]);
        }
      } catch (e) {
        setMessages([{ sender: "bot", text: "No chat history found for this ticket." }]);
        console.error("Failed to load chat history", e);
      }
    }
    fetchMessages();
  }, [ticketId]);

  async function sendMessage() {
    if (!input.trim()) return;
    if (!company.trim() || !userEmail.trim()) {
      setError("Please enter both company and email before sending.");
      return;
    }

    setTicketInfo(null);
    setError("");
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      console.log("Sending to backend:", { query: input, company, user_email: userEmail, image });

      const data = await sendChatbotMessage({
        query: input,
        company,
        user_email: userEmail,
        image,
      });

      console.log("Backend response:", data);

      if (data.ticket) {
        setTicketInfo(data.ticket);
        setMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: data.message || "A support ticket has been created. Our team will contact you shortly.",
          },
        ]);
        if (!ticketId) setTicketId(data.ticket.id || data.ticket_id);
      } else {
        let botText = "Sorry, no reply.";
        if (data.response) botText = data.response;
        else if (data.message) botText = data.message;
        else if (data.reply) botText = data.reply;

        setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
      }
    } catch (error) {
      console.error("Error from backend:", error);
      setError(error.message || "Error sending message.");
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: error.message || "Error sending message." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
      setImage(null);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow-md flex flex-col h-[600px]">
      <div className="flex-1 overflow-auto mb-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded max-w-[80%] ${
              msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {ticketInfo && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 my-2 rounded">
            <div className="font-semibold text-yellow-800 mb-1">Support Ticket Created</div>
            <div className="text-sm text-yellow-900">
              <div><b>Subject:</b> {ticketInfo.subject}</div>
              <div><b>Description:</b> {ticketInfo.description}</div>
              <div><b>Status:</b> {ticketInfo.status}</div>
              <div><b>Created At:</b> {ticketInfo.created_at}</div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 p-3 my-2 rounded text-red-800">
            <b>Error:</b> {error}
          </div>
        )}
        <div ref={messageEndRef} />
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="border rounded p-2"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter your company domain"
        />
        <input
          type="email"
          className="border rounded p-2"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <textarea
          rows={2}
          className="flex-grow border rounded p-2 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={loading}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
