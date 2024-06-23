"use strict";

// const express = require('express');
// const countryList = require('./api/countryList');
// const app = express();
// const axios = require('axios');
// const cors = require('cors');
// const PORT = 3001;

// app.use(cors());
// app.use("/", countryList);
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 3002;
const dbPath = path.join(__dirname, 'db.json');

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to get all users
app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(dbPath, 'utf8');
    const users = JSON.parse(data).users;
    res.json(users);
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).json({
      error: 'Failed to retrieve users'
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});