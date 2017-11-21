
var twitterKeysObject = require('./keys.js');
// Install these packages from NPM
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify-web-api-node');
var omdbapi = require('npm install omdb-api-pt');


var fs = require('fs');

var twitterKeys = twitterKeysObject.twitterKeys;

var userInput = process.argv[2];

var name = process.argv[3];

switch (userInput) {

	case 'my-tweets':
		myTweets();
		break;

	case 'spotify-this-song':
		mySpotify(name);
		break;

	case 'movie-this':
		movie(name);
		break;

	case 'do-what-it-says':
		doIt();
		break;

	default:
		console.log("I HAVE NO IDEA WHAT YOU MEAN");



	function myTweets() {

	var handle = {screen_name: "NedCodes"};
	

	twitterKeys.get('statuses/user_timeline', handle, function(error, tweets, response){
		
	if(!error){
    	for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@NedCodes: " + tweets[i].text + " Created At: " + date.substring(0, 5));
        
        fs.appendFile('log.txt', "@NedCodes: " + tweets[i].text + " Created At: " + date.substring(0, 5));
     
    	}
    }
    else{
      console.log('BIG ERROR!');
 	};
 });
};


function mySpotify(song){
  spotify.search({ type: 'track', query: song}, function(error, data){
    if(!error){
      for(var i = 0; i < data.tracks.items.length; i++){
        
        var songs = data.tracks.items[i];
        console.log("Artist: " + songs.artists[0].name);
        console.log("Song: " + songs.name);
        console.log("Preview Site: " + songs.preview_url);
        console.log("Album: " + songs.album.name);
   
    		}
 		};
	});
};

function movie(argument){
  var queryURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(queryURL, function (error, response, body){
    if(!error && response.statusCode === 200){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

    } 
    else{
    	console.log('Error occurred.')
    };
    if(movie = "Mr. Nobody"){
      
    	console.log("Haven't seen 'Mr. Nobody?', what's wrong with you! Check it out here: http://www.imdb.com/title/tt0485947/");

    }
  });

}
