'use client';
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// We use the types we created earlier
import { Schedule, TimeSlot } from '@/lib/types';

const localizer = momentLocalizer(moment);

interface CalendarViewProps {
  groupId?: string;
  schedules?: Schedule[];
  bestTimes?: TimeSlot[];
}

export default function CalendarView({ groupId, schedules = [], bestTimes = [] }: CalendarViewProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNaturalLanguageSubmit = async () => {
    if (!naturalLanguageInput) return;
    
    setIsProcessing(true);
    
    // Temporary Logic: This replaces the API call until your backend is live
    try {
      console.log("Input received:", naturalLanguageInput);
      
      // Simulating a successful parse
      setTimeout(() => {
        alert(`Successfully received: "${naturalLanguageInput}". Logic to connect to your FastAPI backend comes next!`);
        setIsProcessing(false);
        setNaturalLanguageInput('');
      }, 800);
      
    } catch (error) {
      alert("Something went wrong processing the schedule.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Availability via AI
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            value={naturalLanguageInput}
            onChange={(e) => setNaturalLanguageInput(e.target.value)}
            placeholder="e.g., 'I'm available every Tuesday from 9am to 5pm'"
            className="flex-1 p-3 border rounded-lg text-black focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={handleNaturalLanguageSubmit}
            disabled={isProcessing}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-semibold"
          >
            {isProcessing ? 'Analyzing...' : 'Add'}
          </button>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden border border-gray-200" style={{ height: 600 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day']}
          defaultView="week"
        />
      </div>
    </div>
  );
}