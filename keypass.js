console.log('hey it loading');
require("dotenv").config();
// create the export
// also create the key for spotify but still confused how this works
 exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET

};