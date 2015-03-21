calls = new Mongo.Collection("calls");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.callsList.helpers({
    calls: function () {
      return calls.find({}, { sort: { _id: -1 }});
    }
  });

  Template.callDisplay.helpers({
    from: function() {
      return formatNumber(this.from);
    },
    to: function() {
      return formatNumber(this.to);
    }
  });
}

if (Meteor.isServer) {
  HTTP.methods({
    'io': function(data) {
      if (typeof data !== "undefined") {
        calls.insert(parsePost(data.toString()));
        this.setContentType('application/xml');
        return '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
      }
    }
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}
