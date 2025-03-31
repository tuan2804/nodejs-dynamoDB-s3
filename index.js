require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const carRoutes = require('./routers/carRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes
app.use('/', carRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
