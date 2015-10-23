var db = require(__server + '/lib/db');
var request = require('supertest-as-promised');
var EntriesAPI = require(__server + '/apis/entries-api');

describe('Entries API', function() {

  var app = TestHelper.createApp();
  app.use('/entries', EntriesAPI);
  app.testReady();

  beforeEach(function() {
    return db.deleteEverything();
  });

 it('POST /entries creates an entry and returns entry', function() {
    return request(app)
      .post('/entries')
      .send({
        meal_id: 1,
        name: 'sliderHolla',
        rating: 1,
        notes: 'These are some smaller entry notes',
        image: 'https://img.google.com/horsey.png'
      })
      .expect(201)
      .expect(function(response) {
        var newEntry = response.body;

        expect(newEntry.id).to.not.be.undefined;
        expect(newEntry.name).to.equal('sliderHolla');
        expect(newEntry.meal_id).to.equal(1);
        expect(newEntry.notes).to.equal('These are some smaller entry notes');
      })
      .then(function(){
        return request(app)
          .get('/entries')
          .expect(200)
          .expect(function(response) {
            var entries = response.body;
            expect(entries).to.be.an.instanceOf(Array);
            expect(entries).to.have.length(1);
            expect(entries[0].name).to.equal('sliderHolla');
          });
      });
  });
});