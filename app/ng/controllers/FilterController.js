
    app.controller('FilterController',function($scope,$location,FilterService) {

            $scope.data = {
                filters: null
            };
            $scope.filterService = {
                filters: FilterService
            };

            // get filter options data (options for selects) from child scope
            $scope.$on('filters',function(e, filters) {
                $scope.data.filters = filters;
                $scope.data.url = $location.url();//used to show active link
            });
    });