
    app.filter('ArbeitsgattungenSearch', function(){

        // All filters must return a function. The first parameter
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        return function(arr, ag){

            if (!ag || ag==''){
                return arr;
            }

            var result = [];

            //ag = ag.toLowerCase();

            //console.log('ag:'+ag);

            // Using the forEach helper method to loop through the array
            angular.forEach(arr, function(item){

                if (item.arbeitsgattungen.arbeitsgattung.indexOf(ag) !== -1) {
                    result.push(item);
                }

            });


            return result;
        };

    });