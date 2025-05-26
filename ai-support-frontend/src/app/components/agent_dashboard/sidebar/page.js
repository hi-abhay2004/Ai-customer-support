"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, BrainCircuit, Users, BarChart3, Settings } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

const navItems = [
  {
    name: "Knowledge Base",
    href: "/pages/admin_dashboard/",
    icon: Building2,
  },
  {
    name: "AI Training",
    href: "/components/agent_dashboard/aitrainingsection",
    icon: BrainCircuit,
  },
  {
    name: "Agent Management",
    href: "/components/agent_dashboard/agentsmanagement",
    icon: Users,
  },
  {
    name: "Support Metrics",
    href: "/components/agent_dashboard/metricsection",
    icon: BarChart3,
  },
  {
    name: "Company Settings",
    href: "/components/agent_dashboard/companysettingsection",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Show loading on pathname change
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust delay as needed

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <svg
            className="w-12 h-12 text-blue-600 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}

      <aside className="w-64 h-screen border-r bg-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-blue-600">TechCorp</h1>
          <p className="text-sm text-gray-500">Company Dashboard</p>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-black"
                    : "text-gray-700 hover:bg-gray-50 hover:text-black"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
