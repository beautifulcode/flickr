App.Collections.Photos = Backbone.Collection.extend({
  model: App.Models.Photo,
  url: App.Config.$base_url + App.Config.$api_method + '&api_key='+App.Config.$api_key + '&photoset_id=' + App.Config.$photoset_id + '&format=json'
});
