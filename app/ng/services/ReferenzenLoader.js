
    app.factory('ReferenzenLoader',['Referenzen','$route','$q',function (Referenzen,$route,$q) {

        //var urlAddon = '';

        return function(initObject) {
            //alert(initObject.urlAddon);

            var delay = $q.defer();
            Referenzen({urlBase:initObject.urlBase})
            .query({urlAddon: initObject.urlAddon}, function(data) {
                delay.resolve(data);
            },function() {
                delay.reject('Referenzen konnten nicht geladen werden ('+$route.url()+')');
            });

            return delay.promise;
        };


    }]);