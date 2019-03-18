# angular-dropdown-multiselect
Angular JS directive for dropdown with multi-select feature.

<h3>Demo</h3>
<a href="https://plnkr.co/edit/KpVqaiblOKGk5K6VWmi4?p=preview">https://plnkr.co/edit/KpVqaiblOKGk5K6VWmi4?p=preview</a>

<h3>Dependencies</h3>

AngularJS, Bootstrap

<h3>Usage</h3>

Include both <code>.css</code> and <code>.js</code> files in <code>index.html</code>.
```html
<link rel="stylesheet" href="angular-dropdownMultiselect.min.css">
<script src="angular-dropdownMultiselect.min.js"></script>
```

Inject <code>dropdown-multiselect</code> as your angular app dependencies.
```javascript
angular.module( 'App', [ 'dropdown-multiselect' ] );
```

<h3>Features</h3>

<p>Use as an <em>element</em></p>

```html
  <dropdown-multiselect></dropdown-multiselect>
```
<p>or as an <em>attribute</em></p>

```html
    <div dropdown-multiselect ></div>
```

Provide custom name to the dropdown

```html
  <dropdown-multiselect>My Custom Name</dropdown-multiselect>
```
If no text is provided, it will default to text as <code>Select</code>.

<h3>Settings through attribute:</h3>

<h4>i. dropdown-options</h4>
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

<h4>ii. dropdown-trackby</h4>
<p>Initially, dropdown items are tracked by <code>Id</code> automagically (considering "Id" property is present in all objects in an array), if the <code>dropdown-trackby</code> attribute is not set.</p>
<p>If the option objects does not have <code>Id</code> property, then custom tracking could be set by providing any of the property of an object from the options data.</p>
Controller:

```javascript
var options = [ {
        'Name': 'Batman',
        'Costume': 'Black'
    }, {
        'Name': 'Superman',
        'Costume': 'Red & Blue'
    }, {
        'Name': 'Hulk',
        'Costume': 'Green'
    }];
```
<p>HTML:</p>

```html
<dropdown-multiselect dropdown-options="options" dropdown-trackby="Name"></dropdown-multiselect>
```
<p><em>NOTE: </em> It is always better to provide <code>dropdown-trackby</code> attribute for correct tracking, when <code>dropdown-options</code> is being used.</p>

<h4>iii. dropdown-disable</h4>
<p>Dropdown could be disabled by directly providing boolean value to <code>dropdown-disable</code> attribute.</p>
HTML:

```html
<dropdown-multiselect dropdown-options="options" dropdown-disable="true"></dropdown-multiselect>
```
<p>Or through the Controller:</p>

```javascript
$scope.dropdownDisable = true;
```
and then in HTML:

```html
<dropdown-multiselect dropdown-options="options" dropdown-disable="dropdownDisable"></dropdown-multiselect>
```

<h4>iv. model</h4>
The <code>model</code> attribute gives the accessibility to the selected data from the dropdown which will be available to the view and the controller.

HTML:

```html
    <!--Binding to the view-->
    <dropdown-multiselect dropdown-options="options" dropdown-trackby="Id" model="selectedItems"></dropdown-multiselect>

    <div> Selected Items = {{selectedItems | json}} </div>
```

Controller:

```javascript
    //Binding to the controller
    var mySelectedValues = $scope.selectedItems;
```

<h3>Set through config in Controller:</h3>

Configure the options from the controller to set <code>dropdown-config</code> attribute.

<p><em>NOTE: </em> When <code>dropdown-config</code> is being used, it will overwrite <code>dropdown-options</code> and <code>dropdown-trackby</code> attribute, if in use. Therefore, it's better to use just one at a time.</p>

<p>Available <code>config</code> options:
<pre>
    options,
    trackBy,
    displayBy,
    divider,
    icon,
    displayBadge,
    height,
    filter,
    multiSelect,
    preSelectItem,
    preSelectAll
</pre>

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
    height: '200px',
    filter: true,
    multiSelect: false,
    preSelectItem: true,
    preSelectAll: false
};
```

HTML:

```html
   <dropdown-multiselect dropdown-config="config" ></dropdown-multiselect>
```
<h4>options:</h4>
<p>Data to be displayed in dropdown list. This should be an array of objects.</p>

<h4>trackBy:</h4>
<p>Any property name from the option object that should be used for tracking the selected item.</p>

<h4>displayBy:</h4>
<p>An array that takes two values which will be used as data to be displayed in dropdown list, in a respective order. If it is not set, then it will automagically set the first two prooperty names as the values to be displayed.</p>

<h4>divider:</h4>
<p>A custom divider sign setter <code>-, : , =, # ,......</code> between the dropdown list columns. Default is <code>-</code>.</p>

<h4>icon:</h4>
<p>A custom icon setter for the selected items. Works with Font-Awesome too. Default is Bootstrap's glyphicons checkmark.</p>

<h4>displayBadge:</h4>
<p>Badge on the dropdown button that displays the total number of selected items from the dropdown list. Default visibility is <code>true</code>, but could be set to <code>false</code>.</p>

<h4>height:</h4>
<p>Height of the scrollable item list in a dropdown-box, in pixel. Default height is set to <code>200px</code>.</p>

<h4>filter:</h4>
<p>Filter/search items from the dropdown list. Default visibility is <code>false</code>, but could be set to <code>true</code>.</p>

<h4>multiSelect:</h4>
<p>Turn multi-select list items "on" or "off". Default is <code>true</code>, but could be turned "off" by setting <code>false</code>.</p>

<h4>preSelectItem:</h4>
<p>Allow pre-selecting of selected list items on load. Just add in <code>preSelectItem: true</code> config option property, alonng with passing <code>selected: true</code> property to the object that needs to be pre-selected while setting up the config options.</p>

```javascript
var options = [ {
        'Id': 1,
        'Name': 'Batman',
        'Costume': 'Black',
        'selected': true // this will pre-select this option
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
    height: '200px',
    filter: true,
    multiSelect: true, // ('multiSelect' also has to be set to 'true')
    preSelectItem: true, // allowing pre-select (this has to be set to 'true')
};

```

<h4>preSelectAll:</h4>
<p>Turn pre-selecting of all list items "on" or "off" on load. Default is <code>false</code>, but could be turned "on" by setting <code>true</code>.
NOTE: For pre-select-all to work, <code>multiSelect</code> option must be set to <code>true</code>.
</p>

```javascript
$scope.config = {
    options: options,
    trackBy: 'Id',
    displayBy: [ 'Name', 'Costume' ],
    divider: ':',
    icon: 'glyphicon glyphicon-heart',
    displayBadge: true,
    height: '200px',
    filter: true,
    multiSelect: true, // ('multiSelect' also has to be set to 'true')
    preSelectAll: true // allowing pre-select-all
};

```


Compatible with

![Alt text](https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/32/chrome.png "Chrome")
![Alt text](https://cdn1.iconfinder.com/data/icons/humano2/32x32/apps/firefox-icon.png "Firefox")
![Alt text](https://cdn1.iconfinder.com/data/icons/fatcow/32x32/safari_browser.png "Safari")

# License
MIT
