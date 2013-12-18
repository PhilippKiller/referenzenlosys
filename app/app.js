    'use strict';

    var app = angular.module('LosysReferenzen',['ngCookies'
                                                ,'ngResource'
                                                ,'ngSanitize'
                                                ,'ngRoute'
                                                ,'leaflet-directive'
                                                //,'pasvaz.bindonce'
                                                ,'infinite-scroll']);

    app.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'ReferenzenController'
                ,templateUrl: 'ng/views/liste.html'
                ,resolve: {
                    referenzen: function(ReferenzenLoader) {
                        return ReferenzenLoader({urlBase:'http://www.losys.ch/iframe/xml/xml_ausgabe.php?',urlAddon:'a=1207&key=s659lkt256se&group=1207'});
                        //return ReferenzenLoader({urlBase:'ng/data/data.test.single.line.xml',urlAddon:''});
                    }
                }
            })
            .when('/wetzikon', {
                controller: 'ReferenzenController'
                ,templateUrl: 'ng/views/liste.html'
                ,resolve: {
                    referenzen: function(ReferenzenLoader) {
                        return ReferenzenLoader({urlBase:'http://www.losys.ch/iframe/xml/xml_ausgabe.php?',urlAddon:'a=2060&key=x58rs5ee89'});
                    }
                }

            })
            .when('/zurich', {
                controller: 'ReferenzenController'
                ,templateUrl: 'ng/views/liste.html'
                ,resolve: {
                    referenzen: function(ReferenzenLoader) {
                        return ReferenzenLoader({urlBase:'http://www.losys.ch/iframe/xml/xml_ausgabe.php?',urlAddon:'a=1207&key=s659lkt256se'});
                    }
                }

            })
            .otherwise({
                //redirectTo: '/'
            });
    });