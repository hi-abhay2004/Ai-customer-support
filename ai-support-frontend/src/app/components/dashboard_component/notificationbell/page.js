"use client";
import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

export default function NotificationBell() {
  const [showDropdown, setShowDropdown] = useState(false);
  const notifications = [
    { id: 1, message: "New ticket assigned to you", time: "2 min ago" },
    { id: 2, message: "Customer rated your support", time: "10 min ago" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-gray-100"
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
          <div className="p-3 border-b font-semibold text-gray-700">Notifications</div>
          <ul className="max-h-60 overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id} className="px-4 py-2 hover:bg-gray-50 text-sm">
                <div>{n.message}</div>
                <div className="text-xs text-gray-400">{n.time}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
