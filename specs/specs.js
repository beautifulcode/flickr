describe("Application Initialization", function() {

  it("sets up App namespace", function() {
    expect(App).toBeDefined();
  });

  it("sets up App.Models namespace", function() {
    expect(App.Models).toBeDefined();
  });

  it("sets up App.Collections namespace", function() {
    expect(App.Collections).toBeDefined();
  });

  it("sets up App.Views namespace", function() {
    expect(App.Views).toBeDefined();
  });

});
