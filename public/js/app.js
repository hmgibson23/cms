

var Vehicle = Backbone.Model.extend({
    defaults: {
        image : null,
        manufacturer: "",
        registration: "",
        color: "",
        mileage: "",
        description: "",
    }
});

var VehicleList = Backbone.Collection.extend({
    model: Vehicle
});

var VehicleView = Backbone.View.extend({

    tagName: 'li',
    className: 'vehicle-li',

    template: JST['vehicle/li'],

   initialize: function() {
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.remove, this);
    },

    render: function() {
        var dict = this.model.toJSON();
        this.$el.html(this.template(dict));
        return this;
    }

    
});

var AppView = Backbone.View.extend({

    el: $('body'),

    events: {
      "click #new-vehicle-click":  "showNewVehicleForm",
      "click #create-new-vehicle":  "createNewVehicle"
    },

    initialize: function() {
        this.vehicles = new VehicleList;
        this.vehicles.bind('add', this.addVehicle, this);
    },

    showNewVehicleForm: function() {
        $('#new-vehicle-form').slideDown('slow');
    },
    
    createNewVehicle: function() {
        var veh = new Vehicle;
        veh.set({
            name : $('input[name=vehicle_name]').val(),
            registration : $('input[name=vehicle_reg]').val()
        });
        this.addOne(veh);
        $('#new-vehicle-form').slideUp('slow');
    },

    addOne: function(vehicle) {
        var view = new VehicleView({model: vehicle});
        this.vehicles.add(vehicle);
        this.$('#vehicle-list').append(view.render().el);
    },

});

//init app    
$(function(){
    var view = new AppView;
 })