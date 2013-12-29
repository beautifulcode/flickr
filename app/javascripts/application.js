$( document ).ready(function() {

  // Global pollution. 
  // I usually save the whales, but this is a demo.
  window.dom = React.DOM;

  // Kick off the app into one general namespace and insert into config.$stage
  window.app = new App.Views.ApplicationView({el: App.Config.$stage });

  // Go get some photos!
  app.fetchPhotos();

});
