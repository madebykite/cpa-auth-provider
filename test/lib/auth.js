"use strict";

var db         = require('../../models');
var authHelper = require('../../lib/auth-helper');

var requestHelper = require('../request-helper');

var resetDatabase = function(done) {
  db.sequelize.query('DELETE FROM Users').then(function() {
    return db.User.create({
      provider_uid: 'testuser',
      password: 'testpassword'
    });
  })
  .then(function() {
    done();
  },
  function(error) {
    done(error);
  });
};

describe('GET /auth', function() {
  before(function(done) {
    requestHelper.sendRequest(this, '/auth', { parseDOM: true }, done);
  });

  context('When requesting the list of identity provider', function() {
    it('should return a status 200', function() {
      expect(this.res.statusCode).to.equal(200);
    });

    it('should return HTML', function() {
      expect(this.res.headers['content-type']).to.equal('text/html; charset=utf-8');
      expect(this.res.text).to.match(/^<!DOCTYPE html>/);
    });

    describe('the response body', function() {
      it('should display links for every enabled identity provider', function() {
        var enabledIdentityProviders = authHelper.getEnabledIdentityProviders();

        for (var label in enabledIdentityProviders) {
          var link = this.$('a.identity_provider.' + label);
          expect(link.length).to.not.equal(0);

          // Clean class in order to identify disabled identity provider
          link.removeClass('identity_provider').addClass(label);
        }
      });

      it('should display only enabled identity providers', function() {
        expect(this.$('a.identity_provider').length).to.equal(0);
      });
    });
  });
});

describe('GET /protected', function() {
  before(resetDatabase);

  context('When the user is not authenticated', function() {
    before(function(done) {
      requestHelper.sendRequest(this, '/protected', null, done);
    });

    it('should return a status 401', function() {
      expect(this.res.statusCode).to.equal(401);
    });
  });

  context('When the user is authenticated', function() {
    before(function(done) {
      var self = this;

      request
        .post('/login')
        .type('form')
        .send({ username: 'testuser', password: 'testpassword' })
        .end(function(err, res) {
          self.cookie = res.headers['set-cookie'];
          done(err);
        });
    });

    before(function(done) {
      requestHelper.sendRequest(this, '/protected', { cookie: this.cookie }, done);
    });

    it('should return a status 200', function() {
      expect(this.res.statusCode).to.equal(200);
    });
  });
});
