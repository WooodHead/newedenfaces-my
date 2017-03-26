require('babel-register');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var React = require('react');

var http = require('http');

var routes = require('./app/routes');
var swig = require('swig');
var app = express();

app.use(express.static(path.join(__dirname,'public')));

app.use(function(req, res) {
    Router.match({
        routes: routes.default,
        location: req.url
    }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500)
                .send(err.message);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));

            var page = swig.renderFile('views/index.html', { html: html });

            res.status(200)
                .send(page);

        } else {
            res.status(404)
                .send('Page Not Found');
        }
    });

    // res.send('123');

});

var server = http.createServer(app);

server.listen(3005, function() {
    console.log('Express server listening on port 3005');
});
