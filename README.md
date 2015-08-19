# ng-dropdown-multiselect
Angular JS directive for dropdown with multi-select feature.

#Dependencies
AngularJS, jQuery, Bootstrap

#Usage

Inject <code>dropdown-multiselect</code> as your angular app dependencies.
<pre>angular.module( 'App', [ 'dropdown-multiselect' ] );</pre>

#Features

<p>Use as an <code>element</code>
  <code>&ltdropdown-multiselect&gt&lt/dropdown-multiselect&gt</code>
  or as an <code>attribute</code>
  <code>&ltdiv dropdown-multiselect&gt&lt/div&gt</code>
</p>

<h3>Set through attribute:</h3>

<h4>dropdown-options</h4>
<p>Provide data to be displayed as dropdown list items through <code>dropdown-options="options"</code> attribute. It can accept the object in a format of:</p>
<pre>$scope.options = [ {
        'Id': 1,
        'Name': 'Batman'
    }, {
        'Id': 2,
        'Name': 'Superman'
    }, {
        'Id': 3,
        'Name': 'Hulk'
    }];
</pre>
<p>HTML:</p>
<pre>&ltdropdown-multiselect dropdown-options="options"&gt&lt/dropdown-multiselect&gt</pre>

<h4>dropdown-trackby</h4>
<p>Initially, dropdown items are tracked by <code>Id</code> automagically, if the <code>dropdown-trackby</code> attribute is not set.</p>
<p>If the option objects does not have <code>Id</code> property, then custom tracking could be set by providing any of the property of an object from the options data.</p>
<p>HTML:</p>
<pre>&ltdropdown-multiselect dropdown-options="options" dropdown-trackby="Name"&gt&lt/dropdown-multiselect&gt</pre>
<p>It is always better to provide <code>dropdown-trackby</code> attribute for correct tracking.</p>

<h4>dropdown-disable</h4>
<p>Dropdown could be disabled by providing boolean value to <code>dropdown-disable</code> attribute.
<pre>&ltdropdown-multiselect dropdown-options="options" dropdown-disable="true"&gt&lt/dropdown-multiselect&gt</pre>

Or through the controller:
<pre>
HTML:
&ltdropdown-multiselect dropdown-options="options" dropdown-disable="dropdownDisable"&gt&lt/dropdown-multiselect&gt

Controller:
$scope.dropdownDisable = true;
</pre>

<h4>model</h4>
The <code>model</code> attribute gives the accessibility to the selected data from the dropdown which will be available to the view and the controller.

<pre>
    //Binding to the view
    &ltdropdown-multiselect dropdown-options="options" dropdown-trackby="Id" model="selectedItems"&gt&lt/dropdown-multiselect&gt

    &ltdiv&gt Selected Items = {{selectedItems | json}} &lt/div&gt

    //Binding to the controller
    var mySelectedValues = $scope.selectedItems;
</pre>

<h3>Set through config in Controller:</h3>
Configure the options from the controller to set <code>dropdown-config</code>.
<p>Available <code>config</code> options:
<pre>
    options,    // data to be displayed in dropdown
    trackBy,    // property name that should be used for tracking the selected item
    displayBy,  // an array that takes two values which will be used
    divider,
    icon,
    displayBadge
</pre>

<p><code>options<code>: Data to be displayed in dropdown list. This should be an array of objects.</p>
<p><code>trackBy<code>: Any property name from the option object that should be used for tracking the selected item.</p>
<p><code>displayBy<code>: An array that takes two values which will be used as data to be displayed in dropdown list, in a respective order. If it is not set, then it will automagically set the first two prooperty names as the values to be displayed.</p>
<p><code>divider<code>: A custom divider sign setter <code>-, : , =, # ,......</code> between the dropdown list columns. Default is <code>-</code>.</p>
<p><code>icon<code>: A custom icon setter for the selected items. Works with Font-Awesome too. Default is Bootstrap's glyphicons checkmark.</p>
<p><code>displayBadge<code>: Badge on the dropdown button that displays the total number of selected items from the dropdown list. Default visibility is true, but could be set to false.</p>

<pre>
In the controller:

var options = [ {
        'Id': 1,
        'Name': 'Batman',
        'Costume': 'Black'
    }, {
        'Id': 2,
        'Name': 'Superman',
        'Costume': 'Red & Blue'
    }, {
        'Id': 3,
        'Name': 'Hulk',
        'Costume': 'Green'
    }];

$scope.config = {
    options: options,
    trackBy: 'Id',
    displayBy: [ 'Name', 'Costume' ],
    divider: ':',
    icon: 'glyphicon glyphicon-heart',
    displayBadge: true
};

In HTML:
&ltdropdown-multiselect dropdown-config="config" &gt&lt/dropdown-multiselect&gt
</pre>

#TO DO
- Make jQuery independent.
