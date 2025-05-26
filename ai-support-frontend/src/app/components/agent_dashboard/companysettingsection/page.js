"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { Input } from "../input";
import { Building2, Upload, Clock, MessageSquare, AlertTriangle } from "lucide-react";
import * as RadixDialog from "@radix-ui/react-dialog"; // Add Radix Dialog
import Sidebar from "../sidebar/page";

const CompanySettingsSection = () => {
  const [companyData, setCompanyData] = useState({
    name: "TechCorp",
    description: "Leading provider of innovative software solutions",
    supportHours: "Monday - Friday, 9:00 AM - 6:00 PM EST",
    timezone: "America/New_York",
    greetingMessage: "Hello! I'm your AI assistant. How can I help you today?",
  });

  // Dialog open state for Delete Account
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // Confirm text state
  const [confirmText, setConfirmText] = useState("");

  // Enable Delete button only if user types "DELETE"
  const isDeleteEnabled = confirmText === "DELETE";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - 20% */}
      <div className="w-1/5 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Content - 80% */}
      <div className="w-4/5 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Company Settings</h2>
          <p className="text-gray-600">Manage your company profile and support configuration</p>
        </div>

        {/* Company Profile */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <span>Company Profile</span>
            </CardTitle>
            <CardDescription>Update your company information and branding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company-name">Company Name</label>
                <Input
                  id="company-name"
                  value={companyData.name}
                  onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="company-logo">Company Logo</label>
                <div className="flex items-center space-x-2">
                  <Input id="company-logo" type="file" accept="image/*" />
                  <button type="button" className="border rounded px-2 py-1">
                    <Upload className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="company-description">Company Description</label>
              <textarea
                id="company-description"
                value={companyData.description}
                onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                rows={3}
                className="w-full border rounded-md p-2"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Save Profile
            </button>
          </CardContent>
        </Card>

        {/* Support Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-600" />
              <span>Support Hours & Timezone</span>
            </CardTitle>
            <CardDescription>Configure when your support team is available</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="support-hours">Support Hours</label>
                <Input
                  id="support-hours"
                  value={companyData.supportHours}
                  onChange={(e) => setCompanyData({ ...companyData, supportHours: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="timezone">Timezone</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={companyData.timezone}
                  onChange={(e) => setCompanyData({ ...companyData, timezone: e.target.value })}
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                  <option value="Asia/Tokyo">Tokyo (JST)</option>
                </select>
              </div>
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Save Configuration
            </button>
          </CardContent>
        </Card>

        {/* AI Customization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-purple-600" />
              <span>AI Assistant Customization</span>
            </CardTitle>
            <CardDescription>Customize how your AI assistant interacts with customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="greeting-message">Greeting Message</label>
              <textarea
                id="greeting-message"
                value={companyData.greetingMessage}
                onChange={(e) => setCompanyData({ ...companyData, greetingMessage: e.target.value })}
                rows={3}
                placeholder="Enter the message your AI assistant will use to greet customers"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="response-tone">Response Tone</label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Professional</option>
                  <option>Friendly</option>
                  <option>Casual</option>
                  <option>Formal</option>
                </select>
              </div>
              <div>
                <label htmlFor="escalation-threshold">Escalation Threshold</label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>After 3 failed attempts</option>
                  <option>After 5 failed attempts</option>
                  <option>After 7 failed attempts</option>
                  <option>Never escalate</option>
                </select>
              </div>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Save AI Settings
            </button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Danger Zone</span>
            </CardTitle>
            <CardDescription>Irreversible actions that affect your entire account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-medium text-red-800 mb-2">Delete Company Account</h4>
              <p className="text-sm text-red-600 mb-4">
                This will permanently delete your company account, all agents, documents, and data. This action cannot be undone.
              </p>

              <RadixDialog.Root open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <RadixDialog.Trigger asChild>
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Delete Account
                  </button>
                </RadixDialog.Trigger>

                <RadixDialog.Portal>
                  <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />

                  <RadixDialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none">
                    <RadixDialog.Title className="text-lg font-medium text-gray-900 mb-2">
                      Confirm Account Deletion
                    </RadixDialog.Title>
                    <RadixDialog.Description className="text-sm text-gray-700 mb-4">
                      Please type <strong>DELETE</strong> in the box below to confirm.
                    </RadixDialog.Description>

                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder="Type DELETE to confirm"
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />

                    <div className="flex justify-end space-x-3">
                      <RadixDialog.Close asChild>
                        <button
                          onClick={() => setConfirmText("")}
                          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                      </RadixDialog.Close>

                      <button
                        disabled={!isDeleteEnabled}
                        onClick={() => {
                          // Handle delete account logic here
                          alert("Account deleted!");
                          setDeleteDialogOpen(false);
                          setConfirmText("");
                        }}
                        className={`px-4 py-2 rounded text-white ${
                          isDeleteEnabled ? "bg-red-600 hover:bg-red-700" : "bg-red-300 cursor-not-allowed"
                        }`}
                      >
                        Delete Account
                      </button>
                    </div>
                  </RadixDialog.Content>
                </RadixDialog.Portal>
              </RadixDialog.Root>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanySettingsSection;
