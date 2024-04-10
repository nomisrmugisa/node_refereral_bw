const axios = require('axios');
const EXTERNAL_API_URL2 = 'https://ug.sk-engine.cloud/hmis/api/events.json?ou=FvewOonC8lS&fields=event&paging=false';


// Function to generate API URLs for each event
async function generateAPIsAndFetchData() {
    const username = 'admin';
    const password = 'Nomisr123$$';
    const encodedCredentials = Buffer.from(username + ':' + password).toString('base64');
    try {
        const response = await axios.get(EXTERNAL_API_URL2, {
            headers: {
                'Authorization': 'Basic ' + encodedCredentials,
                'Content-Type': 'application/json'
            }
        });
        const events = response.data;
        const apiPromises = events.events.map(event => {
            const apiUrl = `https://ug.sk-engine.cloud/hmis/api/events.json?event=${event}`;
            return axios.get(apiUrl, {
                headers: {
                    'Authorization': 'Basic ' + encodedCredentials,
                    'Content-Type': 'application/json'
                }
            });; // Fetch data for each event
        });
        const eventData = await Promise.all(apiPromises);
        return eventData.map(response => response.data);
    } catch (error) {
        console.error('Error fetching data from the external API:', error);
        throw error;
    }
}

// Endpoint to fetch data from the external APIs with basic authentication
const fetchData = async (req, res) => {    
    try {
        // Fetch data from generated APIs
        const data = await generateAPIsAndFetchData();
        console.log('Data successfully retrieved');
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from the external APIs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    fetchData
}