import './AdminDashboard.css';
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
        setClockIns(res.data.data || []);
        const uniqueVenues = Array.from(
          new Set(res.data.data.map((ci: ClockInRecord) => ci.venue?.name))
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

  if (loading) return <p className="loading-text">Loading clock-ins...</p>;

  return (
    <div className="admin-container">
      {/* Header */}
      <header className="admin-header">
        <h1 className="admin-title">Today's Attendance</h1>
        <p className="admin-subtitle">{today}</p>
      </header>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat-card">Total Clock-ins: {clockIns.length}</div>
        <div className="stat-card">
          Total Learners: {Array.from(new Set(clockIns.map(ci => ci.user?.name))).length}
        </div>
        <div className="stat-card">
          Total Venues: {Array.from(new Set(clockIns.map(ci => ci.venue?.name))).length}
        </div>
      </div>

      {/* Venue filter */}
      <div className="filter-container">
        <label htmlFor="venueFilter" className="filter-label">Filter by Venue:</label>
        <select
          id="venueFilter"
          value={selectedVenue}
          onChange={(e) => setSelectedVenue(e.target.value)}
          className="filter-select"
        >
          <option value="">All Venues</option>
          {venues.map(v => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </div>

      {/* Clock-ins table */}
      <div className="table-card">
        <table className="clockins-table">
          <thead>
            <tr>
              <th>Learner</th>
              <th>Venue</th>
              <th>Clock-in Time</th>
              <th>Distance (m)</th>
            </tr>
          </thead>
          <tbody>
            {clockIns.map(ci => (
              <tr key={ci.id}>
                <td>{ci.user?.name || 'N/A'}</td>
                <td>{ci.venue?.name || 'N/A'}</td>
                <td>{new Date(ci.created_at).toLocaleString()}</td>
                <td>{ci.distance ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};