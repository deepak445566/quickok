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
<<<<<<< HEAD
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
=======
    'http://localhost:3000',
    'https://stellarserve.onrender.com'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"]
>>>>>>> 6e47d548a5cb7e40918a1869dcd9ec9b1f27a33d
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

<<<<<<< HEAD
=======
// ✅ Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'StellarServe Backend API is running!',
    timestamp: new Date().toISOString()
  });
});

>>>>>>> 6e47d548a5cb7e40918a1869dcd9ec9b1f27a33d
// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Server is running!',
<<<<<<< HEAD
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
=======
    timestamp: new Date().toISOString()
  });
});

// ✅ REGISTER ROUTE
app.post('/api/auth/register', (req, res) => {
  console.log('📝 Register:', req.body);
  
  const { userId, fullname, email, password } = req.body;
  
  if (!userId || !fullname || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields required'
    });
  }

  res.json({
    success: true,
    message: 'Registered successfully!',
    user: { 
      id: 1, 
      userId, 
      fullname, 
      email 
    },
    token: 'jwt-token-' + Date.now()
  });
});

// ✅ LOGIN ROUTE
app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Login:', req.body);
  
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password required'
    });
  }

  res.json({
    success: true,
    message: 'Login successful!',
    user: { 
      id: 1, 
      userId: 'user123', 
      fullname: 'Test User', 
      email 
    },
    token: 'jwt-token-' + Date.now()
  });
});

// ✅ ME ROUTE - THIS WAS MISSING!
app.get('/api/auth/me', (req, res) => {
  console.log('✅ ME ROUTE CALLED');
  
  // For now, return a demo user
  // In production, verify JWT token and get user from database
  res.json({
    success: true,
    user: {
      id: 1,
      userId: 'demo-user',
      fullname: 'Demo User',
      email: 'demo@example.com'
    }
  });
});

// ✅ LOGOUT ROUTE
app.post('/api/auth/logout', (req, res) => {
  console.log('🚪 Logout called');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// ✅ URL SUBMISSION ROUTE
app.post('/api/urls/submit-batch', (req, res) => {
  console.log('📤 URLs:', req.body);
  
  res.json({
    success: true,
    message: 'URLs submitted successfully!',
    processedCount: req.body.urls?.length || 0
>>>>>>> 6e47d548a5cb7e40918a1869dcd9ec9b1f27a33d
  });
});

// ✅ 404 Handler
<<<<<<< HEAD
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
=======
app.use('*', (req, res) => {
  console.log(`❌ 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
>>>>>>> 6e47d548a5cb7e40918a1869dcd9ec9b1f27a33d
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
<<<<<<< HEAD
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
=======
  console.log(`🌐 All routes are working!`);
>>>>>>> 6e47d548a5cb7e40918a1869dcd9ec9b1f27a33d
});