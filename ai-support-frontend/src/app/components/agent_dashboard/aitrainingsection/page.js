'use client';

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Badge } from "../badge";
import { Brain, Database, Zap, CheckCircle } from "lucide-react";
import { Progress } from "../../ui/page";
import Sidebar from "../sidebar/page";

const AITrainingSection = () => {
  const aiStatus = {
    status: "Ready",
    lastTraining: "2024-01-15 14:30",
    documentsEmbedded: 4,
    totalDocuments: 4,
    knowledgeSize: "12.5 MB",
    confidence: 94
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Ready":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Ready</Badge>;
      case "Training":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Training</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const knowledgePreview = [
    { topic: "Product Installation", confidence: 96, sources: 3 },
    { topic: "Billing & Payments", confidence: 92, sources: 2 },
    { topic: "Technical Support", confidence: 88, sources: 4 },
    { topic: "Account Management", confidence: 85, sources: 2 },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar 20% width */}
      <div className="w-1/5 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main content 80% width */}
      <div className="w-4/5 p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Training Status</h2>
          <p className="text-gray-600">Monitor your AI assistant's training progress and knowledge base</p>
        </div>

        {/* AI Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-600" />
                <span>AI Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Status</span>
                {getStatusBadge(aiStatus.status)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Training</span>
                <span className="text-sm font-medium">{aiStatus.lastTraining}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Knowledge Confidence</span>
                <span className="text-sm font-medium text-green-600">{aiStatus.confidence}%</span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-2 rounded">
                <Zap className="h-4 w-4 mr-2" />
                Trigger Retraining
              </button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-purple-600" />
                <span>Knowledge Base Stats</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Documents Embedded</span>
                <span className="text-sm font-medium">
                  {aiStatus.documentsEmbedded} / {aiStatus.totalDocuments}
                </span>
              </div>
              <Progress value={(aiStatus.documentsEmbedded / aiStatus.totalDocuments) * 100} className="w-full" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Knowledge Base Size</span>
                <span className="text-sm font-medium">{aiStatus.knowledgeSize}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Updated</span>
                <span className="text-sm font-medium">{aiStatus.lastTraining}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
            <CardDescription>Current AI training pipeline status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Document Processing</p>
                  <p className="text-xs text-gray-500">All documents successfully processed</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Text Embedding</p>
                  <p className="text-xs text-gray-500">Knowledge vectorized and indexed</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Model Training</p>
                  <p className="text-xs text-gray-500">AI model updated with new knowledge</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Complete</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Preview</CardTitle>
            <CardDescription>AI's understanding of different topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgePreview.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.topic}</p>
                    <p className="text-xs text-gray-500">{item.sources} source documents</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={item.confidence} className="w-20" />
                    <span className="text-xs font-medium w-8">{item.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITrainingSection;
