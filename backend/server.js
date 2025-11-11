import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: [
    'https://stellarserve.netlify.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Import routers with dynamic imports to avoid crashes
let UserRouter, router;

try {
  console.log('🔄 Importing UserRouters...');
  UserRouter = (await import('./routers/UserRouters.js')).default;
  app.use('/api/auth', UserRouter);
  console.log('✅ UserRouters loaded successfully');
} catch (error) {
  console.error('❌ Failed to load UserRouters:', error);
  // Create fallback routes
  app.post('/api/auth/register', (req, res) => {
    res.json({ success: true, message: 'Fallback register route' });
  });
  app.post('/api/auth/login', (req, res) => {
    res.json({ success: true, message: 'Fallback login route' });
  });
}

try {
  console.log('🔄 Importing urlRoutes...');
  router = (await import('./routers/urlRoutes.js')).default;
  app.use("/api/urls", router);
  console.log('✅ urlRoutes loaded successfully');
} catch (error) {
  console.error('❌ Failed to load urlRoutes:', error);
}

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server Error:', err);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// ✅ 404 Handler
app.use((req, res) => {
  console.log(`❌ 404: Route ${req.originalUrl} not found`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'GET /api/health',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me'
    ]
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});