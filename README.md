# ng-dropdown-multiselect
Angular JS directive for dropdown with multi-select feature. 

#Dependencies
AngularJS, jQuery, Bootstrap

#Features

<p>Use as an <code>element</code> 
  <code>&ltdropdown-multiselect&gt&lt/dropdown-multiselect&gt</code> 
  or as an <code>attribute</code>
  <code>&ltdiv dropdown-multiselect&gt&lt/div&gt</code> 
</p>

<h3>Set through attribute:</h3>

<h4>dropdown-options</h4>
<p>Provide data to be displayed as dropdown list items through <code>dropdown-options="options"</code> attribute.</p>. It can accept the object in a format of:
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
<p>If the option objects does not have <code>Id</code> property, then custom tracking could be set by providing any of the property fron the object that should be used.</p>
<p>HTML:</p>
<pre>&ltdropdown-multiselect dropdown-options="options" dropdown-trackby="Name"&gt&lt/dropdown-multiselect&gt</pre>

#TO DO
- More explanations and examples.

    
