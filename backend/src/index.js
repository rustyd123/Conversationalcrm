const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const userRoutes = require('./routes/users');
const auth = require('./middleware/auth'); // Import the auth middleware

// Create an Express application
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = 'mongodb+srv://russelldelbridge2020:Blackgate123!@conversationalcrm.ugaupe6.mongodb.net/ConversationalCRM?retryWrites=true&w=majority&appName=ConversationalCRM';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Use routes
app.use('/api/users', userRoutes);

// Define a protected route
app.get('/api/protected', auth, (req, res) => {
  res.json({ msg: 'This is a protected route' });
});

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


