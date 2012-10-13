// Generated by CoffeeScript 1.3.3
/*
Module dependencies.
*/

var api, app, express, http, io, path, server, view;

express = require("express");

http = require("http");

path = require("path");

api = require("./routes/twitter");

view = require("./routes/view");

app = express();

app.configure(function() {
  app.set("port", process.env.PORT || 3000);
  app.set("views", __dirname + "/views");
  app.set("view engine", "ejs");
  app.use(express.favicon());
  app.use(express.logger("dev"));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser("your secret here"));
  app.use(express.session());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, "public")));
});

app.configure("development", function() {
  return app.use(express.errorHandler());
});

app.get("/", view.index);

app.get("/api/auth", api.auth);

app.get("/api/auth/callback", api.auth.callback);

server = http.createServer(app).listen(app.get("port"), function() {
  return console.log("Express server listening on port " + app.get("port"));
});

io = require('socket.io').listen(server);

io.sockets.on('connection', api.tweets);
