(function(exports) {
exports.Workspace = function(name, client) {
    var C_WORKSPACES = '/workspaces',
        C_WORKSPACE  = C_WORKSPACES + '/' + name,
        C_CHAT       = C_WORKSPACE + '/chat';

    var that = this,
        clientId = Math.floor(Math.random() * 1000);
    
    this.client = client;
    this.route  = C_WORKSPACE;
    this.files  = [];
    

    this.connect = function() {
        this.workspaces = client.subscribe(C_WORKSPACES, this.onWorkspaces);
        this.me         = client.subscribe(C_WORKSPACE, this.onMessage);
        this.chat       = client.subscribe(C_CHAT, this.onChat);
        // Publish this workspace
        client.publish(C_WORKSPACES + '/subscribe', { 'name': name });
    }

    this.say = function(text) {
        client.publish(C_CHAT, { 'text': text });
    }

    this.add = function(file) {
        console.log(C_WORKSPACE, 'added file', file);
        client.publish(C_WORKSPACE, { 'event': 'add', 'path': file.path });
        this.files.push(file);
    }
    
    this.remove = function(file) {
        console.log(C_WORKSPACE, 'removed file', file);
        client.publish(C_WORKSPACE, { 'event': 'remove', 'path': file.path });
    }

    this.track = function(route) {
        client.subscribe(route, onMessage);
        //client.publish(route + '/subscribe', )
    }

    this.onWorkspaces = function(msg) {
        console.log(msg);
    }

    this.onMessage = function(msg) {
        console.log(msg);
        switch (msg.event) {
            case "add":
                var file = new exports.File(that, msg.path);
                that.files.push();
                file.track();
                break;
        }
    }
    
    this.onChat = function(msg) {
        console.log('chat', msg.text);
    }
}

exports.File = function(workspace, path) {
    // Clean up path
    path = path.replace('\\', '/');
    path = path.replace('.', '_');
    while(path.match('^[/ ]')) path = path.slice(1);

    this.path = path;
    this.route = workspace.route + '/files/' + path;
    this.content = '';

    this.change = function() {
        workspace.client.publish(this.route, { 'event': 'change', 'protocol': 'file', 'content': this.content });
    }
    
    this.track = function() {
        workspace.client.subscribe(this.route, this.onChange);
    }
    
    this.onChange = function(msg) {
        console.log('tracked file changed', msg);
        exports.Protocols[msg.protocol](msg, this);
    }
}

exports.Protocols = {}
exports.Protocols.file = function(msg, file) {
    file.content = msg.content;
}

exports.Buffer = function(element) {
  var CHANNEL_FILE = '/file';
  var client = new Faye.Client('/channel'),
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