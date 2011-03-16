describe("Client", function() {
  var client;

  beforeEach(function() {
    client = new Cahoots.Client();
  });

  it("should be able to subscribe to server", function() {
    client.subscribe();
    expect(true);
  });
});