import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';
import { ClockInRequest, ClockInResponse, Venue } from '@shared/types';
import { getDistance } from 'geolib';

export const clockIn = async (
  req: Request<{}, {}, ClockInRequest>,
  res: Response<ClockInResponse>
) => {
  try {
    const { venueId, latitude, longitude, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }

    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('id', venueId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    const venue = data as Venue;

    const distance = getDistance(
      { latitude, longitude },
      { latitude: venue.latitude, longitude: venue.longitude }
    );

    if (distance > venue.radius) {
      return res.status(400).json({ message: 'Outside allowed radius' });
    }

    // Store clock-in
    await supabase.from('clock_ins').insert([
      {
        user_id: userId,
        venue_id: venueId,
        latitude,
        longitude,
        distance,
      },
    ]);

    return res.json({ message: 'Clock-in successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};