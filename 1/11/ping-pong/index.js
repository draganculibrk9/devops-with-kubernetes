const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

const PONG_FILE = '/usr/src/app/files/pong.txt';

const writeCount = async (count) => {
    fs.writeFile(PONG_FILE, count.toString());
}

let counter = 0;

app.get('/pingpong', async (_, res) => {
    res.status(200).send(`pong ${counter}`);
    await writeCount(counter);
    counter++;
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})