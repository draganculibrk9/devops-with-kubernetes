import {generateHash} from 'random-hash';
import express from 'express';

const app = express();

const port = 3000;

let hash;
let timestamp;

app.get('/', (_, res) => {
    hash = generateHash();
    timestamp = new Date().toJSON();

    res.sendStatus(204);
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})