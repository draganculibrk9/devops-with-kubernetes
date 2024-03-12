const express = require('express');
const path = require('path');
const axios = require('axios').default;
const fs = require('fs/promises');
const fsSync = require('fs');
const moment = require('moment');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 3001;
const RANDOM_IMAGE_URL = 'https://picsum.photos/1200';
const IMAGE_DIRECTORY = '/usr/src/app/files/images';

const todos = [];

app.use(bodyParser.json());
app.use(cors());

const getRandomImage = async () => {
    const response = await axios.get(RANDOM_IMAGE_URL, {responseType: 'arraybuffer'});

    return response.data;
}

const getRandomDailyImage = async () => {
    const today = moment(new Date()).format('DD-MM-yyyy');
    const imageFile = path.join(IMAGE_DIRECTORY, `${today}.jpeg`);
    
    if (!fsSync.existsSync(IMAGE_DIRECTORY)) {
        await fs.mkdir(IMAGE_DIRECTORY);
    }

    if (!fsSync.existsSync(imageFile)) {
        const image = await getRandomImage();
        await fs.writeFile(imageFile, image);   
    }

    const imageData = await fs.readFile(imageFile);
    const base64Encoded = Buffer.from(imageData).toString('base64');
    
    return base64Encoded;
}

app.post('/todos', (req, res) => {
    todos.push(req.body.todo);
    res.sendStatus(201);
})

app.get('/todos', (_, res) => {
    res.send({ todos });
})

app.get('/image', async (_, res) => {
    const image = await getRandomDailyImage();
    res.send({image});
})

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})