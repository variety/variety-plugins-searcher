var request = require('request');
var Q = require('q');

var PLUGIN_KEYWORD = 'variety-plugin';

var reqPromise = function(url) {
  var deferred = Q.defer();
  request(url, function (error, response, body) {
    if (!error) {
      if(response.statusCode === 200) {
        deferred.resolve(JSON.parse(body));
      } else {
        deferred.reject({'message': 'Error ' + response.statusCode + ': ' + body});
      }
    } else {
      deferred.reject(error);
    }
  });
  return deferred.promise;
};

var formatAllPluginsResponse = function(registryResponse) {
  return Q.resolve(registryResponse.objects);
};

var getAll = function() {
  var searchKeywordUrl = 'https://registry.npmjs.org/-/v1/search?text=keywords:' + PLUGIN_KEYWORD;
  return reqPromise(searchKeywordUrl)
    .then(function(regResponse){
      return formatAllPluginsResponse(regResponse);
    });
};

var getDetails = function(packageName) {
  return reqPromise('https://registry.npmjs.org/' + packageName);
};

module.exports = {
  all : getAll,
  getDetails: getDetails
};
