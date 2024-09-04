const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

async function uploadFile(filePath) {
    const fileName = filePath.split('/').pop();
    const nodeUrl = 'http://localhost:3000';

    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    await axios.post(`${nodeUrl}/upload`, form, {
        headers: form.getHeaders()
    });

    await axios.post('http://localhost:4000/register', {
        filename: fileName,
        nodeUrl: nodeUrl
    });

    console.log('File uploaded and registered');
}

uploadFile('path/to/your/file.txt');
