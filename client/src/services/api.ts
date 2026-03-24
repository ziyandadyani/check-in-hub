// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3000/api',
// });

// // GET venues
// export const getVenues = () => API.get('/venues');

// // POST clock-in
// export const clockIn = (data: {
//   venueId: string;
//   latitude: number;
//   longitude: number;
// }) => API.post('/clock-in', data);

// //GET clock-ins 
// export const getClockIns = (venueId?: string) => {
//   return API.get('/admin/clock-ins', {
//     params: venueId ? { venueId } : {}
//   });
// };

import axios from 'axios';

// Get the backend URL from Vite env
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
});

// GET venues
export const getVenues = () => API.get('/venues');

// POST clock-in
export const clockIn = (data: {
  venueId: string;
  latitude: number;
  longitude: number;
}) => API.post('/clock-in', data);

// GET clock-ins 
export const getClockIns = (venueId?: string) => {
  return API.get('/admin/clock-ins', {
    params: venueId ? { venueId } : {}
  });
};