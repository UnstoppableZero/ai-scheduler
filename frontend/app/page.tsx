'use client';

import ImageUpload from '@/components/upload/ImageUpload';
import CalendarView from '@/components/schedule/CalendarView';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Medical Asset Tracker</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Snap & Sync</h2>
            <ImageUpload />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Equipment Dashboard</h2>
            <div className="h-96 overflow-y-auto">
              {/* Dashboard content will go here */}
              <p className="text-gray-500">Connect to backend to see equipment status</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}