var searcher = require('../index.js');
var nock = require('nock');

describe('Plugin searcher', function () {

  it('should download and process list of plugins', function (testDone) {

    nock('https://registry.npmjs.org')
      .get('/-/_view/byKeyword?startkey=[%22variety-plugin%22]&endkey=[%22variety-plugin%22,{}]&group_level=3')
      .replyWithFile(200, __dirname + '/registry-all.json');

    searcher.all()
      .then(function(result){
        expect(result).toEqual([
          {name:'variety-plugin-csv',description:'Variety plugin formatting analysis results to CSV'},
          {name:'variety-plugin-latex',description:'Variety plugin, outputs results of Variety analysis in Latex format.'}
        ]);
      })
      .fail(function() {
        expect(true).toBe(false);
      })
      .fin(function () {
         testDone();
      })
      .done();
  });

  it('should download and process plugin details', function (testDone) {
    nock('https://registry.npmjs.org')
     .get('/variety-plugin-csv')
     .replyWithFile(200, __dirname + '/registry-detail.json');

    searcher.getDetails('variety-plugin-csv')
      .then(function(result){
        expect(result.name).toEqual('variety-plugin-csv');
        expect(result.description).toEqual('Variety plugin formatting analysis results to CSV');
      })
      .fail(function() {
        expect(true).toBe(false);
      })
      .fin(function () {
         testDone();
      })
      .done();
  });

  it('should reject unknown plugin', function (testDone) {
      nock('https://registry.npmjs.org')
       .get('/variety-plugin-unknown')
       .reply(404, '\'variety-plugin-unknown\' is not in the npm registry.');

      searcher.getDetails('variety-plugin-unknown')
        .then(function(){
          expect(true).toBe(false);
        })
        .fail(function(ex) {
          expect(ex).toEqual({message:'Error 404: \'variety-plugin-unknown\' is not in the npm registry.'});
        })
        .fin(function () {
           testDone();
        })
        .done();
    });
});