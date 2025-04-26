const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://vijay:vijay@sms.cn4zcdz.mongodb.net/?retryWrites=true&w=majority&appName=SMS';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/students', studentRoutes);

// Connect to MongoDB Atlas and start server
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => console.error('MongoDB connection error:', error));
