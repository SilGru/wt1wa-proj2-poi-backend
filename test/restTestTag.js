var request = require('supertest');

describe('Account', function() {
  it('respond with json', function(done){
    // the request-object is the supertest top level api
    request("https://rocky-stream-2635.herokuapp.com/api")
      .get('/tags')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200, done); // note that we're passing the done as parameter to the expect
  });
});
