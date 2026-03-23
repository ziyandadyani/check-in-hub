import { useEffect, useState } from 'react';
import { getVenues, clockIn } from '../services/api';
import { getLocation } from '../hooks/useGeolocation';
import type { Venue } from '@shared/types';

export default function LearnerView() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVenues = async () => {
      const res = await getVenues();
      setVenues(res.data);
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

  return (
    <div
      style={{
        padding: '1rem',
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Clock In</h2>

      <label htmlFor="venue" style={{ display: 'block', marginBottom: '0.5rem' }}>
        Select Venue
      </label>
      <select
        id="venue"
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          marginBottom: '1rem',
        }}
        value={selectedVenue}
        onChange={(e) => setSelectedVenue(e.target.value)}
      >
        <option value="">Choose a venue</option>
        {venues.map((venue) => (
          <option key={venue.id} value={venue.id}>
            {venue.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleClockIn}
        disabled={!selectedVenue || loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          backgroundColor: '#4f46e5',
          color: '#fff',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          marginBottom: '1rem',
        }}
      >
        {loading ? 'Clocking in...' : 'Clock In'}
      </button>

      {message && (
        <p
          style={{
            textAlign: 'center',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            backgroundColor: '#f3f4f6',
            color: '#111827',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}


