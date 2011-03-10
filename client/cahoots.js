// Initialize namespace
var Cahoots = Cahoots || {};

Cahoots.Buffer = function(element) {
  var client = new Faye.Client('http://localhost:9292/faye');

  this.subscribe = function() {
    this.fileChannel = client.subscribe('/file', this.onFile);
    this.fileChannel.callback(function() {
      console.log('Wh00t! Subscription acknowledged.');
    });
  };

  this.onFile = function(msg) {
    element.value = msg;
  };
};

document.addEventListener("DOMContentLoaded", function() {
  var sandbox = document.getElementById('sandbox'),
      buffer = new Cahoots.Buffer(sandbox);
  buffer.subscribe();
}, false);