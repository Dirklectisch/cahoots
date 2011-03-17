var fs = require('fs');
var Faye = require('faye');
var Cahoots = require('../../lib/cahoots');

var url = process.argv[2];
var name = process.argv[3];
var filename = process.argv[4];

console.log(url, name, filename);

var client = new Faye.Client(url);
var workspace = new Cahoots.Workspace(name, client);

workspace.connect();

var sharedFile = new Cahoots.File(workspace, filename);
workspace.add(sharedFile);

fs.watchFile(filename, { persistent: false, interval: 500 }, function () {
    console.log('file changed!');
    fs.readFile(filename, 'utf8', function(err, data) {
        sharedFile.content = data;
        sharedFile.change();
    });
});
