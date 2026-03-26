import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';

export const getClockIns = async (req: Request, res: Response) => {
  try {
    const venueId = req.query.venueId as string | undefined;

    let query = supabase
      .from('clock_ins')
      .select(`
    id,
    user_id,
    venue_id,
    distance,
    created_at,
    user:users(name),
    venue:venues(name)
  `);
    if (venueId) {
      query = query.eq('venue_id', venueId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ data });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};