
    app.controller("GoogleMapsController", [ "$scope", function($scope) {

        // configuration for leaflet geomaps
        angular.extend($scope, {
            schweiz: {
                lat: 47.39091206104779
                ,lng: 8.52264404296875
                ,zoom: 10
            },
            markers: {
                /*m1: {
                    lat: 47.3,
                    lng: 8.53
                }*/
            },
            layers: {
                baselayers: {
                    googleRoadmap: {
                        name: 'Google Streets',
                        layerType: 'ROADMAP',
                        type: 'google'
                    }
                    ,googleTerrain: {
                        name: 'Google Terrain',
                        layerType: 'TERRAIN',
                        type: 'google'
                    },
                    googleHybrid: {
                        name: 'Google Hybrid',
                        layerType: 'HYBRID',
                        type: 'google'
                    }
                }
            }
            ,defaults: {
                scrollWheelZoom: false
            }
        });



        // get filter data from child scope
        $scope.$on('referenzobjekte',function(e, data) {


            var markers = {};
            var o = data.referenzdaten.objekte.objekt;

            // parse data:
            // - create html for image displayed in popups of maps
            // - parse longitude/latitude coords to decimals numbers
            for (var k=0; k<o.length; k++) {
                var bild = '';
                if (typeof(o[k].bilder.objektbilder.bild)==='object') {
                    bild = '<br><img style="width:100%" src="http://'+o[k].bilder.objektbilder.bild[0].url_thumbnail+'">';
                }

                markers['o'+o[k].id] = {
                    lat: parseFloat(o[k]['geo_lat'])
                    ,lng: parseFloat(o[k]['geo_lon'])
                    ,message: '<strong>'+o[k].titel+'</strong><br>'+o[k].strasse+'<br>'+o[k].plz+' '+o[k].ort+bild
                };
            }

            //add markers from referenzobjekte to $scope
            angular.extend($scope, {
                markers: markers
            });
        });



    }]);