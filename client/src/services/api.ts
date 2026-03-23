import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// GET venues
export const getVenues = () => API.get('/venues');

// POST clock-in
export const clockIn = (data: {
  venueId: string;
  latitude: number;
  longitude: number;
}) => API.post('/clock-in', data);