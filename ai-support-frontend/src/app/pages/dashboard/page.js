// import Sidebar from "@/app/components/dashboard_component/sidebar/page";
// import TopNav from "@/app/components/dashboard_component/topbar/page";
// import ChatList from "@/app/components/dashboard_component/tasklist/page";
// import ChatWindow from "@/app/components/dashboard_component/chatwindow/page";
// export default function Dashboard() {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex flex-col flex-1">
//         <TopNav />
//         <div className="flex flex-1 overflow-hidden">
//           <ChatList />
//           <ChatWindow />
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import NotificationBell from "@/app/components/dashboard_component/notificationbell/page";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tickets");

  const agentPerformance = [
    { name: "Alex Rodriguez", tickets: 28, responseTime: "1.8 min", rating: "4.9/5", status: "Online" }
  ];

  const recentTickets = [
    { id: "#12345", customer: "John Doe", subject: "Login issues with mobile app", priority: "High", status: "Open", time: "2 min ago" }
  ];

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
    <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold">Agent Dashboard</h1>
    <p className="text-gray-500">Monitor support performance and manage tickets</p>
  </div>
  <NotificationBell />
</div>

        
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Active Tickets" value="24" subText="+12% from last week" />
        <Card title="Avg Response Time" value="2.4 min" subText="-8% improvement" />
        <Card title="Resolved Today" value="18" subText="+25% tickets closed" />
        <Card title="Customer Satisfaction" value="4.8/5" subText="+2% average rating" />
      </div>

      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setActiveTab("tickets")}
          className={`px-4 py-2 border-b-4 font-semibold ${
            activeTab === "tickets" ? "border-blue-600 text-black" : "text-gray-500"
          }`}
        >
          Recent Tickets
        </button>
        <button
          onClick={() => setActiveTab("performance")}
          className={`px-4 py-2 border-b-4 font-semibold ${
            activeTab === "performance" ? "border-blue-600 text-black" : "text-gray-500"
          }`}
        >
          Agent Performance
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "tickets" ? (
        <RecentTicketsSection tickets={recentTickets} />
      ) : (
        <AgentPerformanceSection agents={agentPerformance} />
      )}
    </main>
  );
}

function Card({ title, value, subText }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-green-500">{subText}</p>
    </div>
  );
}

function RecentTicketsSection({ tickets }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Support Tickets</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500">
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, i) => (
            <tr key={i} className="border-t">
              <td className="py-3 font-semibold">{ticket.id}</td>
              <td>{ticket.customer}</td>
              <td>{ticket.subject}</td>
              <td>
                <span className="text-white bg-red-500 px-2 py-1 rounded-full text-sm">{ticket.priority}</span>
              </td>
              <td>
                <span className="text-white bg-red-400 px-2 py-1 rounded-full text-sm">{ticket.status}</span>
              </td>
              <td>{ticket.time}</td>
              <td><button className="text-blue-600 font-medium">View</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AgentPerformanceSection({ agents }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Agent Performance</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500">
            <th>Agent Name</th>
            <th>Tickets Handled</th>
            <th>Avg Response Time</th>
            <th>Customer Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, i) => (
            <tr key={i} className="border-t">
              <td className="py-3 font-semibold">{agent.name}</td>
              <td>{agent.tickets}</td>
              <td>{agent.responseTime}</td>
              <td>{agent.rating}</td>
              <td>
                <span className="text-white bg-green-500 px-2 py-1 rounded-full text-sm">{agent.status}</span>
              </td>
              <td><button className="text-blue-600 font-medium">Message</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
