const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const muvyRoutes = require('./routes/muvyRoutes');
app.use('/muvies', muvyRoutes);


const { Pool } = require('pg');
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/muvies', muvyRoutes);


// Database connection
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'muvy_db',
    password: 'X12024',
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