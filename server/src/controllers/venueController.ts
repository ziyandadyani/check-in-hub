import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';
import type { Venue } from '@shared/types';

export const getVenues = async (req: Request, res: Response) => {
  try {

    const { data, error } = await supabase
      .from('venues')
      .select('id, name, latitude, longitude, radius, address');

    if (error) {
      return res.status(500).json({ message: error.message });
    }


    const formattedData: Venue[] = (data || []).map((venue) => ({
      id: venue.id,
      name: venue.name,
      latitude: venue.latitude,
      longitude: venue.longitude,
      radius: venue.radius,
      address: venue.address || '',
    }));

    res.json({ data: formattedData });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};