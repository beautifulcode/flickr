App.Views.UserView = Backbone.View.extend({

});

App.Views.PhotoView = React.createClass({

  render: function(){
    var photo = this.props.model;
    return React.DOM.figure({}, [
            React.DOM.p({}, photo.get('title')),
            React.DOM.img({src: photo.srcUrl()})
      ]);
  }

});

App.Views.PhotoSetView = React.createClass({

  render: function(){

    var models = this.props.models;
    var photo_views = [];
    _.each(models, function(m){
      photo_views.push(React.DOM.li({}, [
         App.Views.PhotoView({model: m})
      ]));
    });
    return React.DOM.ul({}, photo_views);
  }

});

App.Views.ApplicationView = Backbone.View.extend({

  initialize: function(){
    this.photoset_view = App.Views.PhotoSetView({models: []});
    React.renderComponent(
      this.photoset_view, document.getElementById('app')
    );
  },

  fetchPhotos: function(){
    var self = this;
    window.jsonFlickrApi = this.onFetchPhotos;
    var photos = new App.Collections.Photos({});
    photos.fetch({
      success: self.onFetchPhotos,
      dataType: "jsonp"
    });
  },

  onFetchPhotos: function(data, xhr){
    var photoset = data.photoset;
    var models = photoset.photo;
    app.photos = new App.Collections.Photos(models);
    app.photoset_view.setProps({models: app.photos.models});
  }
  

});
