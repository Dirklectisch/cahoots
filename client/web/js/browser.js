document.addEventListener("DOMContentLoaded", function() {
  var sandbox = document.getElementById('sandbox'),
      buffer = new Cahoots.Buffer(sandbox);
  buffer.subscribe();
  
  window.workspace = new Cahoots.Workspace("browser", new Faye.Client("http://localhost:9292/faye"))
}, false);