const express = require('express');
const path = require('path');
const axios = require('axios').default;
const fs = require('fs/promises');
const fsSync = require('fs');
const moment = require('moment');

const app = express();

app.use(express.static('/images'));
app.set('view engine', 'pug');

const port = 3000;

const RANDOM_IMAGE_URL = 'https://picsum.photos/1200';
const IMAGE_DIRECTORY = './images'//'/usr/src/app/files';

const getRandomImage = async () => {
    const response = await axios.get(RANDOM_IMAGE_URL, {responseType: 'arraybuffer'});

    return response.data;
}

const getRandomDailyImage = async () => {
    const today = moment(new Date()).format('DD-MM-yyyy');
    
    const imageFile = path.join(IMAGE_DIRECTORY, `${today}.jpeg`);
    
    if (fsSync.existsSync(imageFile)) {
        return;
    }

    const image = await getRandomImage();

    await fs.writeFile(imageFile, image);
}

app.get('/', async (_, res) => {
    await getRandomDailyImage();
    const today = moment(new Date()).format('DD-MM-yyyy');
    res.render('index', {image: `./${today}.jpeg`});
})

app.listen(port, () => {
    console.log(`Server started in port ${port}`)
})