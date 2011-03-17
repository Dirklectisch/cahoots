describe('Sanity', function() {
    it("should have Cahoots loaded", function() {
        expect(Cahoots).toBeDefined();
    });
    it("should have Faye loaded", function() {
        expect(Faye).toBeDefined();
    });
});

describe('Workspace', function() {
    var workspace, client = new Faye.Client();

    beforeEach(function() {
        spyOn(client, 'publish');
        spyOn(client, 'subscribe');
    });
    
    it("should publish messages on chat channel", function() {
        workspace = new Cahoots.Workspace("test", client);
        workspace.connect();
        expect(client.publish).toHaveBeenCalled();
    });
    
    it ("should publish its creation", function() {
        var name = "testworkspace";
        workspace = new Cahoots.Workspace(name, client);
        workspace.connect();
        expect(client.publish).toHaveBeenCalledWith('/workspaces/new', { name: name });
    });
    // 
    //    it ("should publish its removal", function() {
    //        
    //    });
    // 
    //    it ("should be able to list protocols", function() {
    //        
    //    });
    // 
    //    it ("should be able to list the files", function() {
    //        
    //    });
    // 
    //    it ("should publish new files", function() {
    //        
    //    });
    // 
    //    it ("should publish removed files", function() {
    //        
    //    });
    // 
    //    it ("should publish active file", function() {
    //        
    //    });
    // 
    //    it ("should be able to track another workspace", function() {
    //        
    //    });
});