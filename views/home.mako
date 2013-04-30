<%inherit file="/layout.mako" />

<h1>Your inventory...</h1>

<div id="vehicles">

<p><button id="new-vehicle-click" class="btn">Add Vehicle</button></p>
<div id="new-vehicle-form" style="display:none">
    <legend>Create New Vehicle</legend>
    <label>Manufacturer:</label>
    <input name="manu" type="text" placeholder="Name...">
    <label>Registration:</label>
    <input name="vehicle_reg" type="text" placeholder="Registration…">
    <label>Mileage:</label>
    <input name="mileage" type="text" placeholder="Mileage…">
    <label>Color:</label>
    <input name="color" type="text" placeholder="Color…">
    <label>Description:</label>
    <input name="description" type="text" placeholder="Description…">
    <br />
<button id="create-new-vehicle" class="btn">Create</button>
</div>

<h2>Vehicles</h2>
<ul id="vehicle-list">
</ul>
</ul>
</div>