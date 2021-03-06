"use strict";

var config     = require('../../config');
var db         = require('../../models');
var authHelper = require('../../lib/auth-helper');

module.exports = function (app, options) {
  app.get('/user/tokens', authHelper.ensureAuthenticated, function(req, res, next) {
    db.ServiceAccessToken
      .findAll({ include: [db.ServiceProvider] })
      .complete(function(err, tokens) {
        if (err) {
          next(err);
          return;
        }

        res.render('./user/token_list.ejs', { tokens: tokens });
      });
    });
};

