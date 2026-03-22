export type User = {
  id: string;
  name: string;
  email: string;
  role: 'learner' | 'admin';
};

export type Venue = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
};

export type ClockInRequest = {
  venueId: string;
  latitude: number;
  longitude: number;
};

export type ClockInResponse = {
  message: string;
};