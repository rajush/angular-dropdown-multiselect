/*
 * Dropdown-multiselect directive for AngularJS
 * By Rajush Shakya
 * https://github.com/rajush/angular-dropdown-multiselect
 */

(function () {

    'use strict';

    angular
        .module('dropdown-multiselect', [])
        .directive('dropdownMultiselect', ['$timeout', function ($timeout) {
            return {
                restrict: 'AE',
                replace: true,
                transclude: true,
                template: '<div class="dropdown" id="dropdownMultiselect">' +
                    '<button class="btn btn-default dropdown-toggle" ng-class="{\'disabled\':disabled}" type="button" id="dropdownMenu">' +
                    '<span class="pull-left" ng-if="!hasText">Select </span>' +
                    '<span class="pull-left" ng-transclude></span>' +
                    '<div class="pull-right">' +
                    '<span class="badge" ng-if="isBadgeVisible"> {{model.length}}</span>' +
                    '<span class="caret"></span>' +
                    '</div>' +
                    '</button>' +
                    '<ul class="dropdown-menu">' +
                    '<li>' +
                    '<div>' +
                    '<ul class="dropdown-static">' +
                    '<li ng-if="multiSelect"><a ng-click="selectAll()"><i class="glyphicon glyphicon-ok"></i> Select All</a></li>' +
                    '<li ng-if="multiSelect"><a ng-click="unSelectAll()"><i class="glyphicon glyphicon-remove"></i> Unselect All</a></li>' +
                    '<div class="filter-parent" id="search" ng-if="isFilterVisible">' +
                    '<label for="filter-by"><i class="glyphicon glyphicon-search"></i></label>' +
                    '<div>' +
                    '<input placeholder="Search" id="filter-by" class="form-control" tabindex="1" ng-model="$parent.option">' +
                    '</div>' +
                    '</div>' +
                    '</ul>' +
                    '</div>' +
                    '</li>' +
                    '<li>' +
                    '<ul class="dropdown-scrollable" ng-class="{\'dropdown-height\': defaultHeight, \'hasfilter\': isFilterVisible === true}">' +
                    '<li ng-repeat="option in options | filter: option">' +
                    '<a ng-click="setSelectedItem()">' +
                    '<span class="pull-left option-selected-icon" ng-class="isChecked(option[trackByKey], dropdownType)"></span>' +
                    '<span class="option-content">{{option[leftKey]}} {{divider}} {{option[rightKey]}}</span>' +
                    '</a>' +
                    '</li>' +
                    '</ul>' +
                    '</li>' +
                    '</ul>' +
                    '</div>',
                scope: {
                    config: '=dropdownConfig', // configuration from controller
                    primaryKey: '@dropdownTrackby', // main key from the option's object, to select or unselect the item
                    disableDropdown: '=dropdownDisable', // boolean
                    dropdownType: '=', // view type
                    model: '=?', // model to bind with view & bind data back to the controller
                    dropdownOptions: '=dropdownOptions', // object for repeater
                    notifyParent: '&dropdownSelected' // notifier
                },
                controller: ["$scope", function ($scope) {
                    var model = [],
                        badgeVisibility = true, // default badge visibility
                        multiSelect = true, // default multiSelect is "ON"
                        filterVisibility = false, // drfault filter visibility
                        divider = '-', // default divider sign
                        icon = 'glyphicon glyphicon-ok', // default icon
                        viewType = $scope.dropdownType,
                        key = $scope.primaryKey, // default key from dropdown-trackby attribute
                        preSelectItem,
                        preSelectAll;

                    // binding with view (used for check icon)
                    $scope.trackByKey = key;
                    $scope.isBadgeVisible = badgeVisibility;
                    $scope.isFilterVisible = filterVisibility;
                    $scope.divider = divider;
                    $scope.multiSelect = multiSelect;
                    $scope.model = model;

                    try {
                        if (angular.isUndefined($scope.dropdownOptions) && angular.isUndefined($scope.config)) {
                            throw 'Error: Missing array for dropdown list. Consider providing array through [dropdown-options] or [dropdown-config] attribute in the directive tag.';
                        }

                        // check if dropdownOptions is defined or not
                        if (angular.isDefined($scope.dropdownOptions)) {
                            // setting dropdown list items
                            $scope.options = $scope.dropdownOptions;

                            // auto assigning left display value and right display value
                            autoLeftKeyRightKey();
                        }

                        /*===================================================================*/
                        /*   NOTE: WHEN config AND dropdownOptions ARE BOTH USED TOGETHER,   */
                        /*         config WILL OVERWRITE dropdownOptions.                    */
                        /*===================================================================*/

                        // check if config is defined or not
                        if (angular.isDefined($scope.config)) {
                            // if 'options' property exists, set the dropdown list items
                            if ($scope.config.hasOwnProperty('options')) {
                                $scope.options = $scope.config.options;
                            }

                            // if 'displayBy' property exists, set the left and right data to be displayed for view
                            if ($scope.config.hasOwnProperty('displayBy')) {
                                $scope.leftKey = $scope.config.displayBy[0];
                                $scope.rightKey = $scope.config.displayBy[1];
                            } else {
                                // auto assigning left display value and right display value
                                autoLeftKeyRightKey();
                            }

                            if ($scope.config.hasOwnProperty('divider')) {
                                $scope.divider = $scope.config.divider;
                            }

                            if ($scope.config.hasOwnProperty('icon')) {
                                icon = $scope.config.icon;
                            }

                            if ($scope.config.hasOwnProperty('filter')) {
                                filterVisibility = $scope.config.filter;

                                $scope.isFilterVisible = filterVisibility;
                            }

                            if ($scope.config.hasOwnProperty('displayBadge')) {
                                badgeVisibility = (angular.equals(true, $scope.config.displayBadge)) ? badgeVisibility = true : badgeVisibility = false;

                                $scope.isBadgeVisible = badgeVisibility;
                            }

                            if ($scope.config.hasOwnProperty('multiSelect')) {
                                multiSelect = (angular.equals(true, $scope.config.multiSelect)) ? true : false;

                                $scope.multiSelect = multiSelect;
                            }

                            if ($scope.config.hasOwnProperty('preSelectAll')) {
                                preSelectAll = (angular.equals(true, $scope.config.preSelectAll)) ? true : false;

                                $scope.preSelectAll = preSelectAll;
                            }

                            if ($scope.config.hasOwnProperty('preSelectItem')) {
                                preSelectItem = (angular.equals(true, $scope.config.preSelectItem)) ? true : false;

                                $scope.preSelectItem = preSelectItem;
                            }

                            //*=================================================
                            //  if 'trackBy' property exists, set the main key to track the dropdown list
                            //  (config file overrites the dropdown-trackby attributes)
                            //*=================================================
                            if ($scope.config.hasOwnProperty('trackBy')) {
                                key = $scope.config.trackBy;

                                // binding with view (used for check icon)
                                $scope.trackByKey = key;

                            } else {
                                //run auto assign condition
                                keyIsUndefined(key);
                            }

                        } else {
                            // check for dropdown-trackby attribute is defined or not
                            //run auto assign condition
                            keyIsUndefined(key);

                        }

                        var unbindWatcher = $scope.$watch('options', function (newVal, oldVal) {
                            // when true
                            if ($scope.disableDropdown) {
                                $scope.disabled = true;
                            } else {
                                $scope.disabled = false;
                            }

                            // reset the model if the options is changed
                            if (newVal) {
                                model = [];
                                $scope.model = model;
                            }

                        });

                        $scope.selectAll = function () {
                            var options = $scope.options;

                            if (angular.isUndefined(options)) {
                                return false;
                            }

                            if (options.length === model.length) {
                                return false;
                            } else {
                                for (var i = 0; i < options.length; i++) {
                                    var id = options[i][$scope.trackByKey],
                                        chainId = options[i].ChainId,
                                        obj = {};

                                    var found = false;

                                    // looking for if each item from the 'options' array already exists in 'model' array
                                    for (var x = 0; x < model.length; x++) {
                                        var current = model[x][$scope.trackByKey];

                                        // item from the 'options' array already exists in 'model' array
                                        if (id === current) {
                                            found = true;
                                            break;
                                        }
                                    }

                                    if (!found) {
                                        obj[$scope.trackByKey] = id;

                                        model.push(options[i]);
                                    }
                                }
                            }

                            // notify on each select or unselect
                            $scope.notifyParent({
                                selected: model
                            });
                        };

                        $scope.preSelect = function () {
                            var options = $scope.options;

                            options.forEach(function (item) {
                                if (item.selected) {
                                    model.push(item);
                                }
                            });

                            // notify on each select or unselect
                            $scope.notifyParent({
                                selected: model
                            });
                        }

                        $scope.unSelectAll = function () {
                            model = [];
                            $scope.model = model;

                            // notify on each select or unselect
                            $scope.notifyParent({
                                selected: model
                            });
                        };

                        $scope.setSelectedItem = function () {
                            var id = this.option[$scope.trackByKey],
                                chainId = this.option.ChainId,
                                obj = {};

                            // when multi select feature turned off through "config"
                            if (multiSelect === false) {
                                if (isDuplicate(id, model)) return false;
                                model[0] = this.option;
                                return false;
                            }

                            var duplicate = isDuplicate(id, model);

                            if (!duplicate) {
                                obj[$scope.trackByKey] = id;

                                this.option.selected = true;

                                // add to array
                                model.push(this.option);
                            }

                            // notify on each select or unselect
                            $scope.notifyParent({
                                selected: model
                            });
                        };

                        $scope.isChecked = function (id, type) {
                            for (var i = 0; i < model.length; i++) {
                                // add checkmark if the selected item is already in 'model' array
                                if (model[i][$scope.trackByKey] === id) {
                                    return icon;
                                }
                            }
                            return false;
                        };

                        //initial check
                        preSelectAllCheck();

                        // initial check for pre-selection of values
                        checkSelected();

                    } catch (e) {
                        console.error(e);
                    }

                    function checkSelected() {
                        // preSelectAll config option needs to be false
                        if (!$scope.preSelectAll && $scope.preSelectItem) {
                            // to ensure your code only runs after the markup is rendered.
                            $timeout($scope.preSelect);
                        }
                    }

                    function preSelectAllCheck() {
                        //multiSelect needs to be true
                        if ($scope.preSelectAll && $scope.multiSelect) {
                            // to ensure your code only runs after the markup is rendered.
                            $timeout($scope.selectAll);
                        }
                    }

                    function autoLeftKeyRightKey() {
                        // grab the first two property and set it automatically as leftKey and rightKey
                        var optionsProperties = [];
                        for (var prop in $scope.options[0]) {
                            optionsProperties.push(prop);
                        }
                        $scope.leftKey = optionsProperties[0]; // setthing by 1st property
                        $scope.rightKey = optionsProperties[1]; // setting by 2nd property
                    }

                    function keyIsUndefined(key) {
                        // if dropdownTrackby is not defined
                        if (angular.isUndefined(key)) {

                            // TODO: might need a better alternative for checking
                            /*==================================================*/
                            // check if an object in option array has a property named 'Id' or 'id'.
                            // here, doing a check only on first index assuming that the objects are set with correct property
                            /*==================================================*/
                            key = $scope.options[0].hasOwnProperty('Id') ? 'Id' : $scope.options[0].hasOwnProperty('id') ? 'id' : false;

                            // set trackByKey to newly auto assigned key for binding with view (used for check icon)
                            $scope.trackByKey = key;

                            //if no key throw error
                            if (key === false) {
                                throw 'ReferenceError: Expecting property "Id" in an object from an array binded to "dropdown-options" attribute. Consider providing "dropdown-trackby" attribute or make sure property "Id" exists in binded array\'s object.';
                            }

                        }
                    }

                    function isDuplicate(id, array) {
                        for (var i = 0; i < array.length; i++) {
                            var current = array[i][$scope.trackByKey];

                            // remove if already exists
                            if (id === current) {
                                var indexOfId = findIndexByKeyValue(array, $scope.trackByKey, id);
                                array.splice(indexOfId, 1);
                                return true;
                            }
                        }
                    }

                    function findIndexByKeyValue(array, key, valuetosearch) {
                        for (var i = 0; i < array.length; i++) {
                            if (array[i][key] === valuetosearch) {
                                return i;
                            }
                        }
                        return null;
                    }

                }],
                link: function (scope, element, attr, ctrl) {
                    var openDropdown = false;

                    element.bind('click', function (event) {
                        var dropdownMultiselect = document.getElementById('dropdownMultiselect'),
                            parentTarget;

                        //console.log( "before", openDropdown );

                        //finding parent target element for browser
                        /* when jQuery is present */
                        if (angular.isDefined(event.originalEvent)) {
                            parentTarget = (angular.isDefined(event.originalEvent.srcElement)) ? event.originalEvent.srcElement.offsetParent /* chrome/safari */ : event.originalEvent.originalTarget.offsetParent /*firefox*/ ;
                        } else {
                            /* when jQuery is NOT present */
                            parentTarget = (angular.isDefined(event.srcElement)) ? event.srcElement.offsetParent /* chrome/safari */ : event.originalTarget.offsetParent /*firefox*/ ;
                        }

                        if (parentTarget !== null) {
                            var eventSrc = parentTarget,
                                inside;

                            while (eventSrc !== dropdownMultiselect) {
                                var dropdownMenuList = angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu'));

                                eventSrc = eventSrc['offsetParent'];
                                inside = true;
                                // dropdownMenuList.addClass( 'dropdown-show' );

                                if (eventSrc === null) {
                                    inside = false;
                                    break;
                                }
                            }

                            if (eventSrc === null) {
                                angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                                angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                                return false;
                            }

                            if (eventSrc === null || (eventSrc === dropdownMultiselect && !inside)) {
                                var dropdownMenuBtn = angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu'));

                                if (openDropdown === true) {
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                                } else {
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).addClass('dropdown-show');
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'block');
                                }
                                openDropdown = !openDropdown;
                                //console.log( "after", openDropdown );
                            }
                        } else {
                            angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                            angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                        }
                    });

                    function touchhandleEventCall(event) {
                        var dropdownMultiselect = document.getElementById('dropdownMultiselect'),

                            //finding parent target element for browser
                            parentTarget = (angular.isDefined(event.srcElement)) ? event.srcElement.offsetParent /* chrome/safari */ : event.originalTarget.offsetParent /*firefox*/ ;

                        if (parentTarget !== null) {
                            var eventSrc = parentTarget,
                                inside;

                            while (eventSrc !== dropdownMultiselect) {
                                var dropdownMenuList = angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu'));

                                eventSrc = eventSrc['offsetParent'];
                                inside = true;
                                // dropdownMenuList.addClass( 'dropdown-show' );

                                if (eventSrc === null) {
                                    inside = false;
                                    break;
                                }
                            }


                            if (eventSrc === null) {
                                angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                                angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                                return false;
                            }

                            if (eventSrc === null || (eventSrc === dropdownMultiselect && !inside)) {
                                var dropdownMenuBtn = angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu'));

                                console.log(dropdownMenuBtn);
                                if (angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu'))[0].classList[1] === 'dropdown-show') {
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                                } else {
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).addClass('dropdown-show');
                                    angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'block');
                                }

                            }
                        } else {
                            angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                            angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                        }
                    }

                    function handleEventCall(event) {
                        var dropdownMultiselect = document.getElementById('dropdownMultiselect'),

                            //finding parent target element for browser
                            parentTarget = (angular.isDefined(event.srcElement)) ? event.srcElement.offsetParent /* chrome/safari */ : event.originalTarget.offsetParent /*firefox*/ ;

                        if (parentTarget !== null) {
                            var eventSrc = parentTarget,
                                inside;

                            while (eventSrc !== dropdownMultiselect) {
                                var dropdownMenuList = angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu'));

                                eventSrc = eventSrc['offsetParent'];
                                inside = true;
                                // dropdownMenuList.addClass( 'dropdown-show' );

                                if (eventSrc === null) {
                                    inside = false;
                                    break;
                                }
                            }

                            if (angular.isDefined(inside) && !inside) {
                                angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                                angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                                openDropdown = false; //closing the state of dropdown
                                return openDropdown;
                            }

                        } else {
                            angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).removeClass('dropdown-show');
                            angular.element(document.querySelector('#dropdownMultiselect .dropdown-menu')).css('display', 'none');
                        }

                    }

                    if ('ontouchstart' in window) {
                        /* browser with Touch Events
                           running on touch-capable device */
                        document.addEventListener('touchstart', touchhandleEventCall, false);
                    } else {
                        document.addEventListener('mouseup', handleEventCall, false);

                    }

                    var dropdownListBox = angular.element(document.querySelector('.dropdown-scrollable'));

                    if (angular.isDefined(scope.config) && angular.isDefined(scope.config.height)) {
                        var custom_height = scope.config.height;

                        dropdownListBox.css('max-height', custom_height);

                    } else {
                        scope.defaultHeight = true;
                    }

                    if (scope.multiSelect === false && scope.isFilterVisible === true) {
                        dropdownListBox.css('margin-top', '50px');
                    } else if (scope.multiSelect === false && scope.isFilterVisible === false) {
                        dropdownListBox.css('margin-top', '10px');
                    }

                    var transcluded = element.find('span').contents();

                    scope.hasText = (transcluded.length > 1);

                }
            };
        }]);

})();
