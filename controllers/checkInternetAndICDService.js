const { exec } = require('child_process');
const ping = require('ping');

const dns = require('dns');
// const powershellPath = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe';


// Endpoint to check internet connectivity
const checkInternet = async (req, res) => {
  dns.lookup('google.com', (err) => {
    if (err && err.code === 'ENOTFOUND') { 
      console.log('Internet - Not connected');
      res.json({ internet: false });
    } else {
      console.log('Internet - Connected');
      res.json({ internet: true });
    }
  });
};


// function checkServiceStatus(serviceName) {
//     return new Promise((resolve, reject) => {
//         const command = `"${powershellPath}" -Command "Get-Service -Name '${serviceName}' | Select-Object Status"`;

//         exec(command, (error, stdout, stderr) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }

//             if (stderr) {
//                 reject(stderr);
//                 return;
//             }

//             const status = stdout.trim();
//             resolve(status);
//         });
//     });
// }

// const checkICDService = async (req, res) => {
//     const { serviceName } = req.params;

//     checkServiceStatus(serviceName)
//         .then(status => {
//             res.json({ status });
//         })
//         .catch(error => {
//             res.status(500).json({ error: `Error checking status of ${serviceName}: ${error}` });
//         });
// };



// async function checkInternetConnectivity() {
//     try {
//         const res = await ping.promise.probe('8.8.8.8'); // Google's public DNS server
//         return res.alive;
//     } catch (error) {
//         console.error('Error occurred while checking internet connectivity:', error);
//         return false;
//     }
// }

// // Example usage
// checkInternetConnectivity().then(isConnected => {
//     if (isConnected) {
//         console.log('Internet is connected.');
//     } else {
//         console.log('No internet connection.');
//     }
// });


module.exports = {
    checkInternet,
    // checkICDService,
    // checkInternetConnectivity
}