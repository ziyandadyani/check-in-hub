import { useEffect, useState } from 'react';
import { getVenues, clockIn } from '../services/api';
import { getLocation } from '../hooks/useGeolocation';
import { FaMapMarkerAlt } from "react-icons/fa";
import type { Venue } from '@shared/types';
import { supabase } from '../utils/supabaseClient';
import './LearnerView.css';

export default function LearnerView() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string } | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(true); // new: tracks user fetch

  // Fetch venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await getVenues();
        setVenues(res.data.data);
        console.log('Fetched venues:', res.data.data);
      } catch (err) {
        console.error('Failed to fetch venues:', err);
      }
    };
    fetchVenues();
  }, []);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await supabase.auth.getUser();
        if (res.data.user) {
          setCurrentUser({ id: res.data.user.id, email: res.data.user.email! });
        }
      } catch (err) {
        console.error('Failed to get user:', err);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Show loader while user is being fetched
  if (userLoading) {
    return <p className="loading-text">Loading user info...</p>;
  }

  if (!currentUser) {
    return <p className="loading-text">User not logged in</p>;
  }

  // Clock-in handler
  const handleClockIn = async () => {
    if (!selectedVenue) return;

    setLoading(true);
    setMessage('Getting location...');

    try {
      const position = await getLocation();
      console.log("Selected Venue:", selectedVenue);
      console.log("Coords:", position.coords);

      const res = await clockIn({
        venueId: selectedVenue,
        latitude: Number(position.coords.latitude),
        longitude: Number(position.coords.longitude),
        userId: currentUser.id,
      });

      console.log("Clock-in response:", res);

      setMessage(res.data?.message || 'Clock-in successful');
    } catch (err: any) {
      console.error('Clock-in error:', err.response || err);
      setMessage(err.response?.data?.message || 'Error clocking in');
    } finally {
      setLoading(false);
    }
  };

  const getMessageStyles = () => {
    if (message.toLowerCase().includes("outside allowed radius")) {
      return "bg-red-100 text-red-700 border border-red-200";
    }
    if (message.toLowerCase().includes("clock-in successful")) {
      return "bg-green-100 text-green-700 border border-green-200";
    }
    if (message.toLowerCase().includes("getting location")) {
      return "bg-purple-100 text-purple-700 border border-purple-200";
    }
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="learner-container">

      <h1 className="text-xl font-bold pb-4">Welcome, {currentUser.email}</h1>

      <h2 className="text-base font-medium text-gray-500 pb-4">
        Select a venue below to clock in for today's session
      </h2>

      <div className="venue-list">
        {venues.map((venue) => {
          const isSelected = selectedVenue === venue.id;
          return (
            <button
              key={venue.id}
              className={`venue-button flex flex-col items-start ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedVenue(venue.id)}
            >
              <div className="flex items-center">
                <div className="bg-[#27aa83] p-2 rounded-lg ">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>
                <span className="ml-2">{venue.name}</span>
              </div>
              {venue.address && (
                <span className="ml-10 text-gray-500 text-sm">{venue.address}</span>
              )}
            </button>
          );
        })}
      </div>

      <button
        className="clock-in-button"
        onClick={handleClockIn}
        disabled={!selectedVenue || loading}
      >
        {loading ? 'Clocking in...' : 'Check In'}
      </button>

      {message && (
        <p
          className={`mt-4 h-[130px] flex items-center justify-center text-center p-3 rounded-md text-sm font-medium ${getMessageStyles()}`}
        >
          {message}
        </p>
      )}
    </div>
  );
}