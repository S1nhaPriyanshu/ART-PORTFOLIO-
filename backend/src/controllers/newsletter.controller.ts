import { Request, Response } from 'express';
import { supabase } from '../services/supabase';

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Unique violation
        return res.status(409).json({ success: false, error: 'Email already subscribed' });
      }
      throw error;
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed'
    });
  } catch (error: any) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ success: false, error: 'Failed to subscribe' });
  }
};
