## Variety plugins searcher

[![Build Status](https://travis-ci.org/variety/variety-plugins-searcher.svg)](https://travis-ci.org/todvora/variety-plugins-searcher)
[![Dependencies Status](https://david-dm.org/variety/variety-plugins-searcher/status.svg)](https://david-dm.org/todvora/variety-plugins-searcher/)
[![DevDependencies Status](https://david-dm.org/variety/variety-plugins-searcher/dev-status.svg)](https://david-dm.org/todvora/variety-plugins-searcher/#info=devDependencies)

Discover all the available Variety plugins in the npmjs.com registry. Plugin can be discovered only if contains
```variety-plugin``` value in ```keywords``` [field of package.json](https://docs.npmjs.com/files/package.json#keywords).

For example:
```javascript
  "keywords": [
    "variety-plugin",
    "mongodb",
    "csv"
  ]
```

## Usage

All the methods are returning Q Promises, to allow simple async and errors handling.

## Get All
List all the available plugins:
```javascript
var plugins = require('variety-plugins-searcher')
plugins.all()
  .then(function(data){
    console.log(data);
  })
  .fail(function(err){
    console.error(err);
  })
  .done();
```

## Get Details
Get details of plugin ```variety-plugin-csv```.
```javascript
var plugins = require('variety-plugins-searcher')
plugins.getDetails('csv')
.then(function(data){
  console.log(data);
})
.fail(function(err){
  console.error(err);
})
.done();
```
