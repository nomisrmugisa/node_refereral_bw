// Node.js backend API to handle incoming values and modify JSON
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { parse, format } = require('date-fns');


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());  

app.post('/api/data/parseJSON', (req, res) => {
    // Receive values from Access/Angular form fields
    const { event, name, nin, age, sex} = req.body;
    
    // const formattedDOB = format(parse(req.body.dob, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
    // const formatted_dt_death = format(parse(req.body.dt_death, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd\'T\'HH:mm:ss.SSS');
    console.log('Received request body:', req.body);
    // Replace values in JSON object
    let modifiedJson = {
        "events": [{
                "programStage": "aKclf7Yl1PE",
                "programType": "WITH_REGISTRATION",
                "orgUnit": "FvewOonC8lS",
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
                        "value": '', //formattedDOB,
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
                        "value": '', //formatted_dt_death,
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
    axios.post('https://ug.sk-engine.cloud/hmis/api/events', modifiedJson, 
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
});

const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






