"use client";
import { useState } from 'react';
import Sidebar from '@/app/components/agent_dashboard/sidebar/page';

import {
  Book,
  Brain,
  Users,
  BarChart3,
  Settings,
  Building2,
  Bell,
  User
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/agent_dashboard/avatar';
import KnowledgeBaseSection from '@/app/components/agent_dashboard/knowledgebasesection/page';
import TicketsSection from './tickets';
import EndpointsList from './endpoints';
import AITrainingSection from '@/app/components/agent_dashboard/aitrainingsection/page';
import AgentManagementSection from '@/app/components/agent_dashboard/agentsmanagement/page';
import MetricsSection from '@/app/components/agent_dashboard/metricsection/page';
import CompanySettingsSection from '@/app/components/agent_dashboard/companysettingsection/page';
// import { button } from "@/components/ui/button"; // Replace with your button if needed

const CompanyDashboard = () => {
  const [activeSection, setActiveSection] = useState('knowledge-base');

  const menuItems = [
    { id: 'knowledge-base', title: "Knowledge Base", icon: Book },
    { id: 'ai-training', title: "AI Training", icon: Brain },
    { id: 'agents', title: "Agent Management", icon: Users },
    { id: 'metrics', title: "Support Metrics", icon: BarChart3 },
    { id: 'settings', title: "Company Settings", icon: Settings },
    { id: 'tickets', title: "Tickets", icon: BarChart3 },
    { id: 'endpoints', title: "API Endpoints", icon: Settings },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'knowledge-base': return <KnowledgeBaseSection />;
      case 'ai-training': return <AITrainingSection />;
      case 'agents': return <AgentManagementSection />;
      case 'metrics': return <MetricsSection />;
      case 'settings': return <CompanySettingsSection />;
      case 'tickets': return <TicketsSection />;
      case 'endpoints': return <EndpointsList />;
      default: return <KnowledgeBaseSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {menuItems.find(item => item.id === activeSection)?.title}
            </h1>
            <div className="flex items-center space-x-4">
              {/* Replace below with your actual button component */}
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-5 w-5" />
              </button>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default CompanyDashboard;
