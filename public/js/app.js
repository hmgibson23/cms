

var Vehicle = Backbone.Model.extend({
    defaults: {
        image : null,
        manufacturer: "",
        registration: "",
        color: "",
        mileage: "",
        description: "",
        list_price: null,
        sold: false,
        date_of_sale: null,
        date_of_arrival: null
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
        console.log(dict);
        this.$el.html(this.template(dict));
        return this;
    }

    
});

var AppView = Backbone.View.extend({

    el: $('body'),

    events: {
      "click #new-vehicle-click":  "showNewVehicleForm",
      "submit #new-vehicle-form":  "createNewVehicle"
    },

    initialize: function() {
        this.vehicles = new VehicleList;
        this.vehicles.bind('add', this.addVehicle, this);
    },

    showNewVehicleForm: function() {
        $('#new-vehicle-form').slideDown('slow');
    },
    
    createNewVehicle: function(form) {
        form.preventDefault();
        var veh = new Vehicle;
        veh.set({
            manufacturer : $('input[name=manu]').val(),
            registration : $('input[name=vehicle_reg]').val(),
            mileage : $('input[name=mileage]').val(),
            color : $('input[name=color]').val(),
            description : $('input[name=description]').val()
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