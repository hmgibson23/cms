window.JST = {};


//default vehicle display template
var li_templ = [
"<div class='vehicle-div well'>",
"<div class='vehicle-image'>",
"<img class='media-object' src='<%= image %>' />",
"</div>",
"<div class='vehicle-info'>",
"<span class='manu'><strong>Manufacturer:</strong><%= manufacturer %></span>",
"<br/> <strong>Reg: </strong><span class='reg'><%- registration %></span>",
"<br /> <strong>Color: </strong><span class='color'><%- color %> </span>",
"<br /> <strong>Mileage: </strong><span class='mileage'><%- mileage %></span>",
"<% if (typeof(description) != 'undefined') { %>",
"<br /> <strong>Description:</strong>",
"<span class='description'><%= description %></span>",
"<% } %>",
"</div>",
"<div class='alter-buttons'>",
"<% if(sold !== true) { %><button class='btn btn-success sell'>Sold</button><% } %>",
"<button class='btn btn-danger destroy'>Delete</button>",
"<button class='btn btn-info edit'>Edit</button>",
"<button class='btn view'>View</button>",
"</div>",
"<div class='alter-form'>",
    "<form class='edit-form'>",
        "<label>Registration:</label>",
        "<input name='registration' type='text' value='<%= registration %>' />",
        "<label>Manufacturer:</label>",
        "<input name='manufacturer' type='text' value='<%= manufacturer %>' />",
        "<label>Color:</label>",
        "<input name='color' type='text' value='<%= color %>' />",
        "<label>Mileage:</label>",
        "<input name='mileage' type='text' value='<%= mileage %>' />",
        "<label>Description:</label>",
        "<input name='description' type='text' value='<%= description %>' />",
        "<br />",
        "<input type='submit' class='btn btn-success' value='Save Changes'/>",
        "<button class='btn btn-danger cancel'>Cancel</button>",
    "</form>",
    "</div>",
"</div>"
].join('\n');

window.JST['vehicle/li'] = _.template(li_templ);


var vehicle_main = [
'<span class="new-vehicle"><button class="new-vehicle-click btn">Add Vehicle</button></span>',
'<form class="form-horizontal new-vehicle-form" style="display:none;">',
'   <legend>Create New Vehicle</legend>',
    '<label>Manufacturer:</label>',
    '<input name="manu" type="text" placeholder="Manufacturer...">',
    '<label>Registration:</label>',
    '<input name="vehicle_reg" type="text" placeholder="Registration…">',
    '<label>Mileage:</label>',
    '<input name="mileage" type="text" placeholder="Mileage…">',
    '<label>Price:</label>',
    '<input name="list_price" type="text" placeholder="Price...">',
    '<label>Color:</label>',
    '<input name="color" type="text" placeholder="Color…">',
    '<label>Description:</label>',
    '<input name="description" type="text" placeholder="Description…">',
    '<br />',
    '<br />',
'<input type="submit" class="btn btn-primary" value="Create" />',
'<button class="btn btn-danger cancel">Cancel</button>',
'</form>',
'<h2>Vehicles</h2>',
'<ul class="nav nav-pills">',
  '<li class="active">',
    '<a href="#available" class="all">All</a>',
  '</li>',
  '<li><a href="#sold" class="available">Available</a></li>',
  '<li><a href="#sold" class="sold">Sold</a></li>',
'</ul>',
'<ul class="vehicle-list">',
'</ul>'
].join('\n');

window.JST['vehicles/main'] = _.template(vehicle_main);

var vehicle_modal_templ = [
"<div class='inner-vehicle-modal'>",
"<span class='vehicle-inner-image'>",
"<img class='media-object' src='<%= image %>' />",
"</span>",
"<span class='vehicle-inner-details'>",
"<span class='manu'><strong>Manufacturer:</strong><%= manufacturer %></span>",
"<br/> <strong>Reg: </strong><span class='reg'><%- registration %></span>",
"<br /> <strong>Color: </strong><span class='color'><%- color %> </span>",
"<br /> <strong>Mileage: </strong><span class='mileage'><%- mileage %></span>",
"</span>",
"<span class='vehicle-inner-description'>",
"<% if (typeof(description) != 'undefined') { %>",
"<br /> <strong>Description:</strong>",
"<br /><p><%= description %></p>",
"<% } %>",
"</span>",
"</div>"
].join('\n');

window.JST['vehicle/model-templ'] = _.template(vehicle_modal_templ);