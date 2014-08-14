var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!
exports.sendResponse = function(res, data, statusCode, type){
  statusCode = statusCode || 200;
  headers["Content-Type"] = type || "text/html";
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.send404 = function(res){
  exports.sendResponse(res, "Not Found", 404);
};

exports.sendHtml = function(res, url){
  fs.readFile(url, function(err, html){
    if(err){
      exports.send404(res);
    } else {
      exports.sendResponse(res, html);
    }
  });
};

exports.sendCss = function(res, url){
  fs.readFile(url, function(err, css){
    if(err){
      exports.send404(res);
    } else {
      exports.sendResponse(res, css, 200, "text/css");
    }
  });
};

exports.sendJs = function(res, url){
  fs.readFile(url, function(err, js){
    if(err){
      exports.send404(res);
    } else {
      exports.sendResponse(res, js, 200, "application/javascript");
    }
  });
};
