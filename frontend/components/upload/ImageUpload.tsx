'use client';

import { useState, useRef } from 'react';
import { scheduleAPI, api } from '@/lib/api';

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [savedFiles, setSavedFiles] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!image) return;
    setIsSaving(true);
    try {
      await scheduleAPI.uploadImage(image);
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      await handleViewFiles();
    } catch (err) {
      console.error('Save failed:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewFiles = async () => {
    try {
      const response = await api.get('/files');
      setSavedFiles(response.data);
    } catch (err) {
      console.error('Failed to fetch files:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">

      {/* Upload Area */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
      >
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
        ) : (
          <div className="space-y-2">
            <p className="text-blue-600 font-medium">Click to upload an image</p>
            <p className="text-gray-400 text-sm">PNG, JPG, JPEG supported</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {image && (
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button className="flex-1 bg-purple-500 text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition-colors">
            Extract
          </button>
        </div>
      )}

      {/* View Files Button */}
      <button
        onClick={handleViewFiles}
        className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition-colors"
      >
        View Saved Files
      </button>

      {/* Saved Files Grid */}
      {savedFiles.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Saved Files</h3>
          <div className="grid grid-cols-2 gap-3">
            {savedFiles.map((file) => (
              <div
                key={file.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedFile(file)}
              >
                <img
                  src={`http://localhost:8000/uploads/${file.filename}`}
                  alt={file.filename}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-gray-800 truncate text-sm">{file.filename}</p>
                  <p className="text-xs text-gray-400">{new Date(file.uploaded_at).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedFile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedFile(null)}
        >
          <div className="bg-white rounded-xl overflow-hidden max-w-2xl w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={`http://localhost:8000/uploads/${selectedFile.filename}`}
              alt={selectedFile.filename}
              className="w-full max-h-96 object-contain"
            />
            <div className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{selectedFile.filename}</p>
                <p className="text-sm text-gray-400">{new Date(selectedFile.uploaded_at).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}