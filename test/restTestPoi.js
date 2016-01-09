var request = require('supertest');

describe('Pois', function() {

  it('respond with json', function(done){
    request("https://rocky-stream-2635.herokuapp.com/api")
      .get('/pois')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });

  it('has to aquire a token for further requests', function(done){
    request("https://rocky-stream-2635.herokuapp.com/api")
      .post('/authenticate')
      .send({ name: "Peter", password: "password"})
      .set('Accept', 'application/json')
      .expect(200, done);
  });

});
