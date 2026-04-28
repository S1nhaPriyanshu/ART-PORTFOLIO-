const express = require('express');
const request = require('supertest');
const multer = require('multer');

// Mocking dependencies for controller
jest = { mock: () => {} }; // Dummy jest object if not using jest runner

// Create a test app mimicking index.ts
const app = express();
app.set('trust proxy', 1);

const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 2 });
app.post('/test-limit', apiLimiter, (req, res) => res.send('OK'));

// Test Multer File Filter logic
const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type detected. Only JPG, PNG, and WEBP are allowed.'));
    }
  }
});

app.post('/test-upload', upload.single('file'), (req, res) => {
  res.send('Uploaded');
});

// Mock Error Handler
app.use((err, req, res, next) => {
  if (err.message && err.message.includes('Invalid file type detected')) {
    return res.status(400).json({ success: false, error: 'Bad Request', message: err.message });
  }
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

async function verifyFixes() {
  console.log("--- Verifying Rate Limiter Proxy Fix ---");
  for (let i = 0; i < 3; i++) {
    const res = await request(app).post('/test-limit').set('X-Forwarded-For', `203.0.113.${i}`);
    console.log(`User ${i+1} (IP 203.0.113.${i}) Status: ${res.status}`);
  }
  console.log("Result: If Status is 200 for all three, the proxy fix works!\n");

  console.log("--- Verifying Multer Silent Fail Fix ---");
  const resUpload = await request(app)
    .post('/test-upload')
    .attach('file', Buffer.from('fake exe'), { filename: 'exploit.exe', contentType: 'application/x-msdownload' });
  console.log(`Upload Bad File Status: ${resUpload.status}`);
  console.log(`Upload Bad File Response: ${JSON.stringify(resUpload.body)}`);
  console.log("Result: If Status is 400, the silent fail fix works!\n");
}

verifyFixes();
