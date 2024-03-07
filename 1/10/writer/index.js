import {generateHash} from 'random-hash';
import fs from 'fs/promises';

const TIMESTAMP_FILE = '/usr/src/app/files/timestamp.txt';

const writeTimestampToFile = async (timestamp) => {
    await fs.appendFile(TIMESTAMP_FILE, `${timestamp}\n`);
}

const displayGeneratedStringOnStartup = async () => {
    const hash = generateHash();

    const displayString = async () => {
        const timestamp = new Date().toJSON();
        await writeTimestampToFile(timestamp);
        
        console.log(`${timestamp}: ${hash}`);
        setTimeout(displayString, 5000);
    }
    await displayString();
}

await displayGeneratedStringOnStartup();
