const express = require('express');
const app = express();
const port = 4000;

let fileLocations = {};

app.use(express.json());

app.post('/register', (req, res) => {
    const { filename, nodeUrl } = req.body;
    if (!fileLocations[filename]) {
        fileLocations[filename] = [];
    }
    fileLocations[filename].push(nodeUrl);
    res.send('File location registered');
});

app.get('/locate/:filename', (req, res) => {
    const filename = req.params.filename;
    const locations = fileLocations[filename];
    if (locations) {
        res.json(locations);
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(port, () => {
    console.log(`Metadata server running on port ${port}`);
});
