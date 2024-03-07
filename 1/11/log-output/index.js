import {generateHash} from 'random-hash';
import fs from 'fs/promises';

const PINGPONG_FILE = '/usr/src/app/files/pingpong.txt';

const readPingPongsFromFile = async () => {
    return (await fs.readFile(PINGPONG_FILE)).toString();
}

const displayGeneratedStringOnStartup = async () => {
    const hash = generateHash();

    const displayString = async () => {
        const timestamp = await readTimestampFromFile();
        
        console.log(`${timestamp}: ${hash}`);
        setTimeout(displayString, 5000);
    }
    await displayString();
}

await displayGeneratedStringOnStartup();
