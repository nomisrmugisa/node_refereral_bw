require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());  

app.post('/api/mccod-underlying-cause', (req, res) => {
    const { codeA, codeB, codeC, codeD } = req.body;

    // Validate request body
    // if (!codeA || !codeB || !codeC || !codeD) {
    //     return res.status(400).json({ error: "Missing required fields in request body." });
    // }

    console.log('Received request body:', req.body);

    const payload = {
        "DeathCertificate": {
            "CertificateKey": "",
            "Issuer": "",
            "Comments": "",
            "FreeText": "",
            "ICDVersion": "",
            "ICDMinorVersion": "",
            "UCStated": null,
            "UCComputed": {
                "RuleEngine": "",
                "Reject": null,
                "Validate": null,
                "Timestamp": "",
                "UC": null,
                "UCComplete": null,
                "Report": "",
                "Errors": "",
                "Warnings": ""
            },
            "AdministrativeData": {
                "DateBirth": null,
                "DateDeath": null,
                "Sex": null,
                "EstimatedAge": ""
            },
            "Part1": [
                {
                    "Conditions": [
                        {
                            "Code": codeA,
                            "LinearizationURI": "",
                            "Text": "",
                            "FoundationURI": "",
                            "Interval": ""
                        }
                    ]
                },
                {
                    "Conditions": [
                        {
                            "Code": codeB,
                            "LinearizationURI": "",
                            "Text": "",
                            "FoundationURI": "",
                            "Interval": ""
                        }
                    ]
                },
                {
                    "Conditions": [
                        {
                            "Code": codeC,
                            "LinearizationURI": "",
                            "Text": "",
                            "FoundationURI": "",
                            "Interval": ""
                        }
                    ]
                },
                {
                    "Conditions": [
                      {
                        "Code": codeD,
                        "LinearizationURI": "",
                        "Text": "",
                        "FoundationURI": "",
                        "Interval": ""
                    }
                    ]
                },
                {
                    "Conditions": []
                }
            ],
            "Part2": {
                "Conditions": []
            },
            "Surgery": {
                "WasPerformed": null,
                "Reason": "",
                "Date": ""
            },
            "Autopsy": {
                "WasRequested": null,
                "Findings": null
            },
            "MannerOfDeath": {
                "MannerOfDeath": null,
                "DateOfExternalCauseOrPoisoning": "",
                "DescriptionExternalCause": "",
                "PlaceOfOccuranceExternalCause": null
            },
            "FetalOrInfantDeath": {
                "MultiplePregnancy": null,
                "Stillborn": null,
                "DeathWithin24h": null,
                "BirthHeight": null,
                "PregnancyWeeks": null,
                "AgeMother": null,
                "PerinatalDescription": ""
            },
            "MaternalDeath": {
                "WasPregnant": null,
                "TimeFromPregnancy": null,
                "PregnancyContribute": null
            }
        },
        "DorisSettings": {
            "fullyAutomatic": true,
            "lang": "en"
        }
    } ;

    axios.post('https://icd.who.int/doris/api/ucod/underlyingcauseofdeath/', payload, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        console.log('Doris API request successful.');
        console.log('Doris Report:', response.data);
        res.status(200).json({ "msg": "Doris Report", response: response.data });
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    });
});

const PORT = process.env.PORT || 3000; // Use environment variable if available
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
