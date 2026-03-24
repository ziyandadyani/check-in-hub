import React, { useEffect, useState } from 'react';
import { getClockIns } from '../services/adminApi';
import type { ClockInRecord } from '../services/adminApi';

export const AdminDashboard: React.FC = () => {
  const [clockIns, setClockIns] = useState<ClockInRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState('');

  useEffect(() => {
    const fetchClockIns = async () => {
      setLoading(true);
      try {
        const res = await getClockIns(selectedVenue ? { venueId: selectedVenue } : {});
        // Backend returns { data: [...] }
        setClockIns(res.data.data || []);
        // Collect unique venues for filter

        // const uniqueVenues = Array.from(
        //   new Set(res.data.data.map((ci: ClockInRecord) => ci.venues?.name))
        // ).filter(Boolean);
        const uniqueVenues = Array.from(
          new Set(res.data.data.map((ci: ClockInRecord) => ci.venues?.name))
        ) as string[];
        setVenues(uniqueVenues);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchClockIns();
  }, [selectedVenue]);

  const today = new Date().toLocaleDateString();

  if (loading) return <p>Loading clock-ins...</p>;

  return (
    <div style={{ padding: '1rem', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      {/* Hero / Header */}
      <h1 style={{ textAlign: 'center', marginBottom: '0.25rem' }}>Today's Attendance</h1>
      <p style={{ textAlign: 'center', marginBottom: '1rem' }}>{today}</p>

      {/* Info */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '1rem' }}>
        <div>Total Clock-ins: {clockIns.length}</div>
        <div>Total Learners: {Array.from(new Set(clockIns.map(ci => ci.users?.name))).length}</div>
        <div>Total Venues: {Array.from(new Set(clockIns.map(ci => ci.venues?.name))).length}</div>
      </div>

      {/* Venue filter */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="venueFilter" style={{ marginRight: '0.5rem' }}>Filter by Venue:</label>
        <select
          id="venueFilter"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          style={{ padding: '0.25rem' }}
        >
          <option value="">All Venues</option>
          {venues.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Clock-ins table */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Learner</th>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Venue</th>
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Clock-in Time</th>
            {/* <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Location</th> */}
            <th style={{ border: '1px solid #ddd', padding: '0.5rem' }}>Distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {clockIns.map(ci => (
            <tr key={ci.id}>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{ci.users?.name || 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{ci.venues?.name || 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>{new Date(ci.created_at).toLocaleString()}</td>
              {/* <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                {ci.latitude?.toFixed(5)}, {ci.longitude?.toFixed(5)}
              </td> */}
              <td style={{ border: '1px solid #ddd', padding: '0.5rem' }}>
                {ci.distance ?? '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};