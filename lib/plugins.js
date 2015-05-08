var request = require('request');
var Q = require('q');

var PLUGIN_KEYWORD = 'variety-plugin';

var reqPromise = function(url) {
  var deferred = Q.defer();
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      deferred.resolve(JSON.parse(body));
    } else {
      deferred.reject(error);
    }
  })
  return deferred.promise;
}

var formatAllPluginsResponse = function(registryResponse) {
  var packages = registryResponse.rows.map(function(element){
    return {
      'name': element.key[1],
      'description': element.key[2],
    };
  });
  return Q.resolve(packages);
};

var getAll = function(query) {
  var searchKeywordUrl = 'https://registry.npmjs.org/-/_view/byKeyword?startkey=[%22'+PLUGIN_KEYWORD+'%22]&endkey=[%22'+PLUGIN_KEYWORD+'%22,{}]&group_level=3';
  return reqPromise(searchKeywordUrl)
    .then(function(regResponse){
      return formatAllPluginsResponse(regResponse);
    });
};

var getDetails = function(packageName) {
  return reqPromise('https://registry.npmjs.org/' + packageName);
}

module.exports = {
  all : getAll,
  getDetails: getDetails
}