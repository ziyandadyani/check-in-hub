import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';
import { ClockInRequest, ClockInResponse, Venue } from '@shared/types';
import { isWithinRadius } from '../services/geoService';

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

    await supabase.from('clock_ins').insert([
      {
        user_id: userId,
        venue_id: venueId,
        latitude,
        longitude,
      },
    ]);

    return res.json({ message: 'Clock-in successful' });
  } catch {
    return res.status(500).json({ message: 'Server error' });
  }
};

