
    app.controller('ReferenzenController',function($scope, referenzen, $filter, FilterService) {

        //assign data (a promise!)
        $scope.itemsAll = referenzen;
        $scope.filters = FilterService;


        //
        // copy 20 items to $scope.items which is used to display the list
        // by using infinite scroll and a limited initial amount of objects displayed in the list
        // we can reduce the amount of data binding and improve performance
        //
        $scope.$watch('$scope.itemsAll',function(newVal,oldVal) {
            $scope.items = jQuery.extend(true, {}, $scope.itemsAll);//clone items
            $scope.items.referenzdaten.objekte.objekt = $scope.itemsAll.referenzdaten.objekte.objekt.slice(0,2);
        });

        //infinite scrolling: add items when we reach the bottom while scrolling down
        $scope.myPagingFunction = function() {
            $scope.items.referenzdaten.objekte.objekt = $scope.itemsAll.referenzdaten.objekte.objekt.slice(0,$scope.items.referenzdaten.objekte.objekt.length + 10);
        };

        //show preloader when route changed
        $scope.$on('$routeChangeSuccess', function(next, current) {
            $('#referenzenPreloader').hide();
        });

        //hide preloader when route changes
        $scope.$on('$routeChangeStart', function(next, current) {
            $('#referenzenPreloader').show();
        });


        // make sure when promise fulfills (and $scope.items is updated) we notify
        // others scopes interested in the data
        $scope.$watch('$scope.items',function(newVal,oldVal) {

            //send data for filters to parent scope
            $scope.$emit('filters', $scope.items.filters);

            //send referenzobjekte to GoogleMapsController
            $scope.$emit('referenzobjekte', $scope.itemsAll);

        });

        $scope.$watch('filters',function(oldVal,newVal) {

            // filter items
            // filter:filterService.filters.activeFilters | TextSearch:filterService.filters.searchString | ArbeitsgattungenSearch:filterService.filters.arbeitsgattung | BaujahrSearch:filterService.filters.baujahr
            var itemsFiltered = {referenzdaten:{objekte:{objekt:{}}}};
            var objekteFiltered;
            objekteFiltered = $filter('ArbeitsgattungenSearch')($scope.itemsAll.referenzdaten.objekte.objekt,$scope.filters.arbeitsgattung);
            objekteFiltered = $filter('BaujahrSearch')(objekteFiltered,$scope.filters.baujahr);
            objekteFiltered = $filter('filter')(objekteFiltered,$scope.filters.activeFilters);
            objekteFiltered = $filter('TextSearch')(objekteFiltered,$scope.filters.searchString);
            itemsFiltered.referenzdaten.objekte.objekt = objekteFiltered;

            //send referenzobjekte to GoogleMapsController
            $scope.$emit('referenzobjekte', itemsFiltered);

        },true);

    });