var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');

var getContent = function(req, res){
  var url;
  if(req.url === '/'){
    url = archive.paths.siteAssets + '/index.html';
    helpers.sendHtml(res, url);
  } else if(req.url.indexOf('.html') !== -1){
    url = archive.paths.siteAssets + req.url;
    helpers.sendHtml(res, url);
  } else if(req.url.indexOf('.css') !== -1){
    url = archive.paths.siteAssets + req.url;
    helpers.sendCss(res, url);
  }  else if(req.url.indexOf('.js') !== -1){
    url = archive.paths.siteAssets + req.url;
    helpers.sendJs(res, url);
  } else {
    var site = req.url.slice(1);
    archive.isUrlInList(site, function(isInList){
      if(isInList === true){
        url = archive.paths.archivedSites + req.url;
        helpers.sendHtml(res, url);
      } else {
        helpers.send404(res);
      }
    });
  }
};

// var createContent = function(req, res){};

// var handleOptions = function(req, res){};

exports.handleRequest = function (req, res) {

  var actionMap ={
    "GET": getContent,
    // "POST": createContent,
    // "OPTIONS": handleOptions
  };

  var action = actionMap[req.method];



  if(action){
    action(req, res);
  } else {
    helpers.send404(res);
  }
};
