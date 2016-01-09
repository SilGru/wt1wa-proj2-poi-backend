var request = require('supertest');

describe('Tags', function() {
  it('respond with json', function(done){
    request("https://rocky-stream-2635.herokuapp.com/api")
      .get('/tags')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });
  it('respond with forbidden if no token is provided', function(done){
    request("https://rocky-stream-2635.herokuapp.com/api")
      .get('/tag')
      .set('Accept', 'application/json')
      .expect(403, done);
  });
});
