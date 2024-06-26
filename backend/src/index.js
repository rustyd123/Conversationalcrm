const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const clientRouter = require('./routes/clients');
const invoiceRouter = require('./routes/invoices'); // Import the invoices route
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/conversationalcrm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Routes
app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/invoices', invoiceRouter); // Add the invoices route

// Error handling middleware
app.use(errorHandler);

// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
