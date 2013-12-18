'use strict';

describe('Testing Controllers & Loaders: ', function () {

  var controller;
  var $scope;

  // load app module
  beforeEach(module('LosysReferenzen'));

  // special matcher for object comparison in angular
  beforeEach(function() {
      this.addMatchers({
          toEqualData: function(expected) {
              return angular.equals(this.actual,expected);
          }
      });
  });


  describe('ReferenzenController ',function() {
        var mockBackend;
        var referenzen;

        // Initialize the controller and a mock scope
        beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, Referenzen) {
            $scope = $rootScope.$new();
            mockBackend = _$httpBackend_;
            referenzen = Referenzen;
            controller = $controller('ReferenzenController', {
                $scope:$scope
                ,referenzen: [1,2,3]
            });

        }));

        it('scope should be defined', function () {
            expect($scope).toBeDefined();
        });

        it ('should have a list of referenzen ',function() {
            expect($scope.itemsAll).toEqual([1,2,3]);
        });
  });

  describe('ReferenzenLoader ',function() {
        var mockBackend;
        var referenzen;
        var loader;
        var referenzenData;

        // Initialize the controller and a mock scope
        beforeEach(inject(function (_$httpBackend_, Referenzen, ReferenzenLoader) {
            referenzen = Referenzen;
            mockBackend = _$httpBackend_;
            loader = ReferenzenLoader;

            mockBackend.when('GET', 'http://www.losys.ch/iframe/xml/xml_ausgabe.php?a=1207&key=s659lkt256se&group=1207').respond(
                '<?xml version="1.0" encoding="UTF-8"?><referenzdaten><objekte><objekt><arbeitsgattungen><arbeitsgattung>Sanitäranlagen</arbeitsgattung></arbeitsgattungen><bilder><objektbilder><bild><id>15857</id></bild></objektbilder></bilder></objekt><objekt><arbeitsgattungen><arbeitsgattung>Sanitäranlagen</arbeitsgattung></arbeitsgattungen><bilder><objektbilder><bild><id>15857</id></bild></objektbilder></bilder></objekt></objekte></referenzdaten>'
            );
            mockBackend.when('GET', 'ng/views/liste.html').respond('');

            var promise = loader({urlBase:'http://www.losys.ch/iframe/xml/xml_ausgabe.php?',urlAddon:'a=1207&key=s659lkt256se&group=1207'});
            promise.then(function(ref) {
                referenzenData = ref;
            });

        }));
        it ('should load referenzen data', function () {
            expect(referenzenData).toBeUndefined();
        });
        describe(' should parse loaded xml mock data to json and ',function() {
          it ('should have an array objekt with 2 objects', function () {
              mockBackend.flush();
              expect(referenzenData.referenzdaten.objekte.objekt.length).toBe(2);
          });

          it ('should have an array arbeitsgattungen.arbeitsgattung of length 1 for the first objekt', function () {
              mockBackend.flush();
              expect(referenzenData.referenzdaten.objekte.objekt[0].arbeitsgattungen.arbeitsgattung.length).toBe(1);
          });
        });

  });


});
