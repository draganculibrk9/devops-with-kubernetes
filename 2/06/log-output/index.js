import {generateHash} from 'random-hash';
import axios from 'axios';

const PING_SERVICE_URL = "http://ping-pong-svc"

const getPings = async () => {
    const response = await axios.get(`${PING_SERVICE_URL}/pingpong`);

    return response.data.count;
}

const displayGeneratedStringOnStartup = async () => {
    const hash = generateHash();

    const displayString = async () => {
        const timestamp = new Date().toJSON();
        const pings = await getPings();
        
        console.log(process.env.MESSAGE);
        console.log(`${timestamp}: ${hash}`);
        console.log(`Ping / Pongs: ${pings}`)
        setTimeout(displayString, 5000);
    }
    await displayString();
}

await displayGeneratedStringOnStartup();
