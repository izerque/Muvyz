const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');
// Import routes
const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use('/api/items', itemRoutes);

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
