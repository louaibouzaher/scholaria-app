"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai'; // Import the plus icon
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
  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef(null); // Reference for the button to position the popup


  // Load initial files from sessionStorage
  useEffect(() => {
    const loadedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles') || '[]');
    setFiles(loadedFiles.map((file: FileData) => ({ ...file, fileUrl: '' }))); // Reset file URLs as they cannot be persisted
  }, []);

  // Update sessionStorage whenever files change (metadata only)
  useEffect(() => {
    const filesToStore = files.map(({ fileUrl, ...rest }) => rest);
    sessionStorage.setItem('uploadedFiles', JSON.stringify(filesToStore));
  }, [files]);

  const handleFileSelect = (newFile: File) => {
    const fileUrl = URL.createObjectURL(newFile);
    const newFileData = {
      fileName: newFile.name,
      uploadDate: new Date().toLocaleDateString(),
      id: newFile.name + Date.now(),
      fileUrl: fileUrl
    };
    setFiles(prevFiles => [newFileData, ...prevFiles]);
    setMessage('Upload successful!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteFile = (fileId: string) => {
    setFiles(prevFiles => {
      const fileToDelete = prevFiles.find(file => file.id === fileId);
      if (fileToDelete) URL.revokeObjectURL(fileToDelete.fileUrl);
      return prevFiles.filter(file => file.id !== fileId);
    });
  };

  const viewPDF = (fileData: FileData) => {
    window.open(fileData.fileUrl, '_blank');
  };

  const addToWorkspace = () => {
    setShowPopup(true);
  };

  const hidePopup = () => {
    setShowPopup(false);
  };

  const workspaceSelected = () => {
    // Implement your logic here for when a workspace is selected
    hidePopup();
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
              <div ref={buttonRef} onClick={addToWorkspace} className="cursor-pointer text-blue-900 flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-md mx-2 hover:bg-blue-200">
                <AiOutlinePlus />
                <div>Add to Workspace</div>
              </div>
              <AiOutlineDelete className="cursor-pointer text-red-500 hover:text-red-700" size={24} onClick={() => deleteFile(fileData.id)} />
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-transparent" onClick={hidePopup}>
          <div style={{ position: 'absolute', top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY, left: buttonRef.current?.getBoundingClientRect().left }} className="bg-gray-50 p-2 flex flex-col rounded-md shadow-lg w-max" onClick={e => e.stopPropagation()}>
            <div onClick={workspaceSelected} className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200">Workspace1</div>
            <div onClick={workspaceSelected} className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200">Workspace2</div>
            <div onClick={workspaceSelected} className="rounded-md py-1 px-2 bg-gray-50 hover:bg-gray-200">Workspace3</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyDrivePage;