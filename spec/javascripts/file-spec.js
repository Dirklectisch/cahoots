var fakeWorkspace = { route: '/workspaces/testws' };

describe("file", function() {
  it("should initialize with empty contents", function() {
      var file = new Cahoots.File(fakeWorkspace, 'test.txt');
      expect(file.content).toEqual('');
  });
  
  it("should expose a correct route when only file is specified", function() {
      var file = new Cahoots.File(fakeWorkspace, 'test.txt');
      expect(file.route).toEqual('/workspaces/testws/files/test.txt');
  });
  
  it("should expose a correct route when absolute path and file is specified", function() {
      var file = new Cahoots.File(fakeWorkspace, '/docs/test.txt');
      expect(file.route).toEqual('/workspaces/testws/files/docs/test.txt');
  });

  it("should expose a correct route when relative path and file is specified", function() {
      var file = new Cahoots.File(fakeWorkspace, 'docs/test.txt');
      expect(file.route).toEqual('/workspaces/testws/files/docs/test.txt');
  });

  
});
