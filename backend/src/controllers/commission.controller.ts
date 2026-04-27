import { Request, Response } from 'express';
import { supabase } from '../services/supabase';
import { stripe } from '../services/stripe';
import crypto from 'crypto';
import Stripe from 'stripe';

// Helper to generate order ref
const generateOrderRef = () => {
  return 'AT-' + crypto.randomBytes(3).toString('hex').toUpperCase();
};

export const submitCommission = async (req: Request, res: Response) => {
  try {
    const { tier_name, tier_price_min, tier_price_max, description, email, style, notes } = req.body;
    const files = req.files as Express.Multer.File[];

    // Basic validation
    if (!tier_name || !tier_price_min || !tier_price_max || !description || !email) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        details: { message: 'Missing required fields' }
      });
    }

    const order_ref = generateOrderRef();
    const uploadedFileUrls: string[] = [];

    // Upload files to Supabase Storage if present
    if (files && files.length > 0) {
      for (const file of files) {
        const fileExt = file.originalname.split('.').pop();
        const fileName = `${order_ref}/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('commissions')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });

        if (error) {
          console.error('File upload error:', error);
          continue; // skip failed files or throw error based on strictness
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('commissions')
          .getPublicUrl(fileName);
          
        uploadedFileUrls.push(publicUrl);
      }
    }

    // Insert commission record
    const { data: commission, error: dbError } = await supabase
      .from('commissions')
      .insert([{
        order_ref,
        tier_name,
        tier_price_min: parseInt(tier_price_min),
        tier_price_max: parseInt(tier_price_max),
        description,
        email,
        style,
        notes,
        reference_files: uploadedFileUrls,
        status: 'pending_payment'
      }])
      .select()
      .single();

    if (dbError) throw dbError;

    res.status(201).json({
      success: true,
      data: commission
    });
  } catch (error: any) {
    console.error('Error submitting commission:', error);
    res.status(500).json({ success: false, error: 'Failed to submit commission' });
  }
};

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { commissionId, amount, currency = 'usd' } = req.body;

    if (!commissionId || !amount) {
      return res.status(400).json({ success: false, error: 'Missing commissionId or amount' });
    }

    // Optional: Verify commission exists in DB
    const { data: commission, error } = await supabase
      .from('commissions')
      .select('*')
      .eq('id', commissionId)
      .single();
      
    if (error || !commission) {
      return res.status(404).json({ success: false, error: 'Commission not found' });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(amount), // in cents
      currency,
      metadata: {
        commissionId,
        order_ref: commission.order_ref
      },
    });

    // Update commission with payment intent ID
    await supabase
      .from('commissions')
      .update({ payment_intent_id: paymentIntent.id })
      .eq('id', commissionId);

    res.status(200).json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      }
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ success: false, error: 'Failed to create payment intent' });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (!endpointSecret) throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        if (paymentIntent.metadata.commissionId) {
          await supabase
            .from('commissions')
            .update({ 
              status: 'paid',
              amount_paid: paymentIntent.amount
            })
            .eq('id', paymentIntent.metadata.commissionId);
        }
        break;
      case 'payment_intent.payment_failed':
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        if (failedIntent.metadata.commissionId) {
          await supabase
            .from('commissions')
            .update({ status: 'payment_failed' })
            .eq('id', failedIntent.metadata.commissionId);
        }
        break;
      default:
        // Unhandled event type
        break;
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Internal Server Error processing webhook' });
  }
};
