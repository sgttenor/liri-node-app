const axios = require("axios");
var fs = require("fs");
require("dotenv").config();
var request = require('request');
//spotify key reference require
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

//variable for input commands
var userInput = process.argv[2];

//require moment npm
var moment = require('moment');

// Spotify-this function
function spotifyThis() {
    var songName = process.argv.slice(3).join(" ");


    if (songName === undefined) {
        songName = "The Sign Ace of Base"
    };
    console.log(songName);


    spotify.search({
        type: 'track',
        query: songName,
        limit: 1

    }, function (error, data) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        // COLLECT SELECTED DATA IN AN ARRAY
        let songArr = data.tracks.items;

        for (i = 0; i < songArr.length; i++) {
            //console.log(JSON.stringify(songArr, null, 2))
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Spotify link: " + data.tracks.items[i].preview_url);
        };
    });
}

//movieThis function
function movieThis() {
    var movieName = process.argv.slice(3).join(" ");


    // 
    if (movieName === undefined || (movieName === "")) {
        movieName = "Mr." + "+" + "Nobody"
    };

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // // // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + (response.data.Ratings[1].Value));
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors are: " + response.data.Actors);
        });

}



//Bands in Town function

function concertThis() {
    var artist = process.argv.slice(3).join(" ")
    console.log(artist);

    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(queryURL, function (error, response, body) {
        if (error) console.log(error);
        var result = JSON.parse(body)[0];
        console.log("Venue name " + result.venue.name);
        console.log("Venue location " + result.venue.city);
        console.log("Date of Event " + moment(result.datetime).format("MM/DD/YYYY"));
    })
}
function doThis() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        // Break the string down by comma separation and store the contents into the output array.
        var output = data.split(",");

        // Loop Through the newly created output array
        for (var i = 0; i < output.length; i++) {

            // Print each element (item) of the array/
            console.log(output[i]);
            spotifyThis(output);
        }
    });
}

// logic to display _This functions
switch (userInput) {
    //     //concert Case
    case 'concert-this':
        concertThis();
        break;
    //     //Spotify Case
    case 'spotify-this-song':
        spotifyThis();
        break;
    //     //Movie Case
    case 'movie-this':
        movieThis();
        break;
    //Do What It Says Case
    case 'do-this':
        doThis();
        break;
    //     //Default
    default:
        console.log("Please enter one of the following commands: concert-this, spotify-this-song, movie-this, or do-this");
}