const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // Coolify will set process.env.PORT

// Serve static files from the 'public' directory
// This line makes all files inside the 'public' folder accessible directly.
// For example, if you have 'public/css/style.css', it will be accessible at /css/style.css
// And if you request '/', it will automatically serve 'public/index.html' if it exists.
app.use(express.static(path.join(__dirname, 'public')));

// Optional: You can explicitly define a route for the root '/' if you need
// specific server-side logic before serving index.html.
// However, for most static sites, `express.static` handles this automatically.
// I'm including it here for clarity, but you could remove this app.get('/') block
// if express.static is sufficient for your needs (which it likely is).
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});