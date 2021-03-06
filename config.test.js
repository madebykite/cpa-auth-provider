"use strict";

exports.identity_providers = {
  facebook: {
    enabled: false
  },
  github: {
    enabled: false
  },
  ebu: {
    enabled: false
  },
  local: {
    enabled: true
  }
};

exports.db = {
  type: 'sqlite',
  // filename: 'data/test.sqlite',

  // For debugging, log SQL statements to the console
  debug: false
};

exports.uris = {
  registration_client_uri: "http://example.com/registration_client_uri",

  // The end-user verification URI on the authorization server. The URI should
  // be short and easy to remember as end-users will be asked to manually type
  // it into their user-agent.
  //
  // See draft-recordon-oauth-v2-device-00 section 1.4.
  verification_uri: 'http://example.com/verify'
};

exports.scopes = [
  { name: 'http://bbc1-cpa.ebu.io/', display_name: "BBC1" },
  { name: 'http://bbc2-cpa.ebu.io/', display_name: "BBC2" }
];

exports.valid_pairing_code_duration = 3600; // seconds
exports.max_poll_interval = 5; // seconds
