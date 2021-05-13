var connect = require('connect');
var serveStatic = require('serve-static');

var routeOfWeb = "web/";

var serverRoute = routeOfWeb;

connect().use(serveStatic(serverRoute)).listen(8000, function () {
    console.log("---------------");
    console.log("SERVER STARTED AT " + 8000);
    console.log("serving " + routeOfWeb);
    console.log("---------------");

});