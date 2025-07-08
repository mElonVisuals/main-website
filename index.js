const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT for Coolify

app.get('/', (req, res) => {
  res.send('Hello from Coolify!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});