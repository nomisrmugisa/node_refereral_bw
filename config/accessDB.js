// database.js

const { Connection } = require('node-odbc'); // Example: Use a library like node-odbc to connect to Access database

// Function to connect to the Access database
async function connectToDatabase() {
    try {
        const connection = await Connection.connect(`Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:\\Users\\Walter\\Desktop\\sk_Access1\\medicalCertificates_be.accdb`);
        return connection;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}

// Function to retrieve unsent records from the database
async function getUnsentRecords() {
    try {
        const connection = await connectToDatabase();
        // Query the database to get unsent records
        const queryResult = await connection.query("SELECT * FROM MedicalCertOfCauseOfDeath WHERE SentToApi = False");
        return queryResult;
    } catch (error) {
        console.error("Error retrieving unsent records:", error);
        throw error;
    }
}

// Export the functions to make them accessible to other modules
module.exports = {
    getUnsentRecords: getUnsentRecords
};
