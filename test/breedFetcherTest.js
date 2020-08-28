const { fetchBreedDescription } = require('../breedFetcher');
const { assert } = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);
      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      // compare returned description
      assert.equal(expectedDesc, desc.trim()); //Trim because the original was passsing extra space
      done();
    })
  }).timeout(5000);
  
  it('should return an error message & no description when passed an invalid/nonexistant breed', (done) => {
    fetchBreedDescription('chihuahua', (err, desc) => {
      assert.equal(err, null);
      const expectedError = "No results found for that breed";
      assert.equal(desc, expectedError);
      console.log(desc)
      done();
    });
  }).timeout(5000);
});

