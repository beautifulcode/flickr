// View for a photo's user object - not used
//
App.Views.UserView = Backbone.View.extend({

});


// Single view for rendering photo - should stay simple
//
App.Views.PhotoView = React.createClass({

  render: function(){
    var photo = this.props.model;
    return dom.figure({className: 'photo'}, [
            dom.p({}, photo.get('title')),
            dom.img({src: photo.srcUrl()})
      ]);
  }

});

// Wrapper view for rendering photoset -> photos
//
App.Views.PhotoSetView = React.createClass({

  render: function(){

    var photos = this.props.models;
    var views = [];
    _.each(photos, function(m){
      views.push(dom.li({}, App.Views.PhotoView({model: m})));
    });
    return dom.ul({className: 'photoset'}, views);
  }

});


// This is the grand daddy view controller that runs things.
//
App.Views.ApplicationView = Backbone.View.extend({

  initialize: function(){
    this.photoset_view = App.Views.PhotoSetView({models: []});
    React.renderComponent(
      this.photoset_view, document.getElementById('app')
    );
  },

  fetchPhotos: function(){
    // This old one
    var self = this;

    // Setup the JSONP responder
    window.jsonFlickrApi = this.onFetchPhotos;

    // Get the photos using backbone collection fetch
    var photos = new App.Collections.Photos({});
    photos.fetch({ success: self.onFetchPhotos, dataType: "jsonp" });

  },

  onFetchPhotos: function(data, xhr){
    // Populate the collection once it's successfully fetched
    app.photos = new App.Collections.Photos(data.photoset.photo);
    // Set the props so React will render down the tree
    app.photoset_view.setProps({models: app.photos.models});
  }
  

});
