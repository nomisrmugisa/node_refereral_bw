const express = require('express');
const router = express.Router();

const {
    checkInternet,
    // checkICDService
    // checkInternetConnectivity
} = require('../controllers/checkInternetAndICDService');

router.get('/internet-status/', checkInternet);
// router.get('/service-status/:serviceName', checkICDService);

module.exports = router;