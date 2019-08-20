require("dotenv").config();
//create the variables from the keypass.js
var access1 = require("./keypass.js");
var Spotify = require('node-spotify-api');
//set up the require 
var spotify = new Spotify(access1.spotify);
//add moment for node
var moment = require('moment');
moment().format();
// next setup the axios require 
var axios = require('axios');
var fs = require('fs');
//create the two user input in terminal
var input1 = process.argv[2];
var input2 = process.argv[3];
// lets create a switch case for the first input
switch (input1){
    case "concert-this":
        concertThis(input2);
        break;
    case "spotify-this-song":
        spotifySong(input2);
        break;
    case "movie-this":
        movieThis(input2);
        break;
    case "do-what-it-says":
        doThis();
        break;
};
//create the function for the cases
function spotifySong(input2){
    if(!input2){
        input2 = "Gunslinger";
    }
    spotify
    .search({ type: 'track', query: input2})
    .then(function(response){
        for(var i = 0; i <5; i++){
            var spotifyResults =
            "-----------------------------" +
            "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
            "\nSong Name: " + response.tracks.items[i].name +
            "\nAlbum Name: " + response.tracks.items[i].album.name +
            "\nPreview Link: " + response.tracks.items[i].preview_url;
    
        //test
        console.log(spotifyResults);
        }
    })
    .catch(function(err){
        console.log(err);
    });
}
    // next case movie
    function movieThis(input2){
        if(!input2){
            input2 = "Hercules";
        }
        axios.get("https://www.omdbapi.com/?t=" + input2 + "&y=plot=short&apikey=trilogy")
        .then(function(response){
            var movieResults =
            "---------------------------------------------" +
            "\nMovie Title: " + response.data.Title + 
            "\nYear of Release: " + response.data.Year +
            "\nIMDB Rating: " + response.data.imdbRating +
            "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
            "\nCountry Produced: " + response.data.Country +
            "\nLanguage: " + response.data.Language +
            "\nPlot: " + response.data.Plot +
            "\nActors/Actresses: " + response.data.Actors;
            //test
            console.log(movieResults);
        })
        .catch(function(error){
            console.log(error);
        });

    }
    //next case file
    function doThis(){
        fs.readFile("random.txt", "utf8", function(error, data){
            if(error){
                return console.log(error);
            }
            var dataArr = data.split(',');
            spotifySong(dataArr[0], dataArr[1]);
        })
    }
    //next case band
    function concertThis(input2) {
        axios.get("https://rest.bandsintown.com/artists/" + input2 + "/events?app_id=codingbootcamp")
        .then(function(response) {    
            for (var i = 0; i < response.data.length; i++) {
    
                var datetime = response.data[i].datetime; 
                var dateArr = datetime.split('T');
    
                var concertResults = 
                "--------------------------------------------------------------------" +
                "\nVenue Name: " + response.data[i].venue.name + 
                "\nVenue Location: " + response.data[i].venue.city +
                "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY");
                console.log(concertResults);
        
            };
        });
    }
