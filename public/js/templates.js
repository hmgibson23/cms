window.JST = {};


var li_templ = [
"<li class='vehicle-li'>",
"<% if (image != null) { %>",
"<img class='media-object' src='<%= image %>' />",
"<% } else { %>",
"<img class='media-object' data-src='holder.js/64x64' />",
"<% } %>",
"<span class='manu'><strong>Manufacturer:</strong><%= manufacturer %></span>",
"<br/> <strong>Reg: </strong><span class='reg'><%- registration %></span>",
"<br /> <strong>Color: </strong><span class='color'><%- color %> </span>",
"<br /> <strong>Mileage: </strong><span class='mileage'><%- mileage %></span>",
"<% if (typeof(description) != 'undefined') { %>",
"<strong>Description:</strong>",
"<span class='description'><%= description %></span>",
"<% } %>",
"</li>"
].join('\n');
window.JST['vehicle/li'] = _.template(li_templ);
