@@ .. @@
 "use client";

 import { useState, useEffect } from "react";
+import dynamic from "next/dynamic";
 import {
   Plus,
   Search,
@@ .. @@
 import { Header } from "@/src/components/header";
 import { Footer } from "@/src/components/footer";
 import { RecruitContext } from "@/src/context/recruitContext";
+
+// Import React Quill dynamically to avoid SSR issues
+const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
+import 'react-quill/dist/quill.snow.css';

 interface Applicant {
@@ .. @@
   const [isApplicantDetailModalOpen, setIsApplicantDetailModalOpen] =
     useState(false);
   const [jobToDelete, setJobToDelete] = useState<string | null>(null);
+  const [editorValue, setEditorValue] = useState("");

   const [formData, setFormData] = useState<Partial<Job>>({
@@ .. @@
     setSelectedJob(job);
     setIsEditModalOpen(true);
   };
+
+  // Quill editor modules and formats
+  const modules = {
+    toolbar: [
+      [{ 'header': [1, 2, 3, false] }],
+      ['bold', 'italic', 'underline', 'strike'],
+      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
+      [{ 'indent': '-1'}, { 'indent': '+1' }],
+      ['link'],
+      ['clean']
+    ],
+  };
+
+  const formats = [
+    'header', 'bold', 'italic', 'underline', 'strike',
+    'list', 'bullet', 'indent', 'link'
+  ];

   const handleDelete = (jobId: string) => {
@@ .. @@
       console.log("Editing job:", formData);
       const token = localStorage.getItem("userToken");
       if (token) {
         handlePutUpdateRecruit(
           token,
           formData.id,
           formData.company,
           formData.deadline,
-          formData.description,
+          editorValue || formData.description,
           formData.experience,
           formData.location,
           formData.salary,
           formData.title,
           formData.type,
           formData.tags?.map((tag) => tag.id)
         );
       }
@@ .. @@
       if (token) {
         handlePostAddRecruit(
           token,
           formData.company,
           formData.deadline,
-          formData.description,
+          editorValue || formData.description,
           formData.experience,
           formData.location,
           formData.salary,
           formData.title,
           formData.type,
           formData.tags
         );
       }
@@ .. @@
       applicants: [],
     });
     setSelectedJob(null);
+    setEditorValue("");
   };

   const getSkillNameById = (skillId: string) => {
@@ .. @@
         onOpenChange={(open) => {
           if (!open) {
             setIsAddModalOpen(false);
             setIsEditModalOpen(false);
             resetForm();
           }
+        }}
+        onOpenChange={(open) => {
+          if (!open) {
+            setIsAddModalOpen(false);
+            setIsEditModalOpen(false);
+            resetForm();
+          } else if (selectedJob) {
+            // Khi mở modal edit, set giá trị editor
+            setEditorValue(selectedJob.description || "");
+          }
         }}
       >
@@ .. @@
             <div>
               <Label htmlFor="description">Mô tả công việc *</Label>
-              <Textarea
-                id="description"
-                value={formData.description}
-                onChange={(e) =>
-                  setFormData({ ...formData, description: e.target.value })
-                }
-                className="bg-slate-700 border-slate-600 text-white"
-                rows={4}
-                required
-              />
+              <div className="mt-2">
+                <style jsx global>{`
+                  .ql-toolbar {
+                    background: rgb(51 65 85) !important;
+                    border: 1px solid rgb(71 85 105) !important;
+                    border-bottom: none !important;
+                    border-radius: 6px 6px 0 0 !important;
+                  }
+                  .ql-toolbar .ql-stroke {
+                    fill: none !important;
+                    stroke: rgb(203 213 225) !important;
+                  }
+                  .ql-toolbar .ql-fill {
+                    fill: rgb(203 213 225) !important;
+                    stroke: none !important;
+                  }
+                  .ql-toolbar .ql-picker-label {
+                    color: rgb(203 213 225) !important;
+                  }
+                  .ql-toolbar .ql-picker-options {
+                    background: rgb(51 65 85) !important;
+                    border: 1px solid rgb(71 85 105) !important;
+                  }
+                  .ql-toolbar .ql-picker-item {
+                    color: rgb(203 213 225) !important;
+                  }
+                  .ql-toolbar .ql-picker-item:hover {
+                    background: rgb(71 85 105) !important;
+                  }
+                  .ql-container {
+                    background: rgb(51 65 85) !important;
+                    border: 1px solid rgb(71 85 105) !important;
+                    border-radius: 0 0 6px 6px !important;
+                    color: white !important;
+                    min-height: 120px !important;
+                  }
+                  .ql-editor {
+                    color: white !important;
+                    min-height: 100px !important;
+                  }
+                  .ql-editor.ql-blank::before {
+                    color: rgb(148 163 184) !important;
+                    font-style: italic !important;
+                  }
+                  .ql-tooltip {
+                    background: rgb(51 65 85) !important;
+                    border: 1px solid rgb(71 85 105) !important;
+                    color: white !important;
+                  }
+                  .ql-tooltip input {
+                    background: rgb(71 85 105) !important;
+                    border: 1px solid rgb(100 116 139) !important;
+                    color: white !important;
+                  }
+                `}</style>
+                <ReactQuill
+                  theme="snow"
+                  value={editorValue}
+                  onChange={(value) => {
+                    setEditorValue(value);
+                    setFormData({ ...formData, description: value });
+                  }}
+                  modules={modules}
+                  formats={formats}
+                  placeholder="Nhập mô tả công việc chi tiết..."
+                  style={{
+                    backgroundColor: 'rgb(51 65 85)',
+                  }}
+                />
+              </div>
             </div>

             {/* <div>
@@ .. @@
           <DialogHeader>
             <DialogTitle className="text-xl">{selectedJob?.title}</DialogTitle>
           </DialogHeader>
           {selectedJob && (
             <div className="space-y-6">
@@ .. @@
               <div>
                 <Label className="text-slate-300">Mô tả công việc</Label>
-                <p className="text-white whitespace-pre-line">
-                  {selectedJob.description}
-                </p>
+                <div 
+                  className="text-white prose prose-invert max-w-none mt-2 p-3 bg-slate-700 rounded border border-slate-600"
+                  dangerouslySetInnerHTML={{ __html: selectedJob.description }}
+                />
               </div>

               <div>