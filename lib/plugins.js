var npm = require("npm");
var Q = require("q");

var deferred = Q.defer();

var loadNpm = function() {
  var deferred = Q.defer();
  // todo: how to mute the stdout of npm?
  npm.load({loaded: false}, function (err) {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(npm);
    }
  });
  return deferred.promise;
}

var loadPackages = function(npm, query) {
  var regQuery = query || '';
  return Q.nfcall(npm.commands.search, ['/variety-plugin-.*' + regQuery + '.*/']);
}

var getPackageDetails = function(registry, pluginName) {
  // todo: should we check the engine defined in package.json?
  return Q.nfcall(npm.commands.info, ['variety-plugin-' + pluginName]);
}

var getAll = function(query) {
  return loadNpm()
    .then(function(registry){
      return loadPackages(registry, query);
    });
};

var getDetails = function(packageName) {
  return loadNpm()
    .then(function(registry){
      return getPackageDetails(registry, packageName);
    });
}

module.exports = {
  all : getAll,
  getDetails: getDetails
}