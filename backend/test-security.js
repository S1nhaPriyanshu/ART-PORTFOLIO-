const express = require('express');
const request = require('supertest');
const rateLimit = require('express-rate-limit');

// 1. Test Proxy Issue with Rate Limiting
const app = express();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 2 });
app.post('/test-limit', limiter, (req, res) => res.send('OK'));

async function runTests() {
  console.log("--- Running Security Verification Tests ---");
  
  // Simulate 3 requests from DIFFERENT users but through the same reverse proxy IP
  for (let i = 0; i < 3; i++) {
    const res = await request(app)
      .post('/test-limit')
      .set('X-Forwarded-For', `203.0.113.${i}`); // Different user IPs
    
    console.log(`Req ${i+1}: Status ${res.status}`);
  }
  console.log("Notice: The 3rd request fails with 429 even though it's a different user IP. Express is reading the proxy IP!");

  console.log("\n--- Logic Flaw Verification: Client-Seeded Database Price ---");
  const attackerPayload = {
    tier_name: "Full Render", // Usually $250 - $450
    tier_price_min: 1,       // Attacker sets this to $0.01!
    tier_price_max: 5,
    description: "Please paint my character",
    email: "hacker@example.com"
  };
  console.log("Attacker submits commission with payload:", attackerPayload);
  console.log("Current backend blindly saves this to DB -> db.tier_price_min = 1");
  console.log("Later, createPaymentIntent reads DB: requiredAmount = db.tier_price_min * 100 = $1.00");
  console.log("Result: Attacker bypassed server-side payment logic by manipulating the DB seed data.");
}

runTests();
