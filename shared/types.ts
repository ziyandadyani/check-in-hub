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
  userId: number   // added this 
};

// export type ClockInResponse = {
//   message: string;
// };

export type ClockInResponse = {
  message: string;
  clockIn?: {
    id: string;
    user_id: string;
    venue_id: string;
    latitude: number;
    longitude: number;
    distance: number;
    created_at: string;
  };
  error?: any;
};