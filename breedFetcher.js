const request = require('request');

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
