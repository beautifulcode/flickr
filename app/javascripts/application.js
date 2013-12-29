$( document ).ready(function() {

  // Kick off the app
  window.app = new App.Views.ApplicationView({el: App.Config.$stage });
  app.fetchPhotos();

});
