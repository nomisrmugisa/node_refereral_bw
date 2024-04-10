// Node.js backend API to handle incoming values and modify JSON
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;

const { fetchDataAndSaveToIndexedDB } = require('./controllers/handleExternalAPIs');
const handleAPIsRoute = require('./routes/handleExternalAPIs');
const checkInternetAndICDService = require('./routes/checkInternetAndICDService');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());  

app.use('/handle-api/', handleAPIsRoute);
app.use('/check-status/', checkInternetAndICDService);
 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Call the function to fetch data and save to IndexedDB
    // fetchDataAndSaveToIndexedDB();
});






