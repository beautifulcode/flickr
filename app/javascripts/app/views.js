// View for a photo's user object - not used
//
App.Views.UserView = Backbone.View.extend({

});


// Single view for rendering photo DETAIL aka Lightbox - includes the sidebar for now
//
App.Views.PhotoDetailView = React.createClass({

  toggleDetail: function(e, el){
    e.preventDefault();
    App.Config.$photoDetail.toggleClass('active');
  },

  render: function(){
    var self = this;
    var photo = this.props.model;
    return dom.section({className: 'photo detail'}, [
            dom.img({onClick: self.toggleDetail, src: photo.detailSrcUrl()}),
            dom.aside({className: 'photo meta'}, [
              dom.h3({}, photo.get('title')),
              dom.p({}, "Other information could be retrieved here"),
              dom.a({className: 'close', onClick: self.toggleDetail, href: ''}, "Close")
            ]),
    ]);
  }

});


// Single view for rendering photo - should stay simple
//
App.Views.PhotoView = React.createClass({

  onPhotoClicked: function(e){
    App.Config.$stage.trigger('photo.clicked', this);
  },

  render: function(){
    var self = this;
    var photo = this.props.model;
    return dom.figure({className: 'photo'}, [
            dom.p({}, photo.get('title')),
            dom.img({onClick: self.onPhotoClicked, src: photo.srcUrl()})
      ]);
  }

});

// Wrapper view for rendering photoset -> photos
//
App.Views.PhotoSetView = React.createClass({

  render: function(){

    var photos = this.props.models;
    var views = _.map(photos, function(m){
      return dom.li({}, App.Views.PhotoView({model: m}));
    });
    return dom.ul({className: 'photoset'}, views);
  }

});


// This is the grand daddy view controller that runs things.
//
App.Views.ApplicationView = Backbone.View.extend({

  events: {
    'change #photoset': 'changePhotoset',
    'photo.clicked': 'showDetail',
    'click nav a': 'showPage'
  },

  initialize: function(){
    this.photoset_view = App.Views.PhotoSetView({models: []});
    React.renderComponent( this.photoset_view, App.Config.$photoSet[0]); 
    this.supportEscapeKey();
  },

  changePhotoset: function(e, thing){
    //var photoset = $('#photoset').val();
    //App.Config.$photoset_id = photoset;
  },

  showPage: function(e){
    var link = $(e.target);
    var page = link.attr('href').replace('#page-', '');
    this.fetchPhotos(page);
  },

  showDetail: function(e, view){

    React.renderComponent(
      App.Views.PhotoDetailView({model: view.props.model}),
      App.Config.$photoDetail[0]
    );

    App.Config.$photoDetail.toggleClass('active');

  },

  fetchPhotos: function(page){

    // This old one
    var self = this;

    // Setup the JSONP responder
    window.jsonFlickrApi = self.onFetchPhotos;

    // Get the photos using backbone collection fetch
    var photos = new App.Collections.Photos({page: page || 1});
    photos.fetch({ success: self.onFetchPhotos, dataType: "jsonp" });

  },

  onFetchPhotos: function(data, xhr){
    $('#photoset').val(data.photoset.title)
    // Populate the collection once it's successfully fetched
    app.photos = new App.Collections.Photos(data.photoset.photo);
    // Set the props so React will render down the tree
    app.photoset_view.setProps({models: app.photos.models});
  },

  supportEscapeKey: function(){
    $(document).keyup(function(e){
      if(e.keyCode === 27)
        App.Config.$photoDetail.removeClass('active');
    }); 
  }
  

});
