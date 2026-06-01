const http = require('http');

let value = 200;
let trendingUp = true;

setInterval(() => {
  // Simulate some fluctuation
  if (trendingUp) {
    value += Math.floor(Math.random() * 30);
    if (value > 600) trendingUp = false;
  } else {
    value -= Math.floor(Math.random() * 30);
    if (value < 100) trendingUp = true;
  }

  const postData = JSON.stringify({ gasValue: value });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/gas-data',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode} - Posted: ${value}`);
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}, 1000);
