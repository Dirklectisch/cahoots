var fakeWorkspace = { route: '/workspaces/testws' };

describe("protocols", function() {
   describe("file", function() {
      it("should replace contents of file wholesale", function() {
          var testcontent = "testtesttest",
              file = new Cahoots.File(fakeWorkspace, 'test.txt'),
              msg = { protocol: 'file', content: testcontent };

          expect(file.content).toEqual('');
          Cahoots.Protocols['file'](msg, file);
          expect(file.content).toEqual(testcontent);
      });
   });
});