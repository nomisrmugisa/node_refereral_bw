const axios = require('axios');
const { parse, format } = require('date-fns');

const { openDB } = require('idb');
const DATABASE_NAME = 'MedicalCertificateOfCauseOfDeath';
const DATABASE_VERSION = 3;
const OBJECT_STORE_NAME = 'events';

const EXTERNAL_API_URL1 = 'https://ug.sk-engine.cloud/hmis/api/events.json?event=Q45JrKcYRhw';


// Send data to API
const sendDataToAPI = (req, res) => {
    // Receive values from Access/Angular form fields
    const { event, name, nin, dob, age, sex, dtD, orgUnit } = req.body;
    
    const EXTERNAL_API_URL = `https://ug.sk-engine.cloud/hmis/api/events.json?ou=${orgUnit}&fields=event&paging=false`;
    
    // const formattedDOB = format(parse(req.body.dob, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
    // const formatted_dt_death = format(parse(req.body.dtB, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
    

    // Replace values in JSON object
    let modifiedJson = {
        "events": [{
                "programStage": "aKclf7Yl1PE",
                "programType": "WITH_REGISTRATION",
                "orgUnit": orgUnit,
                "program": "vf8dN49jprI",
                "event": event,
                "status": "COMPLETED",
                "eventDate": "2023-10-04T00:00:00.000",
                "created": "2024-02-03T11:11:30.892",
                "lastUpdated": "2024-02-13T07:51:28.818",
                "followup": "false",
                "deleted": false,
                "attributeCategoryOptions": "l4UMmqvSBe5",
                "dataValues": [{
                        "lastUpdated": "2024-02-13T07:51:28.817",
                        "created": "2024-02-03T11:11:30.880",
                        "dataElement": "ZYKmQ9GPOaF",
                        "value": name,
                        "providedElsewhere": false,
                        "createdByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        },
                        "lastUpdatedByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        }
                    },
                    {
                        "lastUpdated": "2024-02-13T07:51:28.817",
                        "created": "2024-02-03T11:11:30.880",
                        "dataElement": "MOstDqSY0gO",
                        "value": nin,
                        "providedElsewhere": false,
                        "createdByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        },
                        "lastUpdatedByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        }
                    },
                    {
                        "lastUpdated": "2024-02-13T07:51:28.817",
                        "created": "2024-02-03T11:11:30.880",
                        "dataElement": "RbrUuKFSqkZ",
                        "value": dob,
                        "providedElsewhere": false,
                        "createdByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        },
                        "lastUpdatedByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        }
                    },
                    {
                        "lastUpdated": "2024-02-13T07:51:28.817",
                        "created": "2024-02-03T11:11:30.880",
                        "dataElement": "q7e7FOXKnOf",
                        "value": age,
                        "providedElsewhere": false,
                        "createdByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        },
                        "lastUpdatedByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test" }
                    },
                    {
                        "lastUpdated": "2024-02-13T07:51:28.817",
                        "created": "2024-02-03T11:11:30.880",
                        "dataElement": "e96GB4CXyd3",
                        "value": sex,
                        "providedElsewhere": false,
                        "createdByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        },
                        "lastUpdatedByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test" }
                    },
                    {
                        "lastUpdated": "2024-02-13T07:51:28.817",
                        "created": "2024-02-03T11:11:30.880",
                        "dataElement": "i8rrl8YWxLF",
                        "value": dtD,
                        "providedElsewhere": false,
                        "createdByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test"
                        },
                        "lastUpdatedByUserInfo": {
                            "uid": "eJjgH9bgUp2",
                            "firstName": "Save",
                            "surname": "the Children ",
                            "username": "Sci_test" }
                    }
                ]
            }
        ]
    
    } 
    // Define username and password
    const username = 'admin';
    const password = 'Nomisr123$$';
    const encodedCredentials = Buffer.from(username + ':' + password).toString('base64');
    // Call function to post modified JSON to another API endpoint
    // You can use any HTTP client library like axios or request
    // Example with axios:
    axios.post(EXTERNAL_API_URL, modifiedJson, 
    { headers: { 
        'Authorization': 'Basic ' + encodedCredentials,
        'Content-Type': 'application/json'
    }})
        .then(response => {
            console.log('Data sent to DHIS2 successfully.');
            console.log('Received request body:', req.body);

            res.status(200).json({"msg": "JSON sent successfully", modifiedJson});
        })
        .catch(error => {
            
            console.error(error);
            res.status(500).json(modifiedJson);
            
        });
};

// Endpoint to fetch data from the external API with basic authentication
const fetchDataFromAPI = async (req, res) => {
    const username = 'admin';
    const password = 'Nomisr123$$';
    const encodedCredentials = Buffer.from(username + ':' + password).toString('base64');

    try {
        const response = await axios.get(EXTERNAL_API_URL, {
            headers: {
                'Authorization': 'Basic ' + encodedCredentials,
                'Content-Type': 'application/json'
            }
        });

        // Extract the data from the response
        const data = response.data;
        console.log(data);
        // Do something with the data (e.g., send it in the response)
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from the external API:', error); 
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to fetch data from the external API and add records to IndexedDB
const fetchDataAndSaveToIndexedDB = async (req, res) => {
    
    const username = 'admin';
    const password = 'Nomisr123$$';
    const encodedCredentials = Buffer.from(username + ':' + password).toString('base64');
    try {       

        // Fetch data from the external API
        const response = await axios.get(EXTERNAL_API_URL1, {
            headers: {
                'Authorization': 'Basic ' + encodedCredentials,
                'Content-Type': 'application/json'
            }
        });

        // Extract the data from the response
        const data = response.data;
        // Open the IndexedDB database
        const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
            upgrade(db) {
                // Create object store if it doesn't exist
                if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
                    db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
                }
            },
        });

        // Store the fetched data in the IndexedDB database
        const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
        const store = tx.objectStore(OBJECT_STORE_NAME);
        data.forEach(record => {
            store.add(record);
        });

        await tx.done; // Wait for the transaction to complete
        console.log('Data added to IndexedDB successfully.');

    } catch (error) {
        console.error('Error fetching data or saving to IndexedDB:', error);
    }
}

module.exports = {
    sendDataToAPI,
    fetchDataFromAPI,
    
    // fetchDataAndSaveToIndexedDB
}
