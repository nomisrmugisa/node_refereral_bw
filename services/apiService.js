const axios = require('axios');

const fetchData = async () => {
    const url = `https://bw.dataforimplementation.org/communityapps/api/29/analytics/enrollments/query/jLZUGZPCtlu.json?dimension=pe:LAST_30_DAYS&dimension=ou:DXLuCbNJPcD;Z78jInEaVNm&dimension=uwIX32KJCB0.cJgi0Ats6pN&dimension=uwIX32KJCB0.W0FfQbUpNa8&dimension=uwIX32KJCB0.lTgeDEX0eR5&dimension=uwIX32KJCB0.lBsnyyhErPg&dimension=uwIX32KJCB0.i2AuLV6f1yq&dimension=uwIX32KJCB0.aK2jy6qwxKP&dimension=uwIX32KJCB0.txmDxp4wsxJ&dimension=uwIX32KJCB0.WYZJMNVPNaE&stage=uwIX32KJCB0&displayProperty=NAME&totalPages=false&outputType=ENROLLMENT&desc=enrollmentdate&paging=false`;
    try {
        const response = await axios.get(url, {
            auth: {
                username: 'admin',
                password: 'Moh.moh.2001',
            }
        });
        return response.data.rows;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const sendData = async (payload) => {
    const url = 'https://bw.dataforimplementation.org/communityapps/api/trackedEntityInstances';
    try {
        console.log('Sending bulk payload:', JSON.stringify(payload, null, 2));
        const response = await axios.post(url, payload, {
            auth: {
                username: 'admin',
                password: 'Moh.moh.2001',
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('Bulk response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Bulk sending error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    fetchData,
    sendData,
};
