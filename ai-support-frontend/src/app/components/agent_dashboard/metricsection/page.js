"use client"

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { BarChart3, Clock, Star, MessageSquare, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Sidebar from '../sidebar/page';

const MetricsSection = () => {
  const weeklyData = [
    { day: 'Mon', tickets: 24, responseTime: 2.1 },
    { day: 'Tue', tickets: 18, responseTime: 1.8 },
    { day: 'Wed', tickets: 32, responseTime: 2.4 },
    { day: 'Thu', tickets: 28, responseTime: 2.0 },
    { day: 'Fri', tickets: 35, responseTime: 2.6 },
    { day: 'Sat', tickets: 12, responseTime: 1.5 },
    { day: 'Sun', tickets: 8, responseTime: 1.2 }
  ];

  const agentPerformance = [
    { name: 'Sarah Johnson', tickets: 45, rating: 4.9 },
    { name: 'Emily Rodriguez', tickets: 67, rating: 4.8 },
    { name: 'Mike Chen', tickets: 32, rating: 4.7 },
    { name: 'David Kim', tickets: 28, rating: 4.6 }
  ];

  const satisfactionData = [
    { name: 'Excellent (5)', value: 45, color: '#10B981' },
    { name: 'Good (4)', value: 30, color: '#3B82F6' },
    { name: 'Average (3)', value: 15, color: '#F59E0B' },
    { name: 'Poor (2)', value: 7, color: '#EF4444' },
    { name: 'Very Poor (1)', value: 3, color: '#991B1B' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar - fixed 20% width */}
      <div className="w-1/5 border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content - 80% width */}
      <main className="w-4/5 p-6 overflow-auto bg-gray-50">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Support Metrics</h2>
            <p className="text-gray-600">Analytics and performance insights for your support team</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tickets</p>
                    <p className="text-2xl font-bold text-gray-900">157</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">+12% from last week</span>
                    </div>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">2.1 min</p>
                    <div className="flex items-center mt-1">
                      <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">-8% improvement</span>
                    </div>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Customer Satisfaction</p>
                    <p className="text-2xl font-bold text-gray-900">4.7/5</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">+0.2 from last week</span>
                    </div>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolution Rate</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">+3% improvement</span>
                    </div>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Tickets */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Ticket Volume</CardTitle>
                <CardDescription>Tickets handled per day this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tickets" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Response Time Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
                <CardDescription>Response time trend over the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="responseTime" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Agent Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Tickets handled by each agent this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={agentPerformance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="tickets" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Customer Satisfaction */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Satisfaction Distribution</CardTitle>
                <CardDescription>Rating breakdown from customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MetricsSection;
