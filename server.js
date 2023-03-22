const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware for using the req.body object
app.use(express.json({ extended: false }));

/* app.get('/', (req, res) => {
  res.json({ message: 'Welcome Messages...' });
}); */

// Define Routes
app.use('/api/persons', require('./routes/persons'));
app.use('/api/counts', require('./routes/counts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
