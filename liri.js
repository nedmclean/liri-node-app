
var twitterKeysObject = require('./keys.js');
// Install these packages from NPM
var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');


var fs = require('fs');


var twitterKeys = twitterKeysObject.twitterKeys;

var userInput = process.argv[2];

var argument = process.argv[3];

switch (userInput) {

	case 'my-tweets':
		myTweets();
		break;

	case 'spotify-this-song':
		mySpotify(argument);
		break;

	case 'movie-this':
		movieThis(argument);
		break;

	case 'do-what-it-says':
		doIt();
		break;

	default:
		console.log("I HAVE NO IDEA WHAT YOU MEAN");


}

var twitterKeys = {
		  consumer_key: 'sKhlA1EmLLXmJykyKUew6Cr4C',
		  consumer_secret: 'VPyJKwEO0qsyseekVfTJSJAoi8MgVw9smfVIeOd6xsDODoS69D',
		  access_token_key: '932797092476551170-6KEDRf58f05HTuTTPiOORDAAWfNJ2dH',
		  access_token_secret: 'VIexpEtsZjvhI5jKuRZQnCkHitFt0mQGwm9Lk2WjjCXXH',
};

	function myTweets() {

	var handle = {screen_name: "NedCodes"};
	

	twitterKeys.get('statuses/user_timeline', handle, function(error, tweets, response){
		
		  if(!error){
      for(var i = 0; i<tweets.length; i++){
        var date = tweets[i].created_at;
        console.log("@NedCodes: " + tweets[i].text + " Created At: " + date.substring(0, 19));
        
        fs.appendFile('log.txt', "@NedCodes: " + tweets[i].text + " Created At: " + date.substring(0, 19));
     
      }
    }
    else{
      console.log('BIG ERROR!');
    };
 });