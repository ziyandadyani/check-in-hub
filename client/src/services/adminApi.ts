
import axios from 'axios';
//import type { User, Venue } from '@shared/types';

export type ClockInRecord = {
  id: string;
  user?: { name: string };
  venue?: { name: string };
  latitude: number;
  longitude: number;
  created_at: string;
  distance?: number;
};

//Vite env variable for deployed backend
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
});

// GET clock-ins (admin)
export const getClockIns = async (params?: { venueId?: string }) => {
  try {
    const res = await API.get('/admin/clock-ins', { params });
    return res.data.data;
  } catch (error) {
    console.error('Failed to fetch clock-ins', error);
    return [];
  }
};

// POST clock-in
export const clockIn = async (data: {
  venueId: string;
  latitude: number;
  longitude: number;
  userId: string; // added this
}) => {
  try {
    const res = await API.post('/clock-in', data);
    return res.data;
  } catch (error) {
    console.error('Clock-in failed', error);
    throw error;
  }
};