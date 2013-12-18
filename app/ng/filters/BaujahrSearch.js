
    app.filter('BaujahrSearch', function(){

        // All filters must return a function. The first parameter
        // is the data that is to be filtered, and the second is an
        // argument that may be passed with a colon (searchFor:searchString)

        return function(arr, baujahr){

            if (!baujahr){
                return arr;
            }
            //return arr;

            var result = [];
            var filtered = false;

            // Using the forEach helper method to loop through the array
            angular.forEach(arr, function(item) {
                filtered=false;
                if (typeof(baujahr.von)!=='undefined' && parseInt(item.baujahr) < parseInt(baujahr.von)) {
                    filtered=true;
                }
                if (typeof(baujahr.bis)!=='undefined' && parseInt(item.baujahr) > parseInt(baujahr.bis)) {
                    filtered=true;
                }
                if (!filtered) {
                    result.push(item);
                }

            });

            return result;
        };

    });