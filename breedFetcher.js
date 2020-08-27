const request = require('request');
const userInput = process.argv.slice(2);
const url = `https://api.thecatapi.com/v1/breeds/search?q=${userInput}`;

request(url, (error, response, body) => {
  if (error) {
    console.log('Oops! There is an error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  } else {
    const data = JSON.parse(body);
    if (data.length === 0) {
      console.log('No results found for that breed');
    } else {
      console.log(data[0].description);
    }
  }
});