"use client";
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import FileInput from "@/components/file-input";

// Extend the FileData type to hold a URL for the Blob
type FileData = {
  fileName: string;
  uploadDate: string;
  id: string;
  fileUrl: string;
};

const MyDrivePage = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [message, setMessage] = useState('');

  // Load initial files from sessionStorage
  useEffect(() => {
    // We only load metadata from session storage, not actual files.
    const loadedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles') || '[]');
    setFiles(loadedFiles.map((file: FileData) => ({ ...file, fileUrl: '' }))); // Reset file URLs as they cannot be persisted
  }, []);

  // Update sessionStorage whenever files change (metadata only)
  useEffect(() => {
    const filesToStore = files.map(({ fileUrl, ...rest }) => rest); // Strip file URLs before storing
    sessionStorage.setItem('uploadedFiles', JSON.stringify(filesToStore));
  }, [files]);

  const handleFileSelect = (newFile: File) => {
    const fileUrl = URL.createObjectURL(newFile);
    const newFileData = {
      fileName: newFile.name,
      uploadDate: new Date().toLocaleDateString(),
      id: newFile.name + Date.now(),
      fileUrl: fileUrl // Store the URL for viewing
    };
    setFiles(prevFiles => [newFileData, ...prevFiles]);
    setMessage('Upload successful!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prevFiles => {
      // Cleanup blob URLs to avoid memory leaks
      const fileToDelete = prevFiles.find(file => file.id === fileId);
      if (fileToDelete) URL.revokeObjectURL(fileToDelete.fileUrl);
      return prevFiles.filter(file => file.id !== fileId);
    });
  };

  const viewPDF = (fileData: FileData) => {
    window.open(fileData.fileUrl, '_blank');
  };

  return (
    <>
      <div className="text-2xl font-bold">My Library</div>
      <div className="text-gray-500">Handle all your paper uploads here.</div>
      <div className="mt-4 w-full">
        <FileInput onFileSelect={handleFileSelect} />
        {message && <div className="text-green-500 text-center my-2">{message}</div>}
        <div className="mt-4 flex flex-col">
          {files.map((fileData) => (
            <div key={fileData.id} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <span className="text-lg font-medium cursor-pointer mr-auto" onClick={() => viewPDF(fileData)}>
                {fileData.fileName}
              </span>
              <span className="text-sm text-gray-500 mx-2">{fileData.uploadDate}</span>
              <AiOutlineDelete className="cursor-pointer text-red-500 hover:text-red-700" size={24} onClick={() => deleteFile(fileData.id)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyDrivePage;
