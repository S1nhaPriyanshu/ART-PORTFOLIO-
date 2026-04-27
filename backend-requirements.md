# Backend Requirements — Atelier Tenebris

> **Purpose:** This document details everything the backend developer needs to build the server and database to support the Atelier Tenebris frontend. It specifies all API endpoints, request/response payloads, and recommended data models.

---

## Table of Contents

1. [Tech Stack Recommendations](#tech-stack-recommendations)
2. [API Endpoints](#api-endpoints)
3. [Detailed Endpoint Specifications](#detailed-endpoint-specifications)
4. [Database Schemas](#database-schemas)
5. [File Upload Requirements](#file-upload-requirements)
6. [Authentication Notes](#authentication-notes)
7. [Environment Variables](#environment-variables)

---

## Tech Stack Recommendations

| Layer | Suggested Technology |
|-------|---------------------|
| Runtime | Node.js 20+ |
| Framework | Express.js or Fastify |
| Database | PostgreSQL or MongoDB |
| File Storage | AWS S3 / Cloudflare R2 / Supabase Storage |
| Payments | Stripe API |
| Email | Resend / SendGrid |
| Hosting | Vercel / Railway / Fly.io |

---

## API Endpoints

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|:---:|
| `GET` | `/api/portfolio-items` | Fetch all portfolio items | No |
| `GET` | `/api/portfolio-items/:id` | Fetch single portfolio item | No |
| `POST` | `/api/submit-commission` | Submit commission form + files | No |
| `POST` | `/api/create-payment-intent` | Create Stripe payment intent | No |
| `POST` | `/api/webhooks/stripe` | Handle Stripe webhook events | No* |
| `POST` | `/api/subscribe-newsletter` | Subscribe to newsletter | No |
| `GET` | `/api/teasers` | Fetch upcoming project teasers | No |

> \* Stripe webhooks are authenticated via webhook signature verification, not user auth.

---

## Detailed Endpoint Specifications

### 1. `GET /api/portfolio-items`

Returns all portfolio items for the gallery page.

**Query Parameters (optional):**
```
?category=Environment    // Filter by category
?limit=20               // Pagination limit
?offset=0               // Pagination offset
```

**Response — 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "title": "Gothic Courtyard",
      "category": "Environment",
      "description": "Rain-soaked gothic courtyard with arched ruins...",
      "image": "https://cdn.example.com/art/gothic-courtyard.jpg",
      "thumbnail": "https://cdn.example.com/art/gothic-courtyard-thumb.jpg",
      "span": 2,
      "year": 2026,
      "tags": ["environment", "gothic", "digital-painting"],
      "createdAt": "2026-01-15T00:00:00Z"
    }
  ],
  "total": 7,
  "limit": 20,
  "offset": 0
}
```

---

### 2. `GET /api/portfolio-items/:id`

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "title": "Gothic Courtyard",
    "category": "Environment",
    "description": "Rain-soaked gothic courtyard with arched ruins...",
    "image": "https://cdn.example.com/art/gothic-courtyard.jpg",
    "fullResImage": "https://cdn.example.com/art/gothic-courtyard-full.jpg",
    "span": 2,
    "year": 2026,
    "tags": ["environment", "gothic", "digital-painting"],
    "dimensions": { "width": 3840, "height": 2160 },
    "medium": "Digital Painting — Clip Studio Paint",
    "createdAt": "2026-01-15T00:00:00Z"
  }
}
```

**Response — 404 Not Found:**
```json
{
  "success": false,
  "error": "Portfolio item not found"
}
```

---

### 3. `POST /api/submit-commission`

Receives the commission form data. Uses `multipart/form-data` for file uploads.

**Request — `multipart/form-data`:**

| Field | Type | Required | Description |
|-------|------|:---:|-------------|
| `tierName` | string | ✓ | Selected pricing tier name |
| `tierPriceMin` | number | ✓ | Minimum price of selected tier |
| `tierPriceMax` | number | ✓ | Maximum price of selected tier |
| `description` | string | ✓ | Client's vision description (max 2000 chars) |
| `email` | string | ✓ | Client's email address |
| `style` | string | | Preferred art style |
| `notes` | string | | Additional notes |
| `referenceFiles` | File[] | | Up to 5 image files, max 10MB each |

**Response — 201 Created:**
```json
{
  "success": true,
  "data": {
    "commissionId": "uuid-string",
    "orderRef": "AT-M1K2N3",
    "status": "pending_payment",
    "estimatedTurnaround": "1–2 weeks",
    "createdAt": "2026-04-27T10:00:00Z"
  }
}
```

**Response — 400 Bad Request:**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "description": "Description must be at least 10 characters",
    "email": "Invalid email format"
  }
}
```

---

### 4. `POST /api/create-payment-intent`

Creates a Stripe PaymentIntent for commission payment.

**Request — JSON:**
```json
{
  "commissionId": "uuid-string",
  "amount": 12000,
  "currency": "usd"
}
```

> Note: `amount` is in cents (e.g., $120.00 = 12000)

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "clientSecret": "pi_xxx_secret_xxx",
    "paymentIntentId": "pi_xxx"
  }
}
```

---

### 5. `POST /api/webhooks/stripe`

Handles Stripe webhook events. The request body is the raw Stripe event payload.

**Events to handle:**
- `payment_intent.succeeded` → Update commission status to `paid`
- `payment_intent.payment_failed` → Update commission status to `payment_failed`

**Headers required:**
```
Stripe-Signature: t=timestamp,v1=signature
```

**Response — 200 OK:**
```json
{ "received": true }
```

---

### 6. `POST /api/subscribe-newsletter`

**Request — JSON:**
```json
{
  "email": "user@example.com"
}
```

**Response — 201 Created:**
```json
{
  "success": true,
  "message": "Successfully subscribed"
}
```

**Response — 409 Conflict:**
```json
{
  "success": false,
  "error": "Email already subscribed"
}
```

---

### 7. `GET /api/teasers`

Returns upcoming project teasers for the teaser page.

**Response — 200 OK:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-string",
      "title": "Project Aether",
      "date": "Reveal: Summer 2026",
      "image": "https://cdn.example.com/teasers/aether-blur.jpg",
      "status": "upcoming"
    }
  ]
}
```

---

## Database Schemas

### `portfolio_items`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-gen | Unique identifier |
| `title` | VARCHAR(200) | NOT NULL | Artwork title |
| `category` | VARCHAR(50) | NOT NULL | Category (Environment, Concept Art, Landscape) |
| `description` | TEXT | | Artwork description |
| `image` | VARCHAR(500) | NOT NULL | CDN URL to display image |
| `full_res_image` | VARCHAR(500) | | CDN URL to full-resolution image |
| `thumbnail` | VARCHAR(500) | | CDN URL to thumbnail |
| `span` | INTEGER | DEFAULT 1 | Grid span (1 or 2 columns) |
| `year` | INTEGER | | Year created |
| `tags` | TEXT[] | | Array of tags |
| `dimensions` | JSONB | | `{ width, height }` |
| `medium` | VARCHAR(200) | | Art medium/software |
| `sort_order` | INTEGER | DEFAULT 0 | Display order |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation date |

---

### `commissions`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-gen | Unique identifier |
| `order_ref` | VARCHAR(20) | UNIQUE, NOT NULL | Human-readable reference (e.g., AT-M1K2N3) |
| `tier_name` | VARCHAR(50) | NOT NULL | Selected pricing tier |
| `tier_price_min` | INTEGER | NOT NULL | Min price in cents |
| `tier_price_max` | INTEGER | NOT NULL | Max price in cents |
| `description` | TEXT | NOT NULL | Client's vision description |
| `email` | VARCHAR(254) | NOT NULL | Client's email |
| `style` | VARCHAR(50) | | Preferred art style |
| `notes` | TEXT | | Additional notes |
| `reference_files` | TEXT[] | | Array of file storage URLs |
| `status` | VARCHAR(30) | DEFAULT 'pending_payment' | Status enum (see below) |
| `payment_intent_id` | VARCHAR(200) | | Stripe PaymentIntent ID |
| `amount_paid` | INTEGER | | Amount paid in cents |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Submission timestamp |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Status enum values:**
- `pending_payment` — Form submitted, awaiting payment
- `paid` — Payment confirmed
- `in_progress` — Artist has started work
- `revision` — In revision round
- `completed` — Delivered to client
- `cancelled` — Cancelled
- `refunded` — Refunded
- `payment_failed` — Payment attempt failed

---

### `newsletter_subscribers`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-gen | Unique identifier |
| `email` | VARCHAR(254) | UNIQUE, NOT NULL | Subscriber email |
| `subscribed_at` | TIMESTAMP | DEFAULT NOW() | Subscription date |
| `unsubscribed_at` | TIMESTAMP | NULL | Unsubscribe date |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active subscription flag |

---

### `teasers`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PK, auto-gen | Unique identifier |
| `title` | VARCHAR(200) | NOT NULL | Project title |
| `date` | VARCHAR(100) | | Reveal date text |
| `image` | VARCHAR(500) | NOT NULL | Blurred teaser image URL |
| `status` | VARCHAR(30) | DEFAULT 'upcoming' | upcoming / revealed / archived |
| `sort_order` | INTEGER | DEFAULT 0 | Display order |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation date |

---

## File Upload Requirements

- **Max file size:** 10MB per file
- **Max files per commission:** 5
- **Accepted MIME types:** `image/jpeg`, `image/png`, `image/webp`
- **Storage:** Upload to cloud storage (S3/R2), store the URL in `commissions.reference_files`
- **Naming convention:** `commissions/{commissionId}/{timestamp}-{originalName}`

---

## Authentication Notes

The current frontend does **not** implement user authentication. All endpoints are public. If admin features are needed later (managing commissions, updating portfolio), consider:

- **Admin panel:** Separate protected route with session-based auth
- **API keys:** For admin-only endpoints
- **OAuth:** If client accounts are added later

---

## Environment Variables

The backend will need these environment variables:

```env
# Server
PORT=3001
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@host:5432/atelier_tenebris

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# File Storage (S3-compatible)
S3_BUCKET=atelier-tenebris-uploads
S3_REGION=us-east-1
S3_ACCESS_KEY=xxx
S3_SECRET_KEY=xxx
S3_ENDPOINT=https://s3.amazonaws.com

# Email (for commission confirmations)
EMAIL_API_KEY=xxx
EMAIL_FROM=commissions@ateliertenebris.art

# Frontend URL (for CORS)
FRONTEND_URL=https://ateliertenebris.art
```

---

## CORS Configuration

The backend must allow requests from the frontend origin:

```js
{
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
```

---

*Generated for the Atelier Tenebris frontend. Last updated: April 2026.*
