var connect = require('connect');
var serveStatic = require('serve-static');

var routeOfWeb = "web/";
var routeOfDragdropPlugin ="plugin/indieauthor-dragdrop/"

var serverRoute = routeOfWeb;

connect().use(serveStatic(serverRoute)).listen(8000,  function () {

});