const request = require('request');


// request(url, (error, response, body) => {
//   if (error) {
//     console.log('Oops! There is an error:', error); // Print the error if one occurred
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   } else {
//     const data = JSON.parse(body);
//     if (data.length === 0) {
//       console.log('No results found for that breed');
//     } else {
//       console.log(data[0].description);  //description is fetched via an API request, which is network I/O
//     }
//   }
// });


const fetchBreedDescription = (breedName, callback) => {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else {
      const data = JSON.parse(body);
      if (data.length === 0) {
        callback(null, 'No results found for that breed');
      } else {
        callback(null, data[0].description);  //description is fetched via an API request, which is network I/O
      }
    }
  });
}

module.exports = { fetchBreedDescription };

/* Before I only had the commented out request function and breedFetcher.js. So I created index.js with:
const {fetchBreedDescription} = require('./breedFetcher');

const breedName = process.argv[2];

fetchBreedDescription(breedName, (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
});

What this is doing is importing the fetchbreeddescription function from ./breedFetcher and will invoke it.
I pass the const breedName = process.argv[2] to this file as well as this is the file that will be run in node and pass the breedName
as a parameter to fetchBreedDescription, which has two parameters:
1 - breedName
2 - A function (callback function) which is ((error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  })

  and has two parameters: error and desc for description
I then created fetchdescripiton in this file and encapuslated the previous request function inside it,

Then what this is doing:
const fetchBreedDescription = (breedName, callback) => {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  request(url, (error, response, body) => {
  is to use the breedName to be in the url and call the request function. then we will get an error, response and body
  if we get an error in our callback function ( which is (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
  } else {
    console.log(desc);
  }
}) and has two parameters in index.js (error, desc) we will have in error the error and description we will have it empty so null
and will run the error if statement from that function in index.js
if we have no error then will continue to the else statement and parse the body into a readable object
if data = an empty array then we will not have an error but description will be empty so we return that string as a description
otherwise we look for the description in the object and that will be printed.
*/