import { useEffect, useState } from 'react';
import { getVenues, clockIn } from '../services/api';
import { getLocation } from '../hooks/useGeolocation';
import { FaMapMarkerAlt } from "react-icons/fa";
import type { Venue } from '@shared/types';
import './LearnerView.css';

export default function LearnerView() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await getVenues();
        setVenues(res.data.data); // <- notice res.data.data
        console.log('Fetched venues:', res.data.data);
      } catch (err) {
        console.error('Failed to fetch venues:', err);
      }
    };
    fetchVenues();
  }, []);

  const handleClockIn = async () => {
    if (!selectedVenue) return;

    setLoading(true);
    setMessage('Getting location...');

    try {
      const position = await getLocation();

      const res = await clockIn({
        venueId: selectedVenue,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });

      setMessage(res.data.message);
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error');
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

      <h1 className="text-2xl font-bold pb-4">  Welcome, User</h1>

      <h2 className="text-base font-medium text-gray-500 pb-4">Select a venue below to clock in for todays session</h2>


      {/* <div className="venue-list">
        {venues.map((venue) => {
          const isSelected = selectedVenue === venue.id;
          return (
            <button
              key={venue.id}
              className={`venue-button flex align-left ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedVenue(venue.id)}
            >
            
              <div className="bg-[#27aa83] p-2 rounded-lg ">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>

            
              <span className="ml-2">{venue.name}</span>
            </button>
          );
        })}
      </div> */}

      <div className="venue-list">
        {venues.map((venue) => {
          const isSelected = selectedVenue === venue.id;
          return (
            <button
              key={venue.id}
              className={`venue-button flex flex-col items-start ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedVenue(venue.id)}
            >
              {/* Icon and name container */}
              <div className="flex items-center">
                {/* Icon */}
                <div className="bg-[#27aa83] p-2 rounded-lg ">
                  <FaMapMarkerAlt className="text-white text-sm" />
                </div>


                <span className="ml-2 ">{venue.name}</span>
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

      {message && <p className={`mt-4 h-[130px] flex items-center justify-center text-center p-3 rounded-md text-sm font-medium ${getMessageStyles()}`}>{message}</p>}
    </div>
  );
}