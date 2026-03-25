'use client';

import { useState, useRef } from 'react';
import { scheduleAPI } from '@/lib/api';
import ParsedDataConfirm from './ParsedDataConfirm';

export default function ImageUpload() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setIsProcessing(true);
    
    try {
      // Set timeout for AI processing
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Processing timeout')), 15000);
      });
      
      const uploadPromise = scheduleAPI.uploadImage(file);
      const result = await Promise.race([uploadPromise, timeoutPromise]);
      
      setParsedData(result);
      setShowConfirm(true);
    } catch (err: any) {
        const errorMessage = err instanceof Error ? err.message : String(err);
      if (errorMessage === 'Processing timeout') {
        // Fallback to manual input
        setShowConfirm(true);
        setParsedData(null);
      }
      console.error('Upload failed:', errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = async (confirmedData: any) => {
    // Save confirmed data to database
    await scheduleAPI.saveSchedule(confirmedData);
    setShowConfirm(false);
  };

  const handleManualEdit = () => {
    // Open manual form
    setShowConfirm(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          capture="environment"
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
          className="hidden"
        />
        
        {!preview ? (
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              📸 Take Photo or Upload
            </button>
            <p className="mt-2 text-gray-500">Upload a photo of the sign-out sheet</p>
          </div>
        ) : (
          <div>
            <img src={preview} alt="Uploaded sheet" className="max-h-96 mx-auto mb-4" />
            {isProcessing && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p>AI is reading the schedule...</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {showConfirm && (
        <ParsedDataConfirm
          data={parsedData}
          onConfirm={handleConfirm}
          onEdit={handleManualEdit}
        />
      )}
    </div>
  );
}