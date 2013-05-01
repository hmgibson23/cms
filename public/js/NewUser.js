
var UserView = Backbone.View.extend({
	el: $('#register'),

	events : {
		"submit #new_user" : "createNewUser"
	},

	createNewUser: function(event) {
		console.log('form submitted');
		event.preventDefault();
		$('#new_user').slideUp('slow');
		$('.loading-gif').show();
		var params = $('#new_user').serialize();
		$.ajax({
			type: 'POST',
			url: '/register',
			data: params,
			complete: function(data) {
				$('.loading-gif').hide();
				$('#response').html(data.result);
			}
		});
	}

})


$(function() {
	var u = new UserView;
});