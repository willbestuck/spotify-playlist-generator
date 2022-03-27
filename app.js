require('dotenv').config();
const csv = require('./functions/csv_intake.js');
const spotify = require('./functions/spotify.js');
const playlistId = '6fhqad9fZXrhgUxE1sDO9J';

async function main() {
    const artists = await csv();
    const token = await spotify.getToken();

    const ids = [];

    for (obj of artists.slice(140,160)) {
        let reqId = await spotify.getArtist(token, obj);
        if (reqId !== null) {ids.push(reqId);}
    }

    const tracks = await spotify.getTracks(token, ids);
    
    const status = await spotify.addTracksToPlaylist(token, tracks, playlistId);

    console.log(status);
}

main().catch((err) => {
    console.log(err);
});