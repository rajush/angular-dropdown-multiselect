(function () {

    "use strict";

    angular.module("myApp", ["dropdown-multiselect"])
        .controller("AppController", ["$scope", function ($scope) {

            console.log("controller started");

            $scope.options = [];
            for (var i = 0; i < 100; i++) {
                var obj = {};
                obj.Id = i;
                obj.StoreDesc = 'New Store ' + i;
                obj.ChainId = 'Chain ' + i;
                obj.RegionId = 'Region ' + 0 + i;
                obj.StoreId = i;

                $scope.options.push(obj);
            }

            // pre-select the second option
            $scope.options[1].selected = true;

            $scope.config = {
                options: $scope.options,
                trackBy: 'StoreId',
                displayBy: ['StoreId', 'StoreDesc'],
                divider: ':',
                icon: 'glyphicon glyphicon-heart',
                // icon: 'fa fa-check-square-o',
                // displayBadge: false,
                filter: true,
                height: '200px',
                multiSelect: true,
                preSelectItem: true,
                // preSelectAll: true // 'preSelectAll' property will overwrite 'preSelectItem' property
            };

        }]);
})();
