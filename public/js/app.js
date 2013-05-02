
//little jquery extension to serialize objects
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var Vehicle = Backbone.Model.extend({

    //maps directly to mongo _id
    idAttribute: "_id",

    defaults: {
        image : "http://placehold.it/320x200",
        manufacturer: "",
        registration: "",
        color: "",
        mileage: "",
        description: "",
        list_price: null,
        sold: false,
        date_registered: null,
        date_sold: null
    }
});

//VEHICLE COLLECTION
var VehicleList = Backbone.Collection.extend({
    model: Vehicle,
    url: '/vehicles'
});


//init vehicle list
var Vehicles = new VehicleList();


/*=============================
=            VIEWS            =
=============================*/
var VehicleView = Backbone.View.extend({

    tagName: 'li',
    className: 'vehicle-li',

    events: {
        "click button.destroy" : "clear",
        "click button.edit" : "edit",
        "submit .edit-form": "update",
        "click .cancel": "cancel",
        "click .sold": "sold"
    },

    template: JST['vehicle/li'],

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', 'destroy', this.remove);
  },

  render: function() {
    var dict = this.model.toJSON();
    this.$el.html(this.template(dict));
    return this;
},

cancel : function() {
    this.$('.edit-form').hide();
},

clear: function() {
    this.model.destroy();
},

edit: function() {
    this.$('.edit-form').slideDown();
},

update: function(event) {
    event.preventDefault();
    var form = this.$('.edit-form').serializeObject();
    this.model.set(form);
    this.model.save();
},

sold: function() {
    this.model.set({'sold': true});
    this.model.set({'date_sold': new Date()});
    this.model.save();
}

});

var VehiclesView = Backbone.View.extend({
    el: $('#vehicles'),

    template: JST['vehicles/main'],

    events: {
      "click #new-vehicle-click":  "showNewVehicleForm",
      "submit #new-vehicle-form":  "createNewVehicle",
      "click .cancel": "hideForm"
  },

  initialize: function() {
    this.listenTo(Vehicles, 'add', this.addOne);
    this.listenTo(Vehicles, 'reset', this.addAll);
    Vehicles.fetch();
},

render: function() {
    this.$el.append(this.template());
    return this;
},

showNewVehicleForm: function() {
    this.$('#new-vehicle-form').slideDown('slow');
},

createNewVehicle: function(form) {
    form.preventDefault();
    var veh = new Vehicle();
    veh.set({
        manufacturer : this.$('input[name=manu]').val(),
        registration : this.$('input[name=vehicle_reg]').val(),
        mileage : this.$('input[name=mileage]').val(),
        list_price : this.$('input[name=list_price]').val(),
        color : this.$('input[name=color]').val(),
        description : this.$('input[name=description]').val()
    });
    Vehicles.create(veh);
    this.$('#new-vehicle-form').slideUp('slow');
},

addOne: function(vehicle) {
    var view = new VehicleView({model: vehicle});
    this.$('#vehicle-list').append(view.render().el);
},

addAll: function() {
  Vehicles.each(this.addOne, this);
},

hideForm: function() {
    this.$('#new-vehicle-form').slideUp('slow');
}
});



/**
*
* Main Application View
*
**/
var AppView = Backbone.View.extend({

    el: $('body'),

    events: {
        'click a.vehicles' : 'loadVehicles',
        'click a.parts' : 'loadParts',
        'click a.accounting' : 'loadAccounting'
    },

    loadVehicles: function() {
        this.$('#vehicles').remove();
        $('#right-panel').append("<div id='vehicles'></div>");
        this.vehicles = new VehiclesView();
    },

    initialize: function() {
        this.vehicles = new VehiclesView();
        this.vehicles.render();
    }

});

//init app    
$(function(){
    var view = new AppView();
});