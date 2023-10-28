const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// Enable All CORS Requests
app.use(cors());

// Import API route modules
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})