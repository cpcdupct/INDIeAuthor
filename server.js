var connect = require('connect');
var serveStatic = require('serve-static');

var routeOfWeb = "web/";

var serverRoute = routeOfWeb;

connect().use(serveStatic(serverRoute)).listen(8000, function () {

});