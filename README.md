# ng-dropdown-multiselect
Angular JS directive for dropdown with multi-select feature.

#Dependencies
AngularJS, jQuery, Bootstrap

#Usage

Inject <code>dropdown-multiselect</code> as your angular app dependencies.
```javascript
angular.module( 'App', [ 'dropdown-multiselect' ] );
```

#Features

<p>Use as an <em>element</em>
```html
  <dropdown-multiselect></dropdown-multiselect>
  ```
  or as an <em>attribute</em>
  ```html
    <div dropdown-multiselect ></div>
    ```
</p>

<h3>Set through attribute:</h3>

<h4>dropdown-options</h4>
<p>Provide data to be displayed as dropdown list items through <code>dropdown-options="options"</code> attribute. It can accept the object in a format of:</p>
```javascript
$scope.options = [ {
        'Id': 1,
        'Name': 'Batman'
    }, {
        'Id': 2,
        'Name': 'Superman'
    }, {
        'Id': 3,
        'Name': 'Hulk'
    }];
```
<p>HTML:</p>
```html
<dropdown-multiselect dropdown-options="options"></dropdown-multiselect>
```

<h4>dropdown-trackby</h4>
<p>Initially, dropdown items are tracked by <code>Id</code> automagically, if the <code>dropdown-trackby</code> attribute is not set.</p>
<p>If the option objects does not have <code>Id</code> property, then custom tracking could be set by providing any of the property of an object from the options data.</p>
<p>HTML:</p>
```html
<dropdown-multiselect dropdown-options="options" dropdown-trackby="Name"></dropdown-multiselect>
```
<p>It is always better to provide <code>dropdown-trackby</code> attribute for correct tracking.</p>

<h4>dropdown-disable</h4>
<p>Dropdown could be disabled by providing boolean value to <code>dropdown-disable</code> attribute.
HTML:
```html
<dropdown-multiselect dropdown-options="options" dropdown-disable="true"></dropdown-multiselect>
```
Or through the controller:

HTML:
```html
<dropdown-multiselect dropdown-options="options" dropdown-disable="dropdownDisable"></dropdown-multiselect>
```

Controller:
```javascript
$scope.dropdownDisable = true;
```

<h4>model</h4>
The <code>model</code> attribute gives the accessibility to the selected data from the dropdown which will be available to the view and the controller.

HTML:
```html
    //Binding to the view
    <dropdown-multiselect dropdown-options="options" dropdown-trackby="Id" model="selectedItems"></dropdown-multiselect>

    <div> Selected Items = {{selectedItems | json}} </div>
```

Controller:
```javascript
    //Binding to the controller
    var mySelectedValues = $scope.selectedItems;
```

<h3>Set through config in Controller:</h3>
Configure the options from the controller to set <code>dropdown-config</code>.
<p>Available <code>config</code> options:
<pre>
    options,
    trackBy,
    displayBy,  
    divider,
    icon,
    displayBadge,
    height
</pre>

<p><code>options</code>: Data to be displayed in dropdown list. This should be an array of objects.</p>
<p><code>trackBy</code>: Any property name from the option object that should be used for tracking the selected item.</p>
<p><code>displayBy</code>: An array that takes two values which will be used as data to be displayed in dropdown list, in a respective order. If it is not set, then it will automagically set the first two prooperty names as the values to be displayed.</p>
<p><code>divider</code>: A custom divider sign setter <code>-, : , =, # ,......</code> between the dropdown list columns. Default is <code>-</code>.</p>
<p><code>icon</code>: A custom icon setter for the selected items. Works with Font-Awesome too. Default is Bootstrap's glyphicons checkmark.</p>
<p><code>displayBadge</code>: Badge on the dropdown button that displays the total number of selected items from the dropdown list. Default visibility is true, but could be set to false.</p>
<p><code>height</code>: Height of the dropdown-box, in pixel, containing the list options. Default height is set to 300px.</p>

Controller:
```javascript
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
    displayBadge: true,
    height: '200px'
};
```

HTML:
```html
<dropdown-multiselect dropdown-config="config" ></dropdown-multiselect>
```

#TO DO
- Make jQuery independent.
