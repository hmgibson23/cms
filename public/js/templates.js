window.JST = {};

window.JST['vehicle/li'] = _.template(
    "<li class='vehicle-li'><strong><%- name %></strong><br/> <strong>Reg: </strong><span><%- registration %></span></li>"
);
