(function(exports) {
exports.Workspace = function(name, client) {
    var C_WORKSPACES = '/workspaces',
        C_WORKSPACE  = C_WORKSPACES + '/' + name,
        C_CHAT       = C_WORKSPACE + '/chat';

    var clientId = Math.floor(Math.random() * 1000);
    
    this.route = C_WORKSPACE;

    this.connect = function() {
        this.workspaces = client.subscribe(C_WORKSPACES, this.onWorkspaces);
        this.me         = client.subscribe(C_WORKSPACE, this.onMessage);
        this.chat       = client.subscribe(C_CHAT, this.onChat);
        // Publish this workspace
        client.publish(C_WORKSPACES + '/new', { 'name': name });
    }

    this.say = function(text) {
        client.publish(C_CHAT, { 'text': text });
    }

    this.add = function(file) {
        client.publish(C_WORKSPACE, { 'event': 'add', 'file': file.route });
    }

    this.onWorkspaces = function(msg) {
        console.log(msg);
    }

    this.onMessage = function(msg) {
        console.log(msg);
    }
    
    this.onChat = function(msg) {
        console.log('chat', msg.text);
    }
}

exports.File = function(workspace, path) {
    this.route = workspace.route + '/' + path;
    this.content = '';

    this.change = function() {
        client.publish(this.route, { 'event': 'change', 'content': this.content });
    }
    
    this.track = function(route) {
        client.subscribe(route, onChange);
    }
    
    this.onChange = function(msg) {
        console.log('tracked file changed', msg);
        protocols[msg.protocol](msg, this);
    }
}

exports.Protocols = {}
exports.Protocols.file = function(msg, file) {
    file.content = msg.content;
}

exports.Buffer = function(element) {
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

})(typeof exports === 'undefined'? this.Cahoots={}: exports);