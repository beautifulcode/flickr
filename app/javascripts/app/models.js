App.Models.PhotoSet = Backbone.Model.extend({

});

App.Models.Photo = Backbone.Model.extend({

  srcUrl: function(){
    return "http://farm"+this.get('farm')+".staticflickr.com/"+this.get('server')+"/"+this.get('id')+"_"+this.get('secret')+".jpg";
  },

  detailSrcUrl: function(){
    return "http://farm"+this.get('farm')+".staticflickr.com/"+this.get('server')+"/"+this.get('id')+"_"+this.get('secret')+"_c.jpg";
  }


});

App.Models.User = Backbone.Model.extend({

});
