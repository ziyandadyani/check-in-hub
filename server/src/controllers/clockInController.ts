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
    const { venueId, latitude, longitude, userId } = req.body;

    // 1️⃣ Validate required fields
    if (!userId || !venueId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 2️⃣ Check venue exists
    const { data: venueData, error: venueError } = await supabase
      .from('venues')
      .select('*')
      .eq('id', venueId)
      .single();

    if (venueError || !venueData) {
      return res.status(404).json({ message: 'Venue not found', error: venueError });
    }

    const venue = venueData as Venue;

    // 3️⃣ Check user is within allowed radius
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

    // 4️⃣ Calculate exact distance
    const distance = getDistance(
      { latitude, longitude },
      { latitude: venue.latitude, longitude: venue.longitude }
    );

    // 5️⃣ Insert clock-in and check result
    const { data: inserted, error: insertError } = await supabase
      .from('clock_ins')
      .insert([
        {
          user_id: userId,
          venue_id: venueId,
          latitude,
          longitude,
          distance,
          created_at: new Date().toISOString(),
        },
      ])
      .select(); // return inserted row

    if (insertError) {
      console.error('Clock-in insert error:', insertError);
      return res.status(500).json({ message: 'Clock-in failed', error: insertError });
    }

    console.log('Clock-in inserted:', inserted);

    return res.json({
      message: 'Clock-in successful',
      clockIn: inserted[0], // send back the inserted record
    });
  } catch (err) {
    console.error('Server error during clock-in:', err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};