import axios from 'axios';
import { Group, Schedule, ParsedScheduleInput } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scheduleAPI = {
  parseNaturalLanguage: async (input: string): Promise<ParsedScheduleInput> => {
    const response = await api.post('/parse-schedule', { text: input });
    return response.data;
  },
  
  saveSchedule: async (schedule: Schedule) => {
    const response = await api.post('/schedule', schedule);
    return response.data;
  },
  
  getGroupSchedule: async (groupId: string) => {
    const response = await api.get(`/groups/${groupId}/schedule`);
    return response.data;
  },
  
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/upload-schedule', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

export const groupAPI = {
  createGroup: async (name: string, members: string[]) => {
    const response = await api.post('/groups', { name, members });
    return response.data;
  },
  
  getGroups: async () => {
    const response = await api.get('/groups');
    return response.data;
  },
  
  getBestTimes: async (groupId: string) => {
    const response = await api.get(`/groups/${groupId}/best-times`);
    return response.data;
  },
};