const { fetchData, sendData } = require('../services/apiService');

const generateID = async (length = 11) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return new Promise((resolve) => {
        let result = '';
        setTimeout(() => {
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                result += characters[randomIndex];
            }
            resolve(result);
        }, 100);
    });
};

const processData = async (req, res) => {
    try {
        const data = await fetchData();
        console.log(`Fetched ${data.length} records`); // Log the number of records fetched

        // Build payload for all records dynamically
        const payloadPromises = data.map(async (row) => {
            const eventID = await generateID();
            const trackInstID = await generateID();

            return {
                orgUnit: row[15],                
                trackedEntityType: "UabBivFP6bT",
                             
                attributes: [
                    { attribute: "WYZJMNVPNaE", value: row[18] }, // Age
                    { attribute: "W0FfQbUpNa8", value: row[23] }, // Surname
                    { attribute: "cJgi0Ats6pN", value: row[19] }, // First Name
                    { attribute: "aK2jy6qwxKP", value: "" },      // ID Type
                    { attribute: "txmDxp4wsxJ", value: row[20] }, // ID Number
                ],
                enrollments: [
                    {
                        status: "ACTIVE",
                        trackedEntityInstance: trackInstID,
                        program: "FGcWdkme23d",
                        orgUnit: row[15],
                        enrollmentDate: new Date(row[3]).toISOString(),
                        incidentDate: new Date(row[3]).toISOString(),
                        "events": [
                            {
                                "program": "FGcWdkme23d",
                                "orgUnit": row[15],
                                "eventDate": new Date().toISOString(),
                                "status": "COMPLETED",
                                "storedBy": "admin",
                                "programStage": "QuU2w0mssHn",
                                "dataValues": [
                                    {
                                        dataElement: "iq30TxIHAQo",
                                        value: "HIV"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        });

        const trackedEntityInstances = await Promise.all(payloadPromises);
        console.log('-------------------- Bulk Payload --------------------');
        console.log('trackedEntityInstances', trackedEntityInstances);

        // Send the bulk payload
        const result = await sendData({ trackedEntityInstances });

        res.status(200).json(result);
        console.log('Data sent successfully:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({
            error: 'An error occurred while processing data.',
            payload: error.response ? error.response.data : error.message,
        });
    }
};

module.exports = {
    processData
};
