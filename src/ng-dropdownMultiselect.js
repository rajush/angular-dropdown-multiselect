'use strict';

angular.module( 'dropdown-multiselect', [] )
    .directive( 'dropdownMultiselect', [ function () {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div class="dropdown">' +
                '<button class="btn btn-default dropdown-toggle" ng-class="{\'disabled\':disabled}" type="button" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">' +
                '<span class="pull-left">Select </span>' +
                '<div class="pull-right">' +
                '<span class="badge" ng-if="isBadgeVisible"> {{model.length}}</span>' +
                '<span class="caret"></span>' +
                '</div>' +
                '</button>' +
                '<ul class="dropdown-menu dropdownMultiselect" aria-labelledby="dropdownMenu">' +
                '<li><a ng-click="selectAll()"><i class="glyphicon glyphicon-ok"></i> Select All</a></li>' +
                '<li><a ng-click="unSelectAll()"><i class="glyphicon glyphicon-remove"></i> Unselect All</a></li>' +
                '<li role="separator" class="divider"></li>' +
                '<li ng-repeat="option in options">' +
                '<a ng-click="setSelectedItem()">' +
                '{{option[leftKey]}} {{divider}} {{option[rightKey]}} <span class="pull-right" ng-class="isChecked(option[trackByKey], dropdownType)"></span>' +
                '</a>' +
                '</li>' +
                '</ul>' +
                '</div>',
            scope: {
                config: '=dropdownConfig', // configuration from controller
                primaryKey: '@dropdownTrackby', // main key from the option's object, to select or unselect the item
                disableDropdown: '=dropdownDisable', // boolean
                dropdownType: '=', // view type
                model: '=?', // model to bind with view & bind data back to the controller
                options: '=dropdownOptions', // object for repeater
                notifyParent: '&dropdownSelected' // notifier
            },
            controller: function ( $scope ) {
                var model = [],
                    badgeVisibility = true, // default badge visibility
                    divider = '-', // default divider sign
                    icon = 'glyphicon glyphicon-ok', // default icon
                    viewType = $scope.dropdownType,
                    key = $scope.primaryKey; // default key from dropdown-trackby attribute

                // binding with view (used for check icon)
                $scope.trackByKey = key;

                $scope.isBadgeVisible = badgeVisibility;

                $scope.divider = divider;

                $scope.model = model;

                try {

                    //check if config is defined or not
                    if ( angular.isDefined( $scope.config ) ) {
                        // if 'options' property exists, set the dropdown list items
                        if ( $scope.config.hasOwnProperty( 'options' ) ) {
                            $scope.options = $scope.config.options;
                        }

                        // if 'displayBy' property exists, set the left and right data to be displayed for view
                        if ( $scope.config.hasOwnProperty( 'displayBy' ) ) {
                            $scope.leftKey = $scope.config.displayBy[ 0 ];
                            $scope.rightKey = $scope.config.displayBy[ 1 ];
                        } else {
                            // grab the first two property and set it automatically as leftKey and rightKey
                            var optionsProperties = [];
                            for ( var prop in $scope.options[ 0 ] ) {
                                optionsProperties.push( prop );
                            }

                            $scope.leftKey = optionsProperties[ 0 ];
                            $scope.rightKey = optionsProperties[ 1 ];
                        }

                        if ( $scope.config.hasOwnProperty( 'divider' ) ) {
                            $scope.divider = $scope.config.divider;
                        }

                        if ( $scope.config.hasOwnProperty( 'icon' ) ) {
                            icon = $scope.config.icon;
                        }

                        if ( $scope.config.hasOwnProperty( 'displayBadge' ) ) {
                            badgeVisibility = ( angular.equals( true, $scope.config.displayBadge ) ) ? badgeVisibility = true : badgeVisibility = false;

                            $scope.isBadgeVisible = badgeVisibility;
                        }

                        // if 'trackBy' property exists, set the main key to track the dropdown list
                        //(config file overrites the dropdown-trackby attributes)
                        if ( $scope.config.hasOwnProperty( 'trackBy' ) ) {
                            key = $scope.config.trackBy;

                            // binding with view (used for check icon)
                            $scope.trackByKey = key;

                        } else {
                            //run auto assign condition
                            keyIsUndefined( key );

                        }

                    } else {
                        // check for dropdown-trackby attribute is defined or not
                        //run auto assign condition
                        keyIsUndefined( key );

                    }

                    function keyIsUndefined( key ) {
                        // if dropdownTrackby is not defined
                        if ( angular.isUndefined( key ) ) {

                            // TODO: might need a better alternative for checking
                            /****************************************************/
                            //check if an object in option array has a property named 'Id' or 'id'.
                            //here, doing a check only on first index assuming that the objects are set with correct property
                            key = $scope.options[ 0 ].hasOwnProperty( 'Id' ) ? 'Id' : $scope.options[ 0 ].hasOwnProperty( 'id' ) ? 'id' : false;

                            // set trackByKey to newly auto assigned key for binding with view (used for check icon)
                            $scope.trackByKey = key;

                            //if no key throw error
                            if ( key === false ) {
                                throw 'ReferenceError: Expecting property "Id" in an object from an array binded to "dropdown-options" attribute. Consider providing "dropdown-trackby" attribute or make sure property "Id" exists in binded array\'s object.';
                            }

                        }
                    }

                    var unbindWatcher = $scope.$watch( 'options', function ( newVal, oldVal ) {

                        // when true
                        if ( $scope.disableDropdown ) {
                            $scope.disabled = true;
                        } else {
                            $scope.disabled = false;
                        }

                        // reset the model if the Chain was changed
                        if ( newVal ) {
                            model = [];
                            $scope.model = model;
                        }

                    } );

                    $scope.selectAll = function () {
                        var options = $scope.options;

                        if ( angular.isUndefined( options ) ) {
                            return false;
                        }

                        if ( options.length === model.length ) {
                            return false;
                        } else {
                            for ( var i = 0; i < options.length; i++ ) {
                                var id = options[ i ][ key ],
                                    chainId = options[ i ].ChainId,
                                    obj = {};

                                var found = false;

                                // looking for if each item from the 'options' array already exists in 'model' array
                                for ( var x = 0; x < model.length; x++ ) {
                                    var current = model[ x ][ key ];

                                    // item from the 'options' array already exists in 'model' array
                                    if ( id === current ) {
                                        found = true;
                                        break;
                                    }
                                }

                                if ( !found ) {
                                    obj[ key ] = id;
                                    obj.ChainId = chainId;

                                    model.push( options[ i ] );
                                }

                            }
                        }

                        // notify on each select or unselect
                        $scope.notifyParent( {
                            selected: model
                        } );
                    };

                    $scope.unSelectAll = function () {
                        model = [];
                        $scope.model = model;

                        // notify on each select or unselect
                        $scope.notifyParent( {
                            selected: model
                        } );
                    };

                    $scope.setSelectedItem = function () {

                        var id = this.option[ key ],
                            chainId = this.option.ChainId,
                            obj = {};

                        var duplicate = isDuplicate( id, model );

                        if ( !duplicate ) {
                            obj[ key ] = id;
                            obj.ChainId = chainId;

                            model.push( this.option );
                        }

                        // notify on each select or unselect
                        $scope.notifyParent( {
                            selected: model
                        } );

                    };

                    $scope.isChecked = function ( id, type ) {

                        for ( var i = 0; i < model.length; i++ ) {
                            // add checkmark if the selected item is already in 'model' array
                            if ( model[ i ][ key ] === id ) {
                                return icon;
                            }
                        }
                        return false;

                    };

                } catch ( e ) {
                    console.error( e );
                }

                function isDuplicate( id, array ) {
                    for ( var i = 0; i < array.length; i++ ) {
                        var current = array[ i ][ key ];

                        // remove if already exists
                        if ( id === current ) {
                            var indexOfId = findIndexByKeyValue( array, key, id );
                            array.splice( indexOfId, 1 );
                            return true;
                        }
                    }
                }

                function findIndexByKeyValue( array, key, valuetosearch ) {
                    for ( var i = 0; i < array.length; i++ ) {
                        if ( array[ i ][ key ] === valuetosearch ) {
                            return i;
                        }
                    }
                    return null;
                }

            },
            link: function ( scope, element, attr, ctrl ) {
                //stop the dropdown from auto close
                angular.element( '.dropdown .dropdown-menu' ).on( 'click', function ( e ) {
                    e.stopPropagation();
                } );

                if ( scope.dropdownType === 'Edit' ) {
                    angular.element( '.dropdown ul' ).addClass( 'not-allowed' );
                }
            }
        };
    } ] );
