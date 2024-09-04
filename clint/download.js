const axios = require('axios');
const fs = require('fs');

async function downloadFile(filename) {
    const { data: locations } = await axios.get(`http://localhost:4000/locate/${filename}`);

    for (let location of locations) {
        try {
            const response = await axios.get(`${location}/download/${filename}`, { responseType: 'stream' });
            response.data.pipe(fs.createWriteStream(`downloads/${filename}`));
            console.log('File downloaded');
            return;
        } catch (error) {
            console.log(`Failed to download from ${location}`);
        }
    }
    console.log('File not found on any node');
}

downloadFile('file.txt');
