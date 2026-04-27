import { Request, Response } from 'express';
import { supabase } from '../services/supabase';

export const getTeasers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('teasers')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error('Error fetching teasers:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch teasers' });
  }
};
