import axios from 'axios';
import type { User, Venue } from '@shared/types';

export type ClockInRecord = {
  id: string;
  user: User;
  venue: Venue;
  latitude: number;
  longitude: number;
  created_at: string;
  users: { name: string };
  venues: { name: string };
};

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getClockIns = (params?: { venueId?: string }) => {
  return API.get('/admin/clock-ins', {
    params,
  });
};