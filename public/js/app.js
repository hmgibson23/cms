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



var CMS = CMS || {};

CMS = (function(Backbone, $) {
    var Vehicle = Backbone.Model.extend({

        //maps directly to mongo _id
        idAttribute: "_id",

        defaults: {
            image: "http://placehold.it/320x200",
            manufacturer: "",
            registration: "",
            color: "",
            mileage: "",
            description: "",
            list_price: null,
            sold: false,
            date_registered: null,
            date_sold: null
        },

        validate: function(attrs) {
            //regex for int
            var intReg = /^\d+$/;
            if(!intReg.test(attrs.mileage) || !intReg.test(attrs.list_price))
                return 'Mileage and List Price must be numbers';
        }
    });

    //VEHICLE COLLECTION
    var VehicleList = Backbone.Collection.extend({
        model: Vehicle,
        url: '/vehicles',


        sold: function() {
            return this.where({sold: true});
        },

        available: function() {
            return this.where({sold:false});
        }
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
            "click button.destroy": "clear",
            "click button.edit": "edit",
            "submit .edit-form": "update",
            "click .cancel": "cancel",
            "click .sell": "sold",
            "click .view": "viewInDetail"
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

        cancel: function() {
            this.$('.edit-form').hide();
        },

        clear: function() {
            this.$el.hide();
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
            this.model.set({
                'sold': true
            });
            this.model.set({
                'date_sold': new Date()
            });
            this.model.save();
        },

        viewInDetail: function() {
            var vew = new VehicleModalView(this.model);
        }

    });

    var VehicleModalView = Backbone.View.extend({
        //separate view to handle the vehicle modal
        el: $('.vehs'),
        template: JST['vehicle/model-templ'],

        events: {
            "click .vehicle-overlay": "destroyVehicleView"
        },

        initialize: function(model) {
            console.log('initializing');
            this.model = model;
            this.$('.vehicle-overlay').fadeIn();
            this.$('.vehicle-modal').fadeIn();
            this.render();
        },

        render: function() {
            var dict = this.model.toJSON();
            this.$('.vehicle-modal').html(this.template(dict));
            return this;
        },

        destroyVehicleView: function() {
            this.$('.vehicle-modal').html(" ");
            this.$('.vehicle-overlay').hide();
            this.$('.vehicle-modal').hide();
        }
    });

    var VehiclesView = Backbone.View.extend({
        el: $('.vehicles'),

        template: JST['vehicles/main'],

        events: {
            "click .new-vehicle-click": "showNewVehicleForm",
            "submit .new-vehicle-form": "createNewVehicle",
            "click .cancel": "hideForm",
            "click a.available": "showAvailable",
            "click a.sold": "showSold",
            "click a.all": "showAll"
        },

        initialize: function() {
            this.listenTo(Vehicles, 'add', this.addOne);
            this.listenTo(Vehicles, 'reset', this.addAll);
            Vehicles.fetch();
        },

        render: function() {
            console.log('rendering');
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
                manufacturer: this.$('input[name=manu]').val(),
                registration: this.$('input[name=vehicle_reg]').val(),
                mileage: this.$('input[name=mileage]').val(),
                list_price: this.$('input[name=list_price]').val(),
                color: this.$('input[name=color]').val(),
                description: this.$('input[name=description]').val()
            });
            Vehicles.create(veh);
            this.$('.new-vehicle-form').slideUp('slow');
        },

        addOne: function(vehicle) {
            var view = new VehicleView({
                model: vehicle
            });
            this.$('.vehicle-list').append(view.render().el);
        },

        addAll: function() {
            Vehicles.each(this.addOne, this);
        },

        hideForm: function() {
            this.$('.new-vehicle-form').slideUp('slow');
        },

        showSold: function() {
            this.$('.sold').parent().addClass('active');
            this.$('.all').parent().removeClass('active');
            this.$('.available').parent().removeClass('active');
            $('.vehicle-list').empty();
            _.each(Vehicles.sold(), this.addOne);
        },

        showAvailable: function() {
            this.$('.available').parent().addClass('active');
            this.$('.sold').parent().removeClass('active');
            this.$('.all').parent().removeClass('active');
            $('.vehicle-list').empty();
            _.each(Vehicles.available(), this.addOne);
        },

        showAll: function() {
            this.$('.available').parent().removeClass('active');
            this.$('.sold').parent().removeClass('active');
            this.$('.all').parent().addClass('active');
            $('.vehicle-list').empty();
            this.addAll();
        }
    });




    //TODO: Needs to be implemented - probably do parts first and some design
    var AccountingView = Backbone.View.extend({
        el: $('.accounting')
    });


    /**
     *
     * Main Application View
     *
     **/
    var AppView = Backbone.View.extend({

        el: $('body'),

        events: {
            'click a.vehicles-nav': 'loadVehicles',
            'click a.parts-nav': 'loadParts',
            'click a.accounting-nav': 'loadAccounting'
        },

        loadVehicles: function() {
            this.vehicles.remove();
            this.vehicles.unbind();
            var frag = document.createDocumentFragment();
            var div = document.createElement("div");
            div.className = "vehicles";
            frag.appendChild(div);
            document.getElementById('right-panel').appendChild(frag);
            this.vehicles.render();
        },

        initialize: function() {
            this.vehicles = new VehiclesView();
            this.vehicles.render();
        }

    });

    return {
        init : function() {
        var view = new AppView();
    }
};

})(Backbone, jQuery);

//init app    
document.addEventListener('DOMContentLoaded', function() {
    CMS.init();
});