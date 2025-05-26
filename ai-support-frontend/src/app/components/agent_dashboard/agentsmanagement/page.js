"use client"

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Badge } from '../badge';
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import { UserPlus, Edit, UserMinus, Mail, User } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "../dialog";
import { Input } from "../input";
import Sidebar from '../sidebar/page';

const AgentManagementSection = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "Senior Agent",
      status: "Online",
      lastActive: "2 min ago",
      ticketsHandled: 45
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      role: "Agent",
      status: "Away",
      lastActive: "15 min ago",
      ticketsHandled: 32
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "Team Lead",
      status: "Online",
      lastActive: "1 min ago",
      ticketsHandled: 67
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@company.com",
      role: "Agent",
      status: "Offline",
      lastActive: "2 hours ago",
      ticketsHandled: 28
    }
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Online":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Online</Badge>;
      case "Away":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Away</Badge>;
      case "Offline":
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "Team Lead":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Team Lead</Badge>;
      case "Senior Agent":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Senior Agent</Badge>;
      case "Agent":
        return <Badge variant="outline">Agent</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar 20% */}
      <aside className="w-1/5 border-r border-gray-200">
        <Sidebar />
      </aside>

      {/* Main Content 80% */}
      <main className="w-4/5 p-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Agent Management</h2>
            <p className="text-gray-600">Manage your support team members and their roles</p>
          </div>
          <Dialog>
            <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
              <button
                type="button"
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add New Agent
              </button>
            </DialogTrigger>

            {dialogOpen && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                  <DialogDescription>
                    Invite a new team member to join your support team
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Full Name</label>
                    <Input id="name" placeholder="Enter agent's full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email Address</label>
                    <Input id="email" type="email" placeholder="agent@company.com" />
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-1 font-medium text-gray-700">Role</label>
                    <select className="w-full border rounded-md px-3 py-2">
                      <option>Agent</option>
                      <option>Senior Agent</option>
                      <option>Team Lead</option>
                    </select>
                  </div>

                  <button
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    onClick={() => setDialogOpen(false)}
                  >
                    Send Invitation
                  </button>

                  <DialogClose onClick={() => setDialogOpen(false)}>
                    <button className="mt-2 w-full text-center text-sm text-gray-500 hover:underline">
                      Cancel
                    </button>
                  </DialogClose>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Agents</p>
                  <p className="text-2xl font-bold text-gray-900">{agents.length}</p>
                </div>
                <User className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Online Now</p>
                  <p className="text-2xl font-bold text-green-600">
                    {agents.filter(a => a.status === 'Online').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="h-3 w-3 bg-white rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Team Leads</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {agents.filter(a => a.role === 'Team Lead').length}
                  </p>
                </div>
                <div className="h-8 w-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Tickets/Agent</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round(agents.reduce((sum, a) => sum + a.ticketsHandled, 0) / agents.length)}
                  </p>
                </div>
                <Mail className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents Table */}
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>All support agents and their current status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Tickets Handled</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{agent.name}</p>
                          <p className="text-sm text-gray-500">{agent.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(agent.role)}</TableCell>
                    <TableCell>{getStatusBadge(agent.status)}</TableCell>
                    <TableCell className="text-sm text-gray-500">{agent.lastActive}</TableCell>
                    <TableCell className="font-medium">{agent.ticketsHandled}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button variant="outline" size="sm">
                          <UserMinus className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AgentManagementSection;
