const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Import routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
