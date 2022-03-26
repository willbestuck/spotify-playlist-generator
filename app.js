require('dotenv').config();
const csv = require('./functions/csv_intake.js');

async function main() {
    const artists = await csv();

    for (obj of artists) {
        
    }
}

main().catch((err) => {
    console.log(err);
});