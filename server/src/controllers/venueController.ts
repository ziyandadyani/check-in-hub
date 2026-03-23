import { Request, Response } from 'express';
import { supabase } from '../utils/supaBaseClient';

export const getVenues = async (req: Request, res: Response) => {
  const { data } = await supabase.from('venues').select('*');
  res.json({ data });
};