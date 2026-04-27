import { Request, Response } from 'express';
import { supabase } from '../services/supabase';

export const getPortfolioItems = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    let query = supabase
      .from('portfolio_items')
      .select('*', { count: 'exact' })
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    res.status(200).json({
      success: true,
      data,
      total: count || 0,
      limit,
      offset
    });
  } catch (error: any) {
    console.error('Error fetching portfolio items:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio items' });
  }
};

export const getPortfolioItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, error: 'Item not found' });
      }
      throw error;
    }

    res.status(200).json({
      success: true,
      data
    });
  } catch (error: any) {
    console.error(`Error fetching portfolio item ${req.params.id}:`, error);
    res.status(500).json({ success: false, error: 'Failed to fetch portfolio item' });
  }
};
