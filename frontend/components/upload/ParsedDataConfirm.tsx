'use client';
import { useState, useEffect } from 'react';
import { Check, Edit2, AlertCircle, Save, Clock } from 'lucide-react';

interface ParsedDataConfirmProps {
  data: any; // The data returned from Ollama
  onConfirm: (finalData: any) => void;
  onEdit: () => void;
}

export default function ParsedDataConfirm({ data, onConfirm, onEdit }: ParsedDataConfirmProps) {
  // If Ollama failed (data is null), we create a blank template for manual entry
  const [editedData, setEditedData] = useState({
    equipmentId: data?.equipmentId || '',
    status: data?.status || 'In Field',
    location: data?.location || '',
    eta: data?.eta || '4 Hours',
    timestamp: new Date().toLocaleString()
  });

  // Update local state if the 'data' prop changes (e.g., a new photo is uploaded)
  useEffect(() => {
    if (data) {
      setEditedData({
        equipmentId: data.equipmentId || '',
        status: data.status || 'In Field',
        location: data.location || '',
        eta: data.eta || '4 Hours',
        timestamp: new Date().toLocaleString()
      });
    }
  }, [data]);

  const isFailed = !data;

  return (
    <div className="mt-6 p-6 border-2 border-blue-100 bg-blue-50 rounded-xl shadow-inner animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
          {isFailed ? (
            <><AlertCircle className="text-amber-500" /> AI Parsing Failed - Manual Entry</>
          ) : (
            <><Check className="text-green-600" /> Verify AI Results</>
          )}
        </h3>
        <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {editedData.timestamp}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Equipment ID Field */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Equipment ID</label>
          <div className="flex items-center gap-2">
            <input 
              className="w-full text-lg font-semibold text-black outline-none focus:text-blue-600"
              value={editedData.equipmentId} 
              placeholder="e.g. C-ARM-01"
              onChange={(e) => setEditedData({...editedData, equipmentId: e.target.value})}
            />
            <Edit2 size={16} className="text-gray-300" />
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Current Status</label>
          <select 
            className="w-full text-lg font-semibold text-black bg-transparent outline-none cursor-pointer"
            value={editedData.status}
            onChange={(e) => setEditedData({...editedData, status: e.target.value})}
          >
            <option value="In Field">In Field (Standard)</option>
            <option value="Available">Available (Returned)</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </div>

        {/* Location Field */}
        <div className="bg-white p-4 rounded-lg border border-blue-200 md:col-span-2">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Destination / OR Room</label>
          <input 
            className="w-full text-black font-medium outline-none"
            value={editedData.location}
            placeholder="Enter Room # or Department"
            onChange={(e) => setEditedData({...editedData, location: e.target.value})}
          />
        </div>
      </div>

      {/* ETA Warning */}
      <div className="mt-4 flex items-center gap-2 text-blue-700 text-sm bg-blue-100/50 p-3 rounded-lg">
        <Clock size={16} />
        <span>Auto-calculated return: <strong>{editedData.eta}</strong> from now.</span>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onConfirm(editedData)}
          className="flex-[2] bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
        >
          <Save size={20} />
          Save to PostgreSQL
        </button>
        <button
          onClick={() => window.location.reload()}
          className="flex-1 bg-white border border-gray-300 text-gray-600 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}