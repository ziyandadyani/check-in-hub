import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';
import type { Venue } from '@shared/types';

export const getVenues = async (req: Request, res: Response) => {
  try {
    // Select only the columns we need
    const { data, error } = await supabase
      .from('venues')
      .select('id, name, latitude, longitude, radius, address');

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    // Map data to match your TS type if needed
    const formattedData: Venue[] = (data || []).map((venue) => ({
      id: venue.id,
      name: venue.name,
      latitude: venue.latitude,
      longitude: venue.longitude,
      radius: venue.radius,       // already exists
      address: venue.address || '', // fallback to empty string if null
    }));

    res.json({ data: formattedData });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};