// Ticket summary and copilot summary page for agents
import { useState } from "react";
import CopilotSummary from "../copilot_summary";

export default function TicketSummarySection() {
  const [ticketId, setTicketId] = useState("");

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Ticket Copilot Summary</h2>
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Enter Ticket ID"
        value={ticketId}
        onChange={e => setTicketId(e.target.value)}
      />
      {ticketId && <CopilotSummary ticketId={ticketId} />}
    </div>
  );
}
