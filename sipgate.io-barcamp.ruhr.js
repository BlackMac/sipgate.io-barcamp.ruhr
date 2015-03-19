calls = new Mongo.Collection("calls");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.iocall.helpers({
    currentCall: function () {
      return calls.findOne();
    },
    from: function () {
      var call = calls.findOne();
      return formatNumber(call.from);
    },
    to: function () {
      var call = calls.findOne();
      return formatNumber(call.to);
    },
    directionDescription: function () {
      var call = calls.findOne();
      if (call.direction === "in") {
        return "eingehender";
      }
      return "ausgehender";
    }
  });
}

if (Meteor.isServer) {
  HTTP.methods({
    'io': function(data) {
      if (typeof data !== "undefined") {
        calls.remove({});
        calls.insert(parsePost(data.toString()));
        return '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
      }
    }
  }),

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
