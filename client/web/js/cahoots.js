// Initialize namespace
var Cahoots = Cahoots || {};

Cahoots.Buffer = function(element) {
  var CHANNEL_FILE = '/file';
  var client = new Faye.Client('http://localhost:9292/faye'),
      clientId = Math.floor(Math.random() * 1000);

  element.addEventListener('keyup', function() {
    console.log('sending:', this.value);
    client.publish(CHANNEL_FILE, { clientId: clientId, contents: this.value });
  }, false);

  this.subscribe = function() {
    this.fileChannel = client.subscribe(CHANNEL_FILE, this.onFile);
    this.fileChannel.callback(function() {
      console.log('Wh00t! Subscription acknowledged.');
    });
  };

  this.onFile = function(msg) {
    if (msg.clientId === clientId) return;
    element.value = msg.contents;
    console.log('message:', msg);
  };
};


Cahoots.Echo = function() {
  var client = new Faye.Client('http://localhost:9292/faye');

  this.subscribe = function() {
    this.fileChannel = client.subscribe('/echo', function(msg) {
      console.log('Message', msg);
    });
  };

  this.publish = function(msg) {
    client.publish('/echo', { text: 'Hello?' });
  };
};


document.addEventListener("DOMContentLoaded", function() {
  var sandbox = document.getElementById('sandbox'),
      buffer = new Cahoots.Buffer(sandbox);
  buffer.subscribe();
}, false);