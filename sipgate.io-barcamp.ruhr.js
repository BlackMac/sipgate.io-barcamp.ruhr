calls = new Mongo.Collection("calls");
config = new Mongo.Collection("config");

if (Meteor.isClient) {
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

  Template.ioconfig.events ({
    "change #incoming_handling": function (event){
      var inputValue = event.target.value;
      var settings = config.findOne({});
      config.remove({ _id:settings._id });
      config.insert({
        incoming:inputValue
      });
    }
  });

  Template.ioconfig.helpers({
    "allowSelected": function() {
      var settings = config.findOne({});
      if (typeof settings ==="undefined") return "selected";
      return (settings.incoming === "allow" ? "selected" : "");
    },
    "denySelected": function() {
      var settings = config.findOne({});
      if (typeof settings ==="undefined") return "";
      return (settings.incoming === "deny" ? "selected" : "");
    },
    "busySelected": function() {
      var settings = config.findOne({});
      if (typeof settings ==="undefined") return "";
      return (settings.incoming === "busy" ? "selected" : "");
    }
  });
}

if (Meteor.isServer) {
  HTTP.methods({
    'io': function(data) {
      if (typeof data !== "undefined") {
        calls.remove({});
        calls.insert(parsePost(data.toString()));
        var settings = config.findOne({});
        this.setContentType('application/xml');
        if (settings.incoming === "allow") {
          return '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
        } else if (settings.incoming === "busy") {
          return '<?xml version="1.0" encoding="UTF-8"?><Response><Reject reason="busy"/></Response>';
        } else {
          return '<?xml version="1.0" encoding="UTF-8"?><Response><Reject /></Response>';
        }
      } else {
        return "No Data";
      }
    }
  });
  Meteor.startup(function () {
    var settings = config.findOne({});
    if (typeof settings === "undefined") {
      config.insert({
        incoming:"allow"
      });
    }
  });
}
