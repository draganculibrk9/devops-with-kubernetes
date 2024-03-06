const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT;

app.get('/', (_, res) => {
    const htmlPath = path.join(__dirname, 'index.html');
    res.sendFile(htmlPath);
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})