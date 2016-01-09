var request = require('supertest');
var should = require('should');

describe('Authenticate', function() {

  it('returns success false for wrong credentials', function(done){
    request("https://rocky-stream-2635.herokuapp.com/api")
      .post('/authenticate')
      .send({ name: "whoisit", password: "kikeriki"})
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) { throw err; }
        // console.log(res.body);
        res.body.should.have.property("success", false);
        done();
      });
  });

});
