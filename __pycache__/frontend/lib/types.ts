export interface User {
  id: string;
  name: string;
  email: string;
  calendarIds: string[];
}

export interface Schedule {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  dayOfWeek: number;
  recurrence?: string;
  naturalLanguageInput?: string;
}

export interface Group {
  id: string;
  name: string;
  members: User[];
  schedules: Schedule[];
  bestTimes?: TimeSlot[];
}

export interface TimeSlot {
  start: Date;
  end: Date;
  participants: string[];
}

export interface ParsedScheduleInput {
  schedule: {
    [day: string]: string;
  };
  conflicts?: string[];
  confidence?: number;
}