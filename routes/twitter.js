// Generated by CoffeeScript 1.3.3
var OAuth, Twitter, oa, twit, util;

OAuth = require("oauth").OAuth;

Twitter = require("ntwitter");

util = require("util");

oa = new OAuth("https://api.twitter.com/oauth/request_token", "https://api.twitter.com/oauth/access_token", "TxIpWXPx8YblDMRWZoQ", "FEXfN9cewfBdBtPMvau8p6bpJGOuK2FPi6jB6Xo", "1.0", "http://127.0.0.1:3000/api/auth/callback", "HMAC-SHA1");

twit = new Twitter({
  consumer_key: "TxIpWXPx8YblDMRWZoQ",
  consumer_secret: "FEXfN9cewfBdBtPMvau8p6bpJGOuK2FPi6jB6Xo",
  access_token_key: "14494096-ITmZVF2G4oafATIyDc5XkenC1lO6GrSQ5fkYiOGQM",
  access_token_secret: "mWqrSEkNc6dQoHTpiHWr1r49QYC5orpqJD5JrZWThh4"
});

exports.tweets = function(socket) {
  console.log("tweets");
  return twit.stream("statuses/filter", {
    follow: "14494096,492395218,561086934,523413667,730376875,83309981"
  }, function(stream) {
    return stream.on("data", function(data) {
      console.log(data);
      if (socket) {
        return socket.emit("tweets:now", {
          tweets: data
        });
      }
    });
  });
};

exports.auth = function(req, res) {
  return oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results) {
    if (error) {
      console.log(error);
      return res.send("yeah no. didn't work.");
    } else {
      req.session.oauth = {};
      req.session.oauth.token = oauth_token;
      console.log("oauth.token: " + req.session.oauth.token);
      req.session.oauth.token_secret = oauth_token_secret;
      console.log("oauth.token_secret: " + req.session.oauth.token_secret);
      return res.redirect("https://twitter.com/oauth/authenticate?oauth_token=" + oauth_token);
    }
  });
};

exports.auth.callback = function(req, res) {
  var oauth;
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    oauth = req.session.oauth;
    return oa.getOAuthAccessToken(oauth.token, oauth.token_secret, oauth.verifier, function(error, oauth_access_token, oauth_access_token_secret, results) {
      if (error) {
        console.log(error);
        return res.send("yeah something broke.");
      } else {
        req.session.oauth.access_token = oauth_access_token;
        req.session.oauth.access_token_secret = oauth_access_token_secret;
        console.log(results);
        return res.redirect("/");
      }
    });
  } else {
    return next(new Error("you're not supposed to be here."));
  }
};
