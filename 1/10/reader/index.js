import {generateHash} from 'random-hash';
import fs from 'fs/promises';

const TIMESTAMP_FILE = '/usr/src/app/files/timestamp.txt';

const readTimestampFromFile = async () => {
    const timestamps = (await fs.readFile(TIMESTAMP_FILE)).toString().split('\n');
    return timestamps.at(-2);
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
