export type UserRole = 'learner' | 'admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Venue = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
  address: string;  // <-- added this
};

export type ClockInRequest = {
  venueId: string;
  latitude: number;
  longitude: number;
};

export type ClockInResponse = {
  message: string;
};