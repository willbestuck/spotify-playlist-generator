require('dotenv').config()
const axios = require('axios');
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

exports.getToken = async () => {
    try {
        const tokenRes = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    
        return tokenRes.data.access_token;
        

    } catch(err) {
        console.log(err.response);
        return '';
    }
}

exports.getArtist = async (token, artistName) => {

    try {

        const artistRes = await axios.get('https://api.spotify.com/v1/search?q=artist:'+artistName+'&type=artist&include_external=audio', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        return artistRes.data.artists.items[0].id;
        

    } catch(err) {
        console.log(artistName);
        return null;
    }

}

exports.getTracks = async (token, artistIds) => {
    const tracks = [];
    for (id of artistIds) {
        try {
            const trackRes = await axios.get('https://api.spotify.com/v1/artists/'+id+'/top-tracks?market=US', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            
            for (t of trackRes.data.tracks.slice(0,5)) {
                tracks.push(t.uri);
            }
    
        } catch(err) {
            console.log('err', id);
        }
    }
    return tracks;
}

exports.addTracksToPlaylist = async (token, tracks, playlistId) => {
    try {
        const playlistRes = await axios.post('https://api.spotify.com/v1/playlists/'+playlistId+'/tracks', tracks, {
            headers: {
                'Authorization': 'Bearer BQA3yatXL4k5U-vLL3JvOMbrHVEaNKX9VafycapAeErb2KuOz_JGE8RY48wyg0Pr4Cu9BV6n1Ms6PIf-BHkI0SiJNNWwtUxad_XKhUDOftkkTX2OofjDJB8pDc5qbuPXNlEqlzVWUFwq8WqlWy6cBTmxf6UrHEFDTSugCWTQhvMdXlIE_szY9-nhWj8PMyphyDYfGB7hRZqXv5rPLjgw6JM',
                'Content-Type': 'application/json'
            }
        });
        
        return 'Success';
        

    } catch(err) {
        console.log(err.response);
        return 'Failure';
    }
}