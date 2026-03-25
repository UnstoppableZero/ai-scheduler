'use client';

import { useState, useRef } from 'react';
import { scheduleAPI, api } from '@/lib/api';

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [savedFiles, setSavedFiles] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
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
      alert('File saved!');
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Take Photo or Upload
        </button>
        <p className="mt-2 text-gray-500">Upload a photo of the sign-out sheet</p>

        {preview && (
          <img src={preview} alt="Preview" className="max-h-64 mx-auto mt-4" />
        )}
      </div>

      {image && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600">
            Extract
          </button>
        </div>
      )}

      <div className="mt-8">
        <button
          onClick={handleViewFiles}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          View Saved Files
        </button>

        {savedFiles.length > 0 && (
          <ul className="mt-4 space-y-2">
            {savedFiles.map((file) => (
              <li key={file.id} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-medium">{file.filename}</p>
                <p className="text-sm text-gray-500">{file.uploaded_at}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}