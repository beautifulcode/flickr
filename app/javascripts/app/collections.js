App.Collections.Photos = Backbone.Collection.extend({

  initialize: function(options){
    // Save off the options
    this.options = options || {}; 
  },

  model: App.Models.Photo,

  url: function(){
    return App.Config.$base_url + "?" + $.param(this.urlOptions());
  },

  urlOptions: function(){
    var opts = {
      method: App.Config.$api_method,
      photoset_id: App.Config.$photoset_id,
      api_key: App.Config.$api_key,
      per_page: this.options.per_page || 20,
      page: this.options.page || 1,
      format: 'json'
    }
    return opts;
  }
});
