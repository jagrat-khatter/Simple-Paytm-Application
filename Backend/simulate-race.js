// simulate-race.js
const axios = require('axios');

const url = 'http://localhost:3000/api/v1/account/transfer'; // <-- fixed here
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRyaWxsYmFieWRyaWxsQGdtYWlsLmNvbSIsImlhdCI6MTc1MDcwMzAxOCwiZXhwIjoxNzUwNzEwMjE4fQ.IUFk4JjPOAaZIk1rPBJ8Ii7ge9XD3-8xcQ6rhNF2IEk';

const payload = {
  to: "6858281f5a8489683cc0f77e",
  amount: 100
};

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

async function sendTransfer() {
  try {
    const res = await axios.post(url, payload, { headers });
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
Promise.all([sendTransfer(), sendTransfer()]);