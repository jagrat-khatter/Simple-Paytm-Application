// simulate-race.js
const axios = require('axios');

const url = 'http://localhost:3000/api/v1/account/transfer'; // <-- fixed here
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRyaWxsYmFieWRyaWxsQGdtYWlsLmNvbSIsImlhdCI6MTc1MDc5NzQ3NSwiZXhwIjoxNzUwODA0Njc1fQ.G5UJUcZ4lfrBWEM554mOwa4MyGcu6CDpIt5O1oztYQU';

const payload1 = {
  to: "6858281f5a8489683cc0f77e",
  amount: 100
};
const payload2 = {
  to: "6858328b7c0b7e5561b9b2a8",
  amount: 100
};

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

async function sendTransfer(payload) {
  try {
    const res = await axios.post(url, payload,  { headers });
    console.log('Response:', res.data);
  } catch (err) {
    if (err.response) {
      console.log('Error:', err.response.data);
    } else {
      console.log('Error:', err.message);
    }
  }
}

// Send two concurrent requests
Promise.all([sendTransfer(payload1), sendTransfer(payload2)]);