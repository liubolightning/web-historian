var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(err, urls){
    if(err){
      throw err;
    } else {
      callback((urls+"").split('\n'));
    }
  });
};

exports.isUrlInList = function(site, callback){
  exports.readListOfUrls(function(urls){
    callback(urls.indexOf(site) !== -1);
  });
};

exports.addUrlToList = function(site){
  fs.appendFile(exports.paths.list, site, function(err){
    if(err){
      throw err;
    }
  });
};

exports.isURLArchived = function(site, callback){
  fs.exists(exports.paths.archivedSites + '/' + site,
            function(exists){
              callback(exists);
            });
};

exports.downloadUrls = function(url){
  var file = fs.createWriteStream(exports.paths.archivedSites + "/" + url);
  url = 'http://' + url;
  http.get(url, function(res){
    res.pipe(file);
  });
};

