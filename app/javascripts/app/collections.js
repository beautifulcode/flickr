App.Collections.Photos = Backbone.Collection.extend({
  model: App.Models.Photo,
  url: function(){
    return App.Config.$base_url + "?" + $.param(this.urlOptions);
  },

  urlOptions: {
    method: App.Config.$api_method,
    photoset_id: App.Config.$photoset_id,
    api_key: App.Config.$api_key,
    per_page: 20,
    format: 'json'
  }
});
