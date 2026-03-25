import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';
import { ClockInRequest, ClockInResponse, Venue } from '@shared/types';
import { isWithinRadius } from '../services/geoService';
import { getDistance } from 'geolib';

export const clockIn = async (
  req: Request<{}, {}, ClockInRequest>,
  res: Response<ClockInResponse>
) => {
  try {
    const userId = '11111111-1111-1111-1111-111111111111';

    const { venueId, latitude, longitude } = req.body;

    const { data, error } = await supabase
      .from('venues')
      .select('*')
      .eq('id', venueId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: 'Venue not found' });
    }

    const venue = data as Venue;

    //is user within allowed radius
    const valid = isWithinRadius(
      latitude,
      longitude,
      venue.latitude,
      venue.longitude,
      venue.radius
    );

    if (!valid) {
      return res.status(400).json({ message: 'Outside allowed radius' });
    }

    // Calculate exact distance using geolib

    const distance = getDistance(
      { latitude, longitude },
      { latitude: venue.latitude, longitude: venue.longitude }
    );

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

