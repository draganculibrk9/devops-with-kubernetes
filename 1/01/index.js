import {generateHash} from 'random-hash';

const displayGeneratedStringOnStartup = () => {
    const hash = generateHash();

    const displayString = () => {
        const timestamp = new Date().toJSON();

        console.log(`${timestamp}: ${hash}`);
        setTimeout(displayString, 5000);
    }
    displayString();
}

displayGeneratedStringOnStartup();
