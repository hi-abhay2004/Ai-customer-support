"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { Badge } from "../badge";
import { FileText, File } from "lucide-react";
import FileUpload from './file_upload';

const BASE_URL = "http://192.168.39.76:8000/support"; // Update if needed

const KnowledgeBaseSection = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const loadDocuments = async () => {
    try {
      setError(null);

      // Fetch from backend
      const res = await fetch(`${BASE_URL}/uploaded-files/`);
      const data = await res.ok ? await res.json() : [];

      const backendDocs = data.map(doc => ({
        id: doc.id,
        name: doc.filename || doc.name || "Unknown",
        type: "",
        uploadDate: doc.upload_date ? new Date(doc.upload_date).toISOString().split("T")[0] : "",
        status: doc.status || "",
        size: doc.size_bytes ? (doc.size_bytes / (1024 * 1024)).toFixed(2) + " MB" : "",
      }));

      // Fetch from localStorage
      const localFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");

      // Merge backend + local files, avoiding duplicates by file name
      const fileMap = new Map();
      backendDocs.forEach(file => fileMap.set(file.name, file));
      localFiles.forEach(file => {
        if (!fileMap.has(file.name)) {
          fileMap.set(file.name, file);
        }
      });

      const merged = Array.from(fileMap.values());
      setDocuments(merged);
    } catch (err) {
      setError(err.message || "Failed to load documents.");
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Embedded":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Embedded</Badge>;
      case "Processing":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Processing</Badge>;
      case "Failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getFileIcon = (filename) => {
    if (filename.endsWith('.pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    return <File className="h-4 w-4 text-blue-500" />;
  };

  const handleUploadComplete = () => {
    loadDocuments(); // refresh after upload
  };

  const companyId = 1;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Knowledge Base Documents</h2>
          <p className="text-gray-600">Manage your AI training documents and knowledge base</p>
        </div>
      </div>

      <FileUpload companyId={companyId} onUpload={handleUploadComplete} />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>All uploaded documents</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-red-600 font-medium mb-2">Error: {error}</div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="flex items-center gap-2">{getFileIcon(doc.name)} {doc.name}</TableCell>
                  <TableCell>{doc.type || "-"}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// export default KnowledgeBaseSection;


// export default KnowledgeBaseSection;


// export default KnowledgeBaseSection;


// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "../card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../table";
// import { Badge } from "../badge";
// import {
//   Upload,
//   Eye,
//   Trash2,
//   RefreshCw,
//   FileText,
//   File,
// } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogClose,
// } from "../dialog";

// const KnowledgeBaseSection = () => {
//   const [open, setOpen] = useState(false);
//   const [documents, setDocuments] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [error, setError] = useState(null);
//   const closeRef = useRef(null);

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const BASE_URL = "http://192.168.39.76:8000/support";
//       const res = await fetch(`${BASE_URL}/uploaded-files/`);
//       if (!res.ok) throw new Error("Failed to fetch documents");
//       const data = await res.json();

//       const docs = data.map((doc) => ({
//         id: doc.id,
//         name: doc.filename || doc.name || "Unknown",
//         type: doc.type || "Unknown",
//         uploadDate: new Date(
//           doc.upload_date || doc.created_at
//         ).toISOString().split("T")[0],
//         status: doc.status || "Processing",
//         size: doc.size_bytes
//           ? (doc.size_bytes / (1024 * 1024)).toFixed(2) + " MB"
//           : "Unknown",
//       }));

//       setDocuments(docs);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("Please select a file first");
//       return;
//     }
  
//     setUploading(true);
//     setError(null);
  
//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
  
//       const res = await fetch(`${BASE_URL}/upload/`, {
//         method: "POST",
//         body: formData,
//       });
  
//       if (!res.ok) throw new Error("Upload failed");
  
//       await fetchDocuments();
  
//       // ✅ FIXED LINE FOR JAVASCRIPT
//       closeRef.current?.click(); // This is valid in JS
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploading(false);
//       setSelectedFile(null);
//     }
//   };
  

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Embedded":
//         return (
//           <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
//             Embedded
//           </Badge>
//         );
//       case "Processing":
//         return (
//           <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
//             Processing
//           </Badge>
//         );
//       case "Failed":
//         return <Badge variant="destructive">Failed</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const getFileIcon = (filename) => {
//     if (filename.endsWith(".pdf")) {
//       return <FileText className="h-4 w-4 text-red-500" />;
//     }
//     return <File className="h-4 w-4 text-blue-500" />;
//   };

//   return (
//     <div className="space-y-6">
//       {/* Header + Upload */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-900">
//             Knowledge Base Documents
//           </h2>
//           <p className="text-gray-600">
//             Manage your AI training documents and knowledge base
//           </p>
//         </div>

//         <button
//           onClick={() => setOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Upload Document
//         </button>

//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Upload New Document</DialogTitle>
//               <DialogDescription>
//                 Upload PDF, DOCX, TXT, JSON, or image files to train your AI
//                 assistant
//               </DialogDescription>
//             </DialogHeader>

//             <div className="mt-4">
//               <input
//                 type="file"
//                 accept=".pdf,.docx,.txt,.json,image/*"
//                 onChange={(e) => setSelectedFile(e.target.files[0])}
//                 className="w-full"
//               />
//               {selectedFile && (
//                 <p className="mt-2 text-sm text-gray-700">
//                   Selected file: <strong>{selectedFile.name}</strong> (
//                   {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
//                 </p>
//               )}
//             </div>

//             {error && <p className="text-red-600 mt-2">{error}</p>}

//             <div className="mt-6 flex justify-end space-x-2">
//               <DialogClose asChild>
//                 <button
//                   disabled={uploading}
//                   className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
//                   ref={closeRef}
//                 >
//                   Cancel
//                 </button>
//               </DialogClose>

//               <button
//                 onClick={handleUpload}
//                 disabled={uploading || !selectedFile}
//                 className={`px-4 py-2 rounded text-white ${
//                   uploading
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {uploading ? "Uploading..." : "Upload & Process"}
//               </button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Documents</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {documents.length}
//                 </p>
//               </div>
//               <FileText className="h-8 w-8 text-blue-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Embedded</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {documents.filter((d) => d.status === "Embedded").length}
//                 </p>
//               </div>
//               <RefreshCw className="h-8 w-8 text-green-500" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Processing</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {documents.filter((d) => d.status === "Processing").length}
//                 </p>
//               </div>
//               <RefreshCw className="h-8 w-8 text-yellow-500 animate-spin" />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Failed</p>
//                 <p className="text-2xl font-bold text-red-600">
//                   {documents.filter((d) => d.status === "Failed").length}
//                 </p>
//               </div>
//               <Trash2 className="h-8 w-8 text-red-500" />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Document Library</CardTitle>
//           <CardDescription>
//             All uploaded documents and their processing status
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Document</TableHead>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Upload Date</TableHead>
//                 <TableHead>Size</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {documents.map((doc) => (
//                 <TableRow key={doc.id}>
//                   <TableCell>
//                     <div className="flex items-center space-x-2">
//                       {getFileIcon(doc.name)}
//                       <span className="font-medium">{doc.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>{doc.type}</TableCell>
//                   <TableCell>{doc.uploadDate}</TableCell>
//                   <TableCell>{doc.size}</TableCell>
//                   <TableCell>{getStatusBadge(doc.status)}</TableCell>
//                   <TableCell>
//                     <div className="flex space-x-2">
//                       <button
//                         title="View Details"
//                         onClick={() =>
//                           alert(`Show details for document ID: ${doc.id}`)
//                         }
//                         className="p-1 border rounded hover:bg-gray-100"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </button>
//                       <button
//                         title="Retry Processing"
//                         onClick={() =>
//                           alert(`Retry processing document ID: ${doc.id}`)
//                         }
//                         className="p-1 border rounded hover:bg-gray-100"
//                       >
//                         <RefreshCw className="h-4 w-4" />
//                       </button>
//                       <button
//                         title="Delete Document"
//                         onClick={() =>
//                           alert(`Delete document ID: ${doc.id}`)
//                         }
//                         className="p-1 border rounded hover:bg-gray-100"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

export default KnowledgeBaseSection;
