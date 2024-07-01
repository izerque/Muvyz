const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const muvyRoutes = require('./routes/muvyRoutes');
const { Pool } = require('pg');
const app = express();
const port = 5000;

// Configure CORS middleware
app.use(cors({
    origin: 'http://localhost:3000',  // The URL of your frontend application
    methods: 'GET,POST,PUT,DELETE',   // Allowed HTTP methods
    credentials: true,                 // Allow cookies to be sent with requests
    allowedHeaders: 'Content-Type,Authorization',  // Allowed request headers
}));

// Configure body parser middleware
app.use(bodyParser.json());

// Use movie routes after CORS and body parser middleware
app.use('/muvies', muvyRoutes);

// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'muvy_db',
    password: 'password',
    port: 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    client.release();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});