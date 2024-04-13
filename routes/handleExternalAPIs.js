const express = require('express');
const router = express.Router();

const { 
    sendDataToAPI,
    fetchDataFromAPI,
    fetchDataAndSaveToIndexedDB
 } = require('../controllers/handleExternalAPIs');

const { fetchData } = require('../controllers/generateAPIsAndFetchData');

const { checkInternet } = require('../controllers/checkInternetAndICDService')

router.post('/send-data/', sendDataToAPI);
// router.get('/fetch-data/', fetchDataAndSaveToIndexedDB);
router.get('/generate-data/:orgUnit', fetchData);

router.get('/internet', checkInternet);



module.exports = router;