const express = require('express');

const app = express();
const port = 3000;

let counter = 0;

app.get('/pingpong', (_, res) => {
    res.status(200).send(`pong ${counter}`);
    counter++;
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})