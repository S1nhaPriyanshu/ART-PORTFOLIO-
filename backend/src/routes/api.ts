import { Router } from 'express';
import multer from 'multer';
import { 
  getPortfolioItems, 
  getPortfolioItemById 
} from '../controllers/portfolio.controller';
import { getTeasers } from '../controllers/teaser.controller';
import { subscribeNewsletter } from '../controllers/newsletter.controller';
import { 
  submitCommission, 
  createPaymentIntent, 
  handleStripeWebhook 
} from '../controllers/commission.controller';

const router = Router();

// Configure multer for memory storage (we will upload directly to Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  }
});

// Portfolio
router.get('/portfolio-items', getPortfolioItems);
router.get('/portfolio-items/:id', getPortfolioItemById);

// Teasers
router.get('/teasers', getTeasers);

// Newsletter
router.post('/subscribe-newsletter', subscribeNewsletter);

// Commissions
router.post('/submit-commission', upload.array('files', 5), submitCommission);
router.post('/create-payment-intent', createPaymentIntent);

// Webhooks
// Note: This endpoint must receive raw body, which is handled in index.ts
router.post('/webhooks/stripe', handleStripeWebhook);

export default router;
