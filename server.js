require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Integrate the data routes
app.use('/api', dataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});