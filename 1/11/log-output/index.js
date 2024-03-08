import {generateHash} from 'random-hash';
import fs from 'fs/promises';

const PONG_FILE = '/usr/src/app/files/pong.txt';

const readPingsFromFile = async () => {
    return (await fs.readFile(PONG_FILE)).toString();
}

const displayGeneratedStringOnStartup = async () => {
    const hash = generateHash();

    const displayString = async () => {
        const timestamp = new Date().toJSON();
        const pings = await readPingsFromFile();
        
        console.log(`${timestamp}: ${hash}`);
        console.log(`Ping / Pongs: ${pings}`)
        setTimeout(displayString, 5000);
    }
    await displayString();
}

await displayGeneratedStringOnStartup();
