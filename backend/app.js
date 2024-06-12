const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS

mongoose.connect('mongodb://localhost:27017/conversational-crm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api/users', usersRouter);

module.exports = app;




